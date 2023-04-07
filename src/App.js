import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import './App.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

//  Cognito Identity Service Provider via @aws-sdk
import { listUsers } from './listUsers';

function App() {

  const [list, updateList] = useState(null);
  const [code, updateCode] = useState(null);
  const [processdata, setProcessData] = useState(null);
  const [authactioncount, setAuthActionCount] = useState(0);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  // add authactioncount as the 2nd arg to useEffect() to create
  // a dependency.  whenever authactioncount changes, useEffect()
  // will be triggered to run and cause the page to be re-rendered
  // (normally not done when using react-router-dom)
  useEffect(() => {
    console.log('running useEffect');
    checkUser();
    setAuthListener();
    console.log('authactioncount=', authactioncount);
  }, [authactioncount]);

  function logOut () {
    Auth.signOut();
  }

  async function checkUser() {
    try {
      console.log('checkUser');
      const user = await Auth.currentAuthenticatedUser();
      console.log('checked user ', user);
      setUser(user);
    } catch (err) {
      // updateUser(null);
    }

    // debug to check on session access tokens
    Auth.currentSession()
        .then((data) => console.log('session data', data))
        .catch((err) => console.log('sess data error', err));
  }

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in');
          console.log(data.payload);
          setUser(data.payload.data);
          setAuthActionCount(authactioncount+1);
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('data from event:', data);
          setUser(null);
          setAuthActionCount(authactioncount+1);
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');
        default:
          break;
      }
    });
  }


//  async function getSteps() {
//    const allSteps = await API.graphql({ query: queries.listSteps });
//    console.log(allSteps);
//    updateList(allSteps.data.listSteps.items);
//    /*
//    let tmplist = '';
//    for (let i = 0; i < allSteps.data.listSteps.items.length; i++) {
//      tmplist += <li> {allSteps.data.listSteps.items[i].name} </li>;
//    }
//    updateList(tmplist);
//    */
//    //console.log('list', list);
//  }

  function updateProcesses(data) {
    console.log('updateprocesses', data);
    setProcessData(data);
    setMessage('process query completed');
  }

  function handleProcessError(error) {
    console.log('handleprocesserror', error);
    setMessage(error.errors[0].message);
  }

  async function getProcesses() {
    if (!user) {
      console.log('getprocesses - no user yet');
      return;
    }

    const authmode = user ? "AMAZON_COGNITO_USER_POOLS" :
                            "AWS_IAM";
    console.log('getprocesses authmode', authmode);
    const allprocs = await API.graphql({ query: queries.listProcesses,
                                 authMode: authmode })
                     .then((response) => updateProcesses(response.data))
                     .catch((error) => handleProcessError(error));

  }

  function processAdded(response) {
    console.log('processadded', response);
    setMessage('process added');
  }

  function handleCreateProcessError(error) {
    console.log('handlecreateprocesserror', error);
    setMessage(error.errors[0].message);
  }

  async function createProcess() {
    const processdata = user ? {
      name: "cognito user created",
      description: "create user",
      admingroups: ["groupa"],
      readgroups: ["groupb"]
    } :
    {
      name: "IAM user created",
      description: "create with no authentication"
    }

    const authmode = user ? "AMAZON_COGNITO_USER_POOLS" :
                            "AWS_IAM";
    console.log('createprocess auth mode', authmode);
//    const allCategories = await API.graphql({ query: queries.listCategories,
//                                              authMode: authmode })

    const createproc = await API.graphql({ query: mutations.createProcess,
                                           authMode: authmode,
                                           variables: { input: processdata }})
                       .then((response) => processAdded(response))
                       .catch((error) => handleCreateProcessError(error));
  }

  async function getCode() {
    const result = await Storage.get('testmodel.txt',
                                      {level: 'public',
                                       contentType: 'string',
                                       download: true
                                      });
    result.Body.text().then(data => {
      //console.log('file content', data);
      updateCode(data);
      //updateCodeArray(data.split('\n'));
    });
  }

  async function getUsers() {
    // attempt using an Admin Query to get users
    const sess = await Auth.currentSession();
    console.log('sess.accessToken', sess.accessToken);

    const myinit = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: sess.accessToken.jwtToken
      }
    }
    const result = await API.get("AdminQueries", "/listUsers", myinit);
    console.log('listUsers result', result);
  }

  //if (!list)
  //  getSteps();

  //if (!processdata)
  //  getProcesses();

  if (!code)
    getCode();
  //else
  //  console.log('code', code);

  console.log('this is start of test');

  //const userlist = listUsers('us-east-1_wOVNZywK2');
  //console.log('userlist', userlist);

  getUsers();


  return (
    <div className="App">
      <h2>Test App</h2>
      <div>
        <Authenticator>
          {({ user }) => (
            <main>
              Hello {user.username}
            </main>
          )}
        </Authenticator>
      </div>
      <div>
        <button onClick={logOut}>Log Out</button>
      </div>
      <p />
      <div>
        <button onClick={createProcess}>Create Process</button>
      </div>
      <p />
      <div>
        Create Process message: {message}
      </div>
      {code}
      <p></p>
      <div className="codediv">
        <SyntaxHighlighter 
          language="javascript" 
          wrapLines={true}
          showLineNumbers={true}
          style={colorBrewer}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;
/*
      <Authenticator>
        {({ user }) => (
          <main>
            Hello {user.username}
          </main>
        )}
      </Authenticator>
*/

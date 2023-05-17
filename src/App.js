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

  // Cognito specific data
  const [cogusersetup, setCogUserSetup] = useState(false);
  const [cognitousers, setCognitoUsers] = useState(null);
  const [cognitogroups, setCognitoGroups] = useState(null);
  const [cognitouserdetails, setCognitoUserDetails] = useState(null);
  const [adminsgroupexists, setAdminsGroupExists] = useState(false);
  const [usersgroupexists, setUsersGroupExists] = useState(false);
  const [nextgroupname, setNextGroupName] = useState(null);
  const [groupexists, setGroupExists] = useState(false);

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

  //  read cognito groups only after there is a change to the 
  //  logged in user
  useEffect(() => {
    console.log('running getcognitogroups effect');

    if (!user) {
      console.log('no user logged in');
      return;
    }

    async function getCognitoGroups() {
      const sess = await Auth.currentSession();

      const myinit = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sess.accessToken.jwtToken
        }
      }

      const result = await API.get("AdminQueries", "/listGroups", myinit)
                     .then((data) => { setCognitoGroups(data.Groups);
                                       console.log('getcoggroups effect data', data);
                                     })
                     .catch((err) => console.log('getcoggroups error', err));
      }

    getCognitoGroups();
  }, [user]);

  // check for needed groups only after cognito groups have been read
  useEffect(() => {
    if (!cognitogroups) {
      console.log('no cognito groups yet');
      return;
    }

    let groups = [];

    //  check to see if 'testgroup_admins' and 'testgroup_users' exist
    if (cognitogroups.find((groups) => groups.GroupName === 'testgroup_admins')) {
      console.log('setupcognitouser', 'testgroup_admins exists');
  } else {
      groups.push('testgroup_admins');
    }

    if (cognitogroups.find((groups) => groups.GroupName === 'testgroup_users')) {
      console.log('setupcognitouser', 'testgroup_users exists');
    } else {
      groups.push('testgroup_users');
    }

    console.log('setting needed groups', groups);
    setNextGroupName(groups);
    if (groups.length == 0)
      setCogUserSetup(true);
  }, [cognitogroups]);

  useEffect(() => {
    console.log('running addcognitogroups effect');

    if (!nextgroupname || nextgroupname.length == 0) {
      console.log('addcognitogroups effect, no nextgroupname');
      return;
    }

    async function addCognitoGroup(groupname) {
      console.log('starting addCognitoGroup', groupname);
      const sess = await Auth.currentSession();

      const myinit = {
        body: {
          'groupname': groupname
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: sess.accessToken.jwtToken
        }
      }

      const result = await API.post("AdminQueries", "/createGroup", myinit)
                     .then((data) => { if (nextgroupname.length <= 1)
                                         setCogUserSetup(true);
                                       else
                                         setNextGroupName(nextgroupname.shift());
                                     } )
                     .catch((err) => console.log(('addcognitogroup error', err)));
      //  on failure, 'result' value is undefined
      //console.log('addcognitogroup result', result);
    }

    console.log('calling addcognitogroup', nextgroupname);
    addCognitoGroup(nextgroupname[0]);
  }, [nextgroupname]);


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

  function updateCognitoUsers(data) {
    console.log('updatecognitousers data', data);
    setCognitoUsers(data.Users);
  }

  async function getCognitoUsers() {
    // attempt using an Admin Query to get users
    const sess = await Auth.currentSession();

    const myinit = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: sess.accessToken.jwtToken
      }
    }
    const result = await API.get("AdminQueries", "/listUsers", myinit)
                   .then((data) => updateCognitoUsers(data))
                   .catch((err) => console.log('getcogusers error', err));
  }

  function updateCognitoUser(data) {
    console.log('updatecognitouser data', data);
    setCognitoUserDetails(data);
  }

  async function getCognitoUser() {
    // the result of this AdminQuery returns the exact same data for 
    // a specific user as /listUsers returns as an array for all users
    console.log('starting getCognitoUser details');
    const sess = await Auth.currentSession();

    const myinit = {
      queryStringParameters: {
        'username': 'david'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: sess.accessToken.jwtToken
      }
    }

    const result = await API.get("AdminQueries", "/getUser", myinit)
                   .then((data) => updateCognitoUser(data))
                   .catch((err) => console.log('getcoguser error', err));
  }

  function groupAdded(data) {
    // on successful group creation, the 'data' value is just the message:
    // 'Success creating group testgroup'
    console.log('groupadded data', data);
    // set cognitogroups data to null to force re-capture of groups
    setCognitoGroups(null);
    //setNewCognitoGroup(data);
  }

  function handleGroupAddError(error) {
    //  on failure (due to group already existing, the 'err' value is just:
    //  'Error: Request failed with status code 400'
    //  even though cloudwatch logs for the backend function has message:
    //  ERROR A group with the name already exists.
    //  the same message also shows up in the back end function as an INFO
    //  stack trace that includes the same error message
    console.log('handlegroupadderror', error.response.data.message);
  }


  //if (!list)
  //  getSteps();

  //if (!processdata)
  //  getProcesses();

  //if (!code)
    // getCode() generates a 403 (forbidden) error; used to work.
  //  getCode();
  //else
  //  console.log('code', code);

  console.log('this is start of test');

  // aws-sdk related call; check listUsers.js for detailed code
  //const userlist = listUsers('us-east-1_wOVNZywK2');
  //console.log('userlist', userlist);

  //if (!cognitousers)
  //  getCognitoUsers();

  //if (!cognitouserdetails)
  //  getCognitoUser();

  function setupCognitoUser() {
    // make sure a user is logged in
    if (!user) {
      console.log('setupcognitouser', 'no user logged in');
      return;
    }

    console.log('setupcognitouser', 'user ' + user.username + ' logged in');

    if (!cognitogroups) {
      console.log('no groups retrieved');
      return;
    }

    console.log('setupcognitouser', 'read all groups', cognitogroups);

    //  check to see if 'testgroup_admins' and 'testgroup_users' exist
    if (cognitogroups.find((groups) => groups.GroupName === 'testgroup_admins')) {
      console.log('setupcognitouser', 'testgroup_admins exists');
  } else {
      setNextGroupName('testgroup_admins');
      return;
    }

    console.log('setupcongnitouser check for _users');

    if (cognitogroups.find((groups) => groups.GroupName === 'testgroup_users')) {
      console.log('setupcognitouser', 'testgroup_users exists');
    } else {
      console.log('setupcognitouser: set next group to _users');
      setNextGroupName('testgroup_users');
      return;
    }

    setCogUserSetup(true);
  }

  console.log('nextgroupname:', nextgroupname);

  //if (!cogusersetup) {
  //  setupCognitoUser();
  //}


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
      <p />
      <div>
        {cogusersetup ? 'user setup complete'
                      : 'awaiting user group setup'
        }
      </div>
      <p />
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

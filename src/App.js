import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import './App.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import * as queries from './graphql/queries';

function App() {

  const [list, updateList] = useState(null);
  const [code, updateCode] = useState(null);

  function logOut () {
    Auth.signOut();
  }

  async function getSteps() {
    const allSteps = await API.graphql({ query: queries.listSteps });
    console.log(allSteps);
    updateList(allSteps.data.listSteps.items);
    /*
    let tmplist = '';
    for (let i = 0; i < allSteps.data.listSteps.items.length; i++) {
      tmplist += <li> {allSteps.data.listSteps.items[i].name} </li>;
    }
    updateList(tmplist);
    */
    console.log('list', list);
  }

  async function getCode() {
    const result = await Storage.get('index.js',
                                      {level: 'public',
                                       contentType: 'string',
                                       download: true
                                      });
    result.Body.text().then(data => {
      console.log('file content', data);
      updateCode(data);
      //updateCodeArray(data.split('\n'));
    });
  }

  //if (!list)
  //  getSteps();

  if (!code)
    getCode();
  else
    console.log('code', code);

  console.log('this is start of test');

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

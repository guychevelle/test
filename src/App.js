import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import './App.css';

import { API } from 'aws-amplify';
import * as queries from './graphql/queries';

function App() {

  const [list, updateList] = useState(null);

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

  if (!list)
    getSteps();

  console.log('list before return', list);

  return (
    <div className="App">
      <h2>Login</h2>
      <p></p>
      <div>
        <ul>
          {list ? list.map((step, index) => (
                            <li key={step.id}>{step.name}</li>
                           )) :
                  ""}
        </ul>
      </div>
      <Authenticator>
        {({ user }) => (
          <main>
            Hello {user.username}
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;

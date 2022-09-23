import logo from './logo.svg';
import { Authenticator } from '@aws-amplify/ui-react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Login</h2>
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

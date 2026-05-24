import './App.css'
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GoogleOAuthProvider clientId="396703659680-skjf4hu1gsr9g91qkgi06fl6b696ndks.apps.googleusercontent.com">
      {isLoggedIn ? (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </GoogleOAuthProvider>
  );
}

export default App

import React from 'react';
import Login from './components/Login';
import Success from './components/Success';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div>
      {!isLoggedIn ? <Login /> : <Success />}
    </div>
  );
};

export default App;
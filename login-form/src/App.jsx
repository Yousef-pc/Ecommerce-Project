import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import './App.css';

function App() {
  const [isPassVisible, setIsPassVisible] = useState(true)

  return (
    <>
      <p className="header-text">Hello, welcome to my website</p>
      <LoginForm 
        isPassVisible={isPassVisible}
        setIsPassVisible={setIsPassVisible}
      />
    </>
  );
}

export default App

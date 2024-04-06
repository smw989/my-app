// LoginPage.js
import React, { useState } from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from './Footer';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const switchForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <Header />
      {showLogin ? <LoginForm switchToSignup={switchForm} /> : <SignupForm switchToLogin={switchForm} />}
      <Footer />
    </div>
  );
};

export default LoginPage;

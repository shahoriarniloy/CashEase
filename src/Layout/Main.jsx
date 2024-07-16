import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navabar';
import Footer from '../Components/Footer';
import '../App.css';

const Main = () => {
  const [language, setLanguage] = useState('EN');

  const handleLanguageToggle = () => {
    setLanguage(language === 'EN' ? 'BN' : 'EN');
  };

  return (
    <div>
      <Navbar language={language} onLanguageToggle={handleLanguageToggle} />
      <Outlet context={{ language }} />
      <Footer />
    </div>
  );
};

export default Main;

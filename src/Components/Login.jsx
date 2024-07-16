import axios from 'axios';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
  const { language } = useOutletContext();
  const [input, setInput] = useState('');
  const [isUsingEmail, setIsUsingEmail] = useState(false);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [pinError, setPinError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (!isUsingEmail && value.length > 10) {
      value = value.slice(0, 10);
      setError(language === 'EN' ? 'Please enter a valid 11-digit mobile number' : 'সঠিক মোবাইল নাম্বার লিখুন');
    } else {
      setError('');
    }
    setInput(value);
    if (!isUsingEmail && !/^\d{10}$/.test(value) && value.length > 0) {
      setError(language === 'EN' ? 'Please enter a valid 11-digit mobile number' : 'সঠিক নাম্বার লিখুন');
    } else if (isUsingEmail && !/\S+@\S+\.\S+/.test(value) && value.length > 0) {
      setError(language === 'EN' ? 'Please enter a valid email address' : 'একটি সঠিক ইমেইল ঠিকানা লিখুন');
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPin(value);
      setPinError(value.length === 5 ? '' : (language === 'EN' ? 'PIN should be a 5-digit number' : 'পিন হতে হবে পাঁচ অংকের সংখ্যা'));
    } else {
      setPinError(language === 'EN' ? 'PIN should be a number' : 'পিন হতে হবে সংখ্যা');
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  const handleOptionClick = () => {
    setIsUsingEmail(!isUsingEmail);
    setInput('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input || !pin || pin.length !== 5) {
      setError(language === 'EN' ? `Please enter your ${isUsingEmail ? 'email' : 'mobile number'} and a 5-digit PIN` : `দয়া করে আপনার ${isUsingEmail ? 'ইমেইল' : 'মোবাইল নাম্বার'} এবং ৫-অংশীয় পিন লিখুন`);
    } else {
      setError('');

      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input, pin }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Login successful:', data);

          axios.post('http://localhost:5000/jwt',{
            input: input,
            pin: pin,
          },{withCredentials:true})
          .then(res=>{
            console.log(res.data);
            if(res.data.success){
              {{console.log('input:::',input);}}
              localStorage.setItem('userInput', input);
              navigate(location?.state?location?.state:'/')
            }
          })

        } else {
          console.log('Login failed:', data);
          setError(language === 'EN' ? 'Invalid credentials' : 'ভুল শংসাপত্র');
        }
      } catch (error) {
        console.error('Login Error:', error.message);
        setError(language === 'EN' ? 'Login failed' : 'লগইন ব্যর্থ হয়েছে');
      }
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='mb-16'>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-lg bg-blue-100 text-blue-900 roboto-regular text-sm">
        <div className="flex items-center justify-center">
          <img src="https://i.ibb.co/WWKnCGj/CashEase.png" alt="CashEase Logo" className="h-32 mb-4" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input" className="block mb-2">{isUsingEmail ? (language === 'EN' ? 'Email' : 'ইমেইল') : (language === 'EN' ? 'Mobile Number' : 'মোবাইল নাম্বার')}:</label>
            <div className="flex items-center">
              {!isUsingEmail && <span className="mr-2">+880</span>}
              <input
                type="text"
                id="input"
                value={input}
                onChange={handleInputChange}
                placeholder={isUsingEmail ? (language === 'EN' ? 'Enter your email' : 'আপনার ইমেইল লিখুন') : 'XXXXXXXXXXX'}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div
            className="text-blue-500 cursor-pointer mb-2"
            onClick={handleOptionClick}
          >
            {language === 'EN' ? `Use ${isUsingEmail ? 'Mobile Number' : 'Email'} instead` : `বিকল্প হিসাবে ${isUsingEmail ? 'মোবাইল নাম্বার' : 'ইমেইল'} ব্যবহার করুন `}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="pin" className="block mb-2">{language === 'EN' ? 'PIN' : 'পিন'}:</label>
            <input
              type={showPin ? 'text' : 'password'}
              id="pin"
              value={pin}
              onChange={handlePinChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {pin && (
              <span
                onClick={toggleShowPin}
                className="absolute inset-y-1 mt-6 right-3 flex items-center cursor-pointer"
              >
                {showPin ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </span>
            )}
          </div>
          {pinError && <p className="text-red-500 text-sm mb-4">{pinError}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">{language === 'EN' ? 'Login' : 'লগইন'}</button>
        </form>
        <div className="flex justify-center items-center mt-4">
          <p>{language === 'EN' ? "Don't have an account?" : 'অ্যাকাউন্ট নেই?'}</p>
          <button
            onClick={handleRegister}
            className="p-2  text-blue-500 font-bold rounded-md"
          >
            {language === 'EN' ? 'Register' : 'রেজিস্টার'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

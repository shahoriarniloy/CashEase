import  { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import bcrypt from 'bcryptjs'; 

const Registration = () => {
  const { language } = useOutletContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState('user'); 
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleNameChange = (e) => {
    let value = e.target.value;
    if (!/\d/.test(value)) {
      setName(value);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setPhone(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePinChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 5) {
      setPin(value);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!name) {
      validationErrors.name = language === 'EN' ? 'Please enter your name' : 'আপনার নাম লিখুন';
    } else if (/\d/.test(name)) {
      validationErrors.name = language === 'EN' ? 'Name cannot contain numbers' : 'নামে অংক থাকতে পারবে না';
    }

    if (!phone || phone.length !== 10) {
      validationErrors.phone = language === 'EN' ? 'Please enter a valid 11-digit mobile number' : 'একটি সঠিক ১১-অংশীয় মোবাইল নাম্বার লিখুন';
    }

    if (!validateEmail(email)) {
      validationErrors.email = language === 'EN' ? 'Please enter a valid email address' : 'একটি সঠিক ইমেইল ঠিকানা লিখুন';
    }

    if (!pin || pin.length !== 5) {
      validationErrors.pin = language === 'EN' ? 'PIN should be a 5-digit number' : 'পিন হতে হবে পাঁচ অংকের সংখ্যা';
    }

    if (Object.keys(validationErrors).length === 0) {
      const hashedPin = await bcrypt.hash(pin, 10); 

      const user = { name, phone, email, pin: hashedPin, role, status: 'pending' };
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          if (data.insertedId) {
            setMessage(language === 'EN' ? 'Registration successful' : 'রেজিস্ট্রেশন সফল হয়েছে');
          } else if (data.message === 'User already exists') {
            setErrors({ email: language === 'EN' ? 'User already exists' : 'ব্যবহারকারী ইতিমধ্যে বিদ্যমান' });
          } else {
            setMessage(language === 'EN' ? 'Registration failed' : 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
          }
        } else {
          const errorData = data || { message: 'Unknown error occurred' };
          throw new Error(errorData.message);
        }
      } catch (error) {
        setMessage(language === 'EN' ? 'Registration failed' : 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
        console.error('Registration Error:', error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='mb-16'>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-lg bg-blue-100 text-blue-900 roboto-regular text-sm">
        <div className="flex items-center justify-center">
          <img src="https://i.ibb.co/WWKnCGj/CashEase.png" alt="CashEase Logo" className="h-32 mb-4" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">{language === 'EN' ? 'Name' : 'নাম'}:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder={language === 'EN' ? 'Enter your name' : 'আপনার নাম লিখুন'}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">{language === 'EN' ? 'Mobile Number' : 'মোবাইল নাম্বার'}:</label>
            <div className="flex items-center">
              <span className="mr-2">+880</span>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="XXXXXXXXXXX"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">{language === 'EN' ? 'Email' : 'ইমেইল'}:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={language === 'EN' ? 'Enter your email' : 'আপনার ইমেইল লিখুন'}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            <span
              onClick={toggleShowPin}
              className="absolute inset-y-1 mt-6 right-3 flex items-center cursor-pointer"
            >
              {showPin ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </span>
            {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2">{language === 'EN' ? 'Role' : 'ভূমিকা'}:</label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="user">{language === 'EN' ? 'User' : 'ব্যবহারকারী'}</option>
              <option value="agent">{language === 'EN' ? 'Agent' : 'এজেন্ট'}</option>
              <option value="admin">{language === 'EN' ? 'Admin' : 'অ্যাডমিন'}</option>
            </select>
          </div>
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">{language === 'EN' ? 'Register' : 'রেজিস্টার'}</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;

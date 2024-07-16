import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserRole from '../Hooks/useUserRole';

const Navbar = ({ language, onLanguageToggle }) => {
  const navigate = useNavigate();
  const { userRole, loading } = useUserRole();

  const logout = async () => {
    axios.post('http://localhost:5000/logout', null, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        localStorage.removeItem('userInput'); 
        navigate('/login'); 
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 text-blue-600 roboto-thin">
      <div className="flex items-center">
        <img src="https://i.ibb.co/WWKnCGj/CashEase.png" alt="CashEase Logo" className="h-16" />
      </div>
      <div className="flex gap-4">
        <button
          className="py-2 px-4 rounded text-blue-600 border border-blue-600 rounded-md"
          onClick={onLanguageToggle}
        >
          {language === 'EN' ? 'বাংলা' : 'English'}
        </button>
        {userRole ? (
          <button
            className="py-2 px-4 rounded text-blue-600 border border-blue-600 rounded-md"
            onClick={logout}
          >
            {language === 'EN' ? 'Logout' : 'লগআউট'}
          </button>
        ) : (
          <button
            className="py-2 px-4 rounded text-blue-600 border border-blue-600 rounded-md"
            onClick={handleLogin}
          >
            {language === 'EN' ? 'Login' : 'লগইন'}
          </button>
        )}
        {/* <span>User Role: {loading ? 'Loading...' : (userRole || 'Not available')}</span> */}
      </div>
    </nav>
  );
};

export default Navbar;

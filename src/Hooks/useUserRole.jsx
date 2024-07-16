import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserRole = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedInput = localStorage.getItem('userInput');
      console.log(storedInput);
      if (!storedInput) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/userrole', {
          params: { input: storedInput }, 
        });
        
        const { role } = response.data; 
        setUserRole(role);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user role:', error.message);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { userRole, loading };
};

export default useUserRole;

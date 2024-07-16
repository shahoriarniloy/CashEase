import useUserRole from '../Hooks/useUserRole';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

const Dashboard = () => {
const { userRole, loading } = useUserRole();

    return (
        <div>
                    <span>User Role: {loading ? 'Loading...' : (userRole || 'Not available')}</span>
                    {userRole === 'user' && <UserHome></UserHome>}
                    {userRole === 'admin' && <AdminHome></AdminHome>}

            
        </div>
    );
};

export default Dashboard;
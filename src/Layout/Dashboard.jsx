import { Outlet, NavLink,   useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsPaypal, BsBadgeAd, BsCashCoin, BsClipboardData } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ImHome } from "react-icons/im";
import UseAdmin from '../Hooks/UseAdmin';
import UseSeller from '../Hooks/UseSeller';
import UseAuth from '../Hooks/UseAuth';


const Dashboard = () => {
    const { user, logOut } = UseAuth(); 

    const [ isAdmin,  isLoadingAdmin ] = UseAdmin();
    const [ isSeller,  isLoadingSeller] = UseSeller();
    const navigate= useNavigate();

    if (isLoadingAdmin || isLoadingSeller) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-900"></div>;
    }

    const handleLogout = () => {
        logOut();
        navigate('/login');

      };
    return (
        <div className='flex'>
            <div className="w-fit min-h-screen bg-blue-900 text-white pl-4 pt-4">
                <ul className='menu flex flex-col gap-8'>
                    {isAdmin && (
                        <>
                            <li className='flex flex-row items-center'>
                                <FaUser />
                                <NavLink 
                                    to="/dashboard/users"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Manage Users
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsClipboardData />
                                <NavLink 
                                    to="/dashboard/category/index"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Manage Category
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsPaypal />
                                <NavLink 
                                    to="/dashboard/payment/status"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Payment Management
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsCashCoin />
                                <NavLink 
                                    to="/dashboard/sales"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Sales Report
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                                <BsBadgeAd />
                                <NavLink 
                                    to="/dashboard/banner-advertise"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Banner Advertise
                                </NavLink>
                            </li>
                            <hr className='my-8 mr-2' />
                        </>
                    )}
                    {isSeller && (
                        <>
                            <li className='flex flex-row items-center'>
                            <BsClipboardData />
                            <NavLink 
                                    to="/dashboard/seller/medicine/index"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Manage Medicine
                                </NavLink>
                            </li> 
                            <li className='flex flex-row items-center'>
                            <BsCashCoin />                                <NavLink 
                                    to="/dashboard/invoices/:email"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Payment History
                                </NavLink>
                            </li>
                            <li className='flex flex-row items-center'>
                            <BsBadgeAd />
                            <NavLink 
                                    to="/dashboard/advertise"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Advertise
                                </NavLink>
                            </li>
                            <hr className='my-8 mr-2' />
                        </>
                    )}

                    {user && (
                        <div className="flex">
                            <div className='flex items-center'>
                            <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                            <div>
                            <button onClick={handleLogout} className="block px-4 py-2 text-white">Logout</button>

                            </div>
                        </div>


                        
                            
                           
                        </div>
                    )}
                    {/* <li className='flex flex-row items-center'>
                    <BsCashCoin />
                                <NavLink 
                                    to="/dashboard/invoices/:email"
                                    className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                                >
                                    &nbsp; Invoice
                                </NavLink>
                            </li> */}

                    <li className='flex flex-row items-center'>
                        <ImHome />
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                        >
                            &nbsp; Home
                        </NavLink>
                    </li>
                    <li className='flex flex-row items-center'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <NavLink 
                            to="/medicine/index"
                            className={({ isActive }) => isActive ? "text-yellow-300" : ""}
                        >
                            &nbsp; Shop
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

import logoBJB from '../assets/bjb.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BuildingOfficeIcon, DocumentMagnifyingGlassIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const role = localStorage.getItem('role');
  const location = useLocation();
  const isDashboardActive = location.pathname.startsWith('/dashboard');
  const isCompaniesActive = location.pathname.startsWith('/fasilitas');
  const isRecoveryActive = location.pathname.startsWith('/recovery');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    navigate('/');
  };
  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col items-center w-64 fixed top-0 left-0 h-screen z-55 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:h-screen md:z-0`}
    >

      {/* Close button for mobile */}
      <div className="w-full flex justify-end px-4 md:hidden">
        <button className="text-xl" onClick={() => setSidebarOpen(false)}>✕</button>
      </div>

      <img src={logoBJB} alt="bank bjb" className="h-20 mb-10 pt-4" />
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
      <p className="mb-6 text-sm font-semibold">Halo, user!</p>

      <nav className="w-full space-y-2 px-4 text-sm">
        <p1>In Development</p1>
        <Link
          to="/dashboard"
          className={`py-2 px-3 rounded flex items-center space-x-2 ${isDashboardActive
            ? 'bg-green-100 text-green-800 font-semibold'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          <HomeIcon
            className={`h-5 w-5 ${isDashboardActive ? 'text-green-800' : 'text-gray-500 group-hover:text-gray-700'
              }`}
          />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/fasilitas"
          className={`py-2 px-3 rounded flex items-center space-x-2 ${isCompaniesActive
            ? 'bg-green-100 text-green-800 font-semibold'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          <BuildingOfficeIcon
            className={`h-5 w-5 ${isCompaniesActive ? 'text-green-800' : 'text-gray-500 group-hover:text-gray-700'
              }`}
          />
          <span>Companies</span>

        </Link>

        <Link
          to="/recovery"
          className={`py-2 px-3 rounded flex items-center space-x-2 ${isRecoveryActive
            ? 'bg-green-100 text-green-800 font-semibold'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          <DocumentMagnifyingGlassIcon
            className={`h-5 w-5 ${isRecoveryActive ? 'text-green-800' : 'text-gray-500 group-hover:text-gray-700'
              }`}
          />
          <span>Recovery Plan Status</span>
        </Link>

        <Link
          to="/dashboard/ppk"
          className={`py-2 px-3 rounded flex items-center space-x-2 ${location.pathname === '/dashboard/ppk'
            ? 'bg-green-100 text-green-800 font-semibold'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          <span>😴</span>
          <span>Dashboard PPK</span>
        </Link>


        <Link
          to="/recovery/ppk"
          className={`py-2 px-3 rounded flex items-center space-x-2 ${location.pathname === '/recovery/ppk'
            ? 'bg-green-100 text-green-800 font-semibold'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          <span>😩</span>
          <span>Recovery Plan Status User</span>
        </Link>
       

        {/* TESTING PHASE PART */}
        <p1>Real Sidebar Testing</p1>
        {/* Dasboard Manager */}
        {(role === 'Manager PPK') && (
          <Link
            to="/dashboard"
            className={`py-2 px-3 rounded flex items-center space-x-2 ${isDashboardActive
              ? 'bg-green-100 text-green-800 font-semibold'
              : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            <HomeIcon
              className={`h-5 w-5 ${isDashboardActive ? 'text-green-800' : 'text-gray-500 group-hover:text-gray-700'
                }`}
            />
            <span>Dashboard</span>
          </Link>
        )}

        {/* Dashboard PPK */}
        {role === 'AO PPK' && (
          <Link
            to="/dashboard/ppk"
            className={`py-2 px-3 rounded flex items-center space-x-2 ${location.pathname === '/dashboard/ppk'
              ? 'bg-green-100 text-green-800 font-semibold'
              : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            <span>😴</span>
            <span>Dashboard PPK</span>
          </Link>
        )}

        <Link
          to="/fasilitas"
          className={`py-2 px-3 rounded flex items-center space-x-2 ${isCompaniesActive
            ? 'bg-green-100 text-green-800 font-semibold'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
          <BuildingOfficeIcon
            className={`h-5 w-5 ${isCompaniesActive ? 'text-green-800' : 'text-gray-500 group-hover:text-gray-700'
              }`}
          />
          <span>Companies</span>

        </Link>

        {/* Recovery Manager */}
        {role === 'Manager PPK' && (
          <Link
            to="/recovery"
            className={`py-2 px-3 rounded flex items-center space-x-2 ${isRecoveryActive
              ? 'bg-green-100 text-green-800 font-semibold'
              : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            <DocumentMagnifyingGlassIcon className={`h-5 w-5 ${isRecoveryActive ? 'text-green-800' : 'text-gray-500'}`} />
            <span>Recovery Plan Status</span>
          </Link>
        )}

        {/* Recovery PPK */}
        {role === 'AO PPK' && (
          <Link
            to="/recovery/ppk"
            className={`py-2 px-3 rounded flex items-center space-x-2 ${location.pathname === '/recovery/ppk'
              ? 'bg-green-100 text-green-800 font-semibold'
              : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            <span>😩</span>
            <span>Recovery Plan Status User</span>
          </Link>
        )}
      </nav>

      <div className="mt-auto mb-4 px-4 py-5 text-sm text-gray-500">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 hover:text-red-500"
        >
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
          <span>Log Out</span>
        </button>

      </div>

    </aside>
  );
}

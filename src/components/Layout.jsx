import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ children, breadcrumbs = [] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setSidebarOpen(!isMobile);

    const name = localStorage.getItem('userName') || '';
    setUserName(name);

    const role = localStorage.getItem('role') || '';
    setRole(role);

    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setUserInitials(initials);

    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Top Bar */}
        <div className="w-full sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          {/* Left side: Burger + Breadcrumbs */}
          <div className="flex items-center space-x-4">
            {/* Burger Button */}
            <button
              className="text-2xl md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
            {/* Breadcrumbs rendering */}
            <h1 className="text-2xl font-semibold flex items-center">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path || index}>
                  <span
                    className={`cursor-pointer hover:text-blue-600 transition-colors ${index === breadcrumbs.length - 1 ? 'text-gray-800' : 'text-gray-500'
                      }`}
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.label}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <span className="mx-2 text-gray-400">/</span>
                  )}
                </React.Fragment>
              ))}
              {breadcrumbs.length === 0 && <span className="text-gray-800">Dashboard</span>}
            </h1>
          </div>

          {/* Right side: User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{userName || 'User'}</p>
              <p className="text-xs text-gray-500">{role || 'Role'}</p> 
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-bold">
              {userInitials || 'U'}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, title = 'Page Title' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setSidebarOpen(!isMobile);
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
      <div className="flex-1 bg-white-300 overflow-y-auto">
        {/* Top Bar */}
        <div className="w-full sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          {/* Left side: Burger + Title */}
          <div className="flex items-center space-x-4">
            {/* Burger Button */}
            <button
              className="text-2xl md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>

          {/* Right side: User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">Tarik Abaza</p>
              <p className="text-xs text-gray-500">Komersial</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800" />
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

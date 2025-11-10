import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Server, 
  HardDrive, 
  Globe, 
  Settings, 
  Search, 
  Bell, 
  User,
  Menu,
  X,
  HelpCircle
} from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 border-l-4 ${
      isActive
        ? 'bg-green-50 text-green-700 border-green-600'
        : 'text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900 text-white">
          <div className="flex items-center font-bold text-xl tracking-tight cursor-pointer" onClick={() => onChangeView('dashboard')}>
            <span className="text-green-500 mr-2">●</span> CloudManager
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)] overflow-y-auto py-4">
          <nav className="space-y-1">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              isActive={currentView === 'dashboard'} 
              onClick={() => { onChangeView('dashboard'); setIsMobileMenuOpen(false); }} 
            />
            <NavItem 
              icon={<Server size={20} />} 
              label="Linodes" 
              isActive={currentView === 'linodes' || currentView === 'create' || currentView === 'detail'} 
              onClick={() => { onChangeView('linodes'); setIsMobileMenuOpen(false); }} 
            />
            <NavItem 
              icon={<HardDrive size={20} />} 
              label="Volumes" 
              isActive={false} 
              onClick={() => {}} 
            />
            <NavItem 
              icon={<Globe size={20} />} 
              label="Domains" 
              isActive={false} 
              onClick={() => {}} 
            />
            <div className="pt-6 pb-2">
              <div className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</div>
            </div>
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              isActive={false} 
              onClick={() => {}} 
            />
          </nav>
          
          <div className="px-4 pb-4">
             <div className="bg-gray-100 rounded p-3 text-xs text-gray-500">
                <p>v1.4.0</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-20">
          <div className="flex items-center justify-between h-16 px-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 flex justify-center lg:justify-start lg:ml-4">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for Linodes, Domains, Tags..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-4">
              <button className="text-gray-400 hover:text-gray-600">
                <HelpCircle size={20} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium text-sm cursor-pointer">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
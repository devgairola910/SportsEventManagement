"use client";
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { User, LogOut, Code } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Code className="text-indigo-400" size={28} />
            <Link href="/" className="font-bold text-2xl tracking-tight text-white hover:text-indigo-200 transition-colors">
              SportsHub
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-indigo-300 transition-colors font-medium">Events</Link>
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-indigo-700 pl-4">
                <Link 
                  href={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
                >
                  <User size={18} />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 border-l border-indigo-700 pl-4">
                <Link href="/login" className="px-4 py-2 rounded-lg font-medium hover:bg-indigo-800 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg font-semibold shadow-md transition-all transform hover:scale-105">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

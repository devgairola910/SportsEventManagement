"use client";
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Simulating picking a role. In a real app, 'admin' registration might be locked down.
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(name, email, password, role);
    } catch (err) {
      setError(err.message || 'Failed to register');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <h2 className="mt-2 text-center text-4xl font-extrabold text-indigo-900 drop-shadow-sm">Create Account</h2>
          <p className="mt-4 text-center text-sm text-slate-600 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-semibold border border-red-200">{error}</div>}
          
          <div className="rounded-md shadow-sm gap-4 flex flex-col">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Full Name</label>
              <input 
                type="text" required 
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 transition-all" 
                placeholder="John Doe"
                value={name} onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Email address</label>
              <input 
                type="email" required 
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 transition-all" 
                placeholder="you@university.edu"
                value={email} onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Password</label>
              <input 
                type="password" required 
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 transition-all" 
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div>
               <label htmlFor="role" className="text-sm font-bold text-slate-700 block mb-2">I am registering as an</label>
               <select 
                  id="role"
                  name="role"
                  className="rounded-xl relative block w-full px-4 py-3 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-50 transition-all cursor-pointer"
                  value={role} onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Athlete / Student</option>
                  <option value="admin">Administrator (Demo)</option>
               </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Ticket, Calendar as CalendarIcon, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10 text-white">
          <h2 className="text-xl font-bold tracking-tight text-white/90">Admin Console</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors font-medium">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors font-medium">
            <CalendarIcon size={20} /> Manage Events
          </Link>
          <Link href="/admin/registrations" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors font-medium">
            <Ticket size={20} /> Registrations
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
           <button 
             onClick={logout}
             className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl transition-colors font-medium"
           >
             <LogOut size={18} /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
           {children}
        </div>
      </main>
    </div>
  );
}

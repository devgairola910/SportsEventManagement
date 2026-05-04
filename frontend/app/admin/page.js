"use client";
import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Trophy, CalendarDays, TicketCheck, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, registrations: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [events, regs] = await Promise.all([
          fetchAPI('/events'),
          fetchAPI('/registrations/admin/all')
        ]);
        
        const pendingCount = regs.filter(r => r.status === 'pending').length;
        
        setStats({
          events: events.length,
          registrations: regs.length,
          pending: pendingCount
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="animate-pulse flex items-center gap-3 text-indigo-600 font-bold"><div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> Loading Overview...</div>;

  return (
    <div>
      <div className="mb-10 text-slate-800">
         <h1 className="text-3xl font-extrabold tracking-tight mb-2">Systems Overview</h1>
         <p className="text-slate-500 font-medium">Get a quick glimpse of what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Events" value={stats.events} sub="Active tournaments" icon={CalendarDays} color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard title="Total Registrations" value={stats.registrations} sub="All time athlete signs" icon={TicketCheck} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="Action Required" value={stats.pending} sub="Pending approvals" icon={Trophy} color="text-amber-600" bg="bg-amber-50" />
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
         <div className="flex items-start gap-4 mb-4 text-indigo-600">
           <Rocket size={32} />
           <div>
              <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
              <p className="text-slate-500 text-sm">Jump straight into management tasks.</p>
           </div>
         </div>
         <div className="flex gap-4 mt-8">
            <Link href="/admin/events" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg">Manage Events</Link>
            <Link href="/admin/registrations" className="bg-white border text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-sm">Review Pending ({stats.pending})</Link>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
       <div className={`p-4 rounded-2xl ${bg} ${color}`}>
         <Icon size={32} />
       </div>
       <div>
         <h3 className="text-slate-500 font-bold text-sm tracking-widest uppercase mb-1">{title}</h3>
         <div className="text-4xl font-extrabold text-slate-800">{value}</div>
         <p className="text-xs text-slate-400 font-medium mt-1">{sub}</p>
       </div>
    </div>
  );
}

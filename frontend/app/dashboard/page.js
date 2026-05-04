"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { fetchAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Ticket, Calendar, Clock, MapPin } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (user) {
         try {
           const data = await fetchAPI('/registrations/my');
           setMyRegistrations(data);
         } catch (error) {
           console.error("Failed fetching registrations", error);
         } finally {
           setFetching(false);
         }
      }
    }
    fetchRegistrations();
  }, [user]);

  if (loading || fetching) return <div className="text-center py-20 text-indigo-600 font-bold text-xl animate-pulse">Loading Dashboard...</div>;
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome back, {user.name}!</h1>
            <p className="text-indigo-200 text-lg">Ready for your upcoming athletic challenges?</p>
          </div>
          <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 text-center">
            <span className="block text-4xl font-black drop-shadow-md">{myRegistrations.length}</span>
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-200">Events Joined</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 text-slate-800 border-b border-slate-100 pb-4">
          <Ticket className="text-indigo-600" /> My Event Registrations
        </h2>

        {myRegistrations.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Ticket className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium text-lg">You haven't registered for any events yet.</p>
            <button onClick={() => router.push('/')} className="mt-6 font-bold text-indigo-600 hover:text-indigo-800">Browse Events</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRegistrations.map((reg) => (
              <div key={reg._id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors shadow-sm relative shadow-slate-200/50 hover:-translate-y-1 transform duration-200">
                <span className={`absolute top-4 right-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    reg.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                    reg.status === 'rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                    'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                  {reg.status}
                </span>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 w-[75%] truncate">{reg.event.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                     <Calendar size={16} className="text-indigo-400" />
                     {new Date(reg.event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                     <MapPin size={16} className="text-indigo-400" />
                     {reg.event.venue}
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Registered on: {new Date(reg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

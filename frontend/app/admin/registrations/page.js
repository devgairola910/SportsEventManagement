"use client";
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { TicketCheck, Check, X, ShieldAlert } from 'lucide-react';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const data = await fetchAPI('/registrations/admin/all');
      setRegistrations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetchAPI(`/registrations/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      // Updating UI optimistically
      setRegistrations(registrations.map(reg => reg._id === id ? { ...reg, status } : reg));
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  if (loading) return <div className="animate-pulse flex gap-2 items-center"><ShieldAlert className="animate-spin text-indigo-600" /> Fetching secure data...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
         <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 flex items-center gap-3">
           <TicketCheck className="text-indigo-600" size={32} /> Registration Manager
         </h1>
         <p className="text-slate-500 font-medium mt-2">Approve or reject athlete sign-ups.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500">
                <th className="p-6">Athlete Name</th>
                <th className="p-6">Event</th>
                <th className="p-6">Applied Date</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-slate-800">{reg.user?.name || 'Unknown'}</div>
                    <div className="text-xs text-slate-500 font-medium">{reg.user?.email || 'N/A'}</div>
                  </td>
                  <td className="p-6 font-semibold text-indigo-900 border-l border-r border-slate-50 bg-slate-50/50">
                    {reg.event?.name || 'Deleted Event'}
                  </td>
                  <td className="p-6 text-slate-500 text-sm font-medium">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      reg.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      reg.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-6 flex gap-2 justify-center">
                    {reg.status === 'pending' && (
                       <>
                         <button 
                           onClick={() => updateStatus(reg._id, 'approved')} 
                           className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-600 text-white p-2 rounded-xl transition-transform hover:scale-110 shadow-sm"
                           title="Approve"
                         ><Check size={18} /></button>
                         <button 
                           onClick={() => updateStatus(reg._id, 'rejected')} 
                           className="bg-red-500 hover:bg-red-600 border border-red-600 text-white p-2 rounded-xl transition-transform hover:scale-110 shadow-sm"
                           title="Reject"
                         ><X size={18} /></button>
                       </>
                    )}
                    {reg.status !== 'pending' && (
                       <span className="text-slate-400 text-sm font-bold italic">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr><td colSpan="5" className="p-10 text-center text-slate-500">No registrations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

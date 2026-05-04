"use client";
import { useEffect, useState, use } from 'react';
import { fetchAPI } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Calendar, MapPin, Users, Ticket, CheckCircle, Clock } from 'lucide-react';

export default function EventDetail({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchAPI(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      setRegistrationMessage({ type: 'error', text: 'You must be logged in to register.' });
      return;
    }
    
    setIsRegistering(true);
    setRegistrationMessage(null);
    try {
      await fetchAPI(`/registrations/${id}`, { method: 'POST' });
      setRegistrationMessage({ type: 'success', text: 'Successfully registered for this event! Your application is pending approval.' });
    } catch (err) {
      setRegistrationMessage({ type: 'error', text: err.message || 'Failed to register' });
    } finally {
      setIsRegistering(false);
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse text-indigo-600 font-bold">Loading Event Details...</div>;
  if (error) return <div className="text-center py-20 text-red-600 font-bold bg-red-50">{error}</div>;
  if (!event) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="h-64 sm:h-96 bg-slate-900 relative">
          {event.imageUrl ? (
            <img 
              src={event.imageUrl} 
              alt={event.name} 
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-indigo-700 via-purple-700 to-indigo-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 flex flex-col justify-end h-full">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/30 table mb-4">
               {event.category}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg tracking-tight mb-2">
              {event.name}
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-2 p-8 sm:p-12 lg:border-r border-slate-100 bg-white">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-6 flex items-center gap-2">
              About the Event
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
          
          <div className="lg:col-span-1 p-8 sm:p-12 bg-slate-50 flex flex-col justify-between">
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><Calendar className="text-indigo-600" size={24} /></div>
                <div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Date & Time</p>
                   <p className="font-semibold text-slate-800 text-lg">{new Date(event.date).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><MapPin className="text-indigo-600" size={24} /></div>
                 <div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Location</p>
                   <p className="font-semibold text-slate-800 text-lg">{event.venue}</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><Users className="text-indigo-600" size={24} /></div>
                 <div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Capacity</p>
                   <p className="font-semibold text-slate-800 text-lg">{event.maxParticipants} max attendees</p>
                 </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {registrationMessage && (
                <div className={`p-4 rounded-xl text-sm font-semibold border flex gap-2 items-start ${registrationMessage.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                   {registrationMessage.type === 'success' ? <CheckCircle size={20} className="shrink-0 text-emerald-600"/> : null}
                   <span>{registrationMessage.text}</span>
                </div>
              )}
              
              <button
                onClick={handleRegister}
                disabled={isRegistering || new Date(event.date) < new Date()}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 border border-transparent font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 disabled:bg-slate-400 disabled:shadow-none"
              >
                 <Ticket size={20} />
                 {isRegistering ? 'Processing...' : (new Date(event.date) < new Date() ? 'Event Ended' : 'Register Now (Free)')}
              </button>
              {!user && (
                 <p className="text-center text-xs text-slate-400 font-medium">You must be logged in to register. Admin users cannot register for events.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

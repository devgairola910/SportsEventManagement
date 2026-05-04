"use client";
import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import EventCard from '@/components/EventCard';
import { Trophy, CalendarDays, Users, Search, Filter } from 'lucide-react';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Football', 'Basketball', 'Cricket', 'Athletics', 'Indoor'];

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (category !== 'All') query.append('category', category);
        
        const data = await fetchAPI(`/events?${query.toString()}`);
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events', err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(getEvents, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [search, category]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Campus Sports</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-indigo-200 font-medium">
            The ultimate platform to discover, register, and compete in the most thrilling sports events of the year.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <Trophy className="text-cyan-400 mb-2" size={32} />
              <span className="font-bold text-2xl">{events.length}</span>
              <span className="text-indigo-200 text-sm">Active Events</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <Users className="text-emerald-400 mb-2" size={32} />
              <span className="font-bold text-2xl">5k+</span>
              <span className="text-indigo-200 text-sm">Athletes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Upcoming Events</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              <Filter className="text-slate-400 shrink-0" size={18} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    category === cat 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Trophy className="mx-auto text-slate-300 mb-4" size={64} />
            <p className="text-slate-500 text-lg font-medium">No matches found for your criteria.</p>
            <button onClick={() => {setSearch(''); setCategory('All');}} className="mt-4 text-indigo-600 font-bold hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

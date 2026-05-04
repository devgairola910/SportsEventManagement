import Link from 'next/link';

export default function EventCard({ event }) {
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-100 flex flex-col relative group">
      <div className="h-48 relative group overflow-hidden">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600" />
        )}
        <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
          {event.category}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
           <h3 className="text-2xl font-bold text-white drop-shadow-md truncate">{event.name}</h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-500 font-medium">Date</span>
            <span className="font-semibold text-slate-900">
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
            <span className="text-slate-500 font-medium">Venue</span>
            <span className="font-semibold text-slate-900 truncate max-w-[150px]">{event.venue}</span>
          </div>
        </div>
        
        <Link 
          href={`/events/${event._id}`}
          className={`block text-center py-3 rounded-xl font-bold transition-all ${
            isUpcoming 
              ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white ring-1 ring-indigo-200 hover:ring-indigo-600' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed hidden'
          }`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

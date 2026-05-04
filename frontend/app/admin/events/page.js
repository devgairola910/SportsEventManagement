"use client";
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { Plus, Edit2, Trash2, CalendarDays, Image as ImageIcon } from 'lucide-react';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', date: '', venue: '', maxParticipants: '', category: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchAPI('/events');
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetchAPI(`/events/${editId}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await fetchAPI('/events', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      setFormData({ name: '', description: '', date: '', venue: '', maxParticipants: '', category: '', imageUrl: '' });
      setIsEditing(false);
      setEditId(null);
      loadEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (event) => {
    const d = new Date(event.date);
    const dateStr = d.toISOString().split('T')[0];
    setFormData({ ...event, date: dateStr });
    setIsEditing(true);
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await fetchAPI(`/events/${id}`, { method: 'DELETE' });
        loadEvents();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="animate-pulse">Loading Events...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 border-b pb-4 text-slate-800">
          <CalendarDays className="text-indigo-600" /> {isEditing ? 'Edit Event' : 'Create New Event'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Event Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea name="description" required rows="3" value={formData.description} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> Image URL (Optional)
            </label>
            <input type="url" name="imageUrl" placeholder="https://example.com/image.jpg" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
             <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Venue</label>
            <input type="text" name="venue" required value={formData.venue} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Max Participants</label>
            <input type="number" name="maxParticipants" required value={formData.maxParticipants} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Category (e.g. Football)</label>
            <input type="text" name="category" required value={formData.category} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2 pt-4">
            <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-indigo-600 transition-all shadow-md">
              <Plus size={20} /> {isEditing ? 'Update Event' : 'Create Event'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setFormData({ name: '', description: '', date: '', venue: '', maxParticipants: '', category: '', imageUrl: '' }) }} className="w-full mt-3 text-slate-500 font-medium hover:text-slate-800">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <h2 className="text-xl font-bold p-6 border-b border-slate-100 bg-slate-50 text-slate-800">Existing Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4">Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Category</th>
                <th className="p-4">Capacity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-slate-800">{event.name}</td>
                  <td className="p-4 text-slate-600">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-4"><span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold border border-indigo-100">{event.category}</span></td>
                  <td className="p-4 text-slate-600">{event.maxParticipants}</td>
                  <td className="p-4 flex gap-3 justify-end">
                    <button onClick={() => handleEdit(event)} className="text-amber-600 hover:text-amber-800 bg-amber-50 p-2 rounded-lg" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-lg" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-slate-400">No events found. Create one above!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

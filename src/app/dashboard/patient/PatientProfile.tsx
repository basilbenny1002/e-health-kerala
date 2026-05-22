'use client';

import { useState } from 'react';
import { User as UserIcon, Phone, MapPin, Droplet, Edit2, Check, X } from 'lucide-react';

export default function PatientProfile({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: user.bloodGroup || '',
    phone: user.phone || '',
    address: user.address || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsEditing(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-blue-600" /> 
          Personal Details
        </h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="p-1 text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-red-500" /> Blood Group
            </label>
            {isEditing ? (
              <select 
                value={formData.bloodGroup}
                onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              >
                <option value="">Select</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            ) : (
              <p className="font-medium text-slate-900">
                {formData.bloodGroup || <span className="text-slate-400 italic">Not specified</span>}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> Phone Number
            </label>
            {isEditing ? (
              <input 
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+91..."
                className="mt-1 block w-full px-3 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              />
            ) : (
              <p className="font-medium text-slate-900">
                {formData.phone || <span className="text-slate-400 italic">Not specified</span>}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1 sm:col-span-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Address
            </label>
            {isEditing ? (
              <textarea 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                rows={2}
                placeholder="Enter full address..."
                className="mt-1 block w-full px-3 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              />
            ) : (
              <p className="font-medium text-slate-900">
                {formData.address || <span className="text-slate-400 italic">Not specified</span>}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

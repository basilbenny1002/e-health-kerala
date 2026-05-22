'use client';

import { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
// FIXED: Adjusted import path to match your new src/app/context structure
import { useLanguage } from '../context/LanguageContext';

type Place = {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
};

export default function NearbyHospitals() {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const { t } = useLanguage();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`/api/places?location=${encodeURIComponent(location)}`);
      const data = await res.json();

      if (res.ok) {
        setHospitals(data.results || []);
      } else {
        setError(data.error || 'Failed to find hospitals.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t('nearbyTitle')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('nearbyDesc')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <div className="pl-4 text-slate-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? t('searching') : (
                <>
                  <Search className="w-4 h-4" />
                  {t('searchBtn')}
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="text-center text-rose-600 mb-8 p-4 bg-rose-50 rounded-xl max-w-2xl mx-auto font-medium">
            {error}
          </div>
        )}

        {!loading && searched && hospitals.length === 0 && !error && (
          <div className="text-center text-slate-500 py-12">
            {t('noHospitals')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div key={hospital.place_id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-150 hover:shadow-md transition flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight">{hospital.name}</h3>
                <p className="text-sm text-slate-500 mb-4 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                  {hospital.formatted_address}
                </p>
              </div>

              {hospital.rating && (
                <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-slate-100">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-800 text-sm">{hospital.rating}</span>
                  <span className="text-xs text-slate-400">({hospital.user_ratings_total} reviews)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
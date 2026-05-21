import Link from 'next/link';
import { Activity, Globe, ArrowRight } from 'lucide-react';
// FIXED: Changed from absolute alias to a direct relative path mapping
import NearbyHospitals from './components/NearbyHospitals';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-lg text-white">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">CarePulse</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/auth?role=HOSPITAL" className="text-sm font-semibold text-slate-500 hover:text-slate-900 tracking-wide transition-colors">
            FACILITY NETWORK
          </Link>
          <Link href="/auth?role=PATIENT" className="text-sm font-semibold text-slate-500 hover:text-slate-900 tracking-wide transition-colors">
            CITIZEN LOGIN
          </Link>
          <Link href="/auth?role=DOCTOR" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
            PRACTITIONER CONSOLE
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 text-slate-600 text-xs font-bold tracking-widest mb-10 shadow-sm">
          <Globe className="w-3.5 h-3.5" />
          UNIFIED CLINICAL INTERFACE
        </div>

        {/* Headlines */}
        <h1 className="text-center text-6xl md:text-8xl font-extrabold tracking-tight leading-tight mb-8">
          <span className="block text-slate-900">Professional Care.</span>
          <span className="block text-emerald-700">Digitally orchestrated.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
          CarePulse is the secure clinical gateway for citizens and practitioners.
          Access health records, manage hospital consultations, and enter
          encrypted virtual terminals.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/auth?role=PATIENT" className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all shadow-md">
            CITIZEN ENROLLMENT
          </Link>
          <Link href="/auth?role=HOSPITAL" className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            FIND FACILITY <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Nearby Hospitals API Integration */}
      <NearbyHospitals />
    </div>
  );
}
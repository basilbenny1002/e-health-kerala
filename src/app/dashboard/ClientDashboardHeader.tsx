'use client';

// FIXED: Adjusted import path to match your relative src/app/context structure
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

export default function ClientDashboardHeader({
  user,
  logoutAction
}: {
  user: any,
  logoutAction: () => void
}) {
  // FIXED: Aligned context properties to match your LanguageContext schema ('lang' and 'toggleLang')
  const { t, lang: language, toggleLang: toggleLanguage } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-slate-900">{t('portalTitle')}</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {user.role}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Languages className="w-4 h-4 mr-1.5" />
            {language === 'en' ? 'മലയാളം' : 'English'}
          </button>

          <span className="text-sm font-medium text-slate-700 hidden sm:block">
            {user.name || user.email}
          </span>

          <form action={logoutAction}>
            <button type="submit" className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors">
              {t('logout')}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
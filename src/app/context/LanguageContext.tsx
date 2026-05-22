'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ml';

export const translations = {
  en: {
    // Landing Page
    title: "Professional Care.",
    subtitle: "Digitally orchestrated.",
    description: "CarePulse is the secure clinical gateway for citizens and practitioners. Access health records, manage hospital consultations, and enter encrypted virtual terminals.",
    citizenLogin: "CITIZEN LOGIN",
    practitionerConsole: "PRACTITIONER CONSOLE",
    facilityNetwork: "FACILITY NETWORK",
    citizenEnrollment: "CITIZEN ENROLLMENT",
    findFacility: "FIND FACILITY",
    unifiedInterface: "UNIFIED CLINICAL INTERFACE",
    nearbyTitle: "Find Facilities Near You",
    nearbyDesc: "Discover highly-rated hospitals and clinics in your area powered by Google Maps.",
    searchPlaceholder: "Enter your city or area (e.g. Kochi, Ernakulam)",
    searchBtn: "Search",
    searching: "Searching...",
    noHospitals: "No hospitals found in this area. Try a different location.",
    
    // Auth Page
    backToHome: "Back to Home",
    login: "Login",
    register: "Register",
    portal: "Portal",
    signInAccess: "Sign in to access your account",
    registerJoin: "Register to join CarePulse",
    fullName: "Full Name / Hospital Name",
    enterName: "Enter your name",
    specialization: "Specialization",
    assocHospital: "Associated Hospital (Optional)",
    indPractice: "Independent Practice",
    emailAddr: "Email address",
    sendOtp: "Send OTP to Email",
    sendingOtp: "Sending OTP...",
    verifyCodeTitle: "Verification Code",
    verifyBtn: "Verify & Continue",
    verifying: "Verifying...",
    backToEmail: "Back to Email",

    // Dashboard
    logout: "Logout",
    portalTitle: "CarePulse Portal"
  },
  ml: {
    // Landing Page
    title: "മികച്ച പരിചരണം.",
    subtitle: "ഡിജിറ്റലായി ക്രമീകരിച്ചിരിക്കുന്നു.",
    description: "പൗരന്മാർക്കും ഡോക്ടർമാർക്കുമുള്ള സുരക്ഷിതമായ ക്ലിനിക്കൽ ഗേറ്റ്‌വേയാണ് കെയർപൾസ്. ആരോഗ്യ രേഖകൾ ആക്‌സസ് ചെയ്യുക, ആശുപത്രി കൺസൾട്ടേഷനുകൾ നിയന്ത്രിക്കുക.",
    citizenLogin: "സിറ്റിസൺ ലോഗിൻ",
    practitionerConsole: "പ്രാക്ടീഷണർ കൺസോൾ",
    facilityNetwork: "ആശുപത്രി നെറ്റ്‌വർക്ക്",
    citizenEnrollment: "സിറ്റിസൺ എൻറോൾമെൻ്റ്",
    findFacility: "ആശുപത്രി കണ്ടെത്തുക",
    unifiedInterface: "ഏകീകൃത ക്ലിനിക്കൽ ഇൻ്റർഫേസ്",
    nearbyTitle: "നിങ്ങളുടെ അടുത്തുള്ള ആശുപത്രികൾ കണ്ടെത്തുക",
    nearbyDesc: "ഗൂഗിൾ മാപ്‌സിന്റെ സഹായത്തോടെ നിങ്ങളുടെ പ്രദേശത്തെ മികച്ച ആശുപത്രികൾ കണ്ടെത്തുക.",
    searchPlaceholder: "നിങ്ങളുടെ നഗരം അല്ലെങ്കിൽ സ്ഥലം നൽകുക (ഉദാഹരണത്തിന്: കൊച്ചി)",
    searchBtn: "തിരയുക",
    searching: "തിരയുന്നു...",
    noHospitals: "ഈ പ്രദേശത്ത് ആശുപത്രികൾ കണ്ടെത്തിയില്ല. മറ്റൊരു സ്ഥലം ശ്രമിക്കുക.",

    // Auth Page
    backToHome: "ഹോമിലേക്ക് മടങ്ങുക",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    portal: "പോർട്ടൽ",
    signInAccess: "നിങ്ങളുടെ അക്കൗണ്ട് ആക്സസ് ചെയ്യാൻ ലോഗിൻ ചെയ്യുക",
    registerJoin: "കെയർപൾസിൽ ചേരാൻ രജിസ്റ്റർ ചെയ്യുക",
    fullName: "പൂർണ്ണ നാമം / ആശുപത്രിയുടെ പേര്",
    enterName: "നിങ്ങളുടെ പേര് നൽകുക",
    specialization: "സ്പെഷ്യലൈസേഷൻ",
    assocHospital: "ബന്ധപ്പെട്ട ആശുപത്രി (ഓപ്ഷണൽ)",
    indPractice: "സ്വതന്ത്ര പ്രാക്ടീസ്",
    emailAddr: "ഇമെയിൽ വിലാസം",
    sendOtp: "ഇമെയിലിലേക്ക് OTP അയയ്ക്കുക",
    sendingOtp: "OTP അയയ്ക്കുന്നു...",
    verifyCodeTitle: "പരിശോധന കോഡ് (OTP)",
    verifyBtn: "പരിശോധിച്ചു തുടരുക",
    verifying: "പരിശോധിക്കുന്നു...",
    backToEmail: "ഇമെയിലിലേക്ക് മടങ്ങുക",

    // Dashboard
    logout: "ലോഗൗട്ട്",
    portalTitle: "കെയർപൾസ് പോർട്ടൽ"
  }
};

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('carepulse_lang') as Language;
    if (saved === 'en' || saved === 'ml') {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === 'en' ? 'ml' : 'en';
      localStorage.setItem('carepulse_lang', newLang);
      return newLang;
    });
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key];
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

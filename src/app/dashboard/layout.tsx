import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Chatbot from '../components/Chatbot';
import ClientDashboardHeader from './ClientDashboardHeader';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/auth');
  }

  const logoutAction = async () => {
    'use server';
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set('session', '', { expires: new Date(0) });
    redirect('/auth');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ClientDashboardHeader user={session.user} logoutAction={logoutAction} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
        {session?.user.role === 'PATIENT' && <Chatbot />}
      </main>
    </div>
  );
}
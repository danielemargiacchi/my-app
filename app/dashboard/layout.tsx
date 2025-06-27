import { Metadata } from "next";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: 'Dashboard | ProjectTaskManager',
  description: 'The best app to manage your projects and tasks.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>
      <div className="grow p-4 md:overflow-y-auto md:p-8">{children}</div>
    </div>
  );
}
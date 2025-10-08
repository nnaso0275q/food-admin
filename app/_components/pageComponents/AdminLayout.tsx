import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-secondary p-6 overflow-auto">
        <img className="justify-self-end" src="/Avatar.svg" />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

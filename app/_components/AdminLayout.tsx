import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-primary-foreground p-6 overflow-auto">
        <div className="mt-6 ml-6 mb-10">
          <img className="ml-262" src="/Avatar.svg"></img>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

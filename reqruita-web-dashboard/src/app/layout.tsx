import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reqruita Dashboard",
  description: "Recruitment Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex h-screen overflow-hidden">
        {/* Sidebar would go here */}
        <aside className="w-64 bg-[#5D20B3] text-white hidden md:flex flex-col p-6">
          <div className="text-2xl font-bold mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#5D20B3]">
              R
            </div>
            Reqruita
          </div>
          <nav className="space-y-4">
            {[
              "Home",
              "Job Forms",
              "User & Roles",
              "Sessions",
              "Live Monitor",
              "Candidates",
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Nav */}
          <header className="h-16 bg-white border-b flex items-center justify-between px-8">
            <div className="w-96">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-100 border-none rounded-full px-4 py-2 outline-none focus:ring-2 ring-purple-500"
              />
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">
              B
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

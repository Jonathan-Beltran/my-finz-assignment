import { useState } from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* sidebar */}
      <Sidebar />
      
      {/* main section */}
      <main className="flex-1 flex">
        {/* margin report */}
        <div className="flex-1 p-6">
          <WeeklyMarginReport />
        </div>
        
        {/* ai chat */}
        <div className="w-80 bg-white border-l">
          <ChatPanel />
        </div>
      </main>
    </div>
  );
}

// sidebar component
  function Sidebar() {
    const navItems = [
      { name: 'Home', icon: '⌂', active: false },
      { name: 'Cashflow', icon: '∿', active: false },
      { name: 'Margin', icon: '☑', active: true },
      { name: 'Capital', icon: '$', active: false },
      { name: 'Documents', icon: '▭', active: false },
      { name: 'Perks', icon: '✠', active: false },
      { name: 'History', icon: '⏲', active: false },
    ];

    return (
      <aside className="w-64 bg-[#1F2937] text-white flex flex-col h-screen">
        {/* logo */}
        <div className="px-8 py-6">
          <h1 
            className="font-inter font-medium text-white"
            style={{ fontSize: 24, color: '#FFFFFF' }}
          >
            FINZ
          </h1>
        </div>
        
        {/* navigation items*/}
        <nav className="flex-1 px-4 mt-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center mb-2 ${
                item.active 
                  ? 'bg-[#374150] text-[#828FF5]' 
                  : 'text-gray-300 hover:bg-slate-700'
              }`}
              style={{
                height: 44,
                paddingLeft: 24,
                paddingRight: 24
              }}
            >
              <span style={{ marginRight: 12, fontSize: 16 }}>{item.icon}</span>
              <span 
                className="font-inter"
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: '100%'
                }}
              >
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        {/* buttons */}
        <div className="px-4 pb-4">
          <a 
            href="#" 
            className="flex items-center text-gray-300 hover:bg-slate-700 mb-2"
            style={{
              height: 44,
              paddingLeft: 24,
              paddingRight: 24
            }}
          >
            <span style={{ marginRight: 12, fontSize: 16 }}>⚙</span>
            <span className="font-inter" style={{ fontWeight: 500, fontSize: 16 }}>Settings</span>
          </a>
          <a 
            href="#" 
            className="flex items-center text-gray-300 hover:bg-slate-700"
            style={{
              height: 44,
              paddingLeft: 24,
              paddingRight: 24
            }}
          >
            <span style={{ marginRight: 12, fontSize: 16 }}>⎋</span>
            <span className="font-inter" style={{ fontWeight: 500, fontSize: 16 }}>Logout</span>
          </a>
        </div>
      </aside>
    );
}

// margin report component
function WeeklyMarginReport() {


}

// ai chat component
function ChatPanel() {
  return (
    <div className="h-full flex flex-col">
      {/* close button */}
      <div className="p-4 border-b flex justify-end">
        <button className="text-gray-500 hover:text-gray-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="flex-1 p-4">
        {/* chat messages */}
      </div>
      
      {/* input and enter button */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="p-2 bg-[#9CA3AE] text-white rounded-full hover:bg-blue-700 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
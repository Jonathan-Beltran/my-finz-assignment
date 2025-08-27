import { useState } from "react";
import { parseCommand } from "./services/aiService";
import { updateSheet } from "./services/sheetService";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from './firebase';

export default function Dashboard() {
  return (
    <div className="h-screen bg-gray-50 flex">
      {/* sidebar */}
      <Sidebar />
      
      {/* main section */}
      <main className="flex-1 flex h-full">
        {/* margin report */}
        <div className="flex-1">
          <WeeklyMarginReport />
        </div>
        
        {/* ai chat */}
        <div className="w-80 bg-white border-l h-full">
          <ChatPanel />
        </div>
      </main>
    </div>
  );
}

// sidebar component
  function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/userlogin');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    
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
          {navItems.map((item, index) => (
            <a
              key={index}
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
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-300 hover:bg-slate-700"
            style={{
              height: 44,
              paddingLeft: 24,
              paddingRight: 24
            }}
          >
            <span style={{ marginRight: 12, fontSize: 16 }}>⎋</span>
            <span className="font-inter" style={{ fontWeight: 500, fontSize: 16 }}>Logout</span>
          </button>
        </div>
      </aside>
    );
}

// margin report component
function WeeklyMarginReport() {
  

  return (
    <div className="h-full">
      <iframe
        src="https://docs.google.com/spreadsheets/d/1jAs3P-ciVXbBOhjfZ7ca7bGp-kFhhLn0bCyOkOW41J4/edit?usp=sharing&rm=minimal"
        width="100%"
        height="100%"
        frameBorder="0"
        className="w-full h-full"
        title="Weekly Margin Report"
      />
    </div>
  );
}

type Message = {
  type: 'user' | 'ai';
  content: string;
};

// ai chat component
function ChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { type: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const updateCommand = await parseCommand(message);
      if (updateCommand){
        const result = await updateSheet(updateCommand.cell, updateCommand.value);
        if (result.success){
          const aiResponse: Message = {
          type: 'ai',
            content: `${updateCommand.description}. Report has been updated!`
          };
          setMessages(prev => [...prev, aiResponse]);
        } else {
          const aiResponse: Message = {
            type: 'ai',
            content: `Failed to update the report. ${result.message}`
          };
          setMessages(prev => [...prev, aiResponse]);
        }

      } else{
        const aiResponse: Message = {
          type: 'ai',
          content: 'I can help with updating your report. Try telling me the metric you would like to change, and the value to change it to.'
        }
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleMessageEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };
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
      
      <div className="flex-1 p-4 overflow-y-auto min-h-0">
        {/* chat messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-xs ${
              msg.type === 'user' 
              ? 'bg-[#F3F4F6] text-black' 
              : 'bg-white text-black'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
              Thinking...
            </div>
          </div>
        )}
      </div>
      
      {/* input and enter button */}
      <div className="p-4 border-t flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleMessageEnter}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="p-2 bg-[#9CA3AE] text-white rounded-full hover:bg-blue-700 flex items-center justify-center">
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
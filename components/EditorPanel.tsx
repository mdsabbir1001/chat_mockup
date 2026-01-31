
import React, { useState, useEffect } from 'react';
import { UserProfile, Message, Sender } from '../types';

interface EditorPanelProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  messages: Message[];
  onAddMessage: (sender: Sender, text: string, timestamp?: string) => void;
  onRemoveMessage: (id: string) => void;
  onDownload: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  profile,
  setProfile,
  messages,
  onAddMessage,
  onRemoveMessage,
  onDownload,
}) => {
  const [newMsgText, setNewMsgText] = useState('');
  const [newMsgSender, setNewMsgSender] = useState<Sender>('me');
  const [newTimeMarker, setNewTimeMarker] = useState('');

  useEffect(() => {
    setNewTimeMarker(new Date().toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase());
  }, []);

  const handleAddNormal = () => {
    if (!newMsgText.trim()) return;
    onAddMessage(newMsgSender, newMsgText);
    setNewMsgText('');
  };

  const handleAddTime = () => {
    if (!newTimeMarker.trim()) return;
    onAddMessage('system', newTimeMarker);
  };

  return (
    <div className="p-6 space-y-8 pb-20 bg-white">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Messenger Builder</h2>
        <p className="text-sm text-slate-500">Design your custom chat mockup</p>
      </div>

      <button
        onClick={onDownload}
        className="w-full bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Screenshot
      </button>

      {/* User Profile Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">User Profile</h3>
        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
            <input 
              type="text" 
              value={profile.name} 
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#0084FF] outline-none bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Subtitle / Status</label>
            <input 
              type="text" 
              value={profile.status} 
              onChange={(e) => setProfile({ ...profile, status: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#0084FF] outline-none bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Avatar Image URL</label>
            <input 
              type="text" 
              value={profile.avatar} 
              onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#0084FF] outline-none bg-white"
            />
          </div>
        </div>
      </div>

      {/* Ad Context Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ad Banner (Context)</h3>
        <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Ad Banner Text</label>
            <input 
              type="text" 
              value={profile.adTitle} 
              onChange={(e) => setProfile({ ...profile, adTitle: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#0084FF] outline-none bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Ad Image URL</label>
            <input 
              type="text" 
              value={profile.adImage} 
              onChange={(e) => setProfile({ ...profile, adImage: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-[#0084FF] outline-none bg-white"
            />
          </div>
        </div>
      </div>

      {/* Time Divider Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Add Time Divider</h3>
        <div className="flex gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <input 
            type="text"
            value={newTimeMarker}
            onChange={(e) => setNewTimeMarker(e.target.value)}
            placeholder="SUN 7:44 PM"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none bg-white focus:ring-1 focus:ring-[#0084FF]"
          />
          <button 
            onClick={handleAddTime}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black"
          >
            Add
          </button>
        </div>
      </div>

      {/* Conversation Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Conversation</h3>
        
        <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
          <div className="flex gap-2 p-1 bg-white rounded-lg border border-slate-300">
            {(['me', 'other'] as Sender[]).map(s => (
              <button 
                key={s}
                onClick={() => setNewMsgSender(s)}
                className={`flex-1 text-xs py-1.5 rounded-md font-bold capitalize transition-all ${newMsgSender === s ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <textarea 
            value={newMsgText}
            onChange={(e) => setNewMsgText(e.target.value)}
            placeholder="Type message..."
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 h-24 resize-none outline-none focus:ring-1 focus:ring-slate-400 bg-white"
          />
          <button 
            onClick={handleAddNormal}
            className="w-full bg-slate-800 text-white text-xs font-bold py-2 rounded-lg hover:bg-black transition-all"
          >
            Send Message
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start justify-between bg-white border border-slate-200 p-2 rounded-lg group shadow-sm">
              <div className="flex flex-col min-w-0 flex-1">
                <span className={`text-[10px] font-bold uppercase ${m.sender === 'me' ? 'text-blue-500' : m.sender === 'system' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {m.sender === 'system' ? 'Time Divider' : m.sender}
                </span>
                <p className="text-xs text-slate-800 truncate">{m.text}</p>
              </div>
              <button 
                onClick={() => onRemoveMessage(m.id)}
                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

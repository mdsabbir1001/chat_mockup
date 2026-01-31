
import React, { useState, useRef, useCallback } from 'react';
import { ChatMockup } from './components/ChatMockup';
import { EditorPanel } from './components/EditorPanel';
import { Message, UserProfile, Sender } from './types';
import * as htmlToImage from 'html-to-image';

const INITIAL_MESSAGES: Message[] = [
  { id: '1', sender: 'me', text: '2 days er moddhe', timestamp: '7:44 PM' },
  { id: '2', sender: 'system', text: 'You marked the order as paid.' },
  { id: '3', sender: 'system', text: 'You marked the order as shipped.' },
  { id: '4', sender: 'system', text: '7:44 PM' },
  { id: '5', sender: 'other', text: 'Vai apnader product gula shei', timestamp: '7:45 PM' },
  { id: '6', sender: 'me', text: 'আসসালামু আলাইকুম। আপনার আগ্রহের জন্যে ধন্যবাদ। অল্প কিছুক্ষণের মধ্যেই আমাদের টিম মেম্বার আপনার সাথে যোগাযোগ করবে।\n\nযেকোন প্রয়োজনে কল করুন : +8801521317938\nআমাদের শপ লোকেশন: ট-৯১,বৈশাখী সরণি, গুলশান-', isAutomated: true, timestamp: '7:45 PM' },
  { id: '7', sender: 'other', text: 'Eto kom dame eto premium quality pabo asha kori nai', timestamp: '7:46 PM' },
  { id: '8', sender: 'other', text: 'Thank you', timestamp: '7:46 PM' },
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Ridoan Ahmad Razin',
  avatar: 'https://picsum.photos/id/64/200/200',
  status: 'ad_id.6712031338265 +2',
  adTitle: 'This chat contains a reply to an ad.',
  adImage: 'https://picsum.photos/id/250/100/100',
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const chatRef = useRef<HTMLDivElement>(null);

  const addMessage = (sender: Sender, text: string, timestamp?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const updateMessage = (id: string, newText: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, text: newText } : m));
  };

  const downloadScreenshot = async () => {
    if (!chatRef.current) return;
    
    try {
      // Create a high-quality data URL from the ref
      const dataUrl = await htmlToImage.toPng(chatRef.current, {
        pixelRatio: 3, // Higher resolution
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `messenger_chat_${profile.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('oops, something went wrong!', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Editor Panel */}
      <div className="w-full md:w-96 bg-white border-r border-slate-200 overflow-y-auto max-h-screen">
        <EditorPanel 
          profile={profile} 
          setProfile={setProfile} 
          messages={messages} 
          onAddMessage={addMessage}
          onRemoveMessage={removeMessage}
          onDownload={downloadScreenshot}
        />
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex justify-center items-center p-4 md:p-10 overflow-auto bg-slate-200">
        <div className="relative">
          {/* Phone Frame wrapper */}
          <div className="bg-black rounded-[3rem] p-3 shadow-2xl border-[8px] border-slate-800 relative">
            <div 
              ref={chatRef}
              className="w-[375px] h-[750px] bg-white rounded-[2.2rem] overflow-hidden flex flex-col relative"
            >
              <ChatMockup profile={profile} messages={messages} onUpdateMessage={updateMessage} />
            </div>
            
            {/* Phone notch/dynamic island - Move inside the capture if needed, 
                but usually users want the chat content. 
                Keep it outside for now to avoid overlapping issues in capture. */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 pointer-events-none"></div>
            
            {/* Home indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full z-50 pointer-events-none"></div>
          </div>
          
          <p className="text-center mt-6 text-slate-500 text-sm font-medium">
            Live Preview (Click messages to edit text)
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

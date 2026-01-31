
import React, { useState, useRef, useEffect } from 'react';
import { Message, UserProfile } from '../types';

interface ChatMockupProps {
  profile: UserProfile;
  messages: Message[];
  onUpdateMessage: (id: string, text: string) => void;
}

export const ChatMockup: React.FC<ChatMockupProps> = ({ profile, messages, onUpdateMessage }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      // Set cursor to end
      editInputRef.current.selectionStart = editInputRef.current.value.length;
      editInputRef.current.selectionEnd = editInputRef.current.value.length;
    }
  }, [editingId]);

  const handleStartEdit = (msg: Message) => {
    setEditingId(msg.id);
    setEditingText(msg.text);
  };

  const handleFinishEdit = () => {
    if (editingId) {
      onUpdateMessage(editingId, editingText);
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFinishEdit();
    }
    if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Status Bar (Realistic iOS Style) */}
      <div className="h-11 px-6 flex justify-between items-end pb-2 text-[14px] font-semibold text-slate-900 bg-white shrink-0">
        <div className="flex-1">9:41</div>
        <div className="flex items-center mb-0.5">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" className="mr-1.5">
            <rect x="0" y="7" width="3" height="4" rx="1" />
            <rect x="4.5" y="5" width="3" height="6" rx="1" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
            <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" className="mr-1.5">
            <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 0C4.30561 0 1.4116 1.25203 0.170654 3.25L1.87131 4.30825C2.81648 2.78652 5.04169 1.83333 7.5 1.83333C9.95831 1.83333 12.1835 2.78652 13.1287 4.30825L14.8293 3.25C13.5884 1.25203 10.6944 0 7.5 0Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4C5.78368 4 4.22558 4.63665 3.52405 5.6133L5.13843 6.77252C5.55621 6.19234 6.46743 5.83333 7.5 5.83333C8.53257 5.83333 9.44379 6.19234 9.86157 6.77252L11.4759 5.6133C10.7744 4.63665 9.21632 4 7.5 4Z" />
          </svg>
          <div className="relative w-6 h-3 border border-slate-900/30 rounded-[3px] flex items-center px-[1.5px]">
            <div className="bg-slate-900 h-2 w-[18px] rounded-[1px]"></div>
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-slate-900/40 rounded-r-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center">
          <button className="text-[#0084FF] mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="relative mr-3">
            <img src={profile.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="Avatar" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[15px] font-bold text-slate-900 leading-tight">{profile.name}</h1>
            <p className="text-[11px] text-slate-500 font-medium">{profile.status}</p>
          </div>
        </div>
        <div className="flex items-center text-[#0084FF]">
          <svg className="w-6 h-6 ml-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth no-scrollbar">
        {/* Ad Context Banner */}
        <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3 relative border border-slate-100 mb-6">
          <img src={profile.adImage} className="w-12 h-12 rounded object-cover shadow-sm" alt="Ad" />
          <p className="text-[13px] font-medium text-slate-800 pr-6">{profile.adTitle}</p>
          <button className="absolute top-2 right-2 text-slate-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
          </button>
        </div>

        {/* Messages */}
        {messages.map((msg, idx) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center py-4 cursor-pointer" onClick={() => handleStartEdit(msg)}>
                {editingId === msg.id ? (
                  <textarea
                    ref={editInputRef}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={handleFinishEdit}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-center text-[12px] text-slate-500 font-normal outline-none border-none resize-none"
                    rows={1}
                  />
                ) : (
                  <p className="text-[12px] text-slate-500 font-normal opacity-80">{msg.text}</p>
                )}
              </div>
            );
          }

          const isMe = msg.sender === 'me';
          const prevMsg = messages[idx - 1];
          const nextMsg = messages[idx + 1];
          
          const isFirstInGroup = !prevMsg || prevMsg.sender !== msg.sender;
          const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;
          const isSingle = isFirstInGroup && isLastInGroup;

          // Messenger Rounding Logic
          let roundingClass = 'rounded-[18px]';
          if (!isSingle) {
            if (isMe) {
              if (isFirstInGroup) roundingClass = 'rounded-[18px] rounded-br-[4px]';
              else if (isLastInGroup) roundingClass = 'rounded-[18px] rounded-tr-[4px]';
              else roundingClass = 'rounded-[18px] rounded-tr-[4px] rounded-br-[4px]';
            } else {
              if (isFirstInGroup) roundingClass = 'rounded-[18px] rounded-bl-[4px]';
              else if (isLastInGroup) roundingClass = 'rounded-[18px] rounded-tl-[4px]';
              else roundingClass = 'rounded-[18px] rounded-tl-[4px] rounded-bl-[4px]';
            }
          }

          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} ${!isLastInGroup ? 'mb-[1.5px]' : 'mb-4'}`}>
              {msg.isAutomated && !isMe && (
                <span className="text-[10px] text-slate-400 font-bold mb-1 ml-12 uppercase tracking-tight">Automated Response</span>
              )}
              <div className={`flex items-end max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isMe && (
                  <div className="w-7 h-7 shrink-0 mr-2 flex items-center justify-center">
                    {isLastInGroup ? (
                      <img src={profile.avatar} className="w-7 h-7 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-7"></div>
                    )}
                  </div>
                )}
                
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} cursor-pointer`} onClick={() => handleStartEdit(msg)}>
                  <div className={`
                    px-3 py-1.5 text-[15px] leading-[1.3] whitespace-pre-wrap transition-colors
                    ${isMe 
                      ? 'bg-[#0084FF] text-white hover:bg-[#0076e6]' 
                      : 'bg-[#F0F0F0] text-black hover:bg-[#e6e6e6]'}
                    ${roundingClass}
                    ${editingId === msg.id ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}
                  `}>
                    {editingId === msg.id ? (
                      <textarea
                        ref={editInputRef}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={handleFinishEdit}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent w-full h-full outline-none border-none resize-none text-inherit leading-tight"
                        style={{ height: 'auto', minHeight: '1.2em' }}
                        rows={editingText.split('\n').length || 1}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Chips */}
      <div className="px-4 py-2 flex overflow-x-auto no-scrollbar shrink-0">
        <button className="flex items-center bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-700 text-[13px] font-bold whitespace-nowrap shadow-sm mr-2">
          <svg className="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2zM18 6v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
          </svg>
          Request to call
        </button>
        <button className="flex items-center bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-700 text-[13px] font-bold whitespace-nowrap shadow-sm mr-2">
          <svg className="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-1h2v1zm0-3h-2V7h2v6z" />
             <path d="M11.8 8c-.6 0-1.2.3-1.6.8l.8.8c.2-.3.5-.5.8-.5.5 0 .8.3.8.7s-.3.7-.8.7h-.2v.8h.2c1 0 1.6-.7 1.6-1.5s-.7-1.8-1.6-1.8z" />
          </svg>
          Create order
        </button>
        <button className="flex items-center bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-slate-700 text-[13px] font-bold whitespace-nowrap shadow-sm">
          <svg className="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Add
        </button>
      </div>

      {/* Input Bar */}
      <div className="p-3 flex items-center bg-white shrink-0 pb-8">
        <div className="flex items-center text-[#0084FF]">
          <svg className="w-[24px] h-[24px] mr-2.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
          <svg className="w-[24px] h-[24px] mr-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          <svg className="w-[24px] h-[24px] mr-2.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
          </svg>
          <svg className="w-[24px] h-[24px] mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </div>
        
        <div className="flex-1 bg-[#F0F2F5] rounded-full px-4 py-2 flex justify-between items-center ml-1">
          <span className="text-slate-500 text-[15px] font-normal py-0.5">Aa</span>
          <svg className="w-6 h-6 text-[#0084FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </div>

        <svg className="w-7 h-7 text-[#0084FF] ml-1.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 6.59C7.22 6.95 7 7.45 7 8v11c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
        </svg>
      </div>
    </div>
  );
};

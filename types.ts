
export type Sender = 'me' | 'other' | 'system';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp?: string;
  isAutomated?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  status: string;
  adTitle: string;
  adImage: string;
}

export interface ChatState {
  profile: UserProfile;
  messages: Message[];
}

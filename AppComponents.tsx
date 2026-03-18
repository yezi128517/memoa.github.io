
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 终极补齐：一站式解决所有页面切换崩溃问题
 * 涵盖了 Database, Palette, Volume2, Brain 等所有已发现和潜在的地雷
 */
import { 
  // 1. 基础导航与布局
  Home, House, Search, MessageSquare, Heart, User, Users, Settings, 
  Menu, X, Plus, MoreHorizontal, MoreVertical, ChevronRight, ChevronLeft, 
  ChevronDown, ChevronUp, Check, Layout, Grid, List,

  // 2. 个人页、设置与数据库 (解决当前 Database, Palette 报错)
  Database, Palette, Paintbrush, Sun, Moon, Languages, Globe, 
  Shield, ShieldCheck, Lock, Unlock, Key, Bell, BellDot,

  // 3. AI 助手与音频 (解决 Volume2, Brain 报错)
  Sparkles, Brain, Zap, Bot, Cpu, Wand2, Activity,
  Mic, Music, Volume, Volume1, Volume2, VolumeX, Headphones,

  // 4. 记忆、时间与文件
  Calendar, Clock, History, MapPin, Star, Bookmark, Book, 
  Image as ImageIcon, Camera, Film, Trash2, Edit3, Share2,

  // 5. 控制、状态与反馈
  SlidersHorizontal, Sliders, Filter, SortAsc, SortDesc,
  Send, RefreshCw, Download, Upload, Info, LogOut,
  AlertCircle, AlertTriangle, HelpCircle, Fingerprint, Eye, EyeOff
} from 'lucide-react'; 

import { TRANSLATIONS } from './translations'; 
import { AppState, TabType, BottomNavProps, MusicApp, MemoryCard, ChatMessage } from '../types';
import { CATEGORIES } from './constants';

// 确保翻译引用不会导致 ReferenceError
const translations = TRANSLATIONS;

// --- Shared Components ---
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm sculpted-glass rounded-[40px] p-8 space-y-6 shadow-2xl border border-white/40"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Bottom Navigation ---

export const BottomNav: React.FC<BottomNavProps & { language: string }> = ({ activeTab, setActiveTab, language }) => {
  const t = (key: string) => translations[language]?.[key] || key;
  
  const tabs: { name: TabType; icon: React.ElementType; label: string }[] = [
    { name: '主页', icon: Home, label: t('Home') },
    { name: '记忆', icon: Brain, label: t('Memories') },
    { name: 'AI助手', icon: Sparkles, label: t('AI Assistant') },
    { name: '关系', icon: Users, label: t('Relationships') },
    { name: '个人', icon: User, label: t('Profile') },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md liquid-nav rounded-full px-4 py-3 flex justify-between items-center z-50 border border-white/40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;
        
        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="relative flex flex-col items-center justify-center w-12 h-12 transition-all duration-500 group"
          >
            {isActive && (
              <motion.div 
                layoutId="activeDrop"
                className="absolute inset-0 active-drop rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <div className={`relative z-10 p-2 rounded-full transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-slate-600'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
            </div>
            <span className={`text-[8px] font-bold mt-1 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// --- Home Tab ---

export const HomeTab: React.FC<{ state: AppState, onToggleLike?: () => void }> = ({ state, onToggleLike }) => {
  const t = (key: string) => translations[state.language]?.[key] || key;

  const getEmotionColor = (score: number) => {
    if (score > 80) return 'bg-emerald-400';
    if (score > 60) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  return (
    <div className="p-8 space-y-10 flex-1">
      <header className="flex justify-between items-center pt-6">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            {new Date().toLocaleDateString(state.language === 'English' ? 'en-US' : state.language === '日本語' ? 'ja-JP' : state.language === '한국어' ? 'ko-KR' : 'zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
          <h1 className="text-5xl font-black text-slate-900 mt-1 tracking-tighter">Memoa</h1>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full sculpted-glass p-0.5 cursor-pointer shadow-lg border border-white/40"
        >
          <img 
            src="https://picsum.photos/seed/memoa-user/200/200" 
            className="w-full h-full rounded-full object-cover" 
            alt="avatar" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </header>

      {/* Featured Memory Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        className="relative aspect-[16/10] rounded-[32px] overflow-hidden group cursor-pointer shadow-2xl prism-refraction"
      >
        <img 
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
          alt="featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Emotion Dot on Photo */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="text-white text-[10px] font-bold uppercase tracking-wider">{t('Serene')}</span>
        </div>

        <div className="absolute top-6 right-6">
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike?.();
            }}
            className="w-12 h-12 rounded-full sculpted-glass flex items-center justify-center text-slate-900 border border-white/40"
          >
            <Heart size={22} strokeWidth={1.5} fill={state.featuredLiked ? "#fbbf24" : "none"} className={state.featuredLiked ? "text-amber-500" : "text-slate-900"} />
          </motion.button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-1">{t('Featured Moment')}</p>
          <h3 className="text-white text-3xl font-black tracking-tight">{state.language === 'English' ? 'Misty Coast' : state.language === '日本語' ? '霧の海岸' : state.language === '한국어' ? '안개 낀 해안' : '薄雾海岸'}</h3>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={1.5} />
        <input 
          type="text" 
          placeholder={t('Chat with Memoa...')} 
          className="w-full sculpted-glass rounded-full py-5 pl-14 pr-20 shadow-xl focus:outline-none text-base text-slate-900 placeholder:text-slate-400 transition-all border border-white/40"
        />
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('setTab', { detail: 'AI助手' }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 active-drop text-white px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all active:scale-95"
        >
          <Sparkles size={14} className="inline mr-1" /> {state.language === 'English' ? 'AI' : 'AI'}
        </button>
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-slate-900 text-xl font-black tracking-tight">{t('Recent Records')}</h2>
          <ChevronRight className="text-slate-400" size={24} />
        </div>
        <div className="space-y-6">
          {state.memories.filter(m => ['景迈山', '北京'].includes(m.title)).map((memory) => (
            <motion.div 
              key={memory.id} 
              whileHover={{ scale: 1.02 }}
              onClick={() => window.dispatchEvent(new CustomEvent('setTab', { detail: '记忆' }))}
              className="sculpted-glass rounded-[32px] overflow-hidden group cursor-pointer relative prism-refraction"
            >
              <div className="relative aspect-[16/9]">
                <img src={memory.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={memory.title} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                
                {/* Emotion Dot on Photo */}
                <div className="absolute top-4 left-4">
                  <div className={`w-3 h-3 rounded-full ${getEmotionColor(memory.emotion)} shadow-lg border border-white/40`} />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-900 font-black text-2xl tracking-tight">{memory.title}</h3>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">{memory.date}</span>
                </div>
                <div className="flex gap-2">
                  {memory.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-white/40 text-slate-600 text-[10px] font-bold rounded-full border border-white/40 uppercase tracking-[0.1em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- AI Assistant Tab ---

export const AIAssistantTab: React.FC<{ 
  state: AppState, 
  mood?: string,
  onAddMusic?: (app: MusicApp) => void,
  onRemoveMusic?: (id: string) => void,
  onAddMemory?: (memory: MemoryCard) => void
}> = ({ state, mood = 'serene', onAddMusic, onRemoveMusic, onAddMemory }) => {
  const t = (key: string) => translations[state.language]?.[key] || key;
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isAddMusicOpen, setIsAddMusicOpen] = useState(false);
  const [newMusicName, setNewMusicName] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [connectedMusicApp, setConnectedMusicApp] = useState<string | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isEmotionPickerOpen, setIsEmotionPickerOpen] = useState(false);
  const [memoryDraft, setMemoryDraft] = useState<{ summary: string; emotion: string; title: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
const messages = state.chatHistory || [];
const setMessages = (newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
  if (typeof newMessages === 'function') {
    onUpdateState?.({ chatHistory: newMessages(messages) });
  } else {
    onUpdateState?.({ chatHistory: newMessages });
  }
};
    { role: 'ai', content: state.language === 'English' ? 'Hello, I am Memoa. What would you like to talk about today?' : state.language === '日本語' ? 'こんにちは、Memoaです。今日は何についてお話ししましょうか？' : state.language === '한국어' ? '안녕하세요, Memoa입니다. 오늘은 어떤 이야기를 나누고 싶으신가? ' : '你好，我是 Memoa。今天有什么想聊的吗？' }
  ]);

  const aiMoodColors: Record<string, { bg: string, text: string, blob: string }> = {
    serene: { bg: 'bg-slate-100/30', text: 'text-slate-600/60', blob: 'bg-slate-200/10' },
    energetic: { bg: 'bg-amber-100/30', text: 'text-amber-600/60', blob: 'bg-amber-200/10' },
    warm: { bg: 'bg-orange-100/30', text: 'text-orange-600/60', blob: 'bg-orange-200/10' },
    mystic: { bg: 'bg-emerald-100/30', text: 'text-emerald-600/60', blob: 'bg-emerald-200/10' },
    royal: { bg: 'bg-indigo-100/30', text: 'text-indigo-600/60', blob: 'bg-indigo-200/10' },
    crimson: { bg: 'bg-rose-100/30', text: 'text-rose-600/60', blob: 'bg-rose-200/10' },
    teal: { bg: 'bg-teal-100/30', text: 'text-teal-600/60', blob: 'bg-teal-200/10' },
    slate: { bg: 'bg-slate-800/30', text: 'text-slate-400/60', blob: 'bg-slate-700/10' },
    lavender: { bg: 'bg-violet-100/30', text: 'text-violet-600/60', blob: 'bg-violet-200/10' },
    gold: { bg: 'bg-yellow-100/30', text: 'text-yellow-600/60', blob: 'bg-yellow-200/10' },
    custom: { bg: 'bg-cyan-100/30', text: 'text-cyan-600/60', blob: 'bg-cyan-200/10' },
  };

  const currentAiColors = aiMoodColors[mood] || aiMoodColors.serene;

  const voices = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];

  const voiceLabels: Record<string, string> = {
    'Kore': '科尔 (Kore)',
    'Puck': '帕克 (Puck)',
    'Charon': '卡戎 (Charon)',
    'Fenrir': '芬里尔 (Fenrir)',
    'Zephyr': '西风 (Zephyr)'
  };

  const handleAddMusic = () => {
    if (newMusicName.trim()) {
      onAddMusic?.({
        id: Math.random().toString(36).substr(2, 9),
        name: newMusicName,
        type: 'custom'
      });
      setNewMusicName('');
      setIsAddMusicOpen(false);
    }
  };

  const speakResponse = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `用温柔的语气说：${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice as any },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        // Convert base64 to ArrayBuffer
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Create AudioContext
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // The data is 16-bit PCM, mono, 24kHz
        const sampleRate = 24000;
        const numberOfChannels = 1;
        
        // Convert Uint8Array (16-bit PCM) to Float32Array
        const dataView = new DataView(bytes.buffer);
        const floatData = new Float32Array(bytes.length / 2);
        for (let i = 0; i < floatData.length; i++) {
          // 16-bit signed PCM is little-endian
          const s = dataView.getInt16(i * 2, true);
          floatData[i] = s / 32768;
        }
        
        const audioBuffer = audioContext.createBuffer(numberOfChannels, floatData.length, sampleRate);
        audioBuffer.getChannelData(0).set(floatData);
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        
        // Handle potential auto-play restrictions
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        
        source.start();
      }
    } catch (error) {
  console.error("TTS Error:", error);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.language === 'English' ? 'en-US' : 'zh-CN';
  window.speechSynthesis.speak(utterance);
}

  const handleAddToMemoryBank = async () => {
    if (!memoryDraft) {
      handleSendMessage(state.language === 'English' ? "Please generate a summary or add an emotion tag first so I can record the memory for you." : "请先生成记忆摘要或添加情绪标签，我才能帮你记录记忆哦。");
      return;
    }
    
    if (onAddMemory) {
      const newMemory: MemoryCard = {
        id: Date.now().toString(),
        title: memoryDraft.title,
        imageUrl: `https://picsum.photos/seed/${memoryDraft.title}/800/800`,
        photoCount: 1,
        date: new Date().toLocaleDateString(state.language === 'English' ? 'en-US' : state.language === '日本語' ? 'ja-JP' : state.language === '한국어' ? 'ko-KR' : 'zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        emotion: 90, // Default high resonance
        tags: [memoryDraft.emotion, state.language === 'English' ? 'AI Generated' : 'AI生成']
      };
      onAddMemory(newMemory);
    }
    
    const content = state.language === 'English' ? `Okay, I've stored this memory (${memoryDraft.title}) in your memory bank. You can view it anytime in the "Memory" tab.` : `好的，我已经将这段记忆（${memoryDraft.title}）存入你的记忆库了。你可以随时在“记忆”标签页查看。`;
    setMessages(prev => [...prev, { role: 'ai', content }]);
    speakResponse(state.language === 'English' ? "Okay, I've stored this memory in your memory bank." : "好的，我已经将这段记忆存入你的记忆库了。");
    setMemoryDraft(null);
  };

  const handleGenerateMemorySummary = async () => {
    if (messages.length < 2) {
      handleSendMessage(state.language === 'English' ? "We haven't talked much yet. Let's talk a bit more before I summarize for you." : "我们还没聊多少呢，等再多聊几句我再帮你总结吧。");
      return;
    }
    setIsThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chatHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
      const prompt = state.language === 'English' 
        ? `Based on our conversation:\n${chatHistory}\nPlease extract the essence of this conversation and generate a short memory record. Format:\n[Title]: (A poetic title)\n[Description]: (Describe the core content of this memory in a gentle tone)`
        : `基于我们刚才的对话：\n${chatHistory}\n请帮我提炼出这段对话的精华，生成一个简短的记忆记录。格式如下：\n【标题】：（起一个有诗意的标题）\n【描述】：（用温柔的语气描述这段记忆的核心内容）`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      const aiText = response.text || (state.language === 'English' ? "[Title]: Warm Conversation\n[Description]: A beautiful exchange." : "【标题】：温馨对话\n【描述】：一段美好的交流。");
      
      // Parse title and description
      const titleMatch = state.language === 'English' ? aiText.match(/\[Title\]: (.*?)(?:\n|$)/) : aiText.match(/【标题】：(.*?)(?:\n|$)/);
      const descMatch = state.language === 'English' ? aiText.match(/\[Description\]: (.*?)(?:\n|$)/) : aiText.match(/【描述】：(.*?)(?:\n|$)/);
      const title = titleMatch ? titleMatch[1] : (state.language === 'English' ? "Warm Conversation" : "温馨对话");
      const desc = descMatch ? descMatch[1] : aiText;

      setMemoryDraft(prev => ({
        summary: desc,
        title: title,
        emotion: prev?.emotion || t('Serene')
      }));

      setIsThinking(false);
      const aiMsg = state.language === 'English' 
        ? `I've organized this memory for you:\n\n${aiText}\n\nClick the "Add Emotion Tag" button below to choose a unique mood for this memory.`
        : `我已经为你整理好了这段记忆：\n\n${aiText}\n\n点击下方的“添加情绪标签”按钮，为这段记忆选择一个专属的心情吧。`;
      setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);
      speakResponse(state.language === 'English' ? "I've organized this memory for you. You can add an emotion tag below." : "我已经为你整理好了这段记忆。你可以点击下方按钮添加情绪标签。");
    } catch (error) {
      console.error("Summary Error:", error);
      setIsThinking(false);
    }
  };

  const handleAddEmotionTag = () => {
    setIsEmotionPickerOpen(true);
  };

  const selectEmotion = (emotion: string) => {
    setMemoryDraft(prev => ({
      summary: prev?.summary || (state.language === 'English' ? "A beautiful conversation." : "一段美好的对话。"),
      title: prev?.title || (state.language === 'English' ? "Today's Conversation" : "今日对话"),
      emotion: emotion
    }));
    setIsEmotionPickerOpen(false);
    setMessages(prev => [...prev, { role: 'ai', content: state.language === 'English' ? `Okay, I've tagged this memory as "${emotion}".` : `好的，我为这段记忆打上了“${emotion}”的标签。` }]);
    speakResponse(state.language === 'English' ? `Okay, I've tagged this memory as ${emotion}.` : `好的，我为这段记忆打上了${emotion}的标签。`);
  };

  const handleSendMessage = async (text?: string, image?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim() && !image) return;
    
    setMessages(prev => [...prev, { role: 'user', content: messageToSend, image }]);
    setInputValue('');
    setIsThinking(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a gentle digital memory assistant. User says: ${messageToSend}. Please reply concisely in ${state.language}.`,
        config: {
          systemInstruction: `You are a digital memory assistant named 'Memoa'. Your tone should be gentle and considerate. Keep it concise, usually within 2-3 sentences. Reply in ${state.language}.`,
        }
      });

      const aiText = response.text || "";
      setIsThinking(false);
      setIsSpeaking(true);
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
      speakResponse(aiText);
      setTimeout(() => setIsSpeaking(false), 4000);
    } catch (error) {
      console.error("AI Error:", error);
      setIsThinking(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleSendMessage("看看这段记忆...", event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col pt-16 px-8 space-y-8">
      <header className="flex justify-between items-center flex-shrink-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('Prism AI')}</h1>
          <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">{t('Ethereal Resonance')}</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicOpen(true)}
            className={`w-10 h-10 sculpted-glass rounded-full flex items-center justify-center border border-white/40 ${isPlayingMusic ? 'text-emerald-500' : 'text-slate-600'}`}
          >
            <Volume2 size={18} strokeWidth={1.5} className={isPlayingMusic ? 'animate-pulse' : ''} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSettingsOpen(true)}
            className="w-10 h-10 sculpted-glass rounded-full flex items-center justify-center text-slate-600 border border-white/40"
          >
            <Settings size={18} strokeWidth={1.5} />
          </motion.button>
        </div>
      </header>

      {/* Prism AI Soul */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto no-scrollbar py-2">
        <div className="relative w-64 h-64 flex items-center justify-center flex-shrink-0">
          <motion.div 
            animate={{ 
              scale: isListening || isSpeaking ? [1, 1.1, 0.95, 1.05, 1] : 1,
              rotate: 360,
              borderRadius: isListening || isSpeaking ? 
                ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "50%"] : 
                "50%"
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              borderRadius: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`w-48 h-48 prism-sphere flex items-center justify-center relative overflow-visible breathe-soft cursor-pointer transition-colors duration-500 ${isListening || isSpeaking ? currentAiColors.bg : 'bg-white/5'}`}
            onClick={() => setIsListening(!isListening)}
          >
            {/* Liquid Glass Texture */}
            <div className={`absolute inset-0 backdrop-blur-2xl transition-colors duration-500 rounded-full ${isListening || isSpeaking ? currentAiColors.blob : 'bg-white/5'}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_70%)] rounded-full" />
            
            <motion.div
              animate={{ 
                opacity: isListening ? [0.4, 1, 0.4] : 1,
                scale: isListening ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <Mic size={32} strokeWidth={1.5} className={isListening || isSpeaking ? currentAiColors.text : 'text-slate-700/60'} />
            </motion.div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          {[
            { label: t('Add to Memory Bank'), icon: Plus, action: handleAddToMemoryBank },
            { label: t('Generate Summary'), icon: Brain, action: handleGenerateMemorySummary },
            { label: t('Add Emotion Tag'), icon: Heart, action: handleAddEmotionTag },
          ].map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.action}
              disabled={isThinking}
              className={`px-4 py-2.5 sculpted-glass rounded-2xl text-[10px] font-bold border border-white/40 flex items-center gap-2 shadow-sm transition-opacity ${isThinking ? 'opacity-50 cursor-not-allowed' : 'text-slate-600'}`}
            >
              <btn.icon size={14} strokeWidth={2} />
              {btn.label}
            </motion.button>
          ))}
        </div>

        {/* Chat Bubbles */}
        <div className="w-full mt-12 space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] sculpted-glass rounded-[28px] px-8 py-6 text-sm font-medium leading-relaxed prism-refraction ${msg.role === 'user' ? 'active-drop text-white rounded-tr-none' : 'text-slate-900 rounded-tl-none'}`}>
                  {msg.image && (
                    <img src={msg.image} className="w-full rounded-xl mb-4 shadow-lg" alt="upload" referrerPolicy="no-referrer" />
                  )}
                  <span className={msg.role === 'ai' ? 'text-etched' : ''}>{msg.content}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Bar */}
      <div className="pb-4 pt-2 flex-shrink-0">
        <div className="relative flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 sculpted-glass rounded-full flex items-center justify-center text-slate-500 border border-white/40 hover:text-slate-700 transition-colors"
            >
              <ImageIcon size={20} />
            </button>
            <button 
              onClick={() => setIsListening(!isListening)}
              className={`w-12 h-12 sculpted-glass rounded-full flex items-center justify-center border border-white/40 transition-all ${isListening ? 'active-drop text-white' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Mic size={20} />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <div className="relative flex-1">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('Chat with Memoa...')} 
              className="w-full sculpted-glass rounded-full py-4 px-6 text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-medium border border-white/40"
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isThinking}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isThinking ? 'text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Sparkles size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="AI 设置">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">选择语音</p>
            <div className="grid grid-cols-2 gap-3">
              {voices.map(voice => (
                <button
                  key={voice}
                  onClick={() => setSelectedVoice(voice)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${selectedVoice === voice ? 'active-drop text-white border-transparent' : 'bg-white/40 text-slate-600 border-white/40'}`}
                >
                  <Volume2 size={14} className="inline mr-2" /> {voiceLabels[voice] || voice}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <button onClick={() => setIsSettingsOpen(false)} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm">{t('Save All Changes')}</button>
          </div>
        </div>
      </Modal>

      {/* Music Modal */}
      <Modal isOpen={isMusicOpen} onClose={() => setIsMusicOpen(false)} title={t('Background Music')}>
        <div className="space-y-6">
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('Connect your favorite music app...')}
          </p>
          <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
            {state.musicApps.map(app => (
              <div key={app.id} className="flex gap-2">
                <button
                  onClick={() => {
                    setConnectedMusicApp(app.name);
                    setIsPlayingMusic(true);
                    setIsMusicOpen(false);
                  }}
                  className={`flex-1 p-4 rounded-2xl flex items-center justify-between border transition-all ${connectedMusicApp === app.name ? 'border-emerald-400 bg-emerald-50/50' : 'border-white/40 bg-white/40'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                      {app.type === 'spotify' ? 'S' : app.type === 'apple' ? 'A' : 'M'}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{app.name}</span>
                  </div>
                  {connectedMusicApp === app.name ? (
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t('Connected')}</span>
                  ) : (
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('Connect')}</span>
                  )}
                </button>
                <button 
                  onClick={() => onRemoveMusic?.(app.id)}
                  className="p-4 rounded-2xl border border-white/40 bg-white/40 text-rose-400 hover:text-rose-600"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            {isAddMusicOpen ? (
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder={t('App Name...')} 
                  value={newMusicName}
                  onChange={(e) => setNewMusicName(e.target.value)}
                  className="w-full bg-white/40 border border-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddMusic}
                    className="flex-1 active-drop text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    {t('Add')}
                  </button>
                  <button 
                    onClick={() => setIsAddMusicOpen(false)}
                    className="px-6 sculpted-glass text-slate-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    {t('Cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAddMusicOpen(true)}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Plus size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('Add Music App')}</span>
              </button>
            )}
          </div>

          {connectedMusicApp && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-emerald-500 ${isPlayingMusic ? 'animate-pulse' : ''}`} />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{t('Playing via')} {connectedMusicApp}</span>
                </div>
                <button 
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  className="text-slate-900 font-black text-[10px] uppercase tracking-widest hover:text-emerald-500 transition-colors"
                >
                  {isPlayingMusic ? t('Pause') : t('Play')}
                </button>
              </div>
              
              {/* Simulated Progress Bar */}
              <div className="space-y-2">
                <div className="relative h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-emerald-400"
                    animate={{ width: isPlayingMusic ? '100%' : '30%' }}
                    transition={{ duration: isPlayingMusic ? 180 : 0.5, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{isPlayingMusic ? '1:24' : '0:45'}</span>
                  <span>3:45</span>
                </div>
              </div>

              <div className="flex justify-center gap-6 pt-2">
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Clock size={16} />
                </button>
                <button 
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                >
                  {isPlayingMusic ? <div className="flex gap-1"><div className="w-1 h-3 bg-white rounded-full"/><div className="w-1 h-3 bg-white rounded-full"/></div> : <Plus className="rotate-45" size={20} />}
                </button>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Emotion Picker Modal */}
      <Modal isOpen={isEmotionPickerOpen} onClose={() => setIsEmotionPickerOpen(false)} title={t('Choose Emotion Tag')}>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: t('Joy'), color: 'bg-emerald-400' },
            { name: t('Serene'), color: 'bg-slate-400' },
            { name: t('Sadness'), color: 'bg-rose-400' },
            { name: t('Nostalgia'), color: 'bg-amber-400' },
            { name: state.language === 'English' ? 'Expectation' : '期待', color: 'bg-indigo-400' },
            { name: state.language === 'English' ? 'Shock' : '震撼', color: 'bg-purple-400' },
          ].map((emotion) => (
            <motion.button
              key={emotion.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectEmotion(emotion.name)}
              className="p-6 rounded-[24px] sculpted-glass border border-white/40 flex flex-col items-center gap-3 transition-all hover:bg-white/60"
            >
              <div className={`w-4 h-4 rounded-full ${emotion.color} shadow-lg`} />
              <span className="text-xs font-bold text-slate-700">{emotion.name}</span>
            </motion.button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

// --- Memory Tab ---

export const MemoryTab: React.FC<{ state: AppState; onAddMemory?: (memory: MemoryCard) => void }> = ({ state, onAddMemory }) => {
  const t = (key: string) => translations[state.language]?.[key] || key;
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [viewerMemory, setViewerMemory] = useState<MemoryCard | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [newMemoryTitle, setNewMemoryTitle] = useState('');
  const [newMemoryImage, setNewMemoryImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewMemoryImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = () => {
    if (!newMemoryTitle || !newMemoryImage || !onAddMemory) return;
    const newMemory: MemoryCard = {
      id: Date.now().toString(),
      title: newMemoryTitle,
      imageUrl: newMemoryImage,
      photoCount: 1,
      date: new Date().toLocaleDateString(state.language === 'English' ? 'en-US' : state.language === '日本語' ? 'ja-JP' : state.language === '한국어' ? 'ko-KR' : 'zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      emotion: 85,
      tags: [state.language === 'English' ? 'New' : state.language === '日本語' ? '新しい' : state.language === '한국어' ? '새로운' : '新记忆']
    };
    onAddMemory(newMemory);
    setIsAddMemoryOpen(false);
    setNewMemoryTitle('');
    setNewMemoryImage(null);
  };

  const filteredMemories = state.memories
    .filter(m => !['景迈山', '北京'].includes(m.title))
    .filter(memory => 
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getEmotionColor = (score: number) => {
    if (score > 80) return 'bg-emerald-400';
    if (score > 60) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  return (
    <div className="p-8 space-y-10 flex-1">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('Memory Bank')}</h1>
          <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">{t('Digital Eternity')}</p>
        </div>
        <div className="flex gap-3 items-center">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 160, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative overflow-hidden"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder={t('Search memories...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/40 backdrop-blur-md border border-white/40 rounded-xl px-4 py-2 text-sm focus:outline-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) setSearchTerm('');
            }}
            className={`p-3.5 rounded-2xl sculpted-glass border border-white/40 transition-colors hover:bg-white/60 ${isSearchOpen ? 'text-emerald-500' : 'text-slate-600'}`}
          >
            <Search size={22} strokeWidth={1.5} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFilterOpen(true)}
            className="p-3.5 rounded-2xl sculpted-glass text-slate-600 border border-white/40 transition-colors hover:bg-white/60"
          >
            <SlidersHorizontal size={22} strokeWidth={1.5} />
          </motion.button>
        </div>
      </header>

      {/* Resonance Spectrum */}
      <div className="sculpted-glass p-8 rounded-[32px] space-y-8 prism-refraction shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t('Resonance Spectrum')}</h2>
          <span className="text-[9px] font-black text-white active-drop px-4 py-1.5 rounded-full uppercase tracking-[0.1em]">{t('Real-time')}</span>
        </div>
        <div className="space-y-6">
          <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full spectrum-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${state.emotionScore}%` }}
              transition={{ duration: 1.5, type: "spring" }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <span className="text-rose-400">{t('Negative')}</span>
            <span className="text-amber-400">{t('Neutral')}</span>
            <span className="text-emerald-400">{t('Positive')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredMemories.map((memory, i) => (
          <motion.div 
            key={memory.id}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setViewerMemory(memory)}
            onMouseEnter={() => setActivePhoto(memory.id)}
            onMouseLeave={() => setActivePhoto(null)}
            className="memory-photo-container aspect-square relative group cursor-pointer prism-refraction shadow-xl"
          >
            <img 
              src={memory.imageUrl} 
              className={`memory-photo ${activePhoto === memory.id ? 'active' : ''}`} 
              alt={memory.title} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            
            {/* Emotion Dot */}
            <div className="absolute top-4 left-4">
              <div className={`w-2.5 h-2.5 rounded-full ${getEmotionColor(memory.emotion)} shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
            </div>

            <div className="absolute bottom-6 left-6">
              <h4 className="text-white text-xl font-black tracking-tight">{memory.title}</h4>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">{memory.photoCount} {t('Photos')}</p>
            </div>
          </motion.div>
        ))}
        <motion.div 
          whileTap={{ scale: 0.95 }} 
          onClick={() => setIsAddMemoryOpen(true)}
          className="sculpted-glass rounded-[32px] aspect-square flex items-center justify-center text-slate-300 border-dashed border-2 border-slate-200 cursor-pointer"
        >
          <Plus size={48} strokeWidth={1} />
        </motion.div>
      </div>

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title={t('Filter Memories')}>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('Sort By')}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t('Newest'), value: 'Newest' },
                { label: t('Oldest'), value: 'Oldest' },
                { label: t('Emotional'), value: 'Emotional' },
                { label: t('Random'), value: 'Random' }
              ].map(sort => (
                <button key={sort.value} className="px-4 py-3 rounded-2xl bg-white/40 text-slate-600 text-xs font-bold border border-white/40 hover:bg-slate-900 hover:text-white transition-all">
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setIsFilterOpen(false)} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm">{t('Apply Filter')}</button>
        </div>
      </Modal>

      {/* Full Screen Image Viewer */}
      <AnimatePresence>
        {viewerMemory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewerMemory(null)}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <motion.button 
              className="absolute top-8 right-8 p-4 text-white/60 hover:text-white"
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>
            
            <motion.div 
              layoutId={viewerMemory.id}
              className="w-full max-w-4xl aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={viewerMemory.imageUrl} 
                className="w-full h-full object-cover" 
                alt={viewerMemory.title} 
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center space-y-2"
            >
              <h2 className="text-white text-3xl font-black tracking-tight">{viewerMemory.title}</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">{viewerMemory.photoCount} 张照片 • {viewerMemory.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Relationships Tab ---

export const RelationshipsTab: React.FC<{ state: AppState }> = ({ state }) => {
  const t = (key: string) => translations[state.language]?.[key] || key;
  const [activeCategory, setActiveCategory] = useState<'人物' | '时间' | '地点'>('人物');

  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const getNodes = () => {
    switch (activeCategory) {
      case '人物':
        return [
          { name: 'T老师', color: 'bg-rose-100/20', borderColor: 'border-rose-200/30', size: 90, pos: { top: '15%', left: '15%' }, avatar: 'https://picsum.photos/seed/teacher/100/100' },
          { name: '陈雪', color: 'bg-emerald-100/20', borderColor: 'border-emerald-200/30', size: 100, pos: { top: '10%', right: '20%' }, avatar: 'https://picsum.photos/seed/friend/100/100' },
          { name: 'Leo', color: 'bg-indigo-100/20', borderColor: 'border-indigo-200/30', size: 80, pos: { top: '45%', right: '10%' }, avatar: 'https://picsum.photos/seed/leo/100/100' },
          { name: '小梦', color: 'bg-cyan-100/20', borderColor: 'border-cyan-200/30', size: 85, pos: { bottom: '15%', right: '25%' }, avatar: 'https://picsum.photos/seed/dream/100/100' },
          { name: '朱朱', color: 'bg-purple-100/20', borderColor: 'border-purple-200/30', size: 75, pos: { bottom: '25%', left: '20%' }, avatar: 'https://picsum.photos/seed/zhu/100/100' },
        ];
      case '时间':
        return [
          { name: '2025.5', color: 'bg-amber-100/20', borderColor: 'border-amber-200/30', size: 95, pos: { top: '18%', left: '18%' } },
          { name: '2025.11', color: 'bg-amber-100/20', borderColor: 'border-amber-200/30', size: 90, pos: { top: '12%', right: '25%' } },
          { name: '2024.12', color: 'bg-slate-100/20', borderColor: 'border-slate-200/30', size: 80, pos: { bottom: '22%', right: '18%' } },
        ];
      case '地点':
        return [
          { name: '景迈山', color: 'bg-emerald-100/20', borderColor: 'border-emerald-200/30', size: 100, pos: { top: '12%', right: '18%' } },
          { name: '北京', color: 'bg-slate-100/20', borderColor: 'border-slate-200/30', size: 90, pos: { bottom: '18%', left: '18%' } },
          { name: '上海', color: 'bg-indigo-100/20', borderColor: 'border-indigo-200/30', size: 85, pos: { top: '42%', left: '12%' } },
        ];
      default: return [];
    }
  };

  const nodes = getNodes();

  return (
    <div className="p-8 space-y-10 flex-1">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{state.language === 'English' ? 'Nexus' : state.language === '日本語' ? 'ネクサス' : state.language === '한국어' ? '넥서스' : '关系网'}</h1>
          <p className="text-slate-400 text-[10px] font-bold tracking-[0.4em] uppercase">{t('Soul Connection')}</p>
        </div>
        <div className="flex bg-white/40 p-1 rounded-2xl border border-white/40 backdrop-blur-md">
          {([
            { key: 'People', label: t('People'), value: '人物' },
            { key: 'Time', label: t('Time'), value: '时间' },
            { key: 'Places', label: t('Places'), value: '地点' }
          ] as const).map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeCategory === cat.value ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Centered Me with Liquid Glass Connections */}
      <div className="sculpted-glass rounded-[48px] h-[480px] relative flex items-center justify-center overflow-hidden prism-refraction shadow-2xl">
        {/* Background Organic Shapes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-200 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-100 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Central "Me" Node - Liquid Glass Gradient */}
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            rotate: [0, 5, -5, 0],
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-white font-black text-2xl z-20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] breathe-soft border border-white/20 backdrop-blur-2xl"
        >
          {t('Me')}
        </motion.div>

        {/* Relationship Nodes - Water Drop Glass */}
        <AnimatePresence mode="popLayout">
          <motion.div key={activeCategory} className="absolute inset-0">
            {nodes.map((node, i) => (
              <motion.div 
                key={node.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -15, 0],
                  x: [0, 8, 0],
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "40% 60% 50% 50% / 40% 40% 60% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3, type: "spring", bounce: 0.4 },
                  y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                  borderRadius: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1, zIndex: 30 }}
                className={`absolute water-drop ${node.color} ${node.borderColor} group`}
                style={{ width: node.size, height: node.size, ...node.pos }}
              >
                <div className="flex flex-col items-center justify-center text-center p-2">
                  {node.avatar && (
                    <div className="w-10 h-10 rounded-full overflow-hidden mb-1 border border-white/40 shadow-inner opacity-80 group-hover:opacity-100 transition-opacity">
                      <img src={node.avatar} className="w-full h-full object-cover" alt={node.name} referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <span className="text-slate-700 font-bold text-[10px] tracking-tight group-hover:text-slate-900 transition-colors">
                    {node.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-slate-900 text-xl font-black tracking-tight">{state.language === 'English' ? 'Recent Interactions' : state.language === '日本語' ? '最近の交流' : state.language === '한국어' ? '최근 상호작용' : '最近互动'}</h2>
          <button 
            onClick={() => setIsViewAllOpen(true)}
            className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
          >
            {state.language === 'English' ? 'View All' : state.language === '日本語' ? 'すべて表示' : state.language === '한국어' ? '모두 보기' : '查看全部'}
          </button>
        </div>
        {[
          { name: 'T老师', count: 16, avatar: 'https://picsum.photos/seed/teacher/100/100', color: 'bg-rose-100/50' },
          { name: '陈雪', count: 12, avatar: 'https://picsum.photos/seed/friend/100/100', color: 'bg-emerald-100/50' },
        ].map((rel, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 10, scale: 1.02 }}
            className="sculpted-glass p-6 rounded-[32px] flex items-center gap-6 cursor-pointer prism-refraction border border-white/20"
          >
            <div className={`w-16 h-16 rounded-2xl ${rel.color} overflow-hidden shadow-inner`}>
              <img src={rel.avatar} className="w-full h-full object-cover" alt={rel.name} referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 text-2xl font-black tracking-tight">{rel.name}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{rel.count} {state.language === 'English' ? 'shared memories' : state.language === '日本語' ? '共有された思い出' : state.language === '한국어' ? '공유된 추억' : '个共同记忆'}</p>
            </div>
            <ChevronRight size={24} className="text-slate-300" />
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isViewAllOpen} onClose={() => setIsViewAllOpen(false)} title={t('Soul Connection')}>
        <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
          {[
            { name: 'T老师', count: 16, avatar: 'https://picsum.photos/seed/teacher/100/100', color: 'bg-rose-100/50' },
            { name: '陈雪', count: 12, avatar: 'https://picsum.photos/seed/friend/100/100', color: 'bg-emerald-100/50' },
            { name: '妈妈', count: 45, avatar: 'https://picsum.photos/seed/mom/100/100', color: 'bg-amber-100/50' },
            { name: '老王', count: 8, avatar: 'https://picsum.photos/seed/neighbor/100/100', color: 'bg-slate-100/50' },
            { name: '小李', count: 5, avatar: 'https://picsum.photos/seed/colleague/100/100', color: 'bg-blue-100/50' },
          ].map((rel, i) => (
            <div key={i} className="flex items-center gap-4 p-4 sculpted-glass rounded-2xl border border-white/20">
              <img src={rel.avatar} className="w-12 h-12 rounded-xl object-cover" alt={rel.name} referrerPolicy="no-referrer" />
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900">{rel.name}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{rel.count} {t('Photos')}</p>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

// --- Profile Tab ---

export const ProfileTab: React.FC<{ 
  state: AppState, 
  mood?: string, 
  onMoodChange?: (mood: any) => void,
  onUpdateState?: (updates: Partial<AppState>) => void
}> = ({ state, mood, onMoodChange, onUpdateState }) => {
  const t = (key: string) => translations[state.language]?.[key] || key;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  
  // Local state for interactivity
  const [settingsState, setSettingsState] = useState({
    faceId: true,
    encryption: true,
    stealth: false,
    reminders: true,
    insights: false,
    milestones: true,
    displayName: 'Memoa 用户',
    email: 'yezi128517@gmail.com',
    phone: '+86 138 **** 5678',
    region: '上海, 中国',
    language: state.language
  });

  const [isCustomColorOpen, setIsCustomColorOpen] = useState(false);
  const [customColors, setCustomColors] = useState(state.customMoodColors || ['#f472b6', '#fef08a', '#22d3ee']);

  const handleCustomColorChange = (index: number, value: string) => {
    const newColors = [...customColors];
    newColors[index] = value;
    setCustomColors(newColors);
    // Convert hex to tailwind-like classes or just pass raw colors if supported
    // For simplicity, we'll map these to the state.customMoodColors in App.tsx
    // But since we can't easily map hex to tailwind bg- classes, 
    // I'll just simulate it by updating the state with a special format if needed.
    onUpdateState?.({ 
      customMoodColors: newColors
    });
  };

  const handleApplyCustomColors = () => {
    onUpdateState?.({ 
      customMoodColors: customColors
    });
    onMoodChange?.('custom');
    setIsCustomColorOpen(false);
  };

  const handleSettingClick = (key: string) => {
    setActiveSetting(key);
    setIsSettingsOpen(true);
  };

  const toggleSetting = (key: keyof typeof settingsState) => {
    setSettingsState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => setIsBackingUp(false), 2000);
  };

  const getSettingContent = () => {
    switch (activeSetting) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/40 border border-white/40 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white relative group">
                <img src="https://picsum.photos/seed/memoa-user/400/400" alt="avatar" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <ImageIcon size={16} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={settingsState.displayName} 
                  onChange={(e) => setSettingsState(prev => ({ ...prev, displayName: e.target.value }))}
                  className="bg-transparent text-lg font-black text-slate-900 focus:outline-none w-full" 
                />
                <p className="text-xs text-slate-400">{t('Memory Architect')}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{t('Account Details')}</p>
              <div className="sculpted-glass rounded-3xl overflow-hidden border border-white/40">
                <div className="p-4 flex flex-col gap-1 border-b border-white/20">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('Email')}</label>
                  <input 
                    type="email" 
                    value={settingsState.email} 
                    onChange={(e) => setSettingsState(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none" 
                  />
                </div>
                <div className="p-4 flex flex-col gap-1 border-b border-white/20">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('Phone')}</label>
                  <input 
                    type="text" 
                    value={settingsState.phone} 
                    onChange={(e) => setSettingsState(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none" 
                  />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('Region')}</label>
                  <select 
                    value={settingsState.region}
                    onChange={(e) => setSettingsState(prev => ({ ...prev, region: e.target.value }))}
                    className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none appearance-none"
                  >
                    <option>{state.language === 'English' ? 'Shanghai, China' : '上海, 中国'}</option>
                    <option>{state.language === 'English' ? 'Beijing, China' : '北京, 中国'}</option>
                    <option>{state.language === 'English' ? 'Tokyo, Japan' : '东京, 日本'}</option>
                    <option>{state.language === 'English' ? 'New York, USA' : '纽约, 美国'}</option>
                  </select>
                </div>
              </div>
            </div>

            <button onClick={() => setIsSettingsOpen(false)} className="w-full py-4 active-drop text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">{t('Save All Changes')}</button>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{t('Security Layers')}</p>
              <div className="sculpted-glass rounded-3xl overflow-hidden border border-white/40">
                <div className="p-4 flex justify-between items-center border-b border-white/20">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">{t('Face ID Lock')}</p>
                    <p className="text-[10px] text-slate-400">{t('Protect your memories with biometrics')}</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('faceId')}
                    className={`w-10 h-5 rounded-full relative transition-colors ${settingsState.faceId ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settingsState.faceId ? 22 : 4 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                    />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center border-b border-white/20">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">{t('End-to-End Encryption')}</p>
                    <p className="text-[10px] text-slate-400">{t('Only you can access your data')}</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('encryption')}
                    className={`w-10 h-5 rounded-full relative transition-colors ${settingsState.encryption ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settingsState.encryption ? 22 : 4 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                    />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">{t('Stealth Mode')}</p>
                    <p className="text-[10px] text-slate-400">{t('Hide sensitive memories from main grid')}</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('stealth')}
                    className={`w-10 h-5 rounded-full relative transition-colors ${settingsState.stealth ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settingsState.stealth ? 22 : 4 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                    />
                  </button>
                </div>
              </div>
            </div>
            <button className="w-full py-4 sculpted-glass text-rose-500 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest">{t('Clear All Cache')}</button>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
             <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{t('Reminder Preferences')}</p>
              <div className="sculpted-glass rounded-3xl overflow-hidden border border-white/40">
                <div className="p-4 flex justify-between items-center border-b border-white/20">
                  <span className="text-sm font-bold text-slate-900">{t('Memory Reminders')}</span>
                  <button 
                    onClick={() => toggleSetting('reminders')}
                    className={`w-10 h-5 rounded-full relative transition-colors ${settingsState.reminders ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settingsState.reminders ? 22 : 4 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                    />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center border-b border-white/20">
                  <span className="text-sm font-bold text-slate-900">{t('AI Insights')}</span>
                  <button 
                    onClick={() => toggleSetting('insights')}
                    className={`w-10 h-5 rounded-full relative transition-colors ${settingsState.insights ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settingsState.insights ? 22 : 4 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                    />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">{t('Relationship Milestones')}</span>
                  <button 
                    onClick={() => toggleSetting('milestones')}
                    className={`w-10 h-5 rounded-full relative transition-colors ${settingsState.milestones ? 'bg-emerald-400' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settingsState.milestones ? 22 : 4 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'storage':
        return (
          <div className="space-y-6">
            <div className="sculpted-glass p-6 rounded-3xl border border-white/40 space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('Current Plan')}</p>
                  <p className="text-xl font-black text-slate-900">{t('Prism Premium')}</p>
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{t('Active')}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{t('Usage')}</span>
                  <span>{state.storageUsage}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${state.storageUsage}%` }}
                    className="h-full bg-emerald-400" 
                  />
                </div>
                <p className="text-[9px] text-slate-400 text-right">{t('Used')} 8.8 GB {t('of')} 10 GB</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{t('Storage Actions')}</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleBackup}
                  disabled={isBackingUp}
                  className="p-4 sculpted-glass rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-white/40 transition-colors disabled:opacity-50"
                >
                  {isBackingUp ? t('Backing up...') : t('Backup Now')}
                </button>
                <button className="p-4 sculpted-glass rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-white/40 transition-colors">
                  {t('Export Data')}
                </button>
              </div>
            </div>

            <button className="w-full py-4 active-drop text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">{t('Upgrade to Unlimited')}</button>
          </div>
        );
      case 'language':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{t('Select Language')}</p>
              <div className="sculpted-glass rounded-3xl overflow-hidden border border-white/40">
                {['简体中文', 'English', '日本語', '한국어'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setSettingsState(prev => ({ ...prev, language: lang }))}
                    className="w-full p-4 flex justify-between items-center border-b border-white/20 last:border-none hover:bg-white/20 transition-colors"
                  >
                    <span className={`text-sm ${settingsState.language === lang ? 'font-black text-emerald-500' : 'font-bold text-slate-900'}`}>{lang}</span>
                    {settingsState.language === lang && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => {
                onUpdateState?.({ language: settingsState.language });
                setIsSettingsOpen(false);
              }} 
              className="w-full py-4 active-drop text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg"
            >
              {t('Save and Apply')}
            </button>
          </div>
        );
      default:
        return <p className="text-sm text-slate-500">{t('Settings content coming soon...')}</p>;
    }
  };

  return (
    <div className="p-8 space-y-12 flex flex-col items-center flex-1">
      <header className="w-full relative text-center space-y-8 pt-6">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-0 right-0 p-4 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Settings size={24} strokeWidth={1.5} />
        </motion.button>
        <div className="relative inline-block">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 rounded-full border border-dashed border-slate-400/20"
          />
          <div className="w-40 h-40 rounded-full sculpted-glass prism-refraction p-1.5 shadow-2xl border border-white/40">
            <img 
              src="https://picsum.photos/seed/memoa-user/400/400" 
              className="w-full h-full rounded-full object-cover" 
              alt="avatar" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('Memoa User')}</h1>
          <p className="text-slate-400 text-[10px] font-bold tracking-[0.4em] uppercase">{t('Memory Architect')}</p>
        </div>
      </header>

      {/* Atmosphere Mood Selector */}
      <section className="w-full sculpted-glass p-8 rounded-[32px] space-y-6 prism-refraction">
        <div className="flex items-center gap-3">
          <Palette size={18} className="text-slate-500" strokeWidth={1.5} />
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">{t('Atmosphere Mood')}</h2>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full px-4">
          {[
            { id: 'serene', color: 'bg-slate-500', label: t('Serene') },
            { id: 'energetic', color: 'bg-yellow-400', label: t('Energetic') },
            { id: 'warm', color: 'bg-orange-500', label: t('Warm') },
            { id: 'mystic', color: 'bg-emerald-600', label: t('Mystic') },
            { id: 'crimson', color: 'bg-rose-500', label: t('Crimson') },
            { id: 'teal', color: 'bg-cyan-400', label: t('Teal') },
            { id: 'slate', color: 'bg-slate-800', label: t('Slate') },
            { id: 'custom', color: 'bg-gradient-to-tr from-pink-400 via-yellow-200 to-cyan-400', label: t('Custom') },
          ].map((m) => (
            <motion.button 
              key={m.id}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (m.id === 'custom') {
                  setIsCustomColorOpen(true);
                }
                onMoodChange?.(m.id);
              }}
              className={`group relative aspect-square rounded-2xl ${m.color} shadow-lg border-2 ${mood === m.id ? 'border-emerald-400' : 'border-white/40'} flex items-center justify-center`}
            >
              <span className="absolute -bottom-5 opacity-0 group-hover:opacity-100 text-[7px] font-bold text-slate-400 uppercase tracking-widest transition-opacity whitespace-nowrap">
                {m.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <Modal isOpen={isCustomColorOpen} onClose={() => setIsCustomColorOpen(false)} title={t('Custom Atmosphere')}>
        <div className="space-y-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('Choose 3 colors for your aurora')}</p>
          <div className="flex justify-between gap-4">
            {customColors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => handleCustomColorChange(i, e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none bg-transparent"
                />
                <span className="text-[8px] font-mono text-slate-400">{color}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={handleApplyCustomColors}
            className="w-full py-4 active-drop text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg"
          >
            {t('Apply Colors')}
          </button>
        </div>
      </Modal>

      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="sculpted-glass p-8 rounded-[32px] space-y-2 prism-refraction">
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">{t('Streak')}</p>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black text-slate-900">12</span>
            <span className="text-slate-400 text-[10px] mb-1.5 font-bold uppercase">{t('Days')}</span>
          </div>
        </div>
        <div className="sculpted-glass p-8 rounded-[32px] space-y-2 prism-refraction">
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">{t('Balance')}</p>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black text-slate-900">88</span>
            <span className="text-slate-400 text-[10px] mb-1.5 font-bold uppercase">%</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        {[
          { key: 'profile', label: t('Profile Settings'), icon: User },
          { key: 'language', label: t('Language Settings'), icon: SlidersHorizontal },
          { key: 'privacy', label: t('Privacy & Security'), icon: ShieldCheck },
          { key: 'notifications', label: t('Notifications'), icon: Bell },
          { key: 'storage', label: t('Cloud Storage'), icon: Database },
        ].map((item, i) => (
          <motion.button 
            key={i}
            whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.2)' }}
            onClick={() => handleSettingClick(item.key)}
            className="w-full sculpted-glass p-6 rounded-[28px] flex items-center justify-between text-slate-500 hover:text-slate-900 transition-all prism-refraction"
          >
            <div className="flex items-center gap-5">
              <item.icon size={22} strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-tight uppercase">{item.label}</span>
            </div>
            <ChevronRight size={22} className="text-slate-300" />
          </motion.button>
        ))}
      </div>

      <button className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.6em] hover:text-slate-500 transition-colors pt-8">
        {t('Log Out')}
      </button>

      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        title={
          activeSetting === 'profile' ? t('Profile Settings') :
          activeSetting === 'language' ? t('Language Settings') :
          activeSetting === 'privacy' ? t('Privacy & Security') :
          activeSetting === 'notifications' ? t('Notifications') :
          activeSetting === 'storage' ? t('Cloud Storage') :
          t('Settings')
        }
      >
        {getSettingContent()}
      </Modal>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_STATE } from './constants';
import { AppState, TabType } from './types';

// 注意这里：我帮你把 Modal 加上了！
import { 
  BottomNav, 
  HomeTab, 
  MemoryTab, 
  AIAssistantTab, 
  RelationshipsTab, 
  ProfileTab,
  Modal 
} from './AppComponents';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [mood, setMood] = useState<string>('serene');
  
  const t = (key: string) => key;

  const handleUpdateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const setActiveTab = (tab: TabType) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const toggleFeaturedLike = () => {
    setState(prev => ({ ...prev, featuredLiked: !prev.featuredLiked }));
  };

  useEffect(() => {
    const handleSetTab = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('setTab', handleSetTab);
    return () => window.removeEventListener('setTab', handleSetTab);
  }, []);

  const renderTab = () => {
    switch (state.activeTab) {
      case '主页': return <HomeTab key="home" state={state} onToggleLike={toggleFeaturedLike} />;
      case '记忆': return <MemoryTab key="memory" state={state} onAddMemory={(m: any) => setState(prev => ({ ...prev, memories: [m, ...prev.memories] }))} />;
      case 'AI助手': return <AIAssistantTab key="ai" state={state} mood={mood} onAddMusic={(app: any) => setState(prev => ({ ...prev, musicApps: [...prev.musicApps, app] }))} onRemoveMusic={(id: any) => setState(prev => ({ ...prev, musicApps: prev.musicApps.filter(a => a.id !== id) }))} onAddMemory={(m: any) => setState(prev => ({ ...prev, memories: [m, ...prev.memories] }))} />;
      case '关系': return <RelationshipsTab key="rel" state={state} />;
      case '个人': return <ProfileTab key="profile" state={state} mood={mood} onMoodChange={setMood} onUpdateState={handleUpdateState} Modal={Modal} t={t} />;
      default: return <HomeTab key="def" state={state} />;
    }
  };

  // 这里的颜色会随 state.themeColor 实时变化
  const currentThemeColor = state.themeColor || '#3B82F6';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden">
      
      {/* 居中手机容器 */}
      <div className="w-full min-h-screen relative sm:max-w-[420px] sm:mx-auto sm:my-8 sm:rounded-[64px] sm:overflow-hidden shadow-2xl flex flex-col bg-white">
        
        {/* 背景光晕 - 绑定颜色 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full blur-3xl opacity-20 transition-colors duration-700 w-96 h-96 -top-20 -left-20" style={{ backgroundColor: currentThemeColor }} />
          <div className="absolute rounded-full blur-3xl opacity-20 transition-colors duration-700 w-80 h-80 top-1/2 -right-20" style={{ backgroundColor: currentThemeColor }} />
          <div className="absolute rounded-full blur-3xl opacity-20 transition-colors duration-700 w-64 h-64 bottom-10 left-10" style={{ backgroundColor: currentThemeColor }} />
        </div>

        <main className="flex-1 overflow-y-auto relative z-10 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav activeTab={state.activeTab} setActiveTab={setActiveTab} language={state.language} />
      </div>
    </div>
  );
}

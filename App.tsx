/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_STATE } from './constants';
import { AppState, TabType } from './types';

// 组件导入
import { 
  BottomNav, 
  HomeTab, 
  MemoryTab, 
  AIAssistantTab, 
  RelationshipsTab, 
  ProfileTab 
} from './AppComponents';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [mood, setMood] = useState<string>('serene');

  // 这里的 setActiveTab 保持与 BottomNav 约定的 Props 一致
  const setActiveTab = (tab: TabType) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const toggleFeaturedLike = () => {
    setState(prev => ({ ...prev, featuredLiked: !prev.featuredLiked }));
  };

  // 监听全局切换事件
  useEffect(() => {
    const handleSetTab = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('setTab', handleSetTab);
    return () => window.removeEventListener('setTab', handleSetTab);
  }, []);

  // 渲染不同的页面内容
  const renderTab = () => {
    switch (state.activeTab) {
      case '主页': return <HomeTab key="home" state={state} onToggleLike={toggleFeaturedLike} />;
      case '记忆': return (
        <MemoryTab 
          key="memory"
          state={state} 
          onAddMemory={(m) => setState(prev => ({ ...prev, memories: [m, ...prev.memories] }))} 
        />
      );
      case 'AI助手': return (
        <AIAssistantTab 
          key="ai"
          state={state} 
          mood={mood} 
          onAddMusic={(app) => setState(prev => ({ ...prev, musicApps: [...prev.musicApps, app] }))}
          onRemoveMusic={(id) => setState(prev => ({ ...prev, musicApps: prev.musicApps.filter(a => a.id !== id) }))}
          onAddMemory={(m) => setState(prev => ({ ...prev, memories: [m, ...prev.memories] }))}
        />
      );
      case '关系': return <RelationshipsTab key="rel" state={state} />;
      case '个人': return (
        <ProfileTab 
          key="profile"
          state={state} 
          mood={mood} 
          onMoodChange={(m: any) => setMood(m)} 
          onUpdateState={(updates) => setState(prev => ({ ...prev, ...updates }))}
        />
      );
      default: return <HomeTab key="def" state={state} />;
    }
  };

  const moodColors: Record<string, string[]> = {
    serene: ['bg-slate-400/20', 'bg-slate-500/10', 'bg-slate-300/10'],
    energetic: ['bg-yellow-400/20', 'bg-lime-400/10', 'bg-amber-400/10'],
    warm: ['bg-orange-500/20', 'bg-red-500/10', 'bg-rose-400/10'],
    mystic: ['bg-emerald-600/20', 'bg-green-500/10', 'bg-lime-600/10'],
    teal: ['bg-cyan-400/20', 'bg-teal-400/10', 'bg-blue-400/10'],
    royal: ['bg-indigo-400/20', 'bg-blue-500/10', 'bg-purple-400/10'],
    crimson: ['bg-rose-400/20', 'bg-pink-500/10', 'bg-red-400/10'],
    slate: ['bg-slate-700/20', 'bg-slate-900/10', 'bg-slate-800/10'],
    lavender: ['bg-violet-400/20', 'bg-purple-500/10', 'bg-indigo-400/10'],
    gold: ['bg-yellow-500/20', 'bg-amber-600/10', 'bg-orange-400/10'],
  };

  const currentBlobs = moodColors[mood] || moodColors.serene;

 return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100">
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          {state.activeTab === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <ChatTab state={state} onUpdateState={handleUpdateState} t={t} />
            </motion.div>
          )}
          
          {state.activeTab === 'archive' && (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <ArchiveTab state={state} onUpdateState={handleUpdateState} t={t} />
            </motion.div>
          )}

          {state.activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <ProfileTab 
                state={state} 
                onUpdateState={handleUpdateState} 
                Modal={Modal} 
                t={t} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav 
        activeTab={state.activeTab} 
        setActiveTab={(tab) => handleUpdateState({ activeTab: tab })} 
        t={t}
      />
    </div>
  );

        {/* 内容区域：使用 AnimatePresence 实现切换动画 */}
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

        {/* 底部导航栏 */}
        <BottomNav 
          activeTab={state.activeTab} 
          setActiveTab={setActiveTab} 
          language={state.language} 
        />
      </div>
    </div>
  );
}

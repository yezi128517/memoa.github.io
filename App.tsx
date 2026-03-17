/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_STATE } from './constants';
import { AppState, TabType } from './types';

// 只改了路径，确保能找到文件
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
      case '主页': return <HomeTab state={state} onToggleLike={toggleFeaturedLike} />;
      case '记忆': return (
        <MemoryTab 
          state={state} 
          onAddMemory={(m) => setState(prev => ({ ...prev, memories: [m, ...prev.memories] }))} 
        />
      );
      case 'AI助手': return (
        <AIAssistantTab 
          state={state} 
          mood={mood} 
          onAddMusic={(app) => setState(prev => ({ ...prev, musicApps: [...prev.musicApps, app] }))}
          onRemoveMusic={(id) => setState(prev => ({ ...prev, musicApps: prev.musicApps.filter(a => a.id !== id) }))}
          onAddMemory={(m) => setState(prev => ({ ...prev, memories: [m, ...prev.memories] }))}
        />
      );
      case '关系': return <RelationshipsTab state={state} />;
      case '个人': return (
        <ProfileTab 
          state={state} 
          mood={mood} 
          onMoodChange={(m: any) => setMood(m)} 
          onUpdateState={(updates) => setState(prev => ({ ...prev, ...updates }))}
        />
      );
      default: return <HomeTab state={state} />;
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
console.log("App is rendering!")
return (
  <div 
    className="relative min-h-screen w-full bg-slate-50 transition-colors duration-700"
    // 1. 核心修改：将自定义颜色注入为 CSS 变量 --accent-color
    style={{ 
      '--accent-color': state.themeColor || '#3B82F6',
    } as React.CSSProperties}
  >
    <div className="w-full min-h-screen relative sm:max-w-[420px] sm:mx-auto sm:my-8 sm:rounded-[64px] sm:overflow-hidden shadow-2xl flex flex-col bg-white">
      
      {/* 背景层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {currentBlobs.map((blob, i) => (
          <div 
            key={i} 
            className={`absolute rounded-full blur-3xl opacity-20 transition-all duration-1000 ${
              // 2. 如果你的 blob 颜色想随主题变，可以用 style 覆盖
              i === 0 ? "w-96 h-96 -top-20 -left-20" : i === 1 ? "w-80 h-80 top-1/2 -right-20" : "w-64 h-64 bottom-10 left-10"
            }`} 
            style={{ backgroundColor: 'var(--accent-color)' }} // 背景光晕随主题色变化
          />
        ))}
      </div>

      {/* 你的其他组件，如 Header, MainContent, Navigation */}
    </div>
  </div>
);
        <AnimatePresence mode="wait">
          
 {/* 1. 确保这里没有多余的冒号或分号 */}
      <BottomNav 
        activeTab={state.activeTab} 
        // 2. 这里的 setActiveTab 需要改为 dispatch 模式
        setActiveTab={(tab) => dispatch({ type: 'SET_TAB', payload: tab })} 
        language={state.language} 
      />

    </div> {/* 这个闭合的是那个 max-w-[420px] 的 div */}
  </div>   {/* 这个闭合的是最外层的 min-h-screen 的 div */}
); // 这是 return 的结束

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

  // 核心：获取当前选中的主题色，没选就是默认蓝色
  const currentThemeColor = state.themeColor || '#3B82F6';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden">
      
      {/* 这里的 sm:max-w-[420px] 保留了你的手机外壳居中设计 */}
      <div className="w-full min-h-screen relative sm:max-w-[420px] sm:mx-auto sm:my-8 sm:rounded

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { INITIAL_STATE } from './constants';
import { AppState, TabType } from './types';
import { 
  BottomNav, 
  HomeTab, 
  MemoryTab, 
  AIAssistantTab, 
  RelationshipsTab, 
  ProfileTab 
} from './components/AppComponents';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background music
  useEffect(() => {
    if (state.currentMusicUrl) {
      bgMusicRef.current = new Audio(state.currentMusicUrl);
      bgMusicRef.current.loop = true;
    }
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, [state.currentMusicUrl]);

  // Sync isPlayingMusic with bgMusicRef
  useEffect(() => {
    if (bgMusicRef.current) {
      if (state.isPlayingMusic) {
        bgMusicRef.current.play().catch(e => console.error("Music play error:", e));
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [state.isPlayingMusic]);

  const setActiveTab = (tab: TabType) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const setMood = (mood: string) => {
    setState(prev => ({ ...prev, mood }));
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

  // Simulate storage alert
  useEffect(() => {
    if (state.storageUsage >= 88) {
      console.log("Memoa：存储占用已达 88%，建议进行断舍离，删除一些重复的照片。");
    }
  }, [state.storageUsage]);

  const renderTab = () => {
    switch (state.activeTab) {
      case '主页': return <HomeTab state={state} onToggleLike={toggleFeaturedLike} setActiveTab={setActiveTab} />;
      case '记忆': return (
        <MemoryTab 
          state={state} 
          onAddMemory={(m) => setState(prev => {
            const exists = prev.memories.find(mem => mem.id === m.id);
            if (exists) {
              return { ...prev, memories: prev.memories.map(mem => mem.id === m.id ? m : mem) };
            }
            return { ...prev, memories: [m, ...prev.memories] };
          })} 
          onUpdateState={(updates) => setState(prev => ({ ...prev, ...updates }))}
        />
      );
      case 'AI助手': return (
        <AIAssistantTab 
          state={state} 
          mood={state.mood} 
          onAddMusic={(app) => setState(prev => ({ ...prev, musicApps: [...prev.musicApps, app] }))}
          onRemoveMusic={(id) => setState(prev => ({ ...prev, musicApps: prev.musicApps.filter(a => a.id !== id) }))}
          onAddMemory={(m) => setState(prev => {
            const exists = prev.memories.find(mem => mem.id === m.id);
            if (exists) {
              return { ...prev, memories: prev.memories.map(mem => mem.id === m.id ? m : mem) };
            }
            return { ...prev, memories: [m, ...prev.memories] };
          })} 
          onUpdateState={(updates) => setState(prev => ({ ...prev, ...updates }))}
        />
      );
      case '关系': return <RelationshipsTab state={state} />;
      case '个人': return (
        <ProfileTab 
          state={state} 
          mood={state.mood} 
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
    warm: ['bg-orange-50/20', 'bg-red-500/10', 'bg-rose-400/10'],
    mystic: ['bg-emerald-600/20', 'bg-green-500/10', 'bg-lime-600/10'],
    teal: ['bg-cyan-400/20', 'bg-teal-400/10', 'bg-blue-400/10'],
    royal: ['bg-indigo-400/20', 'bg-blue-500/10', 'bg-purple-400/10'],
    crimson: ['bg-rose-400/20', 'bg-pink-500/10', 'bg-red-400/10'],
    slate: ['bg-slate-700/20', 'bg-slate-900/10', 'bg-slate-800/10'],
    lavender: ['bg-violet-400/20', 'bg-purple-500/10', 'bg-indigo-400/10'],
    gold: ['bg-yellow-500/20', 'bg-amber-600/10', 'bg-orange-400/10'],
    custom: state.customMoodColors || ['#f472b6', '#fef08a', '#22d3ee'],
  };

  const currentBlobs = moodColors[state.mood] || moodColors.serene;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans bg-slate-50">
      {/* Main Content Container - Mobile App Structure */}
      <div 
        className="w-full min-h-screen relative sm:max-w-[420px] sm:mx-auto sm:my-8 sm:rounded-[64px] sm:overflow-hidden sculpted-glass prism-refraction shadow-2xl flex flex-col"
      >
        {/* Morning Mist Aurora Background - Now contained within the mobile app */}
        <div className="mist-aurora">
          {currentBlobs.map((blob, i) => {
            const isCustom = state.mood === 'custom';
            // If custom, blob is a hex code. If standard, blob is a tailwind class.
            const style = isCustom ? { backgroundColor: blob, opacity: i === 0 ? 0.4 : 0.2 } : {};
            const className = isCustom ? 
              `aurora-blob transition-all duration-1000` : 
              `aurora-blob transition-all duration-1000 ${blob}`;
            
            const sizes = [
              "w-[800px] h-[800px] -top-64 -left-64",
              "w-[1000px] h-[1000px] top-1/4 -right-64",
              "w-[600px] h-[600px] bottom-0 left-1/4"
            ];

            return (
              <div 
                key={i} 
                className={`${className} ${sizes[i]}`} 
                style={style}
              />
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={state.activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-32"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>

        <BottomNav activeTab={state.activeTab} setActiveTab={setActiveTab} language={state.language} />
      </div>
    </div>
  );
}

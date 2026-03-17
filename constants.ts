import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  activeTab: '主页',
  storageUsage: 88,
  emotionScore: 65,
  relationships: [
    {
      id: '1',
      name: 'T老师',
      progress: 75,
      color: '#4ADE80',
      avatar: 'https://picsum.photos/seed/teacher/100/100',
      memoryCount: 16
    },
    {
      id: '2',
      name: '陈雪',
      progress: 45,
      color: '#A855F7',
      avatar: 'https://picsum.photos/seed/friend/100/100',
      memoryCount: 12
    }
  ],
  memories: [
    {
      id: 'm1',
      title: '景迈山',
      date: '2025.5',
      photoCount: 24,
      tags: ['旅游', '朋友', '自然'],
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400',
      emotion: 80
    },
    {
      id: 'm2',
      title: '北京',
      date: '2025.11',
      photoCount: 42,
      tags: ['旅游', '自己', '人文'],
      imageUrl: 'https://picsum.photos/seed/beijing/400/300',
      emotion: 70
    },
    {
      id: 'm3',
      title: '咖啡馆',
      date: '2025.8',
      photoCount: 15,
      tags: ['休闲', '朋友', '生活'],
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400',
      emotion: 75
    },
    {
      id: 'm4',
      title: '登山',
      date: '2025.10',
      photoCount: 31,
      tags: ['运动', '自然', '挑战'],
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400',
      emotion: 90
    },
    {
      id: 'm5',
      title: '海边',
      date: '2025.8',
      photoCount: 42,
      tags: ['旅行', '夏天', '自由'],
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
      emotion: 95
    },
    {
      id: 'm6',
      title: '图书馆',
      date: '2025.12',
      photoCount: 28,
      tags: ['安静', '阅读', '成长'],
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400',
      emotion: 82
    }
  ],
  aiColors: ['#22D3EE', '#3B82F6', '#9333EA'], // Cyan, Blue, Purple
  featuredLiked: false,
  musicApps: [
    { id: '1', name: 'Spotify', type: 'spotify' },
    { id: '2', name: 'Apple Music', type: 'apple' },
    { id: '3', name: '网易云音乐', type: 'custom' },
    { id: '4', name: 'QQ音乐', type: 'custom' }
  ],
  language: '简体中文'
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 确保这里的 ID 'root' 必须和 index.html 里的 <div id="root"></div> 完全一致
const container = document.getElementById('root');

if (!container) {
  throw new Error("未找到根节点 'root'，请检查 index.html 中是否存在 <div id='root'></div>");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

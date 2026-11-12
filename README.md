# 前端动效可视化展示平台 · Motion Gallery

一个可交互、可分类、可查看源码、可实时调节参数的前端动效展示平台。核心目的是解决“只知道一个动效叫什么、却不知道它实际是什么效果”的问题：清单里的每一项动效都有真实可播放、肉眼可见的演示，做到“所见即名词”。

## 技术栈

- React 18 + Vite 5
- TailwindCSS 3（暗色主题）
- GSAP 3（核心演示与源码）
- Framer Motion 11（React 方案演示与源码）
- Prism.js（代码高亮）
- Lucide React（图标）

## 功能

- 七大分类 Tab 切换，每个分类显示数量
- 卡片网格：进入页面自动错落播放，hover 重播，点击打开详情
- 右侧滑出详情抽屉：
  - 实时预览 + 重播按钮
  - 滑块 / 下拉框实时调节时长、缓动、方向、幅度等参数
  - CSS / GSAP / Framer Motion 三种实现源码切换
  - Prism 代码高亮 + 一键复制（含成功 Toast）
- 顶部关键词搜索：按名称、标签、描述做全局模糊匹配
- 响应式：桌面多列网格、移动端单列；抽屉移动端全屏、桌面侧滑
- 无障碍：键盘 Esc 关闭、可见焦点、role/aria、尊重系统减弱动效偏好

## 本地运行

```bash
npm install
npm run dev       # 开发，默认 http://localhost:5173
npm run build     # 生产构建，产物在 dist/
npm run preview   # 本地预览构建产物
```

## 目录结构

```
src/
├── App.jsx                  # 主组件：状态、搜索、复制逻辑
├── main.jsx                 # 入口
├── styles/                  # 全局样式、Tailwind、演示关键帧
├── data/
│   ├── categories.js        # 七大分类常量
│   ├── controlPresets.js    # 控件（参数）预设工厂
│   └── effects/
│       ├── part1.js         # 动效数据（入场/循环/交互）
│       ├── part2.js         # 动效数据（风格/文字/加载/3D）
│       └── index.js         # 汇总与查询函数
├── components/              # 导航、Tab、卡片、网格、抽屉、代码块、Toast
└── demos/
    ├── shared.jsx           # 缓动映射、通用演示元素
    └── registry.jsx         # 各动效真实演示组件与注册表
```

## 如何新增一个动效

1. 在 `src/demos/registry.jsx` 中编写该动效的真实演示组件，并加入 `DEMO_REGISTRY`（key 为演示 id）。
2. 在 `src/data/effects/` 对应文件中追加一个数据项，包含：
   - `id`、`name`、`category`、`demo`（对应上一步的 key）、`tags`、`description`
   - `controls`：用 `controlPresets.js` 的工厂定义可调参数
   - `implementations`：`css` / `gsap` / `framer` 三套源码字符串
3. 无需改动其他地方，汇总入口会自动收录。

## 当前进度

已录入 60 个真实可播放动效，完整覆盖需求清单的 7 大分类（入场 10、循环 10、交互 10、视觉 8、文字 8、加载 7、3D 空间 7），P0/P1 功能全部跑通。

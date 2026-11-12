import { durationControl } from '../controlPresets.js'

// 文字专项剩余 7 项
export default [
  {
    id: 'split-text',
    name: 'SplitText 文字拆分动画',
    category: 'text',
    demo: 'split-text',
    tags: ['文字', '拆分'],
    description: '把文字拆成单个字符，按顺序逐个进入，标题动效最常用。',
    controls: [durationControl(0.8)],
    implementations: {
      css: `.split span {
  opacity: 0;
  animation: charIn .8s ease-out both;
}
.split span:nth-child(2) { animation-delay: .13s; }
.split span:nth-child(3) { animation-delay: .26s; }
.split span:nth-child(4) { animation-delay: .39s; }
.split span:nth-child(5) { animation-delay: .52s; }
@keyframes charIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
      gsap: `gsap.from('.split span', {
  y: 12,
  opacity: 0,
  duration: .8,
  stagger: .13,
  ease: 'power2.out',
})`,
      framer: `import { motion } from 'framer-motion'

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

<motion.span variants={item} initial="hidden" animate="show" />`,
    },
  },

  {
    id: 'text-roll',
    name: 'Text Roll 文字上下滚动切换',
    category: 'text',
    demo: 'text-roll',
    tags: ['文字', '轮播'],
    description: '多个词在固定窗口内垂直滚动切换，像垂直的文字轮播。',
    controls: [durationControl(2.4)],
    implementations: {
      css: `.roll { height: 40px; overflow: hidden; }
.roll-inner { animation: roll 2.4s cubic-bezier(.7,0,.3,1) infinite; }
@keyframes roll {
  0%   { transform: translateY(0); }
  33%  { transform: translateY(-33.33%); }
  66%  { transform: translateY(-66.66%); }
  100% { transform: translateY(-100%); }
}`,
      gsap: `gsap.to('.roll-inner', {
  yPercent: -100,
  duration: 2.4,
  ease: 'power2.inOut',
  repeat: -1,
  snap: { yPercent: 33 },
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ y: ['0%', '-33.33%', '-66.66%', '-100%'] }}
  transition={{ duration: 2.4, repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'text-morph',
    name: 'Text Morph 文字形变过渡',
    category: 'text',
    demo: 'text-morph',
    tags: ['文字', '过渡'],
    description: '两个词在同一位置交叉淡入淡出，实现文字的平滑切换。',
    controls: [durationControl(2)],
    implementations: {
      css: `.text-morph .a { animation: morphA 2s ease-in-out infinite alternate; }
.text-morph .b { animation: morphA 2s ease-in-out infinite alternate-reverse; }
@keyframes morphA {
  from { opacity: 0; }
  to   { opacity: 1; }
}`,
      gsap: `gsap.to('.a', { opacity: 0, duration: 1, yoyo: true, repeat: -1 })
gsap.to('.b', { opacity: 1, duration: 1, yoyo: true, repeat: -1 })`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{ opacity: [1, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'text-stroke',
    name: 'Text Stroke 文字描边动画',
    category: 'text',
    demo: 'text-stroke',
    tags: ['文字', '描边'],
    description: '文字在透明描边与填充色之间切换，轮廓感强。',
    controls: [durationControl(2)],
    implementations: {
      css: `.stroke {
  color: transparent;
  -webkit-text-stroke: 2px #818cf8;
  animation: stroke 2s ease-in-out infinite;
}
@keyframes stroke {
  0%, 100% { color: transparent; }
  50%      { color: #818cf8; }
}`,
      gsap: `gsap.to('.stroke', {
  color: '#818cf8',
  duration: 1,
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{ color: ['transparent', '#818cf8', 'transparent'] }}
  transition={{ duration: 2, repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'cursor-blink',
    name: 'Cursor Blink 光标闪烁',
    category: 'text',
    demo: 'cursor-blink',
    tags: ['文字', '光标'],
    description: '输入光标周期性显隐，是打字效果的标配。',
    controls: [durationControl(1)],
    implementations: {
      css: `.cursor {
  width: 3px;
  height: 34px;
  background: #22d3ee;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 49%  { opacity: 1; }
  50%, 100% { opacity: 0; }
}`,
      gsap: `gsap.to('.cursor', {
  opacity: 0,
  duration: .5,
  yoyo: true,
  repeat: -1,
  ease: 'steps(1)',
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{ opacity: [1, 0] }}
  transition={{ duration: 1, repeat: Infinity, ease: 'stepEnd' }}
/>`,
    },
  },

  {
    id: 'text-wave',
    name: 'Text Wave 文字波浪',
    category: 'text',
    demo: 'text-wave',
    tags: ['文字', '波浪'],
    description: '每个字符按顺序上下起伏，形成文字波浪。',
    controls: [durationControl(1.4)],
    implementations: {
      css: `.text-wave span {
  display: inline-block;
  animation: charWave 1.4s ease-in-out infinite;
}
.text-wave span:nth-child(2) { animation-delay: .15s; }
.text-wave span:nth-child(3) { animation-delay: .3s; }
.text-wave span:nth-child(4) { animation-delay: .45s; }
@keyframes charWave {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}`,
      gsap: `gsap.to('.text-wave span', {
  y: -10,
  duration: .7,
  yoyo: true,
  repeat: -1,
  stagger: .15,
  ease: 'sine.inOut',
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 1.4, repeat: Infinity, delay: i * .15 }}
/>`,
    },
  },

  {
    id: 'glow-text',
    name: 'Glow Text 发光文字',
    category: 'text',
    demo: 'glow-text',
    tags: ['文字', '发光'],
    description: '文字周围的光晕周期性增强减弱，霓虹感强。',
    controls: [durationControl(1.8)],
    implementations: {
      css: `.glow {
  color: #fff;
  animation: glow 1.8s ease-in-out infinite;
}
@keyframes glow {
  0%, 100% { text-shadow: 0 0 6px rgba(129,140,248,.6); }
  50% { text-shadow: 0 0 12px rgba(129,140,248,.95), 0 0 28px rgba(34,211,238,.7); }
}`,
      gsap: `gsap.to('.glow', {
  textShadow: '0 0 28px rgba(34,211,238,.8)',
  duration: .9,
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{
    textShadow: [
      '0 0 6px rgba(129,140,248,.6)',
      '0 0 28px rgba(34,211,238,.8)',
      '0 0 6px rgba(129,140,248,.6)',
    ],
  }}
  transition={{ duration: 1.8, repeat: Infinity }}
/>`,
    },
  },
]

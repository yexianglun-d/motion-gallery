import { durationControl, rangeControl } from '../controlPresets.js'

// 循环动效剩余 7 项
export default [
  {
    id: 'marquee',
    name: 'Marquee 跑马灯',
    category: 'loop',
    demo: 'marquee',
    tags: ['循环', '滚动'],
    description: '内容沿水平方向匀速滚动并循环，内容复制两份实现无缝衔接。',
    controls: [durationControl(8)],
    implementations: {
      css: `.marquee {
  display: flex;
  white-space: nowrap;
  animation: marquee 8s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}`,
      gsap: `gsap.to('.marquee', {
  xPercent: -50,
  duration: 8,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ x: ['0%', '-50%'] }}
  transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'shimmer',
    name: 'Shimmer 流光 / 骨架屏',
    category: 'loop',
    demo: 'shimmer',
    tags: ['循环', '加载'],
    description: '高光在灰色块上横向扫过并循环，是骨架屏占位的核心效果。',
    controls: [durationControl(1.4)],
    implementations: {
      css: `.shimmer {
  background: linear-gradient(90deg, #1c2540 25%, #334066 50%, #1c2540 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}`,
      gsap: `gsap.fromTo('.shimmer',
  { backgroundPosition: '-200% 0' },
  { backgroundPosition: '200% 0', duration: 1.4, ease: 'none', repeat: -1 }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
  transition={{ duration: 1.4, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'countup',
    name: 'CountUp 数字滚动',
    category: 'loop',
    demo: 'countup',
    tags: ['数字', '数据'],
    description: '数字从 0 平滑递增到目标值，常用于数据看板的指标展示。',
    controls: [durationControl(1.5)],
    implementations: {
      css: `@property --num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}
.countup {
  counter-reset: n var(--num);
  animation: count 1.5s ease forwards;
}
.countup::after { content: counter(n); }
@keyframes count { to { --num: 100; } }`,
      gsap: `const state = { value: 0 }
gsap.to(state, {
  value: 100,
  duration: 1.5,
  ease: 'power3.out',
  onUpdate: () => {
    el.textContent = Math.round(state.value)
  },
})`,
      framer: `import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

const [n, setN] = useState(0)
useEffect(() => {
  const controls = animate(0, 100, {
    duration: 1.5,
    ease: 'easeOut',
    onUpdate: (v) => setN(Math.round(v)),
  })
  return () => controls.stop()
}, [])`,
    },
  },

  {
    id: 'typewriter',
    name: 'Typewriter 打字机',
    category: 'loop',
    demo: 'typewriter',
    tags: ['文字', '经典'],
    description: '文字像打字一样逐字出现，配合闪烁光标，复古而有叙事感。',
    controls: [durationControl(1.6)],
    implementations: {
      css: `.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #22d3ee;
  animation: typing 1.6s steps(5) both, cursorBlink .8s step-end infinite;
}
@keyframes typing {
  from { width: 0; }
  to   { width: 5ch; }
}
@keyframes cursorBlink { 50% { border-color: transparent; } }`,
      gsap: `const text = 'Hello'
text.split('').forEach((ch, i) => {
  gsap.to({}, {
    duration: 0.32,
    delay: i * 0.32,
    onComplete: () => { el.textContent += ch },
  })
})`,
      framer: `import { motion } from 'framer-motion'

{'Hello'.split('').map((ch, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.32 }}
  >
    {ch}
  </motion.span>
))}`,
    },
  },

  {
    id: 'scramble',
    name: 'Text Scramble 乱码解码',
    category: 'loop',
    demo: 'scramble',
    tags: ['文字', '解码'],
    description: '字符先显示为随机乱码，再从左到右逐位“解码”为真实文字。',
    controls: [durationControl(1.4)],
    implementations: {
      css: `/* 乱码解码本质是 JS 效果，CSS 可负责等宽与光标 */
.scramble {
  font-family: monospace;
  border-right: 2px solid #22d3ee;
}`,
      gsap: `const chars = '!<>-_\\/[]{}=+*^?#'
const target = 'MOTION'
target.split('').forEach((_, i) => {
  gsap.to({}, {
    duration: 0.05,
    delay: i * 0.05,
    onComplete: () => {
      let out = target.slice(0, i + 1)
      for (let j = i + 1; j < target.length; j++) {
        out += chars[(Math.random() * chars.length) | 0]
      }
      el.textContent = out
    },
  })
})`,
      framer: `import { useEffect, useState } from 'react'

const chars = '!<>-_\\/[]{}=+*^?#'
const [text, setText] = useState('')
useEffect(() => {
  const target = 'MOTION'
  let i = 0
  const id = setInterval(() => {
    let out = target.slice(0, i + 1)
    for (let j = i + 1; j < target.length; j++) {
      out += chars[(Math.random() * chars.length) | 0]
    }
    setText(out)
    i += 1
    if (i >= target.length) clearInterval(id)
  }, 90)
  return () => clearInterval(id)
}, [])`,
    },
  },

  {
    id: 'float',
    name: 'Float 漂浮',
    category: 'loop',
    demo: 'float',
    tags: ['循环', '轻柔'],
    description: '元素上下轻柔地往复漂浮，像悬浮在空中，适合装饰与图标。',
    controls: [durationControl(1.8), rangeControl('amount', '漂浮幅度 (px)', 4, 24, 1, 12)],
    implementations: {
      css: `.float { animation: float 1.8s ease-in-out infinite; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}`,
      gsap: `gsap.to('.box', {
  y: -12,
  duration: 0.9,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ y: [0, -12, 0] }}
  transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'wave',
    name: 'Wave 波浪',
    category: 'loop',
    demo: 'wave',
    tags: ['循环', '音频'],
    description: '一组竖条按顺序上下起伏，形成波浪，常用于音频可视化与加载。',
    controls: [durationControl(1.4)],
    implementations: {
      css: `.wave span {
  display: inline-block;
  animation: waveBar 1.4s ease-in-out infinite;
}
.wave span:nth-child(2) { animation-delay: .12s; }
.wave span:nth-child(3) { animation-delay: .24s; }
.wave span:nth-child(4) { animation-delay: .36s; }
.wave span:nth-child(5) { animation-delay: .48s; }
@keyframes waveBar {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}`,
      gsap: `gsap.to('.wave span', {
  y: -8,
  duration: 0.7,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
  stagger: 0.12,
})`,
      framer: `import { motion } from 'framer-motion'

{[0,1,2,3,4].map((i) => (
  <motion.span
    key={i}
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, delay: i * 0.12 }}
  />
))}`,
    },
  },
]

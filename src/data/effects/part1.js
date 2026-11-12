import {
  durationControl,
  easeControl,
  rangeControl,
  selectControl,
} from '../controlPresets.js'

// 入场 / 出场、循环、交互 共 8 项
export default [
  {
    id: 'fade-in',
    name: 'FadeIn 淡入',
    category: 'entrance',
    demo: 'fade-in',
    tags: ['基础', '常用'],
    description: '元素透明度从 0 过渡到 1 的基础入场动画，最常见、最克制的显隐方式。',
    controls: [durationControl(0.6), easeControl('ease-out')],
    implementations: {
      css: `.fade-in {
  animation: fadeIn 0.6s ease-out both;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0 },
  { opacity: 1, duration: 0.6, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'slide-in',
    name: 'SlideIn 滑入',
    category: 'entrance',
    demo: 'slide-in',
    tags: ['基础', '方向'],
    description: '元素沿指定方向（上/下/左/右）带位移进入，同时透明度渐显，方向与距离可调。',
    controls: [
      durationControl(0.6),
      easeControl('ease-out'),
      selectControl('direction', '方向', ['up', 'down', 'left', 'right'], 'up'),
      rangeControl('amount', '距离 (px)', 10, 100, 5, 40),
    ],
    implementations: {
      css: `.slide-in-up {
  animation: slideInUp 0.6s ease-out both;
}
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'scale-in',
    name: 'ScaleIn 缩放显隐',
    category: 'entrance',
    demo: 'scale-in',
    tags: ['常用', '回弹'],
    description: '元素从较小比例放大到正常大小并渐显，配合回弹缓动可做出有弹性的入场。',
    controls: [durationControl(0.6), easeControl('back')],
    implementations: {
      css: `.scale-in {
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.55); }
  to   { opacity: 1; transform: scale(1); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, scale: 0.55 },
  { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, scale: 0.55 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
/>`,
    },
  },

  {
    id: 'pulse',
    name: 'Pulse 呼吸脉动',
    category: 'loop',
    demo: 'pulse',
    tags: ['循环', '常用'],
    description: '元素周期性地放大再回缩，像呼吸一样，常用于强调可点击或在线状态。',
    controls: [
      durationControl(1.2),
      rangeControl('amount', '放大幅度', 0.03, 0.3, 0.01, 0.1),
    ],
    implementations: {
      css: `.pulse {
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.1); }
}`,
      gsap: `gsap.to('.box', {
  scale: 1.1,
  duration: 0.6,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'spin',
    name: 'Spin 旋转',
    category: 'loop',
    demo: 'spin',
    tags: ['循环', '基础'],
    description: '元素绕中心匀速旋转 360° 并无限循环，是加载旋转、图标动效的基础。',
    controls: [durationControl(1.2)],
    implementations: {
      css: `.spin {
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}`,
      gsap: `gsap.to('.box', {
  rotation: 360,
  duration: 1.2,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'shake',
    name: 'Shake 抖动',
    category: 'loop',
    demo: 'shake',
    tags: ['循环', '反馈'],
    description: '元素左右快速来回抖动，幅度逐渐收束，常用于错误提示、拒绝操作等场景。',
    controls: [
      durationControl(0.8),
      rangeControl('amount', '抖动幅度 (px)', 2, 16, 1, 6),
    ],
    implementations: {
      css: `.shake {
  animation: shake 0.8s ease-in-out infinite;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-3.6px); }
  80% { transform: translateX(3.6px); }
}`,
      gsap: `gsap.to('.box', {
  keyframes: { x: [0, -6, 6, -3.6, 3.6, 0] },
  duration: 0.8,
  ease: 'sine.inOut',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ x: [0, -6, 6, -3.6, 3.6, 0] }}
  transition={{ duration: 0.8, ease: 'easeInOut', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'hover-lift',
    name: 'Hover Lift 悬浮抬升',
    category: 'interaction',
    demo: 'hover-lift',
    tags: ['交互', '常用'],
    description: '鼠标悬停时元素向上抬起并加深投影，离开时回落，是卡片与按钮最常用的反馈。',
    controls: [
      durationControl(0.3),
      rangeControl('amount', '抬升高度 (px)', 4, 24, 1, 10),
    ],
    implementations: {
      css: `.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 42px -12px rgba(99, 102, 241, 0.75);
}`,
      gsap: `const el = document.querySelector('.box')
el.addEventListener('mouseenter', () =>
  gsap.to(el, { y: -10, duration: 0.3, ease: 'power2.out' })
)
el.addEventListener('mouseleave', () =>
  gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' })
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  whileHover={{ y: -10 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'toggle-switch',
    name: 'Toggle Switch 开关切换',
    category: 'interaction',
    demo: 'toggle-switch',
    tags: ['交互', '组件'],
    description: '点击开关在开/关状态间平滑切换，滑块带回弹，背景色同步渐变。',
    controls: [durationControl(0.3)],
    implementations: {
      css: `.switch {
  width: 62px; height: 32px;
  border-radius: 999px;
  background: #1c2540;
  transition: background 0.3s ease;
}
.switch.on {
  background: linear-gradient(90deg, #6366f1, #22d3ee);
}
.switch .knob {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.switch.on .knob { transform: translateX(28px); }`,
      gsap: `let on = false
const knob = document.querySelector('.knob')
document.querySelector('.switch').addEventListener('click', () => {
  on = !on
  gsap.to(knob, {
    x: on ? 28 : 0,
    duration: 0.3,
    ease: 'back.out(2)',
  })
})`,
      framer: `import { useState } from 'react'
import { motion } from 'framer-motion'

const [on, setOn] = useState(false)

<motion.button className="switch" onClick={() => setOn((v) => !v)}>
  <motion.span
    className="knob"
    animate={{ x: on ? 28 : 0 }}
    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
  />
</motion.button>`,
    },
  },
]

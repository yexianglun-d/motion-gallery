import { durationControl, easeControl } from '../controlPresets.js'

// 入场 / 出场剩余 7 项
export default [
  {
    id: 'bounce',
    name: 'Bounce 弹跳入场',
    category: 'entrance',
    demo: 'bounce',
    tags: ['入场', '弹性'],
    description: '元素从上方落下后多次弹跳、逐渐收束，最终稳定，跳跃感强。',
    controls: [durationControl(0.8), easeControl('ease-out')],
    implementations: {
      css: `.bounce { animation: bounceIn 0.8s ease-out both; }
@keyframes bounceIn {
  0%   { opacity: 0; transform: translateY(-60px); }
  55%  { opacity: 1; transform: translateY(0) scaleY(1.06); }
  70%  { transform: translateY(-14px) scaleY(.98); }
  100% { transform: translateY(0) scaleY(1); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, y: -60 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: -60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut', bounce: 0.6 }}
/>`,
    },
  },

  {
    id: 'pop',
    name: 'Pop 弹出（带回弹过冲）',
    category: 'entrance',
    demo: 'pop',
    tags: ['入场', '回弹'],
    description: '元素从 0 快速放大并略微过冲，再回到正常大小，弹出干脆有弹性。',
    controls: [durationControl(0.5), easeControl('back')],
    implementations: {
      css: `.pop { animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes pop {
  0%   { opacity: 0; transform: scale(0); }
  70%  { opacity: 1; transform: scale(1.12); }
  100% { transform: scale(1); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, scale: 0 },
  { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.5)' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
/>`,
    },
  },

  {
    id: 'flip',
    name: 'Flip 翻转入场',
    category: 'entrance',
    demo: 'flip',
    tags: ['入场', '3D'],
    description: '元素以透视方式绕水平轴翻转 90° 进入，像卡片被翻开。',
    controls: [durationControl(0.7), easeControl('ease-out')],
    implementations: {
      css: `.flip { animation: flipIn 0.7s ease-out both; }
@keyframes flipIn {
  from { opacity: 0; transform: perspective(500px) rotateX(90deg); }
  to   { opacity: 1; transform: perspective(500px) rotateX(0); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, rotationX: 90 },
  { opacity: 1, rotationX: 0, duration: 0.7, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, rotateX: 90 }}
  animate={{ opacity: 1, rotateX: 0 }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'reveal',
    name: 'Reveal 遮罩揭显',
    category: 'entrance',
    demo: 'reveal',
    tags: ['入场', 'clip-path'],
    description: '用 clip-path 从一侧逐步“揭”出内容，像遮罩被拉开，干净利落。',
    controls: [durationControl(0.8), easeControl('ease-out')],
    implementations: {
      css: `.reveal { animation: reveal 0.8s ease-out both; }
@keyframes reveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}`,
      gsap: `gsap.fromTo('.box',
  { clipPath: 'inset(0 100% 0 0)' },
  { clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ clipPath: 'inset(0 100% 0 0)' }}
  animate={{ clipPath: 'inset(0 0 0 0)' }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'zoom',
    name: 'Zoom 缩放入场',
    category: 'entrance',
    demo: 'zoom',
    tags: ['入场', '基础'],
    description: '元素从较大比例缩小到正常大小并渐显，与 ScaleIn 方向相反，强调聚焦。',
    controls: [durationControl(0.6), easeControl('ease-out')],
    implementations: {
      css: `.zoom { animation: zoomIn 0.6s ease-out both; }
@keyframes zoomIn {
  from { opacity: 0; transform: scale(1.6); }
  to   { opacity: 1; transform: scale(1); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, scale: 1.6 },
  { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, scale: 1.6 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'blur-fade',
    name: 'BlurFade 模糊淡入',
    category: 'entrance',
    demo: 'blur-fade',
    tags: ['入场', '模糊'],
    description: '元素从模糊到清晰同时淡入，柔化入场，常用于图片与标题。',
    controls: [durationControl(0.7), easeControl('ease-out')],
    implementations: {
      css: `.blur-fade { animation: blurFade 0.7s ease-out both; }
@keyframes blurFade {
  from { opacity: 0; filter: blur(16px); }
  to   { opacity: 1; filter: blur(0); }
}`,
      gsap: `gsap.fromTo('.box',
  { opacity: 0, filter: 'blur(16px)' },
  { opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, filter: 'blur(16px)' }}
  animate={{ opacity: 1, filter: 'blur(0px)' }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'stagger',
    name: 'Stagger 错落依次动画',
    category: 'entrance',
    demo: 'stagger',
    tags: ['入场', '列表'],
    description: '一组元素按固定间隔依次入场，形成节奏感，适合列表与菜单。',
    controls: [durationControl(0.6)],
    implementations: {
      css: `.stagger .item {
  opacity: 0;
  animation: itemIn 0.6s ease-out both;
}
.stagger .item:nth-child(2) { animation-delay: .13s; }
.stagger .item:nth-child(3) { animation-delay: .26s; }
.stagger .item:nth-child(4) { animation-delay: .39s; }
@keyframes itemIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
      gsap: `gsap.fromTo('.item',
  { opacity: 0, y: 12 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.13 }
)`,
      framer: `import { motion } from 'framer-motion'

const container = {
  show: { transition: staggerChildren: 0.13 },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.div key={i} className="item" variants={item} />
  ))}
</motion.div>`,
    },
  },
]

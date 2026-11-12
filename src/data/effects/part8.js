import { durationControl, rangeControl } from '../controlPresets.js'

// 加载剩余 5 项 + 3D 全部 7 项
export default [
  {
    id: 'skeleton',
    name: 'Skeleton 骨架屏',
    category: 'loading',
    demo: 'skeleton',
    tags: ['加载', '占位'],
    description: '内容加载前用灰色块占位并叠加流光，缓解等待焦虑。',
    controls: [],
    implementations: {
      css: `.skeleton {
  border-radius: 6px;
  background: linear-gradient(90deg,#1c2540 25%,#334066 50%,#1c2540 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}`,
      gsap: `gsap.to('.skeleton', {
  backgroundPosition: '200% 0',
  duration: 1.4,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
  transition={{ duration: 1.4, repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'progress-bar',
    name: 'Progress Bar 线性进度条',
    category: 'loading',
    demo: 'progress-bar',
    tags: ['加载', '进度'],
    description: '轨道内的填充宽度表示进度，数值变化时平滑伸缩。',
    controls: [durationControl(0.6), rangeControl('progress', '进度 (%)', 0, 100, 1, 70)],
    implementations: {
      css: `.bar {
  width: 70%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg,#6366f1,#22d3ee);
  transition: width .6s ease;
}`,
      gsap: `gsap.fromTo('.bar',
  { width: 0 },
  { width: '70%', duration: .6, ease: 'power2.out' }
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  initial={{ width: '0%' }}
  animate={{ width: '70%' }}
  transition={{ duration: .6 }}
/>`,
    },
  },

  {
    id: 'success-check',
    name: 'Success Check 状态动画',
    category: 'loading',
    demo: 'success-check',
    tags: ['加载', '状态'],
    description: '圆环与对勾依次描边绘制，反馈操作成功。',
    controls: [],
    implementations: {
      css: `.circle { stroke-dasharray: 151; animation: drawC .6s ease-out both; }
.check  { stroke-dasharray: 48; animation: drawM .4s .5s ease-out both; }
@keyframes drawC { from { stroke-dashoffset: 151; } to { stroke-dashoffset: 0; } }
@keyframes drawM { from { stroke-dashoffset: 48; } to { stroke-dashoffset: 0; } }`,
      gsap: `gsap.from('.circle', { strokeDashoffset: 151, duration: .6 })
gsap.from('.check', { strokeDashoffset: 48, duration: .4, delay: .5 })`,
      framer: `import { motion } from 'framer-motion'

<motion.circle
  initial={{ strokeDashoffset: 151 }}
  animate={{ strokeDashoffset: 0 }}
  transition={{ duration: .6 }}
/>`,
    },
  },

  {
    id: 'confetti',
    name: 'Confetti 彩屑礼花',
    category: 'loading',
    demo: 'confetti',
    tags: ['庆祝', '彩屑'],
    description: '多片彩色纸屑从顶部旋转飘落，用于庆祝与成功反馈。',
    controls: [],
    implementations: {
      css: `.confetti {
  position: absolute;
  width: 7px; height: 10px;
  animation: confettiFall 1.5s ease-in infinite;
}
@keyframes confettiFall {
  0%   { transform: translateY(-30px) rotate(0); opacity: 1; }
  100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
}`,
      gsap: `gsap.to('.confetti', {
  y: 120,
  rotation: 360,
  opacity: 0,
  duration: 1.5,
  ease: 'power1.in',
  repeat: -1,
  stagger: .12,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{ y: 120, rotate: 360, opacity: 0 }}
  transition={{ duration: 1.5, repeat: Infinity, delay: i * .12 }}
/>`,
    },
  },

  {
    id: 'dots',
    name: 'Dots Loading 点阵加载',
    category: 'loading',
    demo: 'dots',
    tags: ['加载', '点阵'],
    description: '三个圆点依次缩放淡入淡出，轻量的加载指示器。',
    controls: [],
    implementations: {
      css: `.dots span {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #22d3ee;
  animation: dotPulse 1.2s ease-in-out infinite;
}
.dots span:nth-child(2) { animation-delay: .18s; }
.dots span:nth-child(3) { animation-delay: .36s; }
@keyframes dotPulse {
  0%, 100% { opacity: .3; transform: scale(.8); }
  50%      { opacity: 1; transform: scale(1.1); }
}`,
      gsap: `gsap.to('.dots span', {
  opacity: 1,
  scale: 1.1,
  duration: .6,
  yoyo: true,
  repeat: -1,
  stagger: .18,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{ opacity: [.3,1,.3], scale: [.8,1.1,.8] }}
  transition={{ duration: 1.2, repeat: Infinity, delay: i * .18 }}
/>`,
    },
  },

  {
    id: 'spotlight',
    name: 'Spotlight 光标聚光灯',
    category: 'spatial',
    demo: 'spotlight',
    tags: ['鼠标', '高光'],
    description: '径向高光跟随鼠标位置移动，像聚光灯扫过表面。',
    controls: [],
    implementations: {
      css: `.spotlight {
  background: radial-gradient(130px circle at var(--x,50%) var(--y,50%),
    rgba(129,140,248,.28), transparent 70%);
}`,
      gsap: `el.addEventListener('mousemove', (e) => {
  const r = el.getBoundingClientRect()
  gsap.to(el, {
    '--x': e.clientX - r.left,
    '--y': e.clientY - r.top,
    duration: .1,
  })
})`,
      framer: `import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

const x = useMotionValue(200)
const bg = useMotionTemplate\`radial-gradient(130px circle at \${x} ... )\`
<motion.div style={{ background: bg }} />`,
    },
  },

  {
    id: 'cursor-follower',
    name: 'Cursor Follower 光标跟随器',
    category: 'spatial',
    demo: 'cursor-follower',
    tags: ['鼠标', '跟随'],
    description: '小圆点平滑跟随鼠标移动，带轻微延迟，可做自定义光标。',
    controls: [],
    implementations: {
      css: `.follower {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #22d3ee;
  transform: translate(var(--x), var(--y));
  transition: transform .15s ease-out;
}`,
      gsap: `stage.addEventListener('mousemove', (e) => {
  const r = stage.getBoundingClientRect()
  gsap.to('.follower', {
    x: e.clientX - r.left - 9,
    y: e.clientY - r.top - 9,
    duration: .15,
  })
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  className="follower"
  animate={{ x, y }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
/>`,
    },
  },

  {
    id: 'depth-parallax',
    name: 'Depth Parallax 深度视差',
    category: 'spatial',
    demo: 'depth-parallax',
    tags: ['3D', '分层'],
    description: '多层元素分布在不同 Z 轴深度，随鼠标旋转产生纵深。',
    controls: [],
    implementations: {
      css: `.depth { perspective: 700px; }
.depth-inner { transform-style: preserve-3d; }
.depth .l1 { transform: translateZ(18px); }
.depth .l2 { transform: translateZ(36px); }
.depth .l3 { transform: translateZ(54px); }`,
      gsap: `el.addEventListener('mousemove', () =>
  gsap.to('.depth-inner', {
    rotationY: 14,
    rotationX: -14,
    transformPerspective: 700,
    duration: .4,
  })
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div style={{ transformStyle: 'preserve-3d' }} animate={{ rotateX, rotateY }}>
  <motion.span style={{ translateZ: 54 }} />
</motion.div>`,
    },
  },

  {
    id: 'rotate3d',
    name: 'Rotate3D 三维旋转',
    category: 'spatial',
    demo: 'rotate3d',
    tags: ['3D', '旋转'],
    description: '元素在三维空间中绕 X、Y 轴持续旋转，展示立体结构。',
    controls: [durationControl(3)],
    implementations: {
      css: `.rotate3d { animation: rotate3d 3s linear infinite; }
@keyframes rotate3d {
  from { transform: perspective(700px) rotateX(0) rotateY(0); }
  to   { transform: perspective(700px) rotateX(360deg) rotateY(180deg); }
}`,
      gsap: `gsap.to('.box', {
  rotationX: 360,
  rotationY: 180,
  transformPerspective: 700,
  duration: 3,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ rotateX: 360, rotateY: 180 }}
  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'floating-card',
    name: 'Floating Card 3D 悬浮卡片',
    category: 'spatial',
    demo: 'floating-card',
    tags: ['3D', '悬浮'],
    description: '卡片保持 3D 角度上下漂浮，空间悬浮感强。',
    controls: [durationControl(2.6)],
    implementations: {
      css: `.floating-card { animation: floatCard 2.6s ease-in-out infinite; }
@keyframes floatCard {
  0%, 100% { transform: translateY(0) rotateX(8deg) rotateY(-10deg); }
  50%      { transform: translateY(-14px) rotateX(8deg) rotateY(-10deg); }
}`,
      gsap: `gsap.to('.floating-card', {
  y: -14,
  rotationX: 8,
  rotationY: -10,
  duration: 1.3,
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut',
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ y: [0,-14,0], rotateX: 8, rotateY: -10 }}
  transition={{ duration: 2.6, repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'orbit',
    name: 'Orbit 环绕旋转',
    category: 'spatial',
    demo: 'orbit',
    tags: ['3D', '环绕'],
    description: '小球围绕中心点做圆周运动，可用于展示轨道关系。',
    controls: [durationControl(2.4)],
    implementations: {
      css: `.orbit { animation: orbit 2.4s linear infinite; }
@keyframes orbit {
  from { transform: rotate(0) translateX(44px) rotate(0); }
  to   { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
}`,
      gsap: `gsap.to('.orbit', {
  rotation: 360,
  duration: 2.4,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'cube-flip',
    name: 'Cube Flip 立方体翻页',
    category: 'spatial',
    demo: 'cube-flip',
    tags: ['3D', '立方体'],
    description: '立方体在三维空间持续翻转，展示多个面的空间关系。',
    controls: [durationControl(3)],
    implementations: {
      css: `.cube {
  transform-style: preserve-3d;
  animation: cubeSpin 3s linear infinite;
}
@keyframes cubeSpin {
  from { transform: rotateX(0) rotateY(0); }
  to   { transform: rotateX(360deg) rotateY(360deg); }
}`,
      gsap: `gsap.to('.cube', {
  rotationX: 360,
  rotationY: 360,
  transformPerspective: 700,
  duration: 3,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  style={{ transformStyle: 'preserve-3d' }}
  animate={{ rotateX: 360, rotateY: 360 }}
  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },
]

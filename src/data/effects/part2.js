import { durationControl, rangeControl } from '../controlPresets.js'

// 视觉风格、文字、加载、3D 共 6 项
export default [
  {
    id: 'glass',
    name: 'Glassmorphism 毛玻璃',
    category: 'visual',
    demo: 'glass',
    tags: ['风格', '质感'],
    description: '半透明背景叠加背景模糊与细边框，营造毛玻璃质感，适合浮层与卡片。',
    controls: [],
    implementations: {
      css: `.glass {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  border-radius: 16px;
}`,
      gsap: `// 毛玻璃本身是 CSS 质感，GSAP 常用于让它优雅出现
gsap.from('.glass', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: 'power2.out',
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  className="glass"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'gradient-border',
    name: 'Gradient Border 渐变边框',
    category: 'visual',
    demo: 'gradient-border',
    tags: ['风格', '渐变'],
    description: '用渐变作为边框并让其持续流动，内层保持纯色，突出边框的精致感。',
    controls: [durationControl(3)],
    implementations: {
      css: `.gradient-border {
  padding: 2px;
  border-radius: 16px;
  background: linear-gradient(120deg, #818cf8, #22d3ee, #818cf8);
  background-size: 200% 200%;
  animation: borderFlow 3s linear infinite;
}
.gradient-border > .inner {
  border-radius: 14px;
  background: #141b30;
}
@keyframes borderFlow {
  to { background-position: 200% 200%; }
}`,
      gsap: `gsap.to('.gradient-border', {
  backgroundPosition: '200% 200%',
  duration: 3,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  className="gradient-border"
  animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'gradient-text',
    name: 'Gradient Text Flow 渐变流动文字',
    category: 'text',
    demo: 'gradient-text',
    tags: ['文字', '渐变'],
    description: '文字填充多色渐变并让渐变持续横向流动，适合标题与强调性文案。',
    controls: [durationControl(3)],
    implementations: {
      css: `.gradient-text {
  background: linear-gradient(90deg, #818cf8, #22d3ee, #f0abfc, #818cf8);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: textFlow 3s linear infinite;
}
@keyframes textFlow {
  to { background-position: 200% center; }
}`,
      gsap: `gsap.to('.gradient-text', {
  backgroundPosition: '200% center',
  duration: 3,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  className="gradient-text"
  animate={{ backgroundPosition: ['0% center', '200% center'] }}
  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'spinner',
    name: 'Spinner 加载旋转器',
    category: 'loading',
    demo: 'spinner',
    tags: ['加载', '常用'],
    description: '圆环只保留一段高亮描边并匀速旋转，是最常见的加载等待指示器。',
    controls: [durationControl(0.9)],
    implementations: {
      css: `.spinner {
  width: 52px; height: 52px;
  border-radius: 50%;
  border: 4px solid #273152;
  border-top-color: #22d3ee;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}`,
      gsap: `gsap.to('.spinner', {
  rotation: 360,
  duration: 0.9,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  className="spinner"
  animate={{ rotate: 360 }}
  transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'progress-ring',
    name: 'Progress Ring 环形进度条',
    category: 'loading',
    demo: 'progress-ring',
    tags: ['加载', '进度'],
    description: '基于 SVG 圆环，通过描边偏移量表示进度，数值变化时平滑过渡。',
    controls: [
      durationControl(0.6),
      rangeControl('progress', '进度 (%)', 0, 100, 1, 70),
    ],
    implementations: {
      css: `<!-- 周长 C = 2πr ≈ 289，70% 时 offset = 289 × 0.3 ≈ 86.7 -->
<svg viewBox="0 0 100 100">
  <circle class="ring-track" cx="50" cy="50" r="46"
          fill="none" stroke="#1c2540" stroke-width="8"/>
  <circle class="ring-bar" cx="50" cy="50" r="46"
          fill="none" stroke="url(#ringGrad)" stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="289" stroke-dashoffset="86.7"/>
</svg>

.ring-bar { transition: stroke-dashoffset 0.6s ease; }`,
      gsap: `const C = 2 * Math.PI * 46
gsap.to('.ring-bar', {
  strokeDashoffset: C * (1 - 0.7),
  duration: 0.6,
  ease: 'power2.out',
})`,
      framer: `import { motion } from 'framer-motion'

const C = 2 * Math.PI * 46

<motion.circle
  className="ring-bar"
  strokeDasharray={C}
  animate={{ strokeDashoffset: C * (1 - progress / 100) }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>`,
    },
  },

  {
    id: 'tilt',
    name: 'Tilt 3D 倾斜悬浮',
    category: 'interaction',
    demo: 'tilt',
    tags: ['3D', '鼠标'],
    description: '根据鼠标在元素上的位置实时计算 3D 旋转角度，鼠标离开后回正，立体感强。',
    controls: [
      durationControl(0.2),
      rangeControl('amount', '最大倾角 (°)', 4, 24, 1, 12),
    ],
    implementations: {
      css: `.tilt {
  transform: perspective(600px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
  transition: transform 0.2s ease;
}`,
      gsap: `const el = document.querySelector('.tilt')
el.addEventListener('mousemove', (e) => {
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  gsap.to(el, {
    rotationY: px * 12,
    rotationX: -py * 12,
    duration: 0.2,
  })
})
el.addEventListener('mouseleave', () =>
  gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.2 })
)`,
      framer: `import { useState } from 'react'
import { motion } from 'framer-motion'

const [rot, setRot] = useState({ rx: 0, ry: 0 })

<motion.div
  onMouseMove={(e) => {
    const b = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width - 0.5
    const py = (e.clientY - b.top) / b.height - 0.5
    setRot({ rx: -py * 12, ry: px * 12 })
  }}
  onMouseLeave={() => setRot({ rx: 0, ry: 0 })}
  animate={{ rotateX: rot.rx, rotateY: rot.ry }}
  transition={{ duration: 0.2 }}
/>`,
    },
  },
]

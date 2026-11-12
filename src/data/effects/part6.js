import { durationControl } from '../controlPresets.js'

// 视觉风格剩余 6 项
export default [
  {
    id: 'neumorphism',
    name: 'Neumorphism 新拟态',
    category: 'visual',
    demo: 'neumorphism',
    tags: ['风格', '质感'],
    description: '元素与背景同色，靠双向阴影营造柔软凸起，按下时变凹陷。',
    controls: [],
    implementations: {
      css: `.neumorphic {
  background: #0f1528;
  border-radius: 50%;
  box-shadow: 8px 8px 16px #050813, -8px -8px 16px #19223d;
}
.neumorphic:active {
  box-shadow: inset 7px 7px 14px #050813, inset -7px -7px 14px #19223d;
}`,
      gsap: `el.addEventListener('mousedown', () =>
  gsap.to(el, {
    boxShadow: 'inset 7px 7px 14px #050813, inset -7px -7px 14px #19223d',
    duration: .2,
  })
)
el.addEventListener('mouseup', () =>
  gsap.to(el, {
    boxShadow: '8px 8px 16px #050813, -8px -8px 16px #19223d',
    duration: .2,
  })
)`,
      framer: `import { motion } from 'framer-motion'

<motion.button
  whileTap={{
    boxShadow: 'inset 7px 7px 14px #050813, inset -7px -7px 14px #19223d',
  }}
/>`,
    },
  },

  {
    id: 'morph',
    name: 'Morph 形变过渡',
    category: 'visual',
    demo: 'morph',
    tags: ['风格', '形变'],
    description: '元素的圆角（形状）持续平滑变化，像液态有机形态。',
    controls: [durationControl(3)],
    implementations: {
      css: `.morph { animation: morph 3s ease-in-out infinite; }
@keyframes morph {
  0%, 100% { border-radius: 20% 80% 70% 30% / 30% 30% 70% 70%; }
  50%      { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
}`,
      gsap: `gsap.to('.morph', {
  borderRadius: '70% 30% 30% 70%',
  duration: 1.5,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{
    borderRadius: [
      '20% 80% 70% 30%',
      '70% 30% 30% 70%',
      '20% 80% 70% 30%',
    ],
  }}
  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'motion-blur',
    name: 'Motion Blur 运动模糊',
    category: 'visual',
    demo: 'motion-blur',
    tags: ['风格', '模糊'],
    description: '元素快速移动时叠加方向模糊，强化速度感，停下时模糊消失。',
    controls: [durationControl(1.6)],
    implementations: {
      css: `.motion-blur { animation: motionBlur 1.6s ease-in-out infinite; }
@keyframes motionBlur {
  0%   { transform: translateX(-70px); filter: blur(0); }
  40%  { transform: translateX(70px); filter: blur(4px); }
  100% { transform: translateX(-70px); filter: blur(0); }
}`,
      gsap: `gsap.to('.box', {
  x: 70,
  filter: 'blur(4px)',
  duration: .8,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  animate={{
    x: [-70, 70, -70],
    filter: ['blur(0)', 'blur(4px)', 'blur(0)'],
  }}
  transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'parallax',
    name: 'Parallax 视差滚动',
    category: 'visual',
    demo: 'parallax',
    tags: ['风格', '分层'],
    description: '多层元素以不同速度移动，产生纵深视差，这里用鼠标移动驱动。',
    controls: [],
    implementations: {
      css: `.parallax .layer {
  position: absolute;
  will-change: transform;
}`,
      gsap: `container.addEventListener('mousemove', (e) => {
  const r = container.getBoundingClientRect()
  const p = (e.clientX - r.left) / r.width - .5
  gsap.to('.layer-1', { x: p * 12, duration: .3 })
  gsap.to('.layer-2', { x: p * 28, duration: .3 })
  gsap.to('.layer-3', { x: p * 46, duration: .3 })
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  className="layer"
  animate={{ x: p * factor }}
  transition={{ duration: .3 }}
/>`,
    },
  },

  {
    id: 'glitch',
    name: 'Glitch 故障风',
    category: 'visual',
    demo: 'glitch',
    tags: ['风格', '赛博'],
    description: '元素快速错位抖动，模拟信号故障，赛博朋克风格常用。',
    controls: [durationControl(0.8)],
    implementations: {
      css: `.glitch { animation: glitch .8s steps(1) infinite; }
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}`,
      gsap: `gsap.to('.glitch', {
  keyframes: {
    x: [0, -2, -2, 2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
  },
  duration: .8,
  ease: 'none',
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{
    x: [0, -2, -2, 2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
  }}
  transition={{ duration: .8, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },

  {
    id: 'aberration',
    name: 'Chromatic Aberration 色差色散',
    category: 'visual',
    demo: 'aberration',
    tags: ['风格', '色差'],
    description: '用双向彩色投影模拟镜头色散，色彩错位并轻微变化。',
    controls: [durationControl(1.2)],
    implementations: {
      css: `.aberration { animation: aberration 1.2s steps(1) infinite; }
@keyframes aberration {
  0%, 100% { text-shadow: -1.5px 0 #f0abfc, 1.5px 0 #22d3ee; }
  25% { text-shadow: 1.5px 0 #f0abfc, -1.5px 0 #22d3ee; }
  50% { text-shadow: -2px 1px #f0abfc, 2px -1px #22d3ee; }
}`,
      gsap: `gsap.to('.aberration', {
  textShadow: '1.5px 0 #f0abfc, -1.5px 0 #22d3ee',
  duration: .6,
  ease: 'none',
  yoyo: true,
  repeat: -1,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.span
  animate={{
    textShadow: [
      '-1.5px 0 #f0abfc, 1.5px 0 #22d3ee',
      '2px 0 #f0abfc, -2px 0 #22d3ee',
    ],
  }}
  transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
/>`,
    },
  },
]

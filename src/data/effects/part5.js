import { durationControl, rangeControl } from '../controlPresets.js'

// 交互反馈剩余 8 项（Tilt 复用已有演示）
export default [
  {
    id: 'ripple',
    name: 'Ripple 涟漪点击',
    category: 'interaction',
    demo: 'ripple',
    tags: ['交互', 'Material'],
    description: '点击位置产生向外扩散的圆形涟漪并淡出，是 Material 风格的经典反馈。',
    controls: [],
    implementations: {
      css: `.ripple { position: relative; overflow: hidden; }
.ripple .wave {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,.5);
  animation: ripple .6s ease-out forwards;
}
@keyframes ripple {
  from { opacity: .6; transform: scale(0); }
  to   { opacity: 0; transform: scale(2.5); }
}`,
      gsap: `button.addEventListener('click', (e) => {
  const c = document.createElement('span')
  const d = Math.max(button.clientWidth, button.clientHeight)
  c.style.width = c.style.height = d + 'px'
  c.style.left = e.offsetX - d / 2 + 'px'
  c.style.top = e.offsetY - d / 2 + 'px'
  gsap.fromTo(c,
    { scale: 0, opacity: .6 },
    { scale: 2.5, opacity: 0, duration: .6, onComplete: () => c.remove() }
  )
  button.appendChild(c)
})`,
      framer: `import { motion } from 'framer-motion'

<motion.button
  className="ripple"
  whileTap={{ scale: .97 }}
  onClick={addRipple}
/>`,
    },
  },

  {
    id: 'magnetic',
    name: 'Magnetic 磁吸悬浮',
    category: 'interaction',
    demo: 'magnetic',
    tags: ['交互', '磁吸'],
    description: '元素会被鼠标轻微“吸”过去，鼠标离开后回正，常用于按钮与链接。',
    controls: [],
    implementations: {
      css: `.magnetic {
  transform: translate(var(--mx, 0), var(--my, 0));
  transition: transform .3s ease;
}`,
      gsap: `wrap.addEventListener('mousemove', (e) => {
  const r = wrap.getBoundingClientRect()
  gsap.to(btn, {
    x: (e.clientX - r.left - r.width / 2) * .4,
    y: (e.clientY - r.top - r.height / 2) * .4,
    duration: .3,
  })
})
wrap.addEventListener('mouseleave', () =>
  gsap.to(btn, { x: 0, y: 0, duration: .3 })
)`,
      framer: `import { useState } from 'react'
import { motion } from 'framer-motion'

const [p, setP] = useState({ x: 0, y: 0 })

<motion.div
  onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setP({
      x: (e.clientX - r.left - r.width / 2) * .4,
      y: (e.clientY - r.top - r.height / 2) * .4,
    })
  }}
  animate={{ x: p.x, y: p.y }}
  transition={{ duration: .3 }}
/>`,
    },
  },

  {
    id: 'press',
    name: 'Press Feedback 按压反馈',
    category: 'interaction',
    demo: 'press',
    tags: ['交互', '基础'],
    description: '按下时元素轻微缩小，松开恢复，提供明确的“被按下”触感。',
    controls: [durationControl(0.15)],
    implementations: {
      css: `.press { transition: transform .15s ease; }
.press:active { transform: scale(.9); }`,
      gsap: `el.addEventListener('mousedown', () =>
  gsap.to(el, { scale: .9, duration: .15 })
)
el.addEventListener('mouseup', () =>
  gsap.to(el, { scale: 1, duration: .15 })
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div whileTap={{ scale: .9 }} />`,
    },
  },

  {
    id: 'swipe',
    name: 'Swipe 侧滑关闭',
    category: 'interaction',
    demo: 'swipe',
    tags: ['交互', '手势'],
    description: '按住横向拖动，超过阈值后滑出并消失，随后自动复位，常见于卡片关闭。',
    controls: [],
    implementations: {
      css: `.swipe {
  transform: translateX(var(--x, 0));
  transition: transform .3s ease;
}`,
      gsap: `gsap.registerPlugin(Draggable)
Draggable.create('.swipe', {
  type: 'x',
  onDragEnd() {
    if (Math.abs(this.x) > 70) {
      gsap.to(this.target, { x: this.x > 0 ? 200 : -200, opacity: 0 })
    }
  },
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(_, info) => {
    if (Math.abs(info.offset.x) > 70) setGone(true)
  }}
/>`,
    },
  },

  {
    id: 'drag',
    name: 'Drag 拖拽',
    category: 'interaction',
    docs: ['交互', '手势'],
    demo: 'drag',
    tags: ['交互', '手势'],
    description: '元素可被自由拖动到指定范围内，松手停留，是最基础的拖拽交互。',
    controls: [],
    implementations: {
      css: `.drag { position: relative; cursor: grab; }
.drag:active { cursor: grabbing; }`,
      gsap: `gsap.registerPlugin(Draggable)
Draggable.create('.drag', {
  bounds: '.stage',
  inertia: true,
})`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  drag
  dragConstraints={{ left: -80, right: 80, top: -60, bottom: 60 }}
/>`,
    },
  },

  {
    id: 'hold',
    name: 'Hold Progress 长按填充',
    category: 'interaction',
    demo: 'hold',
    tags: ['交互', '长按'],
    description: '按住后进度从下往上填充，松开立即清零，可用于长按确认或录制。',
    controls: [durationControl(1.2)],
    implementations: {
      css: `.hold .fill { height: 0; transition: height 1.2s linear; }
.hold.pressing .fill { height: 100%; }`,
      gsap: `el.addEventListener('pointerdown', () =>
  gsap.to(fill, { height: '100%', duration: 1.2, ease: 'none' })
)
el.addEventListener('pointerup', () =>
  gsap.to(fill, { height: '0%', duration: .2 })
)`,
      framer: `import { motion } from 'framer-motion'

<motion.div
  className="fill"
  animate={{ height: pressing ? '100%' : '0%' }}
  transition={{ duration: pressing ? 1.2 : .2, ease: 'linear' }}
/>`,
    },
  },

  {
    id: 'button-morph',
    name: 'Button Morph 按钮形变',
    category: 'interaction',
    demo: 'button-morph',
    tags: ['交互', '形变'],
    description: '点击后按钮在两种形态间平滑变化（如圆角与文案），反馈操作结果。',
    controls: [durationControl(0.4)],
    implementations: {
      css: `.morph {
  border-radius: 12px;
  transition: border-radius .4s ease;
}
.morph.sent { border-radius: 21px; }`,
      gsap: `btn.addEventListener('click', () =>
  gsap.to(btn, { borderRadius: 21, duration: .4 })
)`,
      framer: `import { motion } from 'framer-motion'

<motion.button
  animate={{ borderRadius: sent ? 21 : 12 }}
  transition={{ duration: .4 }}
/>`,
    },
  },
]

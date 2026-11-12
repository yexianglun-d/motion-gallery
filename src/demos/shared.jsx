// 演示组件共享辅助：缓动映射、通用演示元素、参数读取
import { useEffect, useState } from 'react'

// 自动演示：平滑周期变化的归一化坐标 [x, y]，范围 -1~1（用于鼠标跟随/倾斜/磁吸等）
export function useAutoMove(enabled, period = 2600) {
  const [v, setV] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (!enabled) return undefined
    let raf
    const start = performance.now()
    const loop = (now) => {
      const t = ((now - start) / period) * Math.PI * 2
      setV({ x: Math.sin(t), y: Math.sin(t * 0.8 + Math.PI / 3) })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [enabled, period])
  return [v.x, v.y]
}

// 自动演示：0~1 循环进度（用于按压/长按填充/状态切换等）
export function useAutoPulse(enabled, period = 1800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!enabled) return undefined
    let raf
    const start = performance.now()
    const loop = (now) => {
      const t = ((now - start) % period) / period
      setV(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [enabled, period])
  return v
}

// 控件中的语义缓动 → CSS timing-function
export const EASE_CSS = {
  linear: 'linear',
  ease: 'ease',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
  'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}

// 语义缓动 → GSAP ease
export const EASE_GSAP = {
  linear: 'none',
  ease: 'power1.inOut',
  'ease-out': 'power2.out',
  'ease-in': 'power2.in',
  'ease-in-out': 'power2.inOut',
  back: 'back.out(1.7)',
}

// 语义缓动 → Framer Motion ease
export const EASE_FRAMER = {
  linear: 'linear',
  ease: 'easeInOut',
  'ease-out': [0.16, 1, 0.3, 1],
  'ease-in': [0.7, 0, 0.84, 0],
  'ease-in-out': [0.65, 0, 0.35, 1],
  back: [0.34, 1.56, 0.64, 1],
}

export function num(params, key, fallback) {
  const v = Number(params?.[key])
  return Number.isFinite(v) ? v : fallback
}

export function str(params, key, fallback) {
  const v = params?.[key]
  return v === undefined || v === '' ? fallback : v
}

// 通用演示主体色块
export function Blob({ size = 64, className = '', style, children, ...rest }) {
  return (
    <div
      className={
        'flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-aqua-500 font-semibold text-white shadow-glow ' +
        className
      }
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

// 演示舞台居中容器
export function Stage({ className = '', children, style }) {
  return (
    <div
      className={
        'flex h-full w-full items-center justify-center overflow-hidden p-6 ' + className
      }
      style={style}
    >
      {children}
    </div>
  )
}

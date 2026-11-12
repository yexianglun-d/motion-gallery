// 演示组件共享辅助：缓动映射、通用演示元素、参数读取

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

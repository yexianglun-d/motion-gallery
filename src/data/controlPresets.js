// 控件（参数）预设工厂，保证各动效参数配置方式一致
export const durationControl = (def = 0.6) => ({
  key: 'duration',
  label: '时长 (秒)',
  type: 'range',
  min: 0.2,
  max: 2,
  step: 0.1,
  default: def,
})

export const easeControl = (def = 'ease-out') => ({
  key: 'ease',
  label: '缓动',
  type: 'select',
  options: ['ease-out', 'ease-in-out', 'ease-in', 'back', 'linear'],
  default: def,
})

export const rangeControl = (key, label, min, max, step, def) => ({
  key,
  label,
  type: 'range',
  min,
  max,
  step,
  default: def,
})

export const selectControl = (key, label, options, def) => ({
  key,
  label,
  type: 'select',
  options,
  default: def,
})

// 从控件定义生成默认参数对象
export function defaultsFromControls(controls = []) {
  const result = {}
  controls.forEach((c) => {
    result[c.key] = c.default
  })
  return result
}

import part1 from './part1.js'
import part2 from './part2.js'
import part3 from './part3.js'
import part4 from './part4.js'
import part5 from './part5.js'
import part6 from './part6.js'
import part7 from './part7.js'
import part8 from './part8.js'
import { defaultsFromControls } from '../controlPresets.js'

// 全部动效（配置化汇总）。新增动效：在 part 文件追加或新建 part 后在此引入。
export const EFFECTS = [
  ...part1,
  ...part2,
  ...part3,
  ...part4,
  ...part5,
  ...part6,
  ...part7,
  ...part8,
]

const BY_ID = new Map(EFFECTS.map((e) => [e.id, e]))

export function getEffectById(id) {
  return BY_ID.get(id)
}

export function effectsByCategory(categoryId) {
  return EFFECTS.filter((e) => e.category === categoryId)
}

export function countByCategory(categoryId) {
  return EFFECTS.filter((e) => e.category === categoryId).length
}

// 取某个动效的默认参数
export function defaultParams(effect) {
  return defaultsFromControls(effect.controls)
}

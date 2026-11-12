// 七大动效分类。新增分类只需在此追加，并在动效数据中使用对应 id。
export const CATEGORIES = [
  {
    id: 'entrance',
    name: '入场 / 出场',
    short: '入场',
    description: '元素进入或离开视图时的显隐、位移、缩放入场动画',
  },
  {
    id: 'loop',
    name: '循环动效',
    short: '循环',
    description: '持续重复播放的呼吸、旋转、抖动、漂浮等动效',
  },
  {
    id: 'interaction',
    name: '交互反馈',
    short: '交互',
    description: '响应 hover、点击、按压、开关等用户操作的反馈动效',
  },
  {
    id: 'visual',
    name: '视觉风格特效',
    short: '风格',
    description: '毛玻璃、渐变边框、故障风、视差等视觉风格类效果',
  },
  {
    id: 'text',
    name: '文字专项动效',
    short: '文字',
    description: '文字拆分、渐变流动、描边、发光等文字专项动效',
  },
  {
    id: 'loading',
    name: '加载与进度',
    short: '加载',
    description: '骨架屏、旋转器、进度条、状态反馈等加载动效',
  },
  {
    id: 'spatial',
    name: '3D / 空间 / 鼠标',
    short: '3D',
    description: '聚光灯、3D 倾斜、空间旋转、光标跟随等空间效果',
  },
]

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id)

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id)
}

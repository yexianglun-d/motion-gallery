import { Blob, Stage, EASE_CSS, num, str } from './shared.jsx'

// 通用单元素入场组件
function singleEntrance(keyframe, extraStyle) {
  return function Entrance({ params, replayKey, active, compact }) {
    const d = num(params, 'duration', 0.6)
    const e = EASE_CSS[str(params, 'ease', 'ease-out')]
    const size = compact ? 44 : 64
    if (!active) return <Stage><Blob size={size} style={{ opacity: 0 }} /></Stage>
    return (
      <Stage>
        <Blob
          key={replayKey}
          size={size}
          style={{ animation: `${keyframe} ${d}s ${e} both`, ...extraStyle }}
        />
      </Stage>
    )
  }
}

// 错落依次：多个元素按延迟依次入场
function StaggerDemo({ params, replayKey, active, compact }) {
  const d = num(params, 'duration', 0.6)
  const items = [0, 1, 2, 3]
  const gap = d * 0.22
  return (
    <Stage>
      <div className="flex items-center gap-2.5" key={replayKey}>
        {items.map((i) => (
          <Blob
            key={i}
            size={compact ? 30 : 40}
            style={
              active
                ? {
                    animation: `demo-fade ${d}s ${EASE_CSS['ease-out']} both`,
                    animationDelay: `${i * gap}s`,
                  }
                : { opacity: 0 }
            }
          />
        ))}
      </div>
    </Stage>
  )
}

export default {
  bounce: singleEntrance('demo-bounce'),
  pop: singleEntrance('demo-pop'),
  flip: singleEntrance('demo-flip'),
  reveal: singleEntrance('demo-reveal'),
  zoom: singleEntrance('demo-zoom'),
  'blur-fade': singleEntrance('demo-blur-fade'),
  stagger: StaggerDemo,
}

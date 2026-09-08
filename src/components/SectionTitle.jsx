import { Reveal } from './MotionSystem'
import { cn } from '../lib/utils'

export default function SectionTitle({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  return (
    <Reveal
      className={cn(
        'mb-14 flex flex-col gap-5 md:mb-20',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="eyebrow">
        {index && <span className="font-mono text-accent">{index}</span>}
        {eyebrow}
      </span>
      <h2 className="display max-w-3xl text-[clamp(30px,4.5vw,52px)]">{title}</h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-body md:text-lg">{description}</p>
      )}
    </Reveal>
  )
}
import { cn } from '@/lib/utils'
import { Badge } from './Badge'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <h2
        className={cn(
          'font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight',
          light ? 'text-dark' : 'text-content',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'font-body text-base md:text-lg max-w-2xl leading-relaxed',
            light ? 'text-dark/60' : 'text-muted',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

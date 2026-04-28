import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'purple' | 'outline'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full text-xs font-body font-medium tracking-wide px-3 py-1',
        {
          'bg-purple-dim text-purple-light border border-purple/30': variant === 'default',
          'bg-purple text-white': variant === 'purple',
          'border border-purple/30 text-muted': variant === 'outline',
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

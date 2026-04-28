import { cn } from '@/lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild: _asChild, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'bg-purple text-white hover:bg-purple-light active:bg-purple-dark shadow-lg hover:shadow-purple/30':
              variant === 'primary',
            'border border-purple/40 text-content hover:border-purple hover:bg-purple-dim bg-transparent':
              variant === 'outline',
            'text-muted hover:text-content bg-transparent':
              variant === 'ghost',
          },
          {
            'text-sm px-4 py-2 h-9':     size === 'sm',
            'text-base px-6 py-3 h-12':  size === 'md',
            'text-lg px-8 py-4 h-14':    size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export { Button }

import { cva, } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // Special CTA variants
        ctaPrimary: 'bg-white text-blue-600 hover:bg-gray-100',
        ctaOutline: 'border-white text-white hover:bg-white/10',
      },
      size: {
        default: 'px-8 py-4 text-lg',
        sm: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export { buttonVariants }
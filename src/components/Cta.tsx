import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
      <div className="container @container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl @lg:text-4xl font-bold">
            Ready for Autonomous Artistry?
          </h2>
          <p className="mt-4 text-lg @lg:text-xl opacity-90">
            Join the elite brands transforming their social presence with our AI concierge
          </p>
          <div className="mt-10 flex flex-col @sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: 'default', variant: 'default' }),
                'bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700'
              )}
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className={cn(
                buttonVariants({ size: 'default', variant: 'outline' }),
                'border-white text-white hover:bg-white/10'
              )}
            >
              Book Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
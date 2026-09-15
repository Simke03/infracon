'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentProps, MouseEvent, useEffect } from 'react'

// Resolved once the next route has committed, so the View Transition can
// snapshot the new page. Browsers without the API just navigate normally.
let finishPending: (() => void) | null = null

export function useFinishPageTransition() {
  const pathname = usePathname()
  useEffect(() => {
    if (!finishPending) return
    const done = finishPending
    finishPending = null
    // a macrotask, not rAF: rAF never fires in a background tab and would stall the swap
    setTimeout(done, 0)
  }, [pathname])
}

type Props = ComponentProps<typeof Link> & { href: string }

export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    const plainClick = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
    if (e.defaultPrevented || !plainClick || !('startViewTransition' in document)) return
    e.preventDefault()
    const transition = (
      document as Document & { startViewTransition: (cb: () => Promise<void>) => { ready: Promise<void> } }
    ).startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          finishPending = resolve
          router.push(href)
          setTimeout(resolve, 1200) // never leave the page frozen if the route stalls
        })
    )
    // Skipped transitions (hidden tab, rapid clicks) reject `ready`; the navigation still happens
    transition.ready.catch(() => {})
  }

  return <Link href={href} onClick={handleClick} {...rest} />
}

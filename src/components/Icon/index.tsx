import type { SVGProps } from 'react'

type IconName = 'moon' | 'sun' | 'search' | 'plus' | 'trash' | 'users'

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      {name === 'moon' && <path strokeLinecap="round" strokeLinejoin="round" d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />}
      {name === 'sun' && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
        </>
      )}
      {name === 'search' && (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path strokeLinecap="round" d="M16 16.5 20.5 21" />
        </>
      )}
      {name === 'plus' && <path strokeLinecap="round" d="M12 5v14M5 12h14" />}
      {name === 'trash' && (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5h6v2M8 7l1 12h6l1-12" />
      )}
      {name === 'users' && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3.5 19c.6-2.6 2.8-4 5.5-4s4.9 1.4 5.5 4" />
          <circle cx="17" cy="9" r="2.2" />
          <path strokeLinecap="round" d="M16.2 15c1.8.3 3.2 1.4 3.8 3.2" />
        </>
      )}
    </svg>
  )
}

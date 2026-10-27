import type { ReactNode } from 'react'

import type { BaseIconProps } from './BaseIcon'
import { BaseIcon } from './BaseIcon'

type IconProps = BaseIconProps

const icon = (children: ReactNode) => (props: IconProps) => <BaseIcon {...props}>{children}</BaseIcon>

export const AsideIcon = icon(
  <>
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
    <path d='M15 3v18' />
  </>,
)

export const BurgerIcon = icon(
  <>
    <path d='M4 6h16' />
    <path d='M4 12h16' />
    <path d='M4 18h16' />
  </>,
)

export const CheckIcon = icon(<path d='M5 12.5l4.5 4.5L19 7.5' />)

export const CloseIcon = icon(
  <>
    <path d='M18 6L6 18' />
    <path d='M6 6l12 12' />
  </>,
)

export const CopyIcon = icon(
  <>
    <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
  </>,
)

export const HtmlIcon = icon(
  <>
    <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
    <polyline points='14 2 14 8 20 8' />
    <polyline points='10 13 8 15 10 17' />
    <polyline points='14 13 16 15 14 17' />
  </>,
)

export const JsonIcon = icon(
  <>
    <path d='M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z' />
    <path d='M14 2V8H20' />
    <path d='M10 13C8.5 13 8.5 14.5 10 15C8.5 15.5 8.5 17 10 17' />
    <path d='M14 13C15.5 13 15.5 14.5 14 15C15.5 15.5 15.5 17 14 17' />
  </>,
)

export const LinkIcon = icon(
  <>
    <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
    <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
  </>,
)

export const MonitorIcon = icon(
  <>
    <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
    <path d='M8 21h8' />
    <path d='M12 17v4' />
  </>,
)

export const MoonIcon = icon(<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />)

export const SearchIcon = icon(
  <>
    <circle cx='11' cy='11' r='7' />
    <path d='m20 20-3.5-3.5' />
  </>,
)

export const SideIcon = icon(
  <>
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
    <path d='M9 3v18' />
  </>,
)

export const SuccessIcon = icon(<path d='M20 6L9 17l-5-5' />)

export const SunIcon = icon(
  <>
    <circle cx='12' cy='12' r='5' />
    <line x1='12' y1='1' x2='12' y2='3' />
    <line x1='12' y1='21' x2='12' y2='23' />
    <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
    <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
    <line x1='1' y1='12' x2='3' y2='12' />
    <line x1='21' y1='12' x2='23' y2='12' />
    <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
    <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
  </>,
)

export const TerminalIcon = icon(
  <>
    <polyline points='4 17 10 11 4 5' />
    <line x1='12' y1='19' x2='20' y2='19' />
  </>,
)

export const TypeScriptIcon = icon(
  <>
    <path d='M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z' />
    <path d='M14 2V8H20' />
    <path d='M9 14H12' />
    <path d='M10.5 14V19' />
    <path d='M16.1762 14.3699C15.1575 13.5497 14 14.2272 14 15.1035C14 15.9799 14.3616 16.4789 15.195 16.4789C16.0283 16.4789 16.4945 16.8806 16.5 17.7326C16.5 18.6089 15.2848 19.6758 14.1229 18.4372' />
  </>,
)

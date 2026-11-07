import { Icon, type IconProps } from './Icon'

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='12' cy='8' r='4' stroke='currentColor' strokeWidth='2' />
      <path
        d='M5 20.5V20c0-3 3-5 7-5s7 2 7 5v.5z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </Icon>
  )
}

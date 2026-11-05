import { Icon, type IconProps } from './Icon'

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle
        cx='10.5'
        cy='10.5'
        r='7.5'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        d='M16 16l5 5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </Icon>
  )
}

import { Icon, type IconProps } from './Icon'

export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
      <path
        d='M12 7.5v5.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle cx='12' cy='16.5' r='1.25' fill='currentColor' />
    </Icon>
  )
}

import { createElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const PlusIcon = createElement(
  'svg',
  {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
  },
  createElement('path', { d: 'M12 5v14M5 12h14', strokeLinecap: 'round' })
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'text'],
    },
    size: {
      control: 'radio',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Button',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Button',
  },
}

export const WithIcon: Story = {
  args: {
    icon: PlusIcon,
    children: 'Button',
  },
}

export const IconOnly: Story = {
  args: {
    'iconOnly': true,
    'icon': PlusIcon,
    'aria-label': 'Add item',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
}

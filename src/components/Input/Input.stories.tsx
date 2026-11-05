import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { AlertIcon, Icon, UserIcon } from '../../icons'
import { Input } from './Input'

const MailIcon = () => (
  <Icon>
    <rect
      x='3'
      y='5'
      width='18'
      height='14'
      rx='2'
      stroke='currentColor'
      strokeWidth='2'
    />
    <path
      d='M3.5 6.5 12 13l8.5-6.5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinejoin='round'
    />
  </Icon>
)

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    'placeholder': 'Placeholder',
    'aria-label': 'Name',
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    icon: { control: false },
    errorIcon: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Name' })
    await userEvent.type(input, 'Ada')
    await expect(input).toHaveValue('Ada')
    await expect(input).toHaveFocus()
  },
}

export const Filled: Story = {
  args: { defaultValue: 'Ada Lovelace' },
}

export const ErrorState: Story = {
  args: { defaultValue: 'Ada Lovelace', error: true },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Name' })
    await expect(input).toHaveAttribute('aria-invalid', 'true')
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Name' })
    await expect(input).toBeDisabled()
    await userEvent.type(input, 'Ada')
    await expect(input).toHaveValue('')
  },
}

export const WithIcon: Story = {
  args: {
    'icon': <UserIcon />,
    'placeholder': 'Username',
    'aria-label': 'Username',
  },
}

export const WithIconError: Story = {
  args: {
    'icon': <UserIcon />,
    'defaultValue': 'ada',
    'error': true,
    'aria-label': 'Username',
  },
}

export const CustomIcon: Story = {
  args: {
    'icon': <MailIcon />,
    'type': 'email',
    'placeholder': 'Email',
    'aria-label': 'Email',
  },
}

export const CustomErrorIcon: Story = {
  args: {
    'defaultValue': 'ada@',
    'error': true,
    'errorIcon': <AlertIcon title='Invalid email' />,
    'aria-label': 'Email',
  },
}

export const WithoutErrorIcon: Story = {
  args: { defaultValue: 'ada@', error: true, errorIcon: null },
}

export const CustomColors: Story = {
  args: {
    'icon': <UserIcon />,
    'placeholder': 'Username',
    'aria-label': 'Username',
    'style': {
      '--flowi-input-stroke': 'var(--flowi-color-green-300)',
      '--flowi-input-fill': 'var(--flowi-color-green-50)',
    },
  },
}

export const Controlled: Story = {
  render: function ControlledInput(args) {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <Input
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value.toUpperCase())}
        />
        <output>Value: {value}</output>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Name' })
    await userEvent.type(input, 'ada')
    await expect(input).toHaveValue('ADA')
    await expect(canvas.getByText('Value: ADA')).toBeInTheDocument()
  },
}

export const WithVisibleLabel: Story = {
  args: { 'aria-label': undefined, 'placeholder': 'ada@example.com' },
  render: (args) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <label htmlFor='input-email'>Email</label>
      <Input {...args} id='input-email' type='email' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('textbox', { name: 'Email' })
    ).toBeInTheDocument()
  },
}

export const FocusFromSlot: Story = {
  args: { 'icon': <UserIcon />, 'aria-label': 'Username' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slot = canvasElement.querySelector('span[aria-hidden="true"]')
    await userEvent.click(slot as Element)
    await expect(canvas.getByRole('textbox')).toHaveFocus()
  },
}

export const ForwardsRef: Story = {
  render: function RefInput(args) {
    return (
      <Input
        {...args}
        ref={(node) => {
          if (node) node.dataset.refAttached = 'true'
        }}
      />
    )
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Name' })
    await expect(input).toHaveAttribute('data-ref-attached', 'true')
  },
}

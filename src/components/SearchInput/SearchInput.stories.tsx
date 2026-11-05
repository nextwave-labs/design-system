import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Icon } from '../../icons'
import { SearchInput } from './SearchInput'

const ArrowIcon = () => (
  <Icon>
    <path
      d='M5 12h14M13 6l6 6-6 6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Icon>
)

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  args: {
    'placeholder': 'Search projects',
    'aria-label': 'Search projects',
    'onSearch': fn(),
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    searchIcon: { control: false },
    searchButtonProps: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox', { name: 'Search projects' })

    await userEvent.type(input, 'flowi{Enter}')
    await expect(args.onSearch).toHaveBeenLastCalledWith('flowi')

    await userEvent.click(canvas.getByRole('button', { name: 'Search' }))
    await expect(args.onSearch).toHaveBeenCalledTimes(2)
  },
}

export const Filled: Story = {
  args: { defaultValue: 'Design tokens' },
}

export const ErrorState: Story = {
  args: { defaultValue: 'Design tokens', error: true },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Search' })
    await expect(button).toBeDisabled()
  },
}

export const CustomIcon: Story = {
  args: {
    searchIcon: <ArrowIcon />,
    searchButtonProps: { 'aria-label': 'Go' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Go' })).toBeInTheDocument()
  },
}

export const CustomColors: Story = {
  args: {
    style: {
      '--flowi-input-stroke': 'var(--flowi-color-slate-300)',
      '--flowi-search-button-bg': 'var(--flowi-color-green-300)',
      '--flowi-search-button-bg-hover': 'var(--flowi-color-green-200)',
      '--flowi-search-button-bg-active': 'var(--flowi-color-green-300)',
    },
  },
}

export const CancelSearchFromButton: Story = {
  args: {
    defaultValue: 'draft',
    searchButtonProps: { onClick: (event) => event.preventDefault() },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Search' }))
    await expect(args.onSearch).not.toHaveBeenCalled()
  },
}

export const Controlled: Story = {
  render: function ControlledSearch(args) {
    const [query, setQuery] = useState('')
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <SearchInput
          {...args}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <output>Query: {query}</output>
      </div>
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('searchbox'), 'tokens{Enter}')
    await expect(canvas.getByText('Query: tokens')).toBeInTheDocument()
    await expect(args.onSearch).toHaveBeenLastCalledWith('tokens')
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await expect(canvas.getByRole('searchbox')).toHaveFocus()
    await userEvent.keyboard('docs')
    await userEvent.tab()
    const button = canvas.getByRole('button', { name: 'Search' })
    await expect(button).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(args.onSearch).toHaveBeenLastCalledWith('docs')
  },
}

export const FluidWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ width: 200 }}>
          <Story />
        </div>
        <div style={{ width: '100%' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

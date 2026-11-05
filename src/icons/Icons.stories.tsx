import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { AlertIcon, SearchIcon, UserIcon } from '.'

const icons = { AlertIcon, SearchIcon, UserIcon }

const meta: Meta = {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {Object.entries(icons).map(([name, IconComponent]) => (
        <figure
          key={name}
          style={{
            display: 'grid',
            justifyItems: 'center',
            gap: 8,
            margin: 0,
            color: 'var(--flowi-color-text-default)',
            fontFamily: 'var(--flowi-font-family)',
            fontSize: 'var(--flowi-font-size-12)',
          }}
        >
          <IconComponent />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  ),
}

export const Labelled: Story = {
  render: () => <AlertIcon title='Error' />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('img', { name: 'Error' })).toBeInTheDocument()
  },
}

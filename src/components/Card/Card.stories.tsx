import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Icon } from '../../icons'
import { Button } from '../Button'
import { Card } from './Card'
import type { CardProps } from './card.types'

const IMAGE_SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#4f7cff'/><stop offset='1' stop-color='#a9c2ff'/></linearGradient></defs><rect width='600' height='600' fill='url(#g)'/></svg>"
  )

const StarIcon = () => (
  <Icon>
    <path
      d='m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinejoin='round'
    />
  </Icon>
)

const TITLE = 'Card title'
const DESCRIPTION =
  'Supporting description that explains what this card is about.'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: TITLE,
    description: DESCRIPTION,
    action: (
      <Button variant='text' size='sm'>
        Learn more
      </Button>
    ),
  },
  argTypes: {
    headingLevel: { control: 'radio', options: [2, 3, 4, 5, 6] },
    action: { control: false },
    linkAs: { control: false },
  },
  decorators: [
    // Default 300px frame; stories override it with `parameters.frameWidth`.
    (Story, { parameters }) => (
      <div style={{ inlineSize: parameters.frameWidth ?? 300 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Card>

// Left edge of the rendered text (not the element box).
const textLeft = (el: Element) => {
  const range = document.createRange()
  range.selectNodeContents(el)
  return range.getBoundingClientRect().left
}

const labelOffset = (canvasElement: HTMLElement, label: string) =>
  textLeft(within(canvasElement).getByRole('button', { name: label })) -
  textLeft(within(canvasElement).getByRole('heading'))

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      Math.abs(labelOffset(canvasElement, 'Learn more'))
    ).toBeLessThan(1)
    await expect(
      canvas.getByRole('heading', { level: 3, name: TITLE })
    ).toBeVisible()
    await expect(canvas.getByText(DESCRIPTION)).toBeVisible()
    await expect(
      canvas.getByRole('button', { name: 'Learn more' })
    ).toBeVisible()
  },
}

export const BasicShortAction: Story = {
  args: {
    action: (
      <Button variant='text' size='sm'>
        See
      </Button>
    ),
  },
  play: async ({ canvasElement }) => {
    await expect(Math.abs(labelOffset(canvasElement, 'See'))).toBeLessThan(1)
  },
}

export const Centered: Story = {
  args: { variant: 'centered', icon: <StarIcon /> },
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading')
    await expect(getComputedStyle(heading.parentElement!).textAlign).toBe(
      'center'
    )
    const iconWrapper = heading.parentElement!.querySelector(
      ':scope > span[aria-hidden="true"]'
    )
    await expect(iconWrapper).not.toBeNull()
    await expect(iconWrapper!.querySelector('svg')).not.toBeNull()
  },
}

export const Horizontal: Story = {
  args: { variant: 'horizontal', image: IMAGE_SRC },
  parameters: { frameWidth: 650 },
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector('img')!
    const heading = within(canvasElement).getByRole('heading')
    await expect(img.getBoundingClientRect().right).toBeLessThanOrEqual(
      heading.getBoundingClientRect().left
    )
    // Horizontal inset is `md` (12px) while the text Button pads `lg` (16px),
    // so the label sits 4px right of the title.
    const offset = labelOffset(canvasElement, 'Learn more')
    await expect(Math.abs(offset - 4)).toBeLessThan(1)
  },
}

export const ImageTop: Story = {
  args: { variant: 'image-top', image: IMAGE_SRC },
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector('img')!
    const heading = within(canvasElement).getByRole('heading')
    await expect(img.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      heading.getBoundingClientRect().top
    )
  },
}

export const ImageBottom: Story = {
  args: { variant: 'image-bottom', image: IMAGE_SRC },
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector('img')!
    const heading = within(canvasElement).getByRole('heading')
    await expect(img.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      heading.getBoundingClientRect().bottom
    )
  },
}

export const Overlay: Story = {
  args: { variant: 'overlay', image: IMAGE_SRC },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading')).toBeVisible()
    await expect(canvas.getByText(DESCRIPTION)).toBeVisible()
  },
}

export const OptionalParts: Story = {
  args: { description: undefined, action: undefined },
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card {...args} data-testid='title-only' />
      <Card
        variant='basic'
        description={DESCRIPTION}
        data-testid='description-only'
      />
      <Card variant='basic' data-testid='empty' />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const titleOnly = canvas.getByTestId('title-only')
    await expect(titleOnly.querySelector('p')).toBeNull()
    await expect(titleOnly.querySelectorAll('div')).toHaveLength(1)
    const descOnly = canvas.getByTestId('description-only')
    await expect(descOnly.querySelector('h3')).toBeNull()
    const empty = canvas.getByTestId('empty')
    await expect(empty.children).toHaveLength(0)
  },
}

export const CustomContent: Story = {
  args: { description: undefined },
  render: (args) => (
    <Card {...args}>
      <ul>
        <li>First</li>
        <li>Second</li>
      </ul>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole('listitem')).toHaveLength(2)
  },
}

export const Fluid: Story = {
  parameters: { frameWidth: 'auto' },
  decorators: [
    (Story) => (
      <div data-testid='frame' style={{ inlineSize: 420 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const frame = within(canvasElement).getByTestId('frame')
    const card = within(frame).getByRole('article')
    await expect(card.getBoundingClientRect().width).toBe(
      frame.getBoundingClientRect().width
    )
  },
}

export const HorizontalNarrow: Story = {
  args: { variant: 'horizontal', image: IMAGE_SRC },
  parameters: { frameWidth: 'auto' },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 320 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector('img')!
    const heading = within(canvasElement).getByRole('heading')
    await expect(img.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      heading.getBoundingClientRect().top
    )
  },
}

const expectActionInsideCard = async (canvasElement: HTMLElement) => {
  const button = within(canvasElement).getByRole('button', {
    name: 'Learn more',
  })
  const card = canvasElement.querySelector('[class*="root"]')
  await expect(card).not.toBeNull()
  const cardLeft = card?.getBoundingClientRect().left ?? 0
  await expect(button.getBoundingClientRect().left).toBeGreaterThanOrEqual(
    cardLeft
  )
}

const learnMoreAction = (
  <Button variant='text' size='sm'>
    Learn more
  </Button>
)

export const HorizontalWithAction: Story = {
  args: { variant: 'horizontal', image: IMAGE_SRC, action: learnMoreAction },
  play: async ({ canvasElement }) => expectActionInsideCard(canvasElement),
}

export const HorizontalNarrowWithAction: Story = {
  args: { variant: 'horizontal', image: IMAGE_SRC, action: learnMoreAction },
  parameters: { frameWidth: 'auto' },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 320 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => expectActionInsideCard(canvasElement),
}

export const Static: Story = {
  args: { action: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('link')).toBeNull()
    await expect(canvas.queryByRole('button')).toBeNull()
    await userEvent.tab()
    await expect(canvasElement.contains(document.activeElement)).toBe(false)
  },
}

// Records link activations and cancels the navigation so the test page stays put.
const trackLinkClicks = () => {
  const clicked: Element[] = []
  const handler = (event: MouseEvent) => {
    const link = event.target instanceof Element && event.target.closest('a')
    if (link) {
      clicked.push(link)
      event.preventDefault()
    }
  }
  document.addEventListener('click', handler)
  return { clicked, stop: () => document.removeEventListener('click', handler) }
}

export const Clickable: Story = {
  args: { href: '#card-target', action: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole('link', { name: TITLE })
    const card = canvas.getByRole('article')
    await expect(card.className).toMatch(/clickable/)
    const { clicked, stop } = trackLinkClicks()
    try {
      await userEvent.tab()
      await expect(link).toHaveFocus()
      await expect(getComputedStyle(card).outlineStyle).toBe('solid')
      await userEvent.keyboard('{Enter}')
      await expect(clicked).toEqual([link])

      link.blur()
      // userEvent targets elements directly, so hit-test a point on the card
      // to prove the stretched link is what the pointer reaches.
      const { left, top } = card.getBoundingClientRect()
      const hit = document.elementFromPoint(left + 16, top + 16)
      await expect(hit).toBe(link)
      await userEvent.click(hit!)
      await expect(clicked).toEqual([link, link])
    } finally {
      stop()
    }
  },
}

export const ClickableWithAction: Story = {
  args: { href: '#card-target', action: undefined, onClick: fn() },
  // Keep onClick off the card root so it only measures the action button.
  render: ({ onClick, ...args }) => (
    <Card
      {...args}
      action={
        <Button variant='text' size='sm' onClick={onClick}>
          Learn more
        </Button>
      }
    />
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const { clicked, stop } = trackLinkClicks()
    try {
      const button = canvas.getByRole('button', { name: 'Learn more' })
      const { left, top, width, height } = button.getBoundingClientRect()
      await expect(
        document.elementFromPoint(left + width / 2, top + height / 2)
      ).toBe(button)
      await userEvent.click(button)
      await expect(args.onClick).toHaveBeenCalledTimes(1)
      await expect(clicked).toHaveLength(0)
      // The empty action row beside the button belongs to the card link.
      const rowEl = button.closest('div')
      await expect(rowEl).not.toBeNull()
      const row =
        rowEl?.getBoundingClientRect() ?? button.getBoundingClientRect()
      const x = row.right - 8
      const y = top + height / 2
      const target = document.elementFromPoint(x, y)
      await expect(target?.closest('a')).not.toBeNull()
      if (!target) throw new Error('No element at the action row point')
      await userEvent.click(target)
      await expect(clicked).toHaveLength(1)
      await expect(canvasElement.querySelector('a button, a a')).toBeNull()
    } finally {
      stop()
    }
  },
}

// Fake router link: takes `to` instead of `href`, like many router libraries.
const RouterLink = ({
  to,
  ...props
}: {
  to: string
  className?: string
  children?: ReactNode
}) => <a data-to={to} href={to} {...props} />

const AppLink = ({
  href,
  ...props
}: {
  href: string
  className?: string
  children?: ReactNode
}) => <RouterLink to={href} {...props} />

export const CustomLink: Story = {
  args: { href: '/custom', linkAs: AppLink, action: undefined },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: TITLE })
    await expect(link).toHaveAttribute('data-to', '/custom')
    await expect(link).toHaveAttribute('href', '/custom')
  },
}

export const ImageAlt: Story = {
  args: { variant: 'image-top', image: IMAGE_SRC },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card variant='image-top' image={IMAGE_SRC} title='Decorative' />
      <Card
        variant='image-top'
        image={IMAGE_SRC}
        title='Meaningful'
        imageAlt='A blue gradient'
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const imgs = canvasElement.querySelectorAll('img')
    await expect(imgs[0]).toHaveAttribute('alt', '')
    await expect(canvas.getAllByRole('img')).toHaveLength(1)
    await expect(
      canvas.getByRole('img', { name: 'A blue gradient' })
    ).toBeVisible()
  },
}

export const Forwarding: Story = {
  render: (args) => (
    <Card {...args} className='custom-class' data-testid='card' />
  ),
  play: async ({ canvasElement }) => {
    const card = within(canvasElement).getByTestId('card')
    await expect(card.tagName).toBe('ARTICLE')
    await expect(card).toHaveClass('custom-class')
  },
}

export const HeadingLevel: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card {...args} title='Default level' />
      <Card {...args} title='Level two' headingLevel={2} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('heading', { level: 3, name: 'Default level' })
    ).toBeVisible()
    await expect(
      canvas.getByRole('heading', { level: 2, name: 'Level two' })
    ).toBeVisible()
  },
}

export const ImageElement: Story = {
  args: {
    variant: 'image-top',
    image: <img data-testid='custom-img' src={IMAGE_SRC} alt='Custom image' />,
  },
  play: async ({ canvasElement }) => {
    const img = within(canvasElement).getByTestId('custom-img')
    await expect(img).toBeVisible()
    await expect(img.closest('article')).toBe(
      within(canvasElement).getByRole('article')
    )
    await expect(canvasElement.querySelectorAll('img')).toHaveLength(1)
  },
}

export const ClickableOverlay: Story = {
  args: {
    variant: 'overlay',
    image: IMAGE_SRC,
    href: '#card-target',
    action: undefined,
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: TITLE })
    const img = canvasElement.querySelector('img')!
    const { left, top, width, height } = img.getBoundingClientRect()
    const { clicked, stop } = trackLinkClicks()
    try {
      const hit = document.elementFromPoint(left + width / 2, top + height / 2)
      await expect(hit).toBe(link)
      await userEvent.click(hit!)
      await expect(clicked).toEqual([link])
    } finally {
      stop()
    }
  },
}

export const ClickableImageTop: Story = {
  args: {
    variant: 'image-top',
    image: IMAGE_SRC,
    href: '#card-target',
    action: undefined,
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: TITLE })
    const img = canvasElement.querySelector('img')!
    const { left, top } = img.getBoundingClientRect()
    const { clicked, stop } = trackLinkClicks()
    try {
      const hit = document.elementFromPoint(left + 16, top + 16)
      await expect(hit).toBe(link)
      await userEvent.click(hit!)
      await expect(clicked).toEqual([link])
    } finally {
      stop()
    }
  },
}

// Bypasses the types (a link card requires a title) to guard the runtime:
// without a title there is no link, so the card must not look clickable.
export const EmptyTitleLink: Story = {
  render: () => (
    <Card
      {...({ href: '/x', title: '', description: DESCRIPTION } as CardProps)}
      data-testid='card'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByTestId('card')
    await expect(canvas.queryByRole('link')).toBeNull()
    await expect(card.className).not.toMatch(/clickable/)
    await expect(canvas.getByText(DESCRIPTION)).toBeVisible()
  },
}

// Compile-time contracts, checked by `pnpm typecheck` (tsconfig.app.json includes src).
function typeContracts() {
  // @ts-expect-error basic cards have no image
  void (<Card image={IMAGE_SRC} />)
  // @ts-expect-error image cards have no icon
  void (<Card variant='image-top' image={IMAGE_SRC} icon={<StarIcon />} />)
  // @ts-expect-error overlay requires an image
  void (<Card variant='overlay' />)
  // @ts-expect-error centered requires an icon
  void (<Card variant='centered' />)
  // @ts-expect-error a link card requires a title
  void (<Card href='/x' />)
}
void typeContracts

import type {
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'

export type CardImageVariant =
  'horizontal' | 'image-top' | 'image-bottom' | 'overlay'

export type CardVariant = 'basic' | 'centered' | CardImageVariant

type CardBaseProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Heading level of the title. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  description?: ReactNode
  /** Trailing action, such as `<Button variant='text' size='sm'>`. */
  action?: ReactNode
}

export type CardBasicProps = CardBaseProps & {
  variant?: 'basic'
  image?: never
  imageAlt?: never
  icon?: never
}

export type CardCenteredProps = CardBaseProps & {
  variant: 'centered'
  /** Icon shown in a circle above the title. Decorative. */
  icon: ReactNode
  image?: never
  imageAlt?: never
}

export type CardImageProps = CardBaseProps & {
  variant: CardImageVariant
  /**
   * Image source (rendered as an `<img>`) or a ready element, such as a
   * framework image with `fill`. The element is rendered as-is.
   */
  image: string | ReactElement
  /** Alt text when `image` is a string. Empty (decorative) by default. */
  imageAlt?: string
  icon?: never
}

export type CardLinkComponent = ElementType<{
  href: string
  className?: string
  children?: ReactNode
}>

export type CardStaticMode = {
  title?: ReactNode
  href?: never
  linkAs?: never
}

/** Makes the whole card a link through its title. */
export type CardLinkMode = {
  title: NonNullable<ReactNode>
  href: string
  /** Router link component, such as `next/link`. Defaults to `a`. */
  linkAs?: CardLinkComponent
}

export type CardMode = CardStaticMode | CardLinkMode

export type CardProps = (CardBasicProps | CardCenteredProps | CardImageProps) &
  CardMode

/** Props of the internal shell: the shared props plus the layout slots. */
export type CardShellProps = CardBaseProps & {
  variant: CardVariant
  /** Rendered before the body (for example media). */
  before?: ReactNode
  /** Rendered first inside the body (for example an icon). */
  leading?: ReactNode
  /** Rendered after the body. */
  after?: ReactNode
  title?: ReactNode
  href?: string
  linkAs?: CardLinkComponent
}

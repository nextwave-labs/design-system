import type { ElementType, ReactElement, ReactNode } from 'react'
import { cardVariants } from './card.variants'
import type { CardShellProps } from './card.types'

const { media, icon, scrim } = cardVariants()

function hasContent(node: ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== ''
}

export function CardMedia({
  image,
  alt,
}: {
  image: string | ReactElement
  alt: string
}) {
  return (
    <div className={media()}>
      {typeof image === 'string' ?
        <img src={image} alt={alt} />
      : image}
    </div>
  )
}

export function CardIcon({ children }: { children: ReactNode }) {
  return (
    <span className={icon()} aria-hidden='true'>
      {children}
    </span>
  )
}

export function CardScrim() {
  return <span className={scrim()} aria-hidden='true' />
}

export function CardShell({
  variant,
  before,
  leading,
  after,
  title,
  description,
  action,
  children,
  href,
  linkAs: LinkAs = 'a',
  headingLevel = 3,
  className,
  ...rest
}: CardShellProps) {
  const hasTitle = hasContent(title)
  // The link only renders with a title, so never style a card as clickable without one
  const isLink = href !== undefined && hasTitle
  const classes = cardVariants({ variant, clickable: isLink })
  const Heading: ElementType = `h${headingLevel}`

  const hasBody =
    hasContent(leading) ||
    hasContent(title) ||
    hasContent(description) ||
    hasContent(children) ||
    hasContent(action)

  return (
    <article className={classes.root({ class: className })} {...rest}>
      {before}
      {hasBody && (
        <div className={classes.body()}>
          {leading}
          {hasTitle && (
            <Heading className={classes.title()}>
              {isLink ?
                <LinkAs href={href} className={classes.link()}>
                  {title}
                </LinkAs>
              : title}
            </Heading>
          )}
          {hasContent(description) && (
            <p className={classes.description()}>{description}</p>
          )}
          {children}
          {hasContent(action) && (
            <div className={classes.action()}>{action}</div>
          )}
        </div>
      )}
      {after}
    </article>
  )
}

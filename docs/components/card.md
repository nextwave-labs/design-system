# Card

`Card` renders a native `<article>` with an optional title, description, custom content, and action. Six variants cover text, icon, and image layouts. Native attributes and `className` are forwarded to the `<article>`.

## Import

```tsx
import { Card } from '@flowi/ui'
```

## Props

Shared by every variant:

| Prop           | Values                  | Default | Description                                                          |
| -------------- | ----------------------- | ------- | -------------------------------------------------------------------- |
| `variant`      | see below               | `basic` | Layout of the card                                                   |
| `title`        | `ReactNode`             | none    | Heading. Required when `href` is set                                 |
| `description`  | `ReactNode`             | none    | Paragraph under the title                                            |
| `children`     | `ReactNode`             | none    | Custom content between the description and the action                |
| `action`       | `ReactNode`             | none    | Trailing action, such as `<Button variant='text' size='sm'>`         |
| `headingLevel` | `2`, `3`, `4`, `5`, `6` | `3`     | Heading level of the title                                           |
| `href`         | `string`                | none    | Makes the whole card a link. See [Clickable cards](#clickable-cards) |
| `linkAs`       | link component          | `a`     | Component used for the link. See [Router links](#router-links)       |

Variant-specific props:

| `variant`                                            | Extra props                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `basic` (default)                                    | none. `image` and `icon` are not allowed                                                                                       |
| `centered`                                           | `icon` (required): icon shown in a circle above the title                                                                      |
| `horizontal`, `image-top`, `image-bottom`, `overlay` | `image` (required): a URL string or a `ReactElement`. `imageAlt`: alt text for a string `image`, empty (decorative) by default |

```tsx
<Card
  title='Design tokens'
  description='Override the look of every component from one place.'
  action={<Button variant='text' size='sm'>Learn more</Button>}
/>

<Card variant='centered' icon={<PlusIcon />} title='Add a project' />

<Card
  variant='image-top'
  image='/cover.jpg'
  imageAlt='Mountain lake at sunrise'
  title='Plan your trip'
  description='Routes, stays, and weather in one place.'
/>
```

`image` accepts a ready element, rendered as-is, so a framework image works. With `next/image`, use `fill` because the card sizes the image container:

```tsx
<Card
  variant='overlay'
  image={<Image src='/cover.jpg' alt='' fill />}
  title='Plan your trip'
/>
```

## Clickable cards

`href` turns the whole card into a link through its title (a stretched link). The card shows a focus ring when the link is focused, and an inner `action` stays independently clickable. A link card requires a `title`.

```tsx
<Card
  href='/pricing'
  title='Pricing'
  description='Plans for every team.'
  action={
    <Button variant='text' size='sm'>
      Compare plans
    </Button>
  }
/>
```

A card that runs an action without navigating is not supported. Put the action in `action` instead.

## Router links

By default the link is a plain `<a>`. `linkAs` accepts any component that takes `href`, `className`, and `children`, such as the Next.js `Link`:

```tsx
import Link from 'next/link'

;<Card href='/pricing' linkAs={Link} title='Pricing' />
```

Routers that use `to` (React Router, TanStack Router) need a one-line wrapper:

```tsx
const AppLink = ({ href, ...props }) => <Link to={href} {...props} />

<Card href='/pricing' linkAs={AppLink} title='Pricing' />
```

## Layout

- The card fills the width of its container. Size it with the container.
- `horizontal` places the image beside the text and stacks the image above the text in narrow containers.
- `image-top`, `image-bottom`, and `overlay` have a minimum height of 520px.
- `image-bottom` puts the text first in the DOM, so the heading comes before the image for assistive technology.

## Customization

Override the card with `--flowi-card-*` tokens, globally on `:root` or per instance through `style` or `className`:

| Token                       | Controls                           |
| --------------------------- | ---------------------------------- |
| `--flowi-card-fill`         | Background                         |
| `--flowi-card-stroke`       | Outline color                      |
| `--flowi-card-text`         | Text color                         |
| `--flowi-card-radius`       | Card corner radius                 |
| `--flowi-card-media-radius` | Image corner radius (`horizontal`) |
| `--flowi-card-shadow`       | Shadow                             |
| `--flowi-card-icon-size`    | Icon circle size (`centered`)      |
| `--flowi-card-icon-fill`    | Icon circle background             |
| `--flowi-card-icon-ring`    | Icon circle border color           |
| `--flowi-card-overlay-blur` | Blur behind the text (`overlay`)   |

```tsx
<Card
  title='Compact'
  style={{ '--flowi-card-radius': '0.5rem' } as React.CSSProperties}
/>
```

## Next.js App Router

The bundle is a Client Component, so `Card` renders from Server Components. Passing `linkAs={Link}` from a Server Component fails with `Functions cannot be passed directly to Client Components`, because `Link` is a function. Pass it from a Client Component:

```tsx
'use client'

import Link from 'next/link'
import { Card } from '@flowi/ui'

export function PricingCard() {
  return <Card href='/pricing' linkAs={Link} title='Pricing' />
}
```

## Accessibility

- The card is an `<article>` and the title is a heading. Choose `headingLevel` to fit the page outline.
- Images are decorative by default (`imageAlt=''`). Set `imageAlt` when the image carries meaning.
- The `centered` icon is `aria-hidden`. Do not use it as the only carrier of meaning.
- `overlay` text sits on a solid light background, which keeps AA contrast over any image.
- Link cards expose a visible keyboard focus ring, and the link text is the title.

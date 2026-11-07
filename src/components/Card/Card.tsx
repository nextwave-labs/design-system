'use client'
import type { ComponentType } from 'react'
import { CardIcon, CardMedia, CardScrim, CardShell } from './CardShell'
import type {
  CardBasicProps,
  CardCenteredProps,
  CardImageProps,
  CardMode,
  CardProps,
} from './card.types'

function BasicCard(props: CardBasicProps & CardMode) {
  return <CardShell {...props} variant='basic' />
}

function CenteredCard({ icon, ...props }: CardCenteredProps & CardMode) {
  return (
    <CardShell
      {...props}
      variant='centered'
      leading={<CardIcon>{icon}</CardIcon>}
    />
  )
}

type ImageCardProps<V extends CardImageProps['variant']> = CardImageProps &
  CardMode & { variant: V }

function HorizontalCard({
  image,
  imageAlt = '',
  ...props
}: ImageCardProps<'horizontal'>) {
  return (
    <CardShell
      {...props}
      variant='horizontal'
      before={<CardMedia image={image} alt={imageAlt} />}
    />
  )
}

function ImageTopCard({
  image,
  imageAlt = '',
  ...props
}: ImageCardProps<'image-top'>) {
  return (
    <CardShell
      {...props}
      variant='image-top'
      before={<CardMedia image={image} alt={imageAlt} />}
    />
  )
}

function ImageBottomCard({
  image,
  imageAlt = '',
  ...props
}: ImageCardProps<'image-bottom'>) {
  return (
    <CardShell
      {...props}
      variant='image-bottom'
      after={<CardMedia image={image} alt={imageAlt} />}
    />
  )
}

function OverlayCard({
  image,
  imageAlt = '',
  ...props
}: ImageCardProps<'overlay'>) {
  return (
    <CardShell
      {...props}
      variant='overlay'
      before={
        <>
          <CardMedia image={image} alt={imageAlt} />
          <CardScrim />
        </>
      }
    />
  )
}

const layouts = {
  'basic': BasicCard,
  'centered': CenteredCard,
  'horizontal': HorizontalCard,
  'image-top': ImageTopCard,
  'image-bottom': ImageBottomCard,
  'overlay': OverlayCard,
}

export function Card(props: CardProps) {
  const Layout = layouts[props.variant ?? 'basic'] as ComponentType<CardProps>
  return <Layout {...props} />
}

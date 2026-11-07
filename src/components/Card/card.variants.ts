import { tv } from 'tailwind-variants/lite'
import styles from './Card.module.css'

export const cardVariants = tv({
  slots: {
    root: styles.root,
    media: styles.media,
    scrim: styles.scrim,
    body: styles.body,
    icon: styles.icon,
    title: styles.title,
    link: styles.link,
    description: styles.description,
    action: styles.action,
  },
  variants: {
    variant: {
      'basic': { root: styles.basic },
      'centered': { root: styles.centered },
      'horizontal': { root: styles.horizontal },
      'image-top': { root: styles.imageTop },
      'image-bottom': { root: styles.imageBottom },
      'overlay': { root: styles.overlay },
    },
    clickable: {
      true: { root: styles.clickable },
    },
  },
  defaultVariants: {
    variant: 'basic',
    clickable: false,
  },
})

import { tv } from 'tailwind-variants/lite'
import styles from './SearchInput.module.css'

/** Search-specific classes layered on the shared input shell. */
export const searchInputVariants = tv({
  slots: {
    root: styles.root,
    button: styles.button,
  },
})

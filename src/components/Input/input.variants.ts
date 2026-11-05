import { tv, type VariantProps } from 'tailwind-variants/lite'
import styles from './InputBase.module.css'

/**
 * Class map for the shared input shell. Each slot maps to a CSS Module
 * class; variants add the state and position classes.
 */
export const inputVariants = tv({
  slots: {
    root: styles.root,
    field: styles.field,
    slot: styles.slot,
    trailingIcon: styles.trailingIcon,
  },
  variants: {
    invalid: {
      true: { root: styles.invalid },
    },
    position: {
      start: { slot: styles.slotStart },
      end: { slot: styles.slotEnd },
    },
  },
})

export type InputVariantProps = VariantProps<typeof inputVariants>

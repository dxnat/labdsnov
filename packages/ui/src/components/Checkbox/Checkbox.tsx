import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import styles from "./Checkbox.module.css"

/** Single on/off choice. Pair with `Label` or put it in a `Field`. */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(styles.root, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={styles.indicator}
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className={styles.check} />
        <HugeiconsIcon
          icon={MinusSignIcon}
          strokeWidth={2.5}
          className={styles.dash}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

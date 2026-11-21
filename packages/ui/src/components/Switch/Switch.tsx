import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

import styles from "./Switch.module.css"

const sizeClass = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
} as const

type SwitchSize = keyof typeof sizeClass

type SwitchProps = SwitchPrimitive.Root.Props & {
  /** `default`: 44×20px track. `sm`: 28×16px track. */
  size?: SwitchSize
}

/** On/off setting that takes effect immediately. */
function Switch({ className, size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(styles.root, sizeClass[size], className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </SwitchPrimitive.Root>
  )
}

export { Switch, type SwitchProps, type SwitchSize }

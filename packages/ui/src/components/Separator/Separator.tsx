import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

import styles from "./Separator.module.css"

/** Thin line between groups of content. Vertical separators stretch to the row's height. */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { Separator }

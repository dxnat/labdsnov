import { cn } from "cn"

import styles from "./Kbd.module.css"

/** One keyboard key, e.g. `<Kbd>⌘</Kbd>` or `<Kbd>Enter</Kbd>`. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd data-slot="kbd" className={cn(styles.root, className)} {...props} />
  )
}

/** Keys pressed together, e.g. ⌘ + K. Put the keys (and any "+" text) inside. */
function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "cn"

import styles from "./Tabs.module.css"

const listVariantClass = {
  default: styles.listDefault,
  line: styles.listLine,
} as const

type TabsListVariant = keyof typeof listVariantClass

/** Groups the tab list and its panels. Set `defaultValue` (or `value`) to an enabled tab's value. */
function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

type TabsListProps = TabsPrimitive.List.Props & {
  /** `default`: tabs sit in a tinted pill. `line`: no background, the active tab is underlined. */
  variant?: TabsListVariant
}

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(styles.list, listVariantClass[variant], className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsListProps,
  type TabsListVariant,
}

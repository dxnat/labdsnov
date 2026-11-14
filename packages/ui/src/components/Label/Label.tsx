"use client"

import * as React from "react"
import { cn } from "cn"

import styles from "./Label.module.css"

type LabelProps = React.ComponentProps<"label"> & {
  /** Marks the field as required with a red asterisk. */
  required?: boolean
}

function Label({ className, required = false, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(styles.root, required && styles.required, className)}
      {...props}
    />
  )
}

export { Label, type LabelProps }

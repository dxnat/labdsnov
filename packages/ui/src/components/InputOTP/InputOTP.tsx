"use client"

import * as React from "react"
import { MinusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import { OTPInput, OTPInputContext } from "input-otp"

import styles from "./InputOTP.module.css"

/**
 * One-time code field (e.g. a 6-digit sign-in code), one box per character.
 * Wraps the `input-otp` library: pass `maxLength` and render one
 * `InputOTPSlot` per character.
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(styles.container, containerClassName)}
      spellCheck={false}
      className={cn(styles.input, className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

/** One character box. `index` is its position, from 0. */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(styles.slot, className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={styles.caretWrap}>
          <div className={styles.caret} />
        </div>
      )}
    </div>
  )
}

/** Dash between groups of boxes. */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={styles.separator}
      role="separator"
      {...props}
    >
      <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }

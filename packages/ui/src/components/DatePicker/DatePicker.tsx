"use client"

import * as React from "react"
import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import { Button } from "../Button"
import { Calendar, type CalendarProps } from "../Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"

import styles from "./DatePicker.module.css"

// Same format as FundCard's price date: "13 พ.ย. 2569" (Buddhist year).
const dateFormat = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

type DatePickerProps = {
  /** Selected date (controlled). Use with `onValueChange`. */
  value?: Date
  /** Selected date at first (uncontrolled). */
  defaultValue?: Date
  /** Called with the chosen date, or `undefined` when it is cleared. */
  onValueChange?: (date: Date | undefined) => void
  /** Text shown before a date is chosen. */
  placeholder?: string
  disabled?: boolean
  /** Put on the trigger button, so a `Label htmlFor` can name it. */
  id?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
  className?: string
  /** Extra `Calendar` props, e.g. `disabled` days or `captionLayout="dropdown"`. */
  calendarProps?: Omit<
    Extract<CalendarProps, { mode: "single" }>,
    "mode" | "selected" | "onSelect"
  >
}

/**
 * Button that opens a `Calendar` in a `Popover` to pick one date. Shows the
 * date in Thai with the Buddhist year, like FundCard. Closes after a pick.
 */
function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "เลือกวันที่",
  disabled,
  id,
  className,
  calendarProps,
  ...ariaProps
}: DatePickerProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const selected = value !== undefined ? value : uncontrolled

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            id={id}
            variant="outline"
            data-slot="date-picker"
            data-empty={!selected}
            className={cn(styles.trigger, className)}
            {...ariaProps}
          />
        }
      >
        <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} data-icon="inline-start" />
        {selected ? dateFormat.format(selected) : placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className={styles.content}>
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={(date) => {
            setUncontrolled(date)
            onValueChange?.(date)
            setOpen(false)
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, type DatePickerProps }

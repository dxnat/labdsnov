"use client"

import * as React from "react"
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
import { th } from "react-day-picker/locale"

import { Button, buttonVariants } from "../Button"

import styles from "./Calendar.module.css"

// Thai dates use the Buddhist year (2569, not 2026), like FundCard. The th
// locale gives Thai month and weekday names; Intl gives the Buddhist year.
const captionFormat = new Intl.DateTimeFormat("th-TH", {
  month: "long",
  year: "numeric",
})
const monthFormat = new Intl.DateTimeFormat("th-TH", { month: "short" })
const yearFormat = new Intl.DateTimeFormat("th-TH", { year: "numeric" })
// "พ.ศ. 2569" → "2569" for the year dropdown.
const formatYear = (date: Date) =>
  yearFormat.formatToParts(date).find((part) => part.type === "year")?.value ?? ""
const dayLabelFormat = new Intl.DateTimeFormat("th-TH", { dateStyle: "full" })

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Button variant of the previous/next month arrows. */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}

/**
 * Month grid for picking a date or a range (react-day-picker). Thai by
 * default, with Buddhist-era years. Pass `mode="single"` or `mode="range"`
 * with `selected` / `onSelect`.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale = th,
  formatters,
  labels,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.calendar, className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatCaption: (date) => captionFormat.format(date),
        formatMonthDropdown: (date) => monthFormat.format(date),
        formatYearDropdown: formatYear,
        ...formatters,
      }}
      labels={{
        labelDayButton: (date, modifiers) =>
          [
            dayLabelFormat.format(date),
            modifiers.today && "วันนี้",
            modifiers.selected && "เลือกแล้ว",
          ]
            .filter(Boolean)
            .join(", "),
        labelPrevious: () => "เดือนก่อนหน้า",
        labelNext: () => "เดือนถัดไป",
        ...labels,
      }}
      classNames={{
        root: cn(styles.root, defaultClassNames.root),
        months: cn(styles.months, defaultClassNames.months),
        month: cn(styles.month, defaultClassNames.month),
        nav: cn(styles.nav, defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          styles.navButton,
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          styles.navButton,
          defaultClassNames.button_next
        ),
        month_caption: cn(styles.monthCaption, defaultClassNames.month_caption),
        dropdowns: cn(styles.dropdowns, defaultClassNames.dropdowns),
        dropdown_root: cn(styles.dropdownRoot, defaultClassNames.dropdown_root),
        dropdown: cn(styles.dropdown, defaultClassNames.dropdown),
        caption_label: cn(
          styles.captionLabel,
          captionLayout !== "label" && styles.captionLabelDropdown,
          defaultClassNames.caption_label
        ),
        month_grid: cn(styles.monthGrid, defaultClassNames.month_grid),
        weekdays: cn(styles.weekdays, defaultClassNames.weekdays),
        weekday: cn(styles.weekday, defaultClassNames.weekday),
        week: cn(styles.week, defaultClassNames.week),
        week_number_header: cn(
          styles.weekNumberHeader,
          defaultClassNames.week_number_header
        ),
        week_number: cn(styles.weekNumber, defaultClassNames.week_number),
        day: cn(
          styles.day,
          props.showWeekNumber ? styles.dayWithWeekNumber : styles.dayFirst,
          defaultClassNames.day
        ),
        range_start: cn(styles.rangeStart, defaultClassNames.range_start),
        range_middle: cn(styles.rangeMiddle, defaultClassNames.range_middle),
        range_end: cn(styles.rangeEnd, defaultClassNames.range_end),
        today: cn(styles.today, defaultClassNames.today),
        outside: cn(styles.outside, defaultClassNames.outside),
        disabled: cn(styles.disabled, defaultClassNames.disabled),
        hidden: cn(styles.hidden, defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div data-slot="calendar" ref={rootRef} className={className} {...props} />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          const icon =
            orientation === "left"
              ? ArrowLeft01Icon
              : orientation === "right"
                ? ArrowRight01Icon
                : ArrowDown01Icon
          return (
            <HugeiconsIcon
              icon={icon}
              strokeWidth={2}
              className={cn(styles.chevron, className)}
              {...props}
            />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className={styles.weekNumberCell}>{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(styles.dayButton, defaultClassNames.day, className)}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, type CalendarProps }

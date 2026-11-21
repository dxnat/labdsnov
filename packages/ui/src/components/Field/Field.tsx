"use client"

import * as React from "react"
import { cn } from "cn"

import { Label } from "../Label"
import { Separator } from "../Separator"

import styles from "./Field.module.css"

const orientationClass = {
  vertical: styles.vertical,
  horizontal: styles.horizontal,
  responsive: styles.responsive,
} as const

type FieldOrientation = keyof typeof orientationClass

const legendVariantClass = {
  legend: styles.legendLegend,
  label: styles.legendLabel,
} as const

type FieldLegendVariant = keyof typeof legendVariantClass

/** A `<fieldset>` for related fields, e.g. a checkbox list or a radio group with a `FieldLegend`. */
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(styles.set, className)}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & {
  /** `legend`: 16px heading. `label`: 14px, like a field label. */
  variant?: FieldLegendVariant
}) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(styles.legend, legendVariantClass[variant], className)}
      {...props}
    />
  )
}

/** Stacks fields with consistent spacing. Also the width container for `orientation="responsive"`. */
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

type FieldProps = React.ComponentProps<"div"> & {
  /**
   * `vertical`: label above the control. `horizontal`: control beside the label
   * (checkboxes, switches). `responsive`: vertical, horizontal once the
   * `FieldGroup` is 448px wide.
   */
  orientation?: FieldOrientation
}

/** One form field: label, control, description and error. Set `data-invalid` / `data-disabled` to style the whole field. */
function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(styles.field, orientationClass[orientation], className)}
      {...props}
    />
  )
}

/** Wraps the label and description beside a checkbox, radio or switch. */
function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

/** `Label` for a field. Wrap a whole `Field` in it to make a selectable card. */
function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(styles.label, className)}
      {...props}
    />
  )
}

/** A field heading that isn't a `<label>`, e.g. the title inside a choice card. */
function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

/** Help text under (or beside) the control. Link it with `aria-describedby`. */
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

/** Divider between fields, with optional text in the middle (e.g. "หรือ"). */
function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(styles.separator, className)}
      {...props}
    >
      <Separator className={styles.separatorLine} />
      {children && (
        <span
          data-slot="field-separator-content"
          className={styles.separatorContent}
        >
          {children}
        </span>
      )}
    </div>
  )
}

/**
 * Error message, announced to screen readers (`role="alert"`). Pass text as
 * children, or `errors` (e.g. from a form library); renders nothing when empty.
 */
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className={styles.errorList}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(styles.error, className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  type FieldLegendVariant,
  type FieldOrientation,
  type FieldProps,
}

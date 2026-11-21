import * as React from "react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  MoreHorizontalCircle01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import { buttonVariants, type ButtonSize } from "../Button"

import styles from "./Pagination.module.css"

/** Page links for a long list. Named "การแบ่งหน้า" for screen readers. */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="การแบ่งหน้า"
      data-slot="pagination"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  /** The current page: outline button with `aria-current="page"`. */
  isActive?: boolean
  /** Button size; `icon` for page numbers, `default` for previous/next. */
  size?: ButtonSize
} & React.ComponentProps<"a">

/**
 * A page link, styled as a ghost icon button (outline when active). It is a
 * plain `<a>` with button styles: rendering it through `Button` (as shadcn
 * does) would give it `role="button"`, and screen readers would not call it a link.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
        className,
      })}
      {...props}
    />
  )
}

/** "ก่อนหน้า" link. The text hides below 640px, leaving the arrow. */
function PaginationPrevious({
  className,
  text = "ก่อนหน้า",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="ไปหน้าก่อนหน้า"
      size="default"
      className={cn(styles.previous, className)}
      {...props}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} data-icon="inline-start" />
      <span className={styles.stepText}>{text}</span>
    </PaginationLink>
  )
}

/** "ถัดไป" link. The text hides below 640px, leaving the arrow. */
function PaginationNext({
  className,
  text = "ถัดไป",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="ไปหน้าถัดไป"
      size="default"
      className={cn(styles.next, className)}
      {...props}
    >
      <span className={styles.stepText}>{text}</span>
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
    </PaginationLink>
  )
}

/** "…" between page numbers. */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(styles.ellipsis, className)}
      {...props}
    >
      <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
      <span className={styles.srOnly}>หน้าอื่น ๆ</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationLinkProps,
}

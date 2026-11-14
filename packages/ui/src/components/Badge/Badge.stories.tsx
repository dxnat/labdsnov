import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Badge, type BadgeVariant } from "./Badge"

// `satisfies Record<…>` makes typecheck fail if a variant is added to or
// removed from Badge without updating these stories.
const variantLabels = {
  default: "หลัก",
  secondary: "รอง",
  outline: "เส้นขอบ",
  destructive: "ลบ",
  success: "สำเร็จ",
  warning: "คำเตือน",
} satisfies Record<BadgeVariant, string>

const variants = Object.keys(variantLabels) as BadgeVariant[]

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "สำเร็จ",
    variant: "default",
  },
  argTypes: {
    variant: { control: "select", options: variants },
    children: { control: "text" },
    className: { control: "text" },
    render: { control: false },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const badge = canvas.getByText("สำเร็จ")
    await expect(badge.tagName).toBe("SPAN")
    await expect(badge).toHaveAttribute("data-slot", "badge")
    await expect(badge).toHaveAttribute("data-variant", "default")
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variantLabels[variant]}
        </Badge>
      ))}
    </div>
  ),
}

/** Risk levels map to `success` / `warning` / `destructive`. */
export const RiskLevels: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="success">
        ความเสี่ยงต่ำ
      </Badge>
      <Badge {...args} variant="warning">
        ความเสี่ยงปานกลาง
      </Badge>
      <Badge {...args} variant="destructive">
        ความเสี่ยงสูง
      </Badge>
    </div>
  ),
}

/** `data-icon="inline-start|inline-end"` trims the padding on that side. */
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="success">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} data-icon="inline-start" />
        สำเร็จ
      </Badge>
      <Badge {...args} variant="warning">
        <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} data-icon="inline-start" />
        รอดำเนินการ
      </Badge>
      <Badge {...args} variant="destructive">
        <HugeiconsIcon icon={CancelCircleIcon} strokeWidth={2} data-icon="inline-start" />
        ไม่สำเร็จ
      </Badge>
    </div>
  ),
}

/** `render={<a href="…" />}` makes it a link; hover styles only apply to links. */
export const AsLink: Story = {
  args: {
    variant: "outline",
    render: <a href="#fund-options" />,
    children: (
      <>
        <HugeiconsIcon icon={StarIcon} strokeWidth={2} data-icon="inline-start" />
        แนะนำ
      </>
    ),
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "แนะนำ" })
    await expect(link).toHaveAttribute("href", "#fund-options")
    await expect(link).toHaveAttribute("data-slot", "badge")
  },
}

export const DarkMode: Story = {
  ...Variants,
  globals: { theme: "dark" },
}

/** A utility passed via `className` beats the component's own radius. */
export const ClassNameOverride: Story = {
  args: { className: "rounded-sm", children: "มุมโค้งน้อยลง" },
}

import {
  Add01Icon,
  ArrowRight01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import {
  Button,
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "labdsnov"

// `satisfies Record<…>` makes typecheck fail if a variant/size is added to or
// removed from Button without updating these stories.
const variants = Object.keys({
  default: true,
  outline: true,
  secondary: true,
  ghost: true,
  destructive: true,
  link: true,
} satisfies Record<ButtonVariant, true>) as ButtonVariant[]

const sizes = Object.keys({
  xs: true,
  sm: true,
  default: true,
  lg: true,
  "icon-xs": true,
  "icon-sm": true,
  icon: true,
  "icon-lg": true,
} satisfies Record<ButtonSize, true>) as ButtonSize[]

const textSizes = sizes.filter((size) => !size.startsWith("icon"))
const iconSizes = sizes.filter((size) => size.startsWith("icon"))

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "เข้าสู่ระบบ",
    variant: "default",
    size: "default",
    fullWidth: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: sizes },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    focusableWhenDisabled: { control: "boolean" },
    children: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {textSizes.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

/** Square icon-only buttons. They always need a Thai `aria-label`. */
export const IconSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {iconSizes.map((size) => (
        <Button key={size} {...args} size={size} aria-label="ตั้งค่า">
          <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
        </Button>
      ))}
    </div>
  ),
}

/** `data-icon="inline-start|inline-end"` trims the padding on that side. */
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
        เพิ่มเงินสมทบ
      </Button>
      <Button {...args} variant="outline">
        ถัดไป
        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

// ---------- States ----------

export const Clicked: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "เข้าสู่ระบบ" })
    await expect(button).toHaveAttribute("data-slot", "button")
    await expect(button).toHaveAttribute("data-variant", "default")
    await expect(button).toHaveAttribute("data-size", "default")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/** Keyboard focus shows the `--ring` border and ring (`:focus-visible`). */
export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("button")).toHaveFocus()
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button")
    await expect(button).toBeDisabled()
    await expect(button).toHaveAttribute("data-disabled")
  },
}

/** Stays focusable (for a tooltip, say) and uses `aria-disabled`; clicks are ignored. */
export const FocusableWhenDisabled: Story = {
  args: { disabled: true, focusableWhenDisabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button")
    await expect(button).toHaveAttribute("aria-disabled", "true")
    await expect(button).toHaveAttribute("data-disabled")
    await userEvent.tab()
    await expect(button).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

/** `aria-invalid="true"`: destructive border and ring. */
export const Invalid: Story = {
  args: { "aria-invalid": true, variant: "outline" },
}

/** `aria-expanded="true"` (e.g. a menu trigger) keeps the pressed background. */
export const Expanded: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["outline", "secondary", "ghost"] as const).map((variant) => (
        <Button key={variant} {...args} variant={variant} aria-expanded>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const DarkMode: Story = {
  ...Variants,
  globals: { theme: "dark" },
}

// ---------- Composition ----------

/** `buttonVariants()` styles a non-button element, e.g. a Next.js `<Link>`. */
export const AsLink: Story = {
  render: () => (
    <a href="#register" className={buttonVariants({ variant: "outline" })}>
      สมัครสมาชิก
    </a>
  ),
}

/** A utility passed via `className` beats the component's own radius. */
export const ClassNameOverride: Story = {
  args: { className: "rounded-md", children: "มุมโค้งน้อยลง" },
}

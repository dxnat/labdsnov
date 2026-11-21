import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { Input, type InputVariant } from "./Input"
import guidelines from "./Input.md?raw"

// `satisfies Record<…>` makes typecheck fail if a variant is added to or
// removed from Input without updating these stories.
const variantLabels = {
  filled: "แบบพื้นทึบ (filled)",
  outline: "แบบเส้นขอบ (outline)",
} satisfies Record<InputVariant, string>

const variants = Object.keys(variantLabels) as InputVariant[]

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    variant: "filled",
    type: "text",
    placeholder: "ชื่อ-นามสกุล",
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    variant: { control: "select", options: variants },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "search", "number", "file"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="grid gap-6">
      {variants.map((variant) => (
        <div key={variant} className="grid gap-2">
          <Label htmlFor={`input-${variant}`}>{variantLabels[variant]}</Label>
          <Input {...args} id={`input-${variant}`} variant={variant} />
        </div>
      ))}
    </div>
  ),
}

export const Types: Story = {
  render: (args) => (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="input-email" required>
          อีเมล
        </Label>
        <Input {...args} id="input-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="input-password" required>
          รหัสผ่าน
        </Label>
        <Input {...args} id="input-password" type="password" defaultValue="password123" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="input-phone">เบอร์โทรศัพท์</Label>
        <Input {...args} id="input-phone" type="tel" placeholder="04xx xxx xxx" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="input-file">อัปโหลดไฟล์</Label>
        <Input {...args} id="input-file" type="file" placeholder={undefined} />
      </div>
    </div>
  ),
}

// ---------- States ----------

/**
 * Uses `fireEvent.change`, not `userEvent.type`: user-event's simulated typing
 * updates the value but never reaches React's `onChange` on Base UI's Input
 * (real keyboard input does). `fireEvent.change` sets the value the way React
 * expects.
 */
export const Typing: Story = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByPlaceholderText("ชื่อ-นามสกุล")
    await expect(input).toHaveAttribute("data-slot", "input")
    await expect(input).toHaveAttribute("data-variant", "filled")
    await fireEvent.change(input, { target: { value: "สมชาย ใจดี" } })
    await expect(input).toHaveValue("สมชาย ใจดี")
    await expect(args.onChange).toHaveBeenCalledTimes(1)
  },
}

/** Keyboard focus shows the `--ring` border and ring (`:focus-visible`). */
export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("textbox")).toHaveFocus()
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "แก้ไขไม่ได้" },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await expect(input).toBeDisabled()
    await userEvent.tab()
    await expect(input).not.toHaveFocus()
  },
}

/** `aria-invalid` gives a destructive border and ring; link the hint with `aria-describedby`. */
export const Invalid: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="input-tfn">เลขประจำตัวผู้เสียภาษี (TFN)</Label>
      <Input
        {...args}
        id="input-tfn"
        aria-invalid
        defaultValue="123-456"
        aria-describedby="input-tfn-hint"
      />
      <p id="input-tfn-hint" className="text-xs text-destructive">
        เลขประจำตัวผู้เสียภาษี (TFN) ต้องมี 9 หลัก
      </p>
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "เลขประจำตัวผู้เสียภาษี (TFN)" })
    await expect(input).toBeInvalid()
    await expect(input).toHaveAccessibleDescription("เลขประจำตัวผู้เสียภาษี (TFN) ต้องมี 9 หลัก")
  },
}

export const DarkMode: Story = {
  ...Variants,
  globals: { theme: "dark" },
}

/** A utility passed via `className` beats the component's own radius. */
export const ClassNameOverride: Story = {
  args: { className: "rounded-md", placeholder: "มุมโค้งน้อยลง" },
}

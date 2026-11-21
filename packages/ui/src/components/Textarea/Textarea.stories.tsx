import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { Textarea } from "./Textarea"
import guidelines from "./Textarea.md?raw"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    placeholder: "พิมพ์ข้อความถึงเจ้าหน้าที่",
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    rows: { control: "number" },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="ta-message">ข้อความ</Label>
      <Textarea {...args} id="ta-message" />
    </div>
  ),
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Uses `fireEvent.change`: see the Input `Typing` story for why. */
export const Typing: Story = {
  play: async ({ args, canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "ข้อความ" })
    await expect(textarea).toHaveAttribute("data-slot", "textarea")
    await fireEvent.change(textarea, { target: { value: "ขอเปลี่ยนที่อยู่สำหรับจัดส่งเอกสาร" } })
    await expect(textarea).toHaveValue("ขอเปลี่ยนที่อยู่สำหรับจัดส่งเอกสาร")
    await expect(args.onChange).toHaveBeenCalledTimes(1)
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "แก้ไขไม่ได้" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toBeDisabled()
  },
}

/** `aria-invalid` gives a destructive border and ring; link the hint with `aria-describedby`. */
export const Invalid: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="ta-reason">เหตุผลในการถอนเงิน</Label>
      <Textarea {...args} id="ta-reason" aria-invalid aria-describedby="ta-reason-error" />
      <p id="ta-reason-error" className="text-sm text-destructive">
        กรุณาระบุเหตุผลอย่างน้อย 20 ตัวอักษร
      </p>
    </div>
  ),
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "เหตุผลในการถอนเงิน" })
    await expect(textarea).toBeInvalid()
    await expect(textarea).toHaveAccessibleDescription("กรุณาระบุเหตุผลอย่างน้อย 20 ตัวอักษร")
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

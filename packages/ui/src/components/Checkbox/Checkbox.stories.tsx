import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { Checkbox } from "./Checkbox"
import guidelines from "./Checkbox.md?raw"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="cb-terms" />
      <Label htmlFor="cb-terms">ยอมรับข้อกำหนดและเงื่อนไข</Label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const States: Story = {
  render: (args) => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox {...args} id="cb-off" />
        <Label htmlFor="cb-off">ไม่ได้เลือก</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox {...args} id="cb-on" defaultChecked />
        <Label htmlFor="cb-on">เลือกแล้ว</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox {...args} id="cb-some" indeterminate />
        <Label htmlFor="cb-some">เลือกบางรายการ</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox {...args} id="cb-disabled" disabled defaultChecked />
        <Label htmlFor="cb-disabled">ปิดใช้งาน</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox {...args} id="cb-invalid" aria-invalid />
        <Label htmlFor="cb-invalid">ข้อมูลไม่ถูกต้อง</Label>
      </div>
    </div>
  ),
}

// ---------- Interactions ----------

/** Clicking the box or its label toggles it and calls `onCheckedChange`. */
export const Toggle: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const box = canvas.getByRole("checkbox", { name: "ยอมรับข้อกำหนดและเงื่อนไข" })
    await expect(box).toHaveAttribute("data-slot", "checkbox")
    await expect(box).toHaveAttribute("aria-checked", "false")
    await userEvent.click(box)
    await expect(box).toHaveAttribute("aria-checked", "true")
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1)
    await userEvent.click(canvas.getByText("ยอมรับข้อกำหนดและเงื่อนไข"))
    await expect(box).toHaveAttribute("aria-checked", "false")
  },
}

/** Space toggles the focused checkbox. */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    const box = canvas.getByRole("checkbox")
    await expect(box).toHaveFocus()
    await userEvent.keyboard(" ")
    await expect(box).toHaveAttribute("aria-checked", "true")
  },
}

export const DarkMode: Story = {
  ...States,
  globals: { theme: "dark" },
}

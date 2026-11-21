import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { Switch, type SwitchSize } from "./Switch"
import guidelines from "./Switch.md?raw"

// `satisfies Record<…>` makes typecheck fail if a size is added to or
// removed from Switch without updating these stories.
const sizeLabels = {
  default: "ปกติ (default)",
  sm: "เล็ก (sm)",
} satisfies Record<SwitchSize, string>

const sizes = Object.keys(sizeLabels) as SwitchSize[]

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    size: "default",
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    size: { control: "select", options: sizes },
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} id="sw-email" />
      <Label htmlFor="sw-email">รับใบแจ้งยอดทางอีเมล</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Switch {...args} size={size} id={`sw-${size}`} defaultChecked />
          <Label htmlFor={`sw-${size}`}>{sizeLabels[size]}</Label>
        </div>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch {...args} id="sw-off" />
        <Label htmlFor="sw-off">ปิด</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch {...args} id="sw-on" defaultChecked />
        <Label htmlFor="sw-on">เปิด</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch {...args} id="sw-disabled" disabled defaultChecked />
        <Label htmlFor="sw-disabled">ปิดใช้งาน</Label>
      </div>
    </div>
  ),
}

// ---------- Interactions ----------

/** Clicking the switch or its label toggles it and calls `onCheckedChange`. */
export const Toggle: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole("switch", { name: "รับใบแจ้งยอดทางอีเมล" })
    await expect(control).toHaveAttribute("data-slot", "switch")
    await expect(control).toHaveAttribute("aria-checked", "false")
    await userEvent.click(control)
    await expect(control).toHaveAttribute("aria-checked", "true")
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1)
    await userEvent.click(canvas.getByText("รับใบแจ้งยอดทางอีเมล"))
    await expect(control).toHaveAttribute("aria-checked", "false")
  },
}

export const DarkMode: Story = {
  ...States,
  globals: { theme: "dark" },
}

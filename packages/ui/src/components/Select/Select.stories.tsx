import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectTriggerSize,
} from "./Select"
import guidelines from "./Select.md?raw"

// `satisfies Record<…>` makes typecheck fail if a size is added to or
// removed from SelectTrigger without updating these stories.
const sizeLabels = {
  default: "ปกติ (default)",
  sm: "เล็ก (sm)",
} satisfies Record<SelectTriggerSize, string>

const sizes = Object.keys(sizeLabels) as SelectTriggerSize[]

// `items` lets SelectValue show the label for the chosen value.
const states = {
  nsw: "นิวเซาท์เวลส์",
  vic: "วิกตอเรีย",
  qld: "ควีนส์แลนด์",
  wa: "ออสเตรเลียตะวันตก",
}

/**
 * Stories target `SelectTrigger`, whose `size` is the Select's semantic prop.
 * The list is portalled to `document.body`, so play functions query it with
 * `screen`, not `canvas`.
 */
const meta = {
  title: "Components/Select",
  component: SelectTrigger,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    size: "default",
  },
  argTypes: {
    size: { control: "select", options: sizes },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="select-state">รัฐที่อยู่อาศัย</Label>
      <Select items={states}>
        <SelectTrigger {...args} id="select-state" className="w-full">
          <SelectValue placeholder="เลือกรัฐ" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(states).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
} satisfies Meta<typeof SelectTrigger>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-3">
      {sizes.map((size) => (
        <Select key={size} items={states} defaultValue="vic">
          <SelectTrigger {...args} size={size} aria-label={sizeLabels[size]}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(states).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
}

/** Groups with labels and a separator, and a disabled option. */
export const Groups: Story = {
  render: (args) => (
    <Select
      items={{
        cash: "เงินสด",
        bonds: "ตราสารหนี้",
        shares: "หุ้นออสเตรเลีย",
        global: "หุ้นต่างประเทศ",
      }}
    >
      <SelectTrigger {...args} className="w-64" aria-label="สินทรัพย์">
        <SelectValue placeholder="เลือกสินทรัพย์" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ความเสี่ยงต่ำ</SelectLabel>
          <SelectItem value="cash">เงินสด</SelectItem>
          <SelectItem value="bonds">ตราสารหนี้</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>ความเสี่ยงสูง</SelectLabel>
          <SelectItem value="shares">หุ้นออสเตรเลีย</SelectItem>
          <SelectItem value="global" disabled>
            หุ้นต่างประเทศ
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

// ---------- States ----------

/** Clicking the trigger opens the list; choosing an item shows its label. */
export const Choosing: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: "รัฐที่อยู่อาศัย" })
    await expect(trigger).toHaveTextContent("เลือกรัฐ")
    await userEvent.click(trigger)
    await userEvent.click(await screen.findByRole("option", { name: "ควีนส์แลนด์" }))
    await waitFor(() => expect(trigger).toHaveTextContent("ควีนส์แลนด์"))
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
  },
}

export const Disabled: Story = {
  render: (args) => (
    <Select items={states} disabled>
      <SelectTrigger {...args} className="w-64" aria-label="รัฐที่อยู่อาศัย">
        <SelectValue placeholder="เลือกรัฐ" />
      </SelectTrigger>
      <SelectContent />
    </Select>
  ),
}

/** `aria-invalid` on the trigger gives the destructive border and ring. */
export const Invalid: Story = {
  args: { "aria-invalid": true },
}

export const DarkMode: Story = {
  ...Sizes,
  globals: { theme: "dark" },
}

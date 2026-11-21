import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Separator } from "./Separator"
import guidelines from "./Separator.md?raw"

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="w-80 text-sm">
      <p className="font-medium">ยอดเงินในบัญชี</p>
      <p className="text-muted-foreground">อัปเดตล่าสุด 13 พ.ย. 2569</p>
      <Separator {...args} className="my-4" />
      <p>เงินสมทบปีนี้ AU$12,450.00</p>
    </div>
  ),
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("separator")
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal")
  },
}

/** Vertical separators stretch to the height of the row. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>ภาพรวม</span>
      <Separator orientation="vertical" />
      <span>ธุรกรรม</span>
      <Separator orientation="vertical" />
      <span>เอกสาร</span>
    </div>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

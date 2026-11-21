import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Progress, ProgressLabel, ProgressValue } from "./Progress"
import guidelines from "./Progress.md?raw"

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    value: 62,
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    className: { control: "text" },
  },
  render: (args) => (
    <Progress {...args} className="w-80">
      <ProgressLabel>เงินสมทบปีนี้เทียบกับเพดาน</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "เงินสมทบปีนี้เทียบกับเพดาน" })
    await expect(bar).toHaveAttribute("aria-valuenow", "62")
  },
}

/** Without a visible label, name the bar with `aria-label`. */
export const BarOnly: Story = {
  render: (args) => (
    <Progress {...args} className="w-80" aria-label="ความคืบหน้าการยื่นคำขอ" />
  ),
}

/** `value={null}`: the amount is unknown, so no number is announced. */
export const Indeterminate: Story = {
  args: { value: null },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow")
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

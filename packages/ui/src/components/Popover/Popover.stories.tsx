import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { Input } from "../Input"
import { Label } from "../Label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./Popover"
import guidelines from "./Popover.md?raw"

/**
 * Stories target `PopoverContent`, whose `side` and `align` place the panel.
 * The panel is portalled to `document.body`, so play functions use `screen`.
 */
const meta = {
  title: "Components/Popover",
  component: PopoverContent,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    side: "bottom",
    align: "center",
  },
  argTypes: {
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
    align: { control: "select", options: ["start", "center", "end"] },
    className: { control: "text" },
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>ตั้งเป้าหมายการออม</PopoverTrigger>
      <PopoverContent {...args}>
        <PopoverHeader>
          <PopoverTitle>เป้าหมายการออม</PopoverTitle>
          <PopoverDescription>ยอดเงินที่อยากมีเมื่อเกษียณ</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <Label htmlFor="popover-goal">จำนวนเงิน (AUD)</Label>
          <Input id="popover-goal" type="number" defaultValue={500000} />
        </div>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof PopoverContent>

export default meta
type Story = StoryObj<typeof meta>

/** Click the trigger; `side` and `align` are in Controls. */
export const Playground: Story = {}

/** The panel is a named dialog; Escape closes it and returns focus to the trigger. */
export const OpenAndClose: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "ตั้งเป้าหมายการออม" })
    await userEvent.click(trigger)
    const panel = await screen.findByRole("dialog", { name: "เป้าหมายการออม" })
    await expect(panel).toHaveAccessibleDescription("ยอดเงินที่อยากมีเมื่อเกษียณ")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}

/** Rendered open for inspection. Hidden from Docs, where it would cover the page. */
export const Open: Story = {
  tags: ["!autodocs"],
  render: (args) => (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button variant="outline" />}>ตั้งเป้าหมายการออม</PopoverTrigger>
      <PopoverContent {...args}>
        <PopoverHeader>
          <PopoverTitle>เป้าหมายการออม</PopoverTitle>
          <PopoverDescription>ยอดเงินที่อยากมีเมื่อเกษียณ</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const OpenDarkMode: Story = {
  ...Open,
  globals: { theme: "dark" },
}

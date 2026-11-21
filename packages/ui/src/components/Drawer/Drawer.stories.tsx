import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { Input } from "../Input"
import { Label } from "../Label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer"
import guidelines from "./Drawer.md?raw"

/** The panel is portalled to `document.body`, so play functions use `screen`. */
const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    swipeDirection: "down",
    showSwipeHandle: true,
  },
  argTypes: {
    swipeDirection: { control: "select", options: ["down", "up", "left", "right"] },
    showSwipeHandle: { control: "boolean" },
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>เพิ่มเงินสมทบ</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>เพิ่มเงินสมทบ</DrawerTitle>
          <DrawerDescription>เงินจะเข้าบัญชีภายใน 3 วันทำการ</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-2 p-4">
          <Label htmlFor="drawer-amount">จำนวนเงิน (AUD)</Label>
          <Input id="drawer-amount" type="number" placeholder="0.00" />
        </div>
        <DrawerFooter>
          <Button>ยืนยัน</Button>
          <DrawerClose render={<Button variant="outline" />}>ยกเลิก</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/** Opens from the bottom; `swipeDirection` picks the edge. */
export const Playground: Story = {}

/** Opens as a named dialog; "ยกเลิก" closes it (checked by state, see AGENTS.md). */
export const OpenAndClose: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "เพิ่มเงินสมทบ" })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole("dialog", { name: "เพิ่มเงินสมทบ" })
    await expect(dialog).toHaveAccessibleDescription("เงินจะเข้าบัญชีภายใน 3 วันทำการ")
    await userEvent.click(screen.getByRole("button", { name: "ยกเลิก" }))
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  },
}

/** From the right: a side panel, 75% wide on phones and 384px from 640px. */
export const FromRight: Story = {
  args: { swipeDirection: "right" },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

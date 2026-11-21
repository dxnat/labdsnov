import {
  Delete02Icon,
  Download01Icon,
  MoreHorizontalIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu"
import guidelines from "./DropdownMenu.md?raw"

const onEdit = fn()

/**
 * Stories target `DropdownMenuContent`, whose `side` and `align` place the
 * panel. It is portalled to `document.body`, so play functions use `screen`.
 */
const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenuContent,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    side: "bottom",
    align: "start",
  },
  argTypes: {
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
    align: { control: "select", options: ["start", "center", "end"] },
    className: { control: "text" },
  },
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button size="icon" variant="outline" aria-label="ตัวเลือกผู้รับผลประโยชน์" />}
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent {...args}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>ผู้รับผลประโยชน์</DropdownMenuLabel>
          <DropdownMenuItem onClick={onEdit}>
            <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
            แก้ไข
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
            ดาวน์โหลดแบบฟอร์ม
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>ส่งต่อให้ที่ปรึกษา</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          ลบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenuContent>

export default meta
type Story = StoryObj<typeof meta>

/** Click the trigger; `side` and `align` are in Controls. */
export const Playground: Story = {}

/** Choosing an item runs it and closes the menu. */
export const ChooseItem: Story = {
  play: async ({ canvas, userEvent }) => {
    onEdit.mockClear()
    const trigger = canvas.getByRole("button", { name: "ตัวเลือกผู้รับผลประโยชน์" })
    await userEvent.click(trigger)
    await screen.findByRole("menu")
    await userEvent.click(screen.getByRole("menuitem", { name: "แก้ไข" }))
    await expect(onEdit).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  },
}

/**
 * Opening from the keyboard focuses the first item; arrow keys move through
 * the items; Escape closes.
 */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "ตัวเลือกผู้รับผลประโยชน์" })
    trigger.focus()
    await userEvent.keyboard("{Enter}")
    await screen.findByRole("menu")
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "แก้ไข" })).toHaveFocus())
    await userEvent.keyboard("{ArrowDown}")
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: /ดาวน์โหลดแบบฟอร์ม/ })).toHaveFocus()
    )
    await userEvent.keyboard("{ArrowDown}")
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "ส่งต่อให้ที่ปรึกษา" })).toHaveFocus()
    )
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  },
}

/** Checkbox and radio items, and a submenu. Rendered open; hidden from Docs. */
export const Choices: Story = {
  tags: ["!autodocs"],
  render: (args) => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>การแสดงผล</DropdownMenuTrigger>
      <DropdownMenuContent {...args}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>คอลัมน์</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>วันที่</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem defaultChecked>จำนวนเงิน</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>สถานะ</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>เรียงตาม</DropdownMenuLabel>
          <DropdownMenuRadioGroup defaultValue="newest">
            <DropdownMenuRadioItem value="newest">ล่าสุดก่อน</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">เก่าสุดก่อน</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>ส่งออก</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>CSV</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const ChoicesDarkMode: Story = {
  ...Choices,
  globals: { theme: "dark" },
}

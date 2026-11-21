import { Delete02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  type AlertDialogSize,
} from "./AlertDialog"
import guidelines from "./AlertDialog.md?raw"

// `satisfies Record<…>` makes typecheck fail if a size is added to or
// removed from AlertDialogContent without updating these stories.
const sizes = Object.keys({
  default: true,
  sm: true,
} satisfies Record<AlertDialogSize, true>) as AlertDialogSize[]

/**
 * Stories target `AlertDialogContent`, whose `size` is the semantic prop. The
 * popup is portalled to `document.body`, so play functions use `screen`.
 */
const meta = {
  title: "Components/AlertDialog",
  component: AlertDialogContent,
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
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        ลบผู้รับผลประโยชน์
      </AlertDialogTrigger>
      <AlertDialogContent {...args}>
        <AlertDialogHeader>
          <AlertDialogTitle>ลบผู้รับผลประโยชน์?</AlertDialogTitle>
          <AlertDialogDescription>
            การลบนี้ไม่สามารถย้อนกลับได้ ข้อมูลของสมหญิง ใจดี จะถูกลบออกจากบัญชีของคุณ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          {/* AlertDialogAction doesn't close the dialog: the app closes it once the delete succeeds. */}
          <AlertDialogAction variant="destructive">ลบ</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<typeof AlertDialogContent>

export default meta
type Story = StoryObj<typeof meta>

/** Click the trigger; `size` is editable in Controls. */
export const Playground: Story = {}

/**
 * Opens as an `alertdialog`; focus starts on the least destructive button
 * ("ยกเลิก"). Escape closes it. Closing is checked by state (see AGENTS.md).
 */
export const OpenAndCancel: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "ลบผู้รับผลประโยชน์" })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole("alertdialog", { name: "ลบผู้รับผลประโยชน์?" })
    await expect(dialog).toHaveAccessibleDescription(/ไม่สามารถย้อนกลับได้/)
    await waitFor(() => expect(screen.getByRole("button", { name: "ยกเลิก" })).toHaveFocus())
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  },
}

/** `size="sm"` with an icon: centred text, the two buttons side by side. */
export const SmallWithMedia: Story = {
  tags: ["!autodocs"],
  args: { size: "sm" },
  render: (args) => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        ลบเอกสาร
      </AlertDialogTrigger>
      <AlertDialogContent {...args}>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          </AlertDialogMedia>
          <AlertDialogTitle>ลบเอกสาร?</AlertDialogTitle>
          <AlertDialogDescription>ไฟล์ที่ลบแล้วกู้คืนไม่ได้</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction variant="destructive">ลบ</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const SmallDarkMode: Story = {
  ...SmallWithMedia,
  globals: { theme: "dark" },
}

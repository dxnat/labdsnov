import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { Button } from "../Button"
import { Input } from "../Input"
import { Label } from "../Label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type DialogSize,
} from "./Dialog"

// `satisfies Record<…>` makes typecheck fail if a size is added to or
// removed from DialogContent without updating these stories.
const sizeLabels = {
  sm: "เล็ก (sm)",
  default: "ปกติ (default)",
  lg: "ใหญ่ (lg)",
  xl: "ใหญ่พิเศษ (xl)",
} satisfies Record<DialogSize, string>

const sizes = Object.keys(sizeLabels) as DialogSize[]

/**
 * Stories target `DialogContent`, whose props (`size`, `showCloseButton`) are
 * the Dialog's semantic props. The popup renders in a portal on
 * `document.body`, so play functions query it with `screen`, not `canvas`.
 */
const meta = {
  title: "Components/Dialog",
  component: DialogContent,
  tags: ["autodocs"],
  args: {
    size: "default",
    showCloseButton: true,
  },
  argTypes: {
    size: { control: "select", options: sizes },
    showCloseButton: { control: "boolean" },
    className: { control: "text" },
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        เปิดกล่องโต้ตอบ
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>เปลี่ยนแผนการลงทุน</DialogTitle>
          <DialogDescription>
            การเปลี่ยนแผนจะมีผลกับเงินสมทบงวดถัดไป
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
          <DialogClose render={<Button />}>ยืนยัน</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof DialogContent>

export default meta
type Story = StoryObj<typeof meta>

/** Click the trigger; `size` and `showCloseButton` are editable in Controls. */
export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline" />}>
            {sizeLabels[size]}
          </DialogTrigger>
          <DialogContent {...args} size={size}>
            <DialogHeader>
              <DialogTitle>กล่องโต้ตอบขนาด {sizeLabels[size]}</DialogTitle>
              <DialogDescription>
                ตัวอย่างความกว้างสูงสุดของกล่องโต้ตอบในขนาดนี้
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
}

// ---------- States ----------

/**
 * Rendered open so the popup, overlay and close button can be inspected.
 * Hidden from the Docs page, where an open modal would cover everything.
 */
export const Open: Story = {
  tags: ["!autodocs"],
  render: (args) => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button variant="outline" />}>
        เปิดกล่องโต้ตอบ
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>เปลี่ยนแผนการลงทุน</DialogTitle>
          <DialogDescription>
            การเปลี่ยนแผนจะมีผลกับเงินสมทบงวดถัดไป
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
          <DialogClose render={<Button />}>ยืนยัน</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const OpenDarkMode: Story = {
  ...Open,
  globals: { theme: "dark" },
}

/**
 * Closing is checked by state (`aria-expanded`, `data-closed`), not by the
 * popup leaving the DOM: Base UI unmounts it only after the exit animation,
 * and browsers pause animations in background tabs.
 */
async function expectClosed(trigger: HTMLElement, dialog: HTMLElement) {
  await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  await expect(dialog).toHaveAttribute("data-closed")
}

/** Trigger opens it; the corner close button (label "ปิด") closes it. */
export const OpenAndClose: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "เปิดกล่องโต้ตอบ" })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole("dialog")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(dialog).toHaveAttribute("data-open")
    await expect(dialog).toHaveAccessibleName("เปลี่ยนแผนการลงทุน")
    await expect(dialog).toHaveAccessibleDescription(
      "การเปลี่ยนแผนจะมีผลกับเงินสมทบงวดถัดไป"
    )
    await expect(dialog).toHaveAttribute("data-size", "default")
    await userEvent.click(screen.getByRole("button", { name: "ปิด" }))
    await expectClosed(trigger, dialog)
  },
}

export const EscapeCloses: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "เปิดกล่องโต้ตอบ" })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole("dialog")
    await userEvent.keyboard("{Escape}")
    await expectClosed(trigger, dialog)
  },
}

/** `showCloseButton={false}` removes the corner button, e.g. for confirmations. */
export const WithoutCloseButton: Story = {
  args: { showCloseButton: false },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "เปิดกล่องโต้ตอบ" })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole("dialog")
    await expect(screen.queryByRole("button", { name: "ปิด" })).toBeNull()
    await userEvent.click(screen.getByRole("button", { name: "ยกเลิก" }))
    await expectClosed(trigger, dialog)
  },
}

// ---------- Examples (from the app) ----------

export const EditAccountForm: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Dialog>
      <DialogTrigger render={<Button />}>แก้ไขข้อมูลบัญชี</DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลบัญชี</DialogTitle>
          <DialogDescription>
            อัปเดตข้อมูลส่วนตัวของคุณ แล้วกดบันทึกเมื่อเสร็จสิ้น
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="dlg-name" required>
              ชื่อ-นามสกุล
            </Label>
            <Input id="dlg-name" defaultValue="สมชาย ใจดี" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dlg-email" required>
              อีเมล
            </Label>
            <Input id="dlg-email" type="email" defaultValue="somchai@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dlg-phone">เบอร์โทรศัพท์</Label>
            <Input id="dlg-phone" type="tel" placeholder="04xx xxx xxx" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
          <DialogClose render={<Button />}>บันทึก</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "แก้ไขข้อมูลบัญชี" }))
    await screen.findByRole("dialog")
    // Base UI moves focus into the popup, to the first field.
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: "ชื่อ-นามสกุล" })).toHaveFocus()
    )
  },
}

export const ConfirmDelete: Story = {
  args: { size: "sm", showCloseButton: false },
  render: (args) => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        ยืนยันการลบ
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>ลบบัญชีผู้รับผลประโยชน์?</DialogTitle>
          <DialogDescription>
            การลบนี้ไม่สามารถย้อนกลับได้
            ข้อมูลผู้รับผลประโยชน์จะถูกลบออกจากบัญชีของคุณ
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
          <DialogClose render={<Button variant="destructive" />}>ลบ</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

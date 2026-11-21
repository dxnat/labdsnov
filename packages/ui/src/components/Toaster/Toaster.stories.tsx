import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { toast, Toaster } from "./Toaster"
import guidelines from "./Toaster.md?raw"

/**
 * Each story mounts its own `Toaster` next to buttons that call `toast()`.
 * Toasts render outside the story root, so play functions use `screen`.
 */
const meta = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    position: "bottom-right",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
    },
    richColors: { control: "boolean" },
    closeButton: { control: "boolean" },
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("บันทึกการเปลี่ยนแปลงแล้ว")}>
          ข้อความทั่วไป
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success("เปลี่ยนแผนการลงทุนแล้ว", {
              description: "มีผลกับเงินสมทบงวดถัดไป",
            })
          }
        >
          สำเร็จ
        </Button>
        <Button variant="outline" onClick={() => toast.info("มีเอกสารใหม่ในบัญชีของคุณ")}>
          ข้อมูล
        </Button>
        <Button variant="outline" onClick={() => toast.warning("เซสชันจะหมดอายุใน 2 นาที")}>
          คำเตือน
        </Button>
        <Button variant="outline" onClick={() => toast.error("ไม่สามารถบันทึกได้ กรุณาลองอีกครั้ง")}>
          ผิดพลาด
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
              loading: "กำลังส่งคำขอ…",
              success: "ส่งคำขอแล้ว",
              error: "ส่งคำขอไม่สำเร็จ",
            })
          }
        >
          กำลังโหลด
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("ลบผู้รับผลประโยชน์แล้ว", {
              action: { label: "เลิกทำ", onClick: () => toast("กู้คืนแล้ว") },
            })
          }
        >
          มีปุ่มเลิกทำ
        </Button>
      </div>
    </>
  ),
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Click a button to show that kind of toast. */
export const Playground: Story = {}

/**
 * `toast.success()` shows the title and description. Checked by presence, not
 * visibility: the toast fades in, and animations pause in a hidden page.
 */
export const ShowToast: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "สำเร็จ" }))
    const title = await screen.findByText("เปลี่ยนแผนการลงทุนแล้ว")
    await expect(title.closest("[data-sonner-toast]")).toHaveAttribute("data-type", "success")
    await expect(screen.getByText("มีผลกับเงินสมทบงวดถัดไป")).toBeInTheDocument()
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

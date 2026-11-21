import {
  Alert02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  type AlertVariant,
} from "./Alert"
import guidelines from "./Alert.md?raw"

// `satisfies Record<…>` makes typecheck fail if a variant is added to or
// removed from Alert without updating these stories.
const variants = Object.keys({
  default: true,
  destructive: true,
} satisfies Record<AlertVariant, true>) as AlertVariant[]

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    variant: "default",
  },
  argTypes: {
    variant: { control: "select", options: variants },
    className: { control: "text" },
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
      <AlertTitle>ใบแจ้งยอดประจำปีพร้อมแล้ว</AlertTitle>
      <AlertDescription>ดาวน์โหลดได้ที่แท็บเอกสาร ภายในวันที่ 31 ธ.ค. 2569</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent("ใบแจ้งยอดประจำปีพร้อมแล้ว")
  },
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
      <AlertTitle>ไม่สามารถรับเงินสมทบได้</AlertTitle>
      <AlertDescription>
        ข้อมูลบัญชีธนาคารของคุณไม่ถูกต้อง กรุณาตรวจสอบและแก้ไขก่อนวันที่ 30 พ.ย. 2569
      </AlertDescription>
    </Alert>
  ),
}

/** Without an icon, the text takes the full width. */
export const WithoutIcon: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>ระบบจะปิดปรับปรุงคืนวันเสาร์นี้</AlertTitle>
      <AlertDescription>ตั้งแต่ 22:00 ถึง 02:00 น. (เวลาซิดนีย์)</AlertDescription>
    </Alert>
  ),
}

/** `AlertAction` holds a small button in the top-right corner. */
export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
      <AlertTitle>ยังไม่ได้ระบุผู้รับผลประโยชน์</AlertTitle>
      <AlertDescription>ระบุผู้รับผลประโยชน์เพื่อให้เงินไปถึงคนที่คุณต้องการ</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          ระบุเลย
        </Button>
      </AlertAction>
    </Alert>
  ),
}

export const DarkMode: Story = {
  ...Destructive,
  globals: { theme: "dark" },
}

import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Badge } from "../Badge"
import { Button } from "../Button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardSize,
} from "./Card"
import guidelines from "./Card.md?raw"

// `satisfies Record<…>` makes typecheck fail if a size is added to or
// removed from Card without updating these stories.
const sizes = Object.keys({
  default: true,
  sm: true,
} satisfies Record<CardSize, true>) as CardSize[]

const meta = {
  title: "Components/Card",
  component: Card,
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
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>ยอดเงินในบัญชี</CardTitle>
        <CardDescription>ณ วันที่ 13 พ.ย. 2569</CardDescription>
        <CardAction>
          <Badge variant="success">ใช้งานอยู่</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tabular-nums">AU$84,215.37</p>
        <p className="text-muted-foreground">แผนสมดุล (Balanced)</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">ดูธุรกรรม</Button>
        <Button>เพิ่มเงินสมทบ</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('[data-slot="card"]')
    await expect(card).toHaveAttribute("data-size", "default")
  },
}

export const Small: Story = {
  args: { size: "sm" },
}

/** `CardAction` with an icon-only menu button (needs an `aria-label`). */
export const WithMenuButton: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>ผู้รับผลประโยชน์</CardTitle>
        <CardDescription>2 คน · แบ่งเท่ากัน</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost" aria-label="ตัวเลือกเพิ่มเติม">
            <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>สมหญิง ใจดี (คู่สมรส) · สมศักดิ์ ใจดี (บุตร)</p>
      </CardContent>
    </Card>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

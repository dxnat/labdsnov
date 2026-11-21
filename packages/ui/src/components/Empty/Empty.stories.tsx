import { File01Icon, UserAdd01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  type EmptyMediaVariant,
} from "./Empty"
import guidelines from "./Empty.md?raw"

// `satisfies Record<…>` makes typecheck fail if a variant is added to or
// removed from EmptyMedia without updating these stories.
const mediaVariants = Object.keys({
  default: true,
  icon: true,
} satisfies Record<EmptyMediaVariant, true>) as EmptyMediaVariant[]

const meta = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  argTypes: {
    className: { control: "text" },
  },
  render: (args) => (
    <Empty {...args} className="w-96 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>ยังไม่มีผู้รับผลประโยชน์</EmptyTitle>
        <EmptyDescription>
          ระบุผู้รับผลประโยชน์เพื่อให้เงินไปถึงคนที่คุณต้องการ
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>เพิ่มผู้รับผลประโยชน์</Button>
      </EmptyContent>
    </Empty>
  ),
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

/** Empty beneficiaries list, with the next step as a button. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("ยังไม่มีผู้รับผลประโยชน์")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "เพิ่มผู้รับผลประโยชน์" })).toBeVisible()
  },
}

/** `EmptyMedia` variants: the icon as is, or in a grey square. */
export const MediaVariants: Story = {
  render: () => (
    <div className="grid gap-4">
      {mediaVariants.map((variant) => (
        <Empty key={variant} className="w-96 border">
          <EmptyHeader>
            <EmptyMedia variant={variant}>
              <HugeiconsIcon icon={File01Icon} strokeWidth={2} className="size-8" />
            </EmptyMedia>
            <EmptyTitle>ยังไม่มีเอกสาร ({variant})</EmptyTitle>
            <EmptyDescription>ใบแจ้งยอดประจำปีจะแสดงที่นี่</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ))}
    </div>
  ),
}

/** Without `border`: for an empty area inside a card or table. */
export const NoBorder: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyTitle>ไม่พบธุรกรรม</EmptyTitle>
        <EmptyDescription>ลองเปลี่ยนช่วงวันที่</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

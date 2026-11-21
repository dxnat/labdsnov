import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ArrowDown01Icon,
  MinusSignIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { Input } from "../Input"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./ButtonGroup"
import guidelines from "./ButtonGroup.md?raw"

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    orientation: "horizontal",
    "aria-label": "ดาวน์โหลดรายงาน",
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    className: { control: "text" },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">PDF</Button>
      <Button variant="outline">Excel</Button>
      <Button variant="outline">CSV</Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Related actions in one bar: inner corners are square and neighbours share a border. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("group", { name: "ดาวน์โหลดรายงาน" })
    ).toBeInTheDocument()
    const [first, middle, last] = canvas.getAllByRole("button")
    await expect(getComputedStyle(first).borderTopRightRadius).toBe("0px")
    await expect(getComputedStyle(middle).borderTopLeftRadius).toBe("0px")
    await expect(getComputedStyle(middle).borderLeftWidth).toBe("0px")
    await expect(getComputedStyle(last).borderTopRightRadius).not.toBe("0px")
  },
}

/** An input with a unit and a button: `ButtonGroupText` for the fixed part. */
export const WithInput: Story = {
  args: { "aria-label": "เงินสมทบเพิ่มเติม" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupText>AU$</ButtonGroupText>
      <Input
        aria-label="จำนวนเงิน"
        type="number"
        placeholder="0.00"
        className="w-36"
      />
      <Button>เพิ่ม</Button>
    </ButtonGroup>
  ),
}

/** Buttons without a border of their own need a `ButtonGroupSeparator` between them. */
export const SplitButton: Story = {
  args: { "aria-label": "บันทึก" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>บันทึกการเปลี่ยนแปลง</Button>
      <ButtonGroupSeparator />
      <Button size="icon" aria-label="ตัวเลือกการบันทึกเพิ่มเติม">
        <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical", "aria-label": "ปรับขนาดกราฟ" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon" aria-label="ขยาย">
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
      </Button>
      <Button variant="outline" size="icon" aria-label="ย่อ">
        <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
      </Button>
    </ButtonGroup>
  ),
}

/** Groups inside a group keep an 8px gap between them. */
export const Nested: Story = {
  args: { "aria-label": "เลื่อนหน้า" },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroup aria-label="หน้า">
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="ก่อนหน้าและถัดไป">
        <Button variant="outline">ก่อนหน้า</Button>
        <Button variant="outline">ถัดไป</Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
}

/** Tab moves through the buttons; the focused one draws its ring above its neighbours. */
export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await userEvent.tab()
    const excel = canvas.getByRole("button", { name: "Excel" })
    await expect(excel).toHaveFocus()
    await expect(getComputedStyle(excel).zIndex).toBe("10")
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

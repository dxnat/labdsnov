import {
  Copy01Icon,
  Search01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  type InputGroupAddonAlign,
} from "./InputGroup"
import guidelines from "./InputGroup.md?raw"

// `satisfies Record<…>` makes typecheck fail if an alignment is added to or
// removed from InputGroupAddon without updating these stories.
const aligns = Object.keys({
  "inline-start": true,
  "inline-end": true,
  "block-start": true,
  "block-end": true,
} satisfies Record<InputGroupAddonAlign, true>) as InputGroupAddonAlign[]

const onCopy = fn()

const meta = {
  title: "Components/InputGroup",
  component: InputGroupAddon,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    align: "inline-start",
  },
  argTypes: {
    align: { control: "select", options: aligns },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="ig-amount">จำนวนเงินสมทบเพิ่มเติม</Label>
      <InputGroup>
        <InputGroupInput id="ig-amount" type="number" placeholder="0.00" />
        <InputGroupAddon {...args}>
          <InputGroupText>AU$</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
} satisfies Meta<typeof InputGroupAddon>

export default meta
type Story = StoryObj<typeof meta>

/** A currency prefix; `align` moves the addon around the input. */
export const Playground: Story = {}

/** Icon at the start, as for a search field. Clicking the addon focuses the input. */
export const SearchIcon: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="ค้นหาธุรกรรม" aria-label="ค้นหาธุรกรรม" />
      <InputGroupAddon>
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "ค้นหาธุรกรรม" })
    const addon = canvasElement.querySelector<HTMLElement>('[data-slot="input-group-addon"]')
    await userEvent.click(addon!)
    await expect(input).toHaveFocus()
  },
}

/** Buttons at the end, e.g. show password and copy. Icon-only buttons need an `aria-label`. */
export const WithButtons: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput
        defaultValue="123 456 789"
        aria-label="เลขสมาชิก"
        readOnly
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="แสดง">
          <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
        </InputGroupButton>
        <InputGroupButton size="icon-xs" aria-label="คัดลอก" onClick={onCopy}>
          <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    onCopy.mockClear()
    await userEvent.click(canvas.getByRole("button", { name: "คัดลอก" }))
    await expect(onCopy).toHaveBeenCalledTimes(1)
  },
}

/** A textarea with a footer row (`block-end`) for a character count. */
export const TextareaWithFooter: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupTextarea placeholder="พิมพ์ข้อความถึงเจ้าหน้าที่" aria-label="ข้อความ" />
      <InputGroupAddon align="block-end">
        <InputGroupText>0/500 ตัวอักษร</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", { name: "ข้อความ" })
    await fireEvent.change(textarea, { target: { value: "สวัสดีครับ" } })
    await expect(textarea).toHaveValue("สวัสดีครับ")
  },
}

/** `aria-invalid` on the input turns the whole group red. */
export const Invalid: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput aria-label="จำนวนเงิน" defaultValue="-50" aria-invalid />
      <InputGroupAddon>
        <InputGroupText>AU$</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const DarkMode: Story = {
  ...WithButtons,
  globals: { theme: "dark" },
}

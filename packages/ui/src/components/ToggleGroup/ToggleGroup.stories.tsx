import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup"
import guidelines from "./ToggleGroup.md?raw"

const ranges = [
  { value: "1m", label: "1 เดือน" },
  { value: "6m", label: "6 เดือน" },
  { value: "1y", label: "1 ปี" },
  { value: "all", label: "ทั้งหมด" },
]

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    variant: "outline",
    size: "sm",
    spacing: 0,
    orientation: "horizontal",
    defaultValue: ["6m"],
    onValueChange: fn(),
    "aria-label": "ช่วงเวลาของกราฟ",
  },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    spacing: { control: { type: "number", min: 0, max: 4 } },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    className: { control: "text" },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      {ranges.map((r) => (
        <ToggleGroupItem key={r.value} value={r.value}>
          {r.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Chart range picker: one choice at a time, items joined into one bar (`spacing={0}`). */
export const Playground: Story = {}

/** Picking another item un-presses the previous one; `onValueChange` gets the new array. */
export const SingleChoice: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(
      canvas.getByRole("group", { name: "ช่วงเวลาของกราฟ" })
    ).toBeInTheDocument()
    const sixMonths = canvas.getByRole("button", { name: "6 เดือน" })
    const year = canvas.getByRole("button", { name: "1 ปี" })
    await expect(sixMonths).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(year)
    await expect(year).toHaveAttribute("aria-pressed", "true")
    await expect(sixMonths).toHaveAttribute("aria-pressed", "false")
    await expect(args.onValueChange).toHaveBeenLastCalledWith(
      ["1y"],
      expect.anything()
    )
  },
}

/** Arrow keys move focus between items; Space presses the focused one. */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    canvas.getByRole("button", { name: "1 เดือน" }).focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("button", { name: "6 เดือน" })).toHaveFocus()
    await userEvent.keyboard("{ArrowRight} ")
    await expect(canvas.getByRole("button", { name: "1 ปี" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
  },
}

/** `multiple`: each item is on or off on its own, e.g. text formatting. Icon-only items need `aria-label`. */
export const Multiple: Story = {
  args: {
    multiple: true,
    variant: "default",
    size: "default",
    spacing: 1,
    defaultValue: ["bold"],
    "aria-label": "รูปแบบตัวอักษร",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="ตัวหนา">
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="ตัวเอียง">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="ขีดเส้นใต้">
        <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "ตัวเอียง" }))
    await expect(canvas.getByRole("button", { name: "ตัวหนา" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    await expect(
      canvas.getByRole("button", { name: "ตัวเอียง" })
    ).toHaveAttribute("aria-pressed", "true")
  },
}

/** `spacing={2}` (the default) keeps items apart. */
export const Spaced: Story = {
  args: { spacing: 2, variant: "default" },
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

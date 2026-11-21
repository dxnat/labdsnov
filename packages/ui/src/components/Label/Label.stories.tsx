import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Input } from "../Input"
import { Label } from "./Label"
import guidelines from "./Label.md?raw"

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    children: "อีเมล",
    required: false,
  },
  argTypes: {
    required: { control: "boolean" },
    children: { control: "text" },
    htmlFor: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("อีเมล")).toHaveAttribute("data-slot", "label")
  },
}

/** `required` appends a red asterisk after the text. */
export const Required: Story = {
  args: { required: true },
  play: async ({ canvas }) => {
    const label = canvas.getByText("อีเมล")
    const after = getComputedStyle(label, "::after").content
    await expect(after).toBe('"*"')
  },
}

/** `htmlFor` ties the label to an input: clicking the label focuses it. */
export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label {...args} htmlFor="label-email" />
      <Input id="label-email" type="email" placeholder="you@example.com" />
    </div>
  ),
  args: { required: true },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("อีเมล"))
    await expect(canvas.getByRole("textbox", { name: "อีเมล" })).toHaveFocus()
  },
}

/**
 * Dims when a preceding sibling input with the `peer` class is disabled
 * (`.peer:disabled ~ label`). The input must come before the label in the DOM.
 */
export const DisabledPeer: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col-reverse gap-2">
      <Input id="label-peer" className="peer" disabled defaultValue="แก้ไขไม่ได้" />
      <Label {...args} htmlFor="label-peer" />
    </div>
  ),
  args: { children: "ชื่อ-นามสกุล" },
  play: async ({ canvas }) => {
    await expect(getComputedStyle(canvas.getByText("ชื่อ-นามสกุล")).opacity).toBe("0.5")
  },
}

/** Dims inside a `group` container marked `data-disabled="true"`. */
export const DisabledGroup: Story = {
  render: (args) => (
    <div className="group grid w-80 gap-2" data-disabled="true">
      <Label {...args} htmlFor="label-group" />
      <Input id="label-group" disabled defaultValue="แก้ไขไม่ได้" />
    </div>
  ),
  args: { children: "ชื่อ-นามสกุล" },
  play: async ({ canvas }) => {
    await expect(getComputedStyle(canvas.getByText("ชื่อ-นามสกุล")).opacity).toBe("0.5")
  },
}

export const DarkMode: Story = {
  ...WithInput,
  globals: { theme: "dark" },
}

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { Slider } from "./Slider"
import guidelines from "./Slider.md?raw"

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    defaultValue: 5,
    min: 0,
    max: 15,
    step: 0.5,
    disabled: false,
    onValueChange: fn(),
    getAriaLabel: (() => "อัตราเงินสมทบเพิ่มเติม") as (index: number) => string,
    getAriaValueText: (formatted: string) => `${formatted}% ของเงินเดือน`,
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    className: { control: "text" },
    getAriaLabel: { control: false },
    getAriaValueText: { control: false },
  },
  render: (args) => <Slider {...args} className="w-72" />,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Show the chosen value beside the label, and update it as the thumb moves. */
export const WithValue: Story = {
  render: function Render(args) {
    const [rate, setRate] = React.useState(5)
    return (
      <div className="grid w-72 gap-3">
        <div className="flex justify-between text-sm">
          <Label id="slider-rate-label">อัตราเงินสมทบเพิ่มเติม</Label>
          <span className="tabular-nums">{rate.toLocaleString("th-TH")}%</span>
        </div>
        <Slider
          {...args}
          defaultValue={undefined}
          value={rate}
          onValueChange={(value, details) => {
            setRate(value as number)
            args.onValueChange?.(value, details)
          }}
        />
      </div>
    )
  },
}

/** Arrow keys move by `step`; Page Up/Down by `largeStep`; Home/End jump to the ends. */
export const Keyboard: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const thumb = canvas.getByRole("slider", { name: "อัตราเงินสมทบเพิ่มเติม" })
    await expect(thumb).toHaveAttribute("aria-valuetext", "5% ของเงินเดือน")
    await userEvent.tab()
    await expect(thumb).toHaveFocus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(thumb).toHaveAttribute("aria-valuenow", "5.5")
    await expect(args.onValueChange).toHaveBeenCalled()
    await userEvent.keyboard("{End}")
    await expect(thumb).toHaveAttribute("aria-valuenow", "15")
  },
}

/** Two values give two thumbs; name each one. */
export const Range: Story = {
  args: {
    defaultValue: [30, 60],
    min: 18,
    max: 75,
    step: 1,
    getAriaLabel: (index: number) => (index === 0 ? "อายุต่ำสุด" : "อายุสูงสุด"),
    getAriaValueText: (formatted: string) => `${formatted} ปี`,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("slider", { name: "อายุต่ำสุด" })
    ).toHaveAttribute("aria-valuenow", "30")
    await expect(
      canvas.getByRole("slider", { name: "อายุสูงสุด" })
    ).toHaveAttribute("aria-valuenow", "60")
  },
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="h-48">
      <Slider {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider")).toBeDisabled()
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

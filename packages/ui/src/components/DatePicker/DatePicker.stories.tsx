import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { DatePicker } from "./DatePicker"
import guidelines from "./DatePicker.md?raw"

/** The calendar is in a portalled popover, so play functions use `screen`. */
const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    placeholder: "เลือกวันที่",
    disabled: false,
    onValueChange: fn(),
    calendarProps: { defaultMonth: new Date(2026, 10, 1) },
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    calendarProps: { control: false },
  },
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="dp-start">วันที่เริ่มงาน</Label>
      <DatePicker {...args} id="dp-start" />
    </div>
  ),
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Picking a day closes the calendar and shows the date in Thai ("20 พ.ย. 2569"). */
export const PickDate: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /วันที่เริ่มงาน|เลือกวันที่/ })
    await expect(trigger).toHaveTextContent("เลือกวันที่")
    await userEvent.click(trigger)
    await userEvent.click(await screen.findByRole("button", { name: /20 พฤศจิกายน พ\.ศ\. 2569/ }))
    await waitFor(() => expect(trigger).toHaveTextContent("20 พ.ย. 2569"))
    await expect(args.onValueChange).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  },
}

/** A date chosen already. */
export const WithValue: Story = {
  args: { defaultValue: new Date(2026, 10, 13) },
}

/** Date of birth: month/year dropdowns, no future dates. */
export const DateOfBirth: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="dp-dob">วันเกิด</Label>
      <DatePicker
        {...args}
        id="dp-dob"
        calendarProps={{
          captionLayout: "dropdown",
          defaultMonth: new Date(1985, 0),
          startMonth: new Date(1940, 0),
          endMonth: new Date(2026, 10),
          disabled: { after: new Date(2026, 10, 13) },
        }}
      />
    </div>
  ),
}

export const DarkMode: Story = {
  args: { defaultValue: new Date(2026, 10, 13) },
  globals: { theme: "dark" },
}

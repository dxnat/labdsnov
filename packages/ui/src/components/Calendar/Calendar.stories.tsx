import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import type { DateRange } from "react-day-picker"

import { usageDoc } from "../../storybook/usageDoc"

import { Card, CardContent } from "../Card"
import { Calendar } from "./Calendar"
import guidelines from "./Calendar.md?raw"

// Fixed dates so the stories (and their checks) don't change with today's date.
const november = new Date(2026, 10, 1)

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  argTypes: {
    captionLayout: { control: "select", options: ["label", "dropdown"] },
    showWeekNumber: { control: "boolean" },
    numberOfMonths: { control: "number" },
    className: { control: "text" },
  },
  render: function Render(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 13))
    return (
      <Calendar
        {...args}
        mode="single"
        defaultMonth={november}
        selected={date}
        onSelect={setDate}
        className="rounded-3xl border"
      />
    )
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

/** One date, Thai month and weekday names, Buddhist-era year. */
export const Playground: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("พฤศจิกายน 2569")).toBeVisible()
    const selected = canvas.getByRole("button", { name: /13 พฤศจิกายน พ\.ศ\. 2569/ })
    await expect(selected).toHaveAccessibleName(/เลือกแล้ว/)
    await userEvent.click(canvas.getByRole("button", { name: /20 พฤศจิกายน พ\.ศ\. 2569/ }))
    await expect(canvas.getByRole("button", { name: /20 พฤศจิกายน พ\.ศ\. 2569/ })).toHaveAccessibleName(
      /เลือกแล้ว/
    )
    await userEvent.click(canvas.getByRole("button", { name: "เดือนถัดไป" }))
    await expect(canvas.getByText("ธันวาคม 2569")).toBeVisible()
  },
}

/** `mode="range"` over two months, e.g. a statement period. */
export const Range: Story = {
  render: function Render(args) {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 9, 20),
      to: new Date(2026, 10, 5),
    })
    return (
      <Calendar
        {...args}
        mode="range"
        numberOfMonths={2}
        defaultMonth={new Date(2026, 9, 1)}
        selected={range}
        onSelect={setRange}
        className="rounded-3xl border"
      />
    )
  },
}

/** Month and year dropdowns, for dates far away such as a date of birth. */
export const Dropdowns: Story = {
  args: { captionLayout: "dropdown", startMonth: new Date(1940, 0), endMonth: new Date(2026, 11) },
}

/** Days before today's date in the story (13 Nov 2569) can't be chosen. */
export const DisabledDays: Story = {
  render: () => (
    <Calendar
      mode="single"
      defaultMonth={november}
      disabled={{ before: new Date(2026, 10, 13) }}
      className="rounded-3xl border"
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: /12 พฤศจิกายน พ\.ศ\. 2569/ })).toBeDisabled()
  },
}

/** Inside a Card (and a Popover) the calendar's own background turns transparent. */
export const InCard: Story = {
  render: () => (
    <Card className="w-fit">
      <CardContent>
        <Calendar mode="single" defaultMonth={november} />
      </CardContent>
    </Card>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

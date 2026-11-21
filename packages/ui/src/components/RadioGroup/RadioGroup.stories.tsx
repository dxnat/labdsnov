import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { RadioGroup, RadioGroupItem } from "./RadioGroup"
import guidelines from "./RadioGroup.md?raw"

const plans = [
  { value: "conservative", label: "อนุรักษ์นิยม (Conservative)" },
  { value: "balanced", label: "สมดุล (Balanced)" },
  { value: "growth", label: "เติบโตสูง (High Growth)" },
]

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    defaultValue: "balanced",
    disabled: false,
    onValueChange: fn(),
    "aria-label": "แผนการลงทุน",
  },
  argTypes: {
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
  render: (args) => (
    <RadioGroup {...args} className="w-72">
      {plans.map((plan) => (
        <div key={plan.value} className="flex items-center gap-2">
          <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
          <Label htmlFor={`plan-${plan.value}`}>{plan.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radiogroup", { name: "แผนการลงทุน" })).toBeVisible()
    await expect(canvas.getByRole("radio", { name: "สมดุล (Balanced)" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
  },
}

/** One item disabled; `aria-invalid` on an item shows the error ring. */
export const States: Story = {
  render: (args) => (
    <RadioGroup {...args} className="w-72">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="balanced" id="rs-balanced" />
        <Label htmlFor="rs-balanced">สมดุล (Balanced)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="growth" id="rs-growth" disabled />
        <Label htmlFor="rs-growth">เติบโตสูง (ปิดรับสมัคร)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="esg" id="rs-esg" aria-invalid />
        <Label htmlFor="rs-esg">ข้อมูลไม่ถูกต้อง</Label>
      </div>
    </RadioGroup>
  ),
}

// ---------- Interactions ----------

/** Clicking a label selects its option and calls `onValueChange`. */
export const Choosing: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("เติบโตสูง (High Growth)"))
    await expect(canvas.getByRole("radio", { name: "เติบโตสูง (High Growth)" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
    await expect(args.onValueChange).toHaveBeenCalledTimes(1)
  },
}

/** Tab focuses the selected option; arrow keys move and select. */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("radio", { name: "สมดุล (Balanced)" })).toHaveFocus()
    await userEvent.keyboard("{ArrowDown}")
    const growth = canvas.getByRole("radio", { name: "เติบโตสูง (High Growth)" })
    await expect(growth).toHaveFocus()
    await expect(growth).toHaveAttribute("aria-checked", "true")
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./InputOTP"
import guidelines from "./InputOTP.md?raw"

const onComplete = fn()

/**
 * `input-otp` renders one real (transparent) input over the boxes, so play
 * functions type into that textbox.
 */
const meta = {
  title: "Components/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    maxLength: 6,
    disabled: false,
    onComplete,
    children: null,
  },
  argTypes: {
    disabled: { control: "boolean" },
    children: { control: false },
  },
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="otp-code">รหัสยืนยัน 6 หลัก</Label>
      <InputOTP id="otp-code" maxLength={6} disabled={args.disabled} onComplete={args.onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

/** Two groups of three, as for a code sent by SMS. */
export const Playground: Story = {}

/**
 * Entering the code fills the boxes in order; `onComplete` runs after the last
 * one. Uses `fireEvent.change` (simulated typing never reaches React's
 * `onChange` here; see AGENTS.md).
 */
export const Typing: Story = {
  play: async ({ canvas }) => {
    onComplete.mockClear()
    const input = canvas.getByRole("textbox", { name: "รหัสยืนยัน 6 หลัก" })
    input.focus()
    await fireEvent.change(input, { target: { value: "482913" } })
    await expect(input).toHaveValue("482913")
    await expect(onComplete).toHaveBeenCalledWith("482913")
  },
}

/** `aria-invalid` on the slots shows the error ring around each group. */
export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="otp-invalid">รหัสยืนยัน 6 หลัก</Label>
      <InputOTP id="otp-invalid" maxLength={6} defaultValue="123456">
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} aria-invalid />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-destructive">รหัสไม่ถูกต้อง กรุณาลองอีกครั้ง</p>
    </div>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

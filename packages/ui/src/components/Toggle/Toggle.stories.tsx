import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TextBoldIcon, ViewIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Toggle, type ToggleSize, type ToggleVariant } from "./Toggle"
import guidelines from "./Toggle.md?raw"

const variants = Object.keys({ default: true, outline: true } satisfies Record<
  ToggleVariant,
  true
>)
const sizes = Object.keys({
  default: true,
  sm: true,
  lg: true,
} satisfies Record<ToggleSize, true>)

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    variant: "outline",
    size: "default",
    disabled: false,
    onPressedChange: fn(),
    children: (
      <>
        <HugeiconsIcon
          icon={ViewIcon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        แสดงเงินสมทบจากนายจ้าง
      </>
    ),
  },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: sizes },
    className: { control: "text" },
    children: { control: false },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** `default` has no border until pressed; `outline` always has one. Pressed adds a fill and a darker border. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex gap-2">
          <Toggle {...args} variant={variant as ToggleVariant}>
            {variant}
          </Toggle>
          <Toggle {...args} variant={variant as ToggleVariant} defaultPressed>
            {variant} (กดอยู่)
          </Toggle>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Toggle key={size} {...args} size={size as ToggleSize}>
          {size}
        </Toggle>
      ))}
    </div>
  ),
}

/** Icon-only: name it with `aria-label`. */
export const IconOnly: Story = {
  args: {
    variant: "default",
    "aria-label": "ตัวหนา",
    children: <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "ตัวหนา" })
    ).toBeInTheDocument()
  },
}

/** Click toggles `aria-pressed` and calls `onPressedChange`. */
export const Pressing: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "แสดงเงินสมทบจากนายจ้าง" })
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
    await expect(args.onPressedChange).toHaveBeenLastCalledWith(
      true,
      expect.anything()
    )
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
  },
}

/** Tab to focus (solid focus ring), Space or Enter to toggle. */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "แสดงเงินสมทบจากนายจ้าง" })
    await userEvent.tab()
    await expect(toggle).toHaveFocus()
    await userEvent.keyboard(" ")
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "แสดงเงินสมทบจากนายจ้าง" })
    ).toBeDisabled()
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
  render: (args) => (
    <div className="flex gap-2">
      <Toggle {...args} />
      <Toggle {...args} defaultPressed>
        กดอยู่
      </Toggle>
    </div>
  ),
}

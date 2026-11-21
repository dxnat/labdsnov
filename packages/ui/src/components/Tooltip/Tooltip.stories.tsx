import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip"
import guidelines from "./Tooltip.md?raw"

/**
 * Stories target `TooltipContent`, whose `side` and `align` place the bubble.
 * The bubble is portalled to `document.body`, so play functions use `screen`.
 */
const meta = {
  title: "Components/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    side: "top",
    align: "center",
  },
  argTypes: {
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
    align: { control: "select", options: ["start", "center", "end"] },
    className: { control: "text" },
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={<Button size="icon-sm" variant="ghost" aria-label="ค่าธรรมเนียมคืออะไร" />}
        >
          <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
        </TooltipTrigger>
        <TooltipContent {...args}>หักจากบัญชีทุกเดือน 0.15% ของยอดเงิน</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>

export default meta
type Story = StoryObj<typeof meta>

/** Hover or focus the info button; `side` and `align` are in Controls. */
export const Playground: Story = {}

/**
 * Keyboard focus opens the tooltip too; Escape closes it. Checked by state
 * (`data-open` / `data-closed`), not visibility: the bubble fades in, and
 * animations pause in a hidden page.
 */
export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "ค่าธรรมเนียมคืออะไร" })).toHaveFocus()
    const text = await screen.findByText("หักจากบัญชีทุกเดือน 0.15% ของยอดเงิน")
    const bubble = text.closest('[data-slot="tooltip-content"]')
    await expect(bubble).toHaveAttribute("data-open")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(bubble).toHaveAttribute("data-closed"))
  },
}

/** Rendered open so the bubble and arrow can be inspected on every side. */
export const Sides: Story = {
  tags: ["!autodocs"],
  render: (args) => (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-x-40 gap-y-16 p-16">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side} defaultOpen>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent {...args} side={side}>
              ข้อความช่วยเหลือ
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}

export const DarkMode: Story = {
  ...Sides,
  globals: { theme: "dark" },
}

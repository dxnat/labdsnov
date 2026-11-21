import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { expect, fn, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible"
import guidelines from "./Collapsible.md?raw"

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: { defaultOpen: false, onOpenChange: fn() },
  render: (args) => (
    <Collapsible {...args} className="w-80">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">ค่าธรรมเนียมรายปี 0.85%</p>
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="[&[data-panel-open]_svg]:rotate-180"
            />
          }
        >
          ดูรายละเอียด
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            strokeWidth={2}
            data-icon="inline-end"
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="mt-2 grid gap-1 rounded-2xl bg-muted p-3 text-sm">
          <li>ค่าบริหารกองทุน 0.60%</li>
          <li>ค่าดูแลบัญชี 0.20%</li>
          <li>ค่าประกันภัย 0.05%</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The trigger's `aria-expanded` follows the panel; clicking again closes it. */
export const OpenAndClose: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "ดูรายละเอียด" })
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByText("ค่าบริหารกองทุน 0.60%")).toBeInTheDocument()
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(
      true,
      expect.anything()
    )
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await waitFor(() =>
      expect(
        canvasElement.querySelector("[data-slot=collapsible-content]")
      ).not.toHaveAttribute("data-open")
    )
  },
}

/** Keyboard: Tab to the trigger, Enter or Space toggles. */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "ดูรายละเอียด" })
    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
  args: { defaultOpen: true },
}

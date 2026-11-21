import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../InputGroup"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip"
import { Kbd, KbdGroup } from "./Kbd"
import guidelines from "./Kbd.md?raw"

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: { children: "Enter" },
  argTypes: { className: { control: "text" } },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("kbd")).toHaveTextContent("Enter")
  },
}

/** Keys pressed together go in a `KbdGroup`. */
export const Shortcut: Story = {
  render: () => (
    <p className="text-sm">
      กด{" "}
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>{" "}
      เพื่อค้นหากองทุน
    </p>
  ),
}

/** In an InputGroup addon, as a search hint. */
export const InInputGroup: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupInput placeholder="ค้นหากองทุน" aria-label="ค้นหากองทุน" />
      <InputGroupAddon>
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** Inside a Tooltip the key takes the tooltip's inverted colours. Hidden from Docs, where it would float over the page. */
export const InTooltip: Story = {
  tags: ["!autodocs"],
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline" />}>
          บันทึก
        </TooltipTrigger>
        <TooltipContent>
          บันทึก{" "}
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
  render: Shortcut.render,
}

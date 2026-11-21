import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Badge } from "../Badge"
import { Button } from "../Button"
import { Spinner } from "./Spinner"
import guidelines from "./Spinner.md?raw"

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  argTypes: {
    className: { control: "text" },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

/** Announced as "กำลังโหลด" (`role="status"`). */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status", { name: "กำลังโหลด" })).toBeVisible()
  },
}

/** Size with `className`; colour follows the text. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-primary">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

/** In a disabled button while an action runs, with text that says what's happening. */
export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        กำลังบันทึก…
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        กำลังส่งคำขอ…
      </Button>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        กำลังประมวลผล
      </Badge>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: /กำลังบันทึก/ })).toBeDisabled()
  },
}

export const DarkMode: Story = {
  ...InButton,
  globals: { theme: "dark" },
}

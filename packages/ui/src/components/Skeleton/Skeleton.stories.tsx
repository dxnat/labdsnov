import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Skeleton } from "./Skeleton"
import guidelines from "./Skeleton.md?raw"

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    className: "h-4 w-48",
  },
  argTypes: {
    className: { control: "text" },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/** Size it with `className`. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('[data-slot="skeleton"]')).toBeVisible()
  },
}

/** Placeholder for a FundCard while fund data loads: same shape, same size. */
export const FundCardLoading: Story = {
  render: () => (
    <div
      className="flex w-64 flex-col gap-3"
      role="status"
      aria-label="กำลังโหลดตัวเลือกการลงทุน"
    >
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-5 w-24" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status", { name: "กำลังโหลดตัวเลือกการลงทุน" })).toBeVisible()
  },
}

export const DarkMode: Story = {
  ...FundCardLoading,
  globals: { theme: "dark" },
}

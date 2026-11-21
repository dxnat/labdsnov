import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Badge } from "../Badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard"
import guidelines from "./HoverCard.md?raw"

/**
 * Stories target `HoverCardContent`, whose `side` and `align` place the card.
 * The card is portalled to `document.body`, so play functions use `screen`.
 */
const meta = {
  title: "Components/HoverCard",
  component: HoverCardContent,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: { side: "bottom", align: "center" },
  argTypes: {
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
    align: { control: "select", options: ["start", "center", "end"] },
    className: { control: "text" },
  },
  render: (args) => (
    <p className="text-sm">
      แผนการลงทุนของคุณคือ{" "}
      <HoverCard>
        <HoverCardTrigger
          href="#balanced"
          delay={100}
          closeDelay={100}
          className="font-medium text-primary underline underline-offset-4"
        >
          กองทุนสมดุล
        </HoverCardTrigger>
        <HoverCardContent {...args}>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">กองทุนสมดุล (Balanced)</p>
              <Badge variant="warning">ความเสี่ยงปานกลาง</Badge>
            </div>
            <p className="text-muted-foreground">
              หุ้น 60% ตราสารหนี้และเงินสด 40% เหมาะกับการออมระยะ 7 ปีขึ้นไป
            </p>
            <p>ผลตอบแทนย้อนหลัง 5 ปี 6.8% ต่อปี</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </p>
  ),
} satisfies Meta<typeof HoverCardContent>

export default meta
type Story = StoryObj<typeof meta>

/** Hover or focus the link; `side` and `align` are in Controls. */
export const Playground: Story = {}

/** Opens on hover, closes when the pointer leaves. */
export const HoverToOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole("link", { name: "กองทุนสมดุล" })
    await userEvent.hover(link)
    const card = await screen.findByText("กองทุนสมดุล (Balanced)")
    await waitFor(() =>
      expect(card.closest("[data-slot=hover-card-content]")).toHaveAttribute(
        "data-open"
      )
    )
    await userEvent.unhover(link)
    await waitFor(() =>
      expect(card.closest("[data-slot=hover-card-content]")).toHaveAttribute(
        "data-closed"
      )
    )
  },
}

/** Keyboard focus on the link opens it too, so the preview isn't mouse-only. */
export const FocusToOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("link", { name: "กองทุนสมดุล" })).toHaveFocus()
    await screen.findByText("กองทุนสมดุล (Balanced)")
  },
}

/** Rendered open for inspection. Hidden from Docs, where it would cover the page. */
export const Open: Story = {
  tags: ["!autodocs"],
  render: (args) => (
    <HoverCard defaultOpen>
      <HoverCardTrigger
        href="#balanced"
        className="text-sm font-medium text-primary underline underline-offset-4"
      >
        กองทุนสมดุล
      </HoverCardTrigger>
      <HoverCardContent {...args}>
        <p className="font-medium">กองทุนสมดุล (Balanced)</p>
        <p className="text-muted-foreground">หุ้น 60% ตราสารหนี้และเงินสด 40%</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const DarkMode: Story = {
  tags: ["!autodocs"],
  globals: { theme: "dark" },
  render: Open.render,
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Separator } from "../Separator"
import { ScrollArea, ScrollBar } from "./ScrollArea"
import guidelines from "./ScrollArea.md?raw"

const transactions = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  label:
    i % 3 === 0
      ? "เงินสมทบจากนายจ้าง"
      : i % 3 === 1
        ? "เงินสมทบเพิ่มเติม"
        : "ค่าธรรมเนียม",
  amount: i % 3 === 2 ? -12.5 : 450 + i * 10,
  date: new Date(2026, 10 - Math.floor(i / 2), 28 - (i % 2) * 14),
}))
const money = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "AUD",
})
const day = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: { className: "h-72 w-80 rounded-2xl border" },
  argTypes: { className: { control: "text" } },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium">รายการเคลื่อนไหว</h4>
        {transactions.map((t, i) => (
          <div key={t.id}>
            {i > 0 && <Separator className="my-2" />}
            <div className="flex justify-between gap-4 text-sm">
              <div>
                <p>{t.label}</p>
                <p className="text-muted-foreground">{day.format(t.date)}</p>
              </div>
              <p className="tabular-nums">{money.format(t.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

/** A long list in a fixed-height box, with a slim scrollbar. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const viewport = canvasElement.querySelector<HTMLElement>(
      "[data-slot=scroll-area-viewport]"
    )!
    await expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight)
    viewport.scrollTop = 200
    await expect(viewport.scrollTop).toBeGreaterThan(0)
  },
}

/** Wide content: add `<ScrollBar orientation="horizontal" />`. */
export const Horizontal: Story = {
  args: { className: "w-96 rounded-2xl border whitespace-nowrap" },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex w-max gap-3 p-4">
        {[
          "อนุรักษ์นิยม",
          "สมดุล",
          "เติบโต",
          "เติบโตสูง",
          "หุ้นต่างประเทศ",
          "ดัชนีออสเตรเลีย",
        ].map((name) => (
          <div
            key={name}
            className="flex h-24 w-40 items-end rounded-2xl bg-muted p-3 text-sm font-medium"
          >
            {name}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { FundCard, type FundCardProps } from "./FundCard"

// Mock data from the app's component page. Images are served from
// apps/storybook/public/funds (Storybook `staticDirs`).
const priceDate = new Date(2026, 10, 13)

const fundOptions: FundCardProps[] = [
  {
    name: "อนุรักษ์นิยม (Conservative)",
    manager: "ซิดนีย์ฮาร์เบอร์ แอสเซ็ท แมเนจเมนต์",
    unitPrice: 1.2045,
    priceDate,
    image: { src: "/funds/conservative.svg", alt: "ภาพประกอบคลื่นทะเลสงบ" },
  },
  {
    name: "สมดุล (Balanced)",
    manager: "เซาเทิร์นครอส อินเวสเตอร์ส",
    unitPrice: 1.8342,
    priceDate,
    image: { src: "/funds/balanced.svg", alt: "ภาพประกอบแผนภูมิวงกลม" },
  },
  {
    name: "เติบโตสูง (High Growth)",
    manager: "ยูคาลิปตัส แคปิตอล",
    unitPrice: 2.4518,
    priceDate,
    image: { src: "/funds/high-growth.svg", alt: "ภาพประกอบกราฟแท่งขาขึ้น" },
  },
  {
    name: "ลงทุนอย่างยั่งยืนเพื่อสิ่งแวดล้อมและสังคม (Sustainable ESG Growth)",
    manager: "แทสมัน ซัสเทนเนเบิล อินเวสต์เมนต์ส",
    unitPrice: 1.5527,
    priceDate,
  },
]

const meta = {
  title: "Components/FundCard",
  component: FundCard,
  tags: ["autodocs"],
  args: fundOptions[1],
  argTypes: {
    name: { control: "text" },
    manager: { control: "text" },
    unitPrice: { control: { type: "number", step: 0.0001 } },
    priceDate: { control: "date" },
    image: { control: "object" },
    className: { control: "text" },
  },
  // The date control yields a timestamp; FundCard expects a Date.
  // Card width is set here (not in a decorator) so the grid story can opt out.
  render: ({ priceDate, ...args }) => (
    <div className="w-64">
      <FundCard {...args} priceDate={priceDate ? new Date(priceDate) : undefined} />
    </div>
  ),
} satisfies Meta<typeof FundCard>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByRole("article")
    await expect(card).toHaveAttribute("data-slot", "fund-card")
    await expect(canvas.getByRole("heading", { name: "สมดุล (Balanced)" })).toBeVisible()
    await expect(canvas.getByRole("img", { name: "ภาพประกอบแผนภูมิวงกลม" })).toBeVisible()
    // AUD with 4 decimals, th-TH locale.
    await expect(card).toHaveTextContent(/1\.8342/)
    await expect(card.querySelector("time")).toHaveAttribute("datetime", "2026-11-13")
  },
}

/** Without `image`, a pie-chart placeholder fills the square. */
export const WithoutImage: Story = {
  args: { image: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("img")).toBeNull()
  },
}

/** Without `priceDate`, only "ต่อหน่วย" follows the price. */
export const WithoutPriceDate: Story = {
  args: { priceDate: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("article").querySelector("time")).toBeNull()
  },
}

/** Long names wrap (`text-pretty`); long manager names truncate to one line. */
export const LongName: Story = {
  args: {
    ...fundOptions[3],
    manager: "แทสมัน ซัสเทนเนเบิล อินเวสต์เมนต์ส แอนด์ ซูเปอร์แอนนูเอชัน",
  },
}

/** The investment-options grid from the app. */
export const FundOptions: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
      {fundOptions.map((fund) => (
        <FundCard key={fund.name} {...fund} />
      ))}
    </div>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

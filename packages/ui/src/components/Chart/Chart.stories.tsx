import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { usageDoc } from "../../storybook/usageDoc"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./Chart"
import guidelines from "./Chart.md?raw"

const contributions = [
  { month: "มิ.ย.", employer: 1180, personal: 200 },
  { month: "ก.ค.", employer: 1180, personal: 0 },
  { month: "ส.ค.", employer: 1245, personal: 500 },
  { month: "ก.ย.", employer: 1245, personal: 0 },
  { month: "ต.ค.", employer: 1245, personal: 500 },
  { month: "พ.ย.", employer: 1245, personal: 250 },
]

const balance = [
  { month: "มิ.ย.", balance: 78120 },
  { month: "ก.ค.", balance: 79640 },
  { month: "ส.ค.", balance: 80910 },
  { month: "ก.ย.", balance: 81150 },
  { month: "ต.ค.", balance: 83020 },
  { month: "พ.ย.", balance: 84215 },
]

// Colours from the chart tokens, so light/dark come from theme.css.
const contributionConfig = {
  employer: { label: "เงินสมทบจากนายจ้าง", color: "var(--chart-3)" },
  personal: { label: "เงินสมทบเพิ่มเติม", color: "var(--chart-1)" },
} satisfies ChartConfig

const balanceConfig = {
  balance: { label: "ยอดเงิน (AUD)", color: "var(--primary)" },
} satisfies ChartConfig

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    config: contributionConfig,
    children: <></>,
  },
  argTypes: {
    config: { control: false },
    children: { control: false },
    className: { control: "text" },
  },
  render: (args) => (
    <ChartContainer
      {...args}
      config={contributionConfig}
      className="w-[560px]"
      role="img"
      aria-label="เงินสมทบรายเดือน มิถุนายน ถึง พฤศจิกายน 2569"
    >
      <BarChart accessibilityLayer data={contributions}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="employer" stackId="a" fill="var(--color-employer)" radius={[0, 0, 6, 6]} />
        <Bar dataKey="personal" stackId="a" fill="var(--color-personal)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

/** Monthly contributions, stacked by source, with a legend from `config`. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "เงินสมทบรายเดือน มิถุนายน ถึง พฤศจิกายน 2569" })
    ).toBeVisible()
    await expect(await canvas.findByText("เงินสมทบจากนายจ้าง")).toBeVisible()
  },
}

/** Account balance over time as an area chart. */
export const BalanceArea: Story = {
  render: () => (
    <ChartContainer
      config={balanceConfig}
      className="w-[560px]"
      role="img"
      aria-label="ยอดเงินในบัญชี มิถุนายน ถึง พฤศจิกายน 2569"
    >
      <AreaChart accessibilityLayer data={balance}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="balance"
          type="natural"
          fill="var(--color-balance)"
          fillOpacity={0.2}
          stroke="var(--color-balance)"
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

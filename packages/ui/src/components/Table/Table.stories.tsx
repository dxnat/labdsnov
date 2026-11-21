import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Badge } from "../Badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table"
import guidelines from "./Table.md?raw"

const transactions = [
  { date: "13 พ.ย. 2569", type: "เงินสมทบจากนายจ้าง", status: "success", amount: "AU$1,245.00" },
  { date: "31 ต.ค. 2569", type: "เงินสมทบเพิ่มเติม", status: "success", amount: "AU$500.00" },
  { date: "15 ต.ค. 2569", type: "ค่าธรรมเนียมบริหาร", status: "success", amount: "-AU$12.50" },
  { date: "1 ต.ค. 2569", type: "เงินสมทบจากนายจ้าง", status: "warning", amount: "AU$1,245.00" },
] as const

const statusLabel = { success: "สำเร็จ", warning: "รอดำเนินการ" } as const

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } }, layout: "padded" },
  argTypes: {
    className: { control: "text" },
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>ธุรกรรมล่าสุดในบัญชีของคุณ</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>วันที่</TableHead>
          <TableHead>รายการ</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead className="text-right">จำนวนเงิน</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((row) => (
          <TableRow key={`${row.date}-${row.type}`}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>
              <Badge variant={row.status}>{statusLabel[row.status]}</Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>รวม</TableCell>
          <TableCell className="text-right tabular-nums">AU$2,977.50</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

/** Transactions with a caption, status badges and a total row. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const table = canvas.getByRole("table", { name: "ธุรกรรมล่าสุดในบัญชีของคุณ" })
    await expect(table).toBeVisible()
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(4)
    await expect(canvas.getAllByRole("row")).toHaveLength(6)
  },
}

/** On a narrow screen the table scrolls sideways instead of squeezing columns. */
export const NarrowScreen: Story = {
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

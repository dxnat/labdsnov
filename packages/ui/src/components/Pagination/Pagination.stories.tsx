import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination"
import guidelines from "./Pagination.md?raw"

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  argTypes: {
    className: { control: "text" },
  },
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#page-1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-12">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#page-3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/** Page 2 of 12; the current page is marked for screen readers. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("navigation", { name: "การแบ่งหน้า" })).toBeVisible()
    await expect(canvas.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("link", { name: "ไปหน้าก่อนหน้า" })).toHaveAttribute(
      "href",
      "#page-1"
    )
    await expect(canvas.getByRole("link", { name: "ไปหน้าถัดไป" })).toBeVisible()
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

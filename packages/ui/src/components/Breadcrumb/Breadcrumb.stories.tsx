import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb"
import guidelines from "./Breadcrumb.md?raw"

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  argTypes: {
    className: { control: "text" },
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">หน้าแรก</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#account">บัญชีของฉัน</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>ผู้รับผลประโยชน์</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** A named navigation landmark; the last item is the current page. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const nav = canvas.getByRole("navigation", { name: "เส้นทางนำทาง" })
    await expect(nav).toBeVisible()
    await expect(canvas.getAllByRole("link")).toHaveLength(3)
    await expect(canvas.getByText("ผู้รับผลประโยชน์")).toHaveAttribute("aria-current", "page")
  },
}

/** Long trails collapse the middle into "…". */
export const Collapsed: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">หน้าแรก</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#statements">ใบแจ้งยอด</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>ปี 2569</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** `render` swaps the `<a>` for another element, e.g. Next.js `Link`. */
export const CustomLink: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href="#home" data-next-link="" />}>หน้าแรก</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>เอกสาร</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

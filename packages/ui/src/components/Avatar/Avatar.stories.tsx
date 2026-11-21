import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  type AvatarSize,
} from "./Avatar"
import guidelines from "./Avatar.md?raw"

// `satisfies Record<…>` makes typecheck fail if a size is added to or
// removed from Avatar without updating these stories.
const sizes = Object.keys({
  sm: true,
  default: true,
  lg: true,
} satisfies Record<AvatarSize, true>) as AvatarSize[]

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    size: "default",
  },
  argTypes: {
    size: { control: "select", options: sizes },
    className: { control: "text" },
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>สจ</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Initials when there's no photo. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("สจ")).toBeVisible()
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>สจ</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

/** A broken image falls back to the initials. */
export const ImageFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/missing-photo.jpg" alt="สมชาย ใจดี" />
      <AvatarFallback>สจ</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("สจ")).toBeVisible()
  },
}

/** `AvatarBadge` marks a status in the corner. */
export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>สจ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      ))}
    </div>
  ),
}

/** Beneficiaries shown as an overlapping group with a "+2" count. */
export const Group: Story = {
  render: () => (
    <AvatarGroup aria-label="ผู้รับผลประโยชน์ 4 คน">
      <Avatar>
        <AvatarFallback>สห</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>สศ</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+2</AvatarGroupCount>
    </AvatarGroup>
  ),
}

export const DarkMode: Story = {
  ...WithBadge,
  globals: { theme: "dark" },
}

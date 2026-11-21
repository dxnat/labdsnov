import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./NavigationMenu"
import guidelines from "./NavigationMenu.md?raw"

const accountLinks = [
  { href: "#balance", title: "ยอดเงิน", description: "ยอดเงินและผลตอบแทนล่าสุด" },
  { href: "#transactions", title: "ธุรกรรม", description: "เงินสมทบและการถอนย้อนหลัง" },
  { href: "#beneficiaries", title: "ผู้รับผลประโยชน์", description: "ผู้ที่จะได้รับเงินของคุณ" },
]

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: {
    docs: { description: { component: usageDoc(guidelines) } },
    layout: "padded",
  },
  argTypes: {
    className: { control: "text" },
  },
  render: (args) => (
    <div className="min-h-80">
      <NavigationMenu {...args} aria-label="เมนูหลัก">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#home" className={navigationMenuTriggerStyle()}>
              หน้าแรก
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>บัญชีของฉัน</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-80 gap-1">
                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink href={link.href} className="flex-col items-start gap-0.5">
                      <span className="font-medium">{link.title}</span>
                      <span className="text-muted-foreground">{link.description}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>ลงทุน</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-64 gap-1">
                <li>
                  <NavigationMenuLink href="#options">ตัวเลือกการลงทุน</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#switch">เปลี่ยนแผน</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Hover or click "บัญชีของฉัน" / "ลงทุน" to open their panels. */
export const Playground: Story = {}

/**
 * Clicking a trigger opens its panel of links (portalled, so queried with
 * `screen`); Escape closes it.
 */
export const OpenPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "บัญชีของฉัน" })
    await userEvent.click(trigger)
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"))
    await expect(await screen.findByRole("link", { name: /ธุรกรรม/ })).toHaveAttribute(
      "href",
      "#transactions"
    )
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"))
  },
}

export const DarkMode: Story = {
  globals: { theme: "dark" },
}

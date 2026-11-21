import {
  File01Icon,
  Exchange01Icon,
  PieChartIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsListVariant,
} from "./Tabs"
import guidelines from "./Tabs.md?raw"

// `satisfies Record<…>` makes typecheck fail if a variant is added to or
// removed from TabsList without updating these stories.
const variantLabels = {
  default: "พื้นหลังทึบ (default)",
  line: "เส้นใต้ (line)",
} satisfies Record<TabsListVariant, string>

const variants = Object.keys(variantLabels) as TabsListVariant[]

const sections = [
  {
    value: "overview",
    label: "ภาพรวม",
    icon: PieChartIcon,
    body: "ยอดเงินในบัญชีและแผนการลงทุนปัจจุบันของคุณ",
  },
  {
    value: "transactions",
    label: "ธุรกรรม",
    icon: Exchange01Icon,
    body: "รายการเงินสมทบและการถอนเงินย้อนหลัง",
  },
  {
    value: "documents",
    label: "เอกสาร",
    icon: File01Icon,
    body: "รายงานประจำปีและเอกสารยืนยันการเป็นสมาชิก",
  },
]

/**
 * Stories target `TabsList`, whose `variant` is the Tabs' semantic prop; the
 * whole set (root, list, triggers, panels) is rendered around it.
 */
const meta = {
  title: "Components/Tabs",
  component: TabsList,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    variant: "default",
  },
  argTypes: {
    variant: { control: "select", options: variants },
    className: { control: "text" },
  },
  render: (args) => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList {...args}>
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent key={section.value} value={section.value}>
          {section.body}
        </TabsContent>
      ))}
    </Tabs>
  ),
} satisfies Meta<typeof TabsList>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("tablist")).toHaveAttribute("data-slot", "tabs-list")
    await expect(canvas.getByRole("tab", { name: "ภาพรวม" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(sections[0].body)
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="grid w-96 gap-8">
      {variants.map((variant) => (
        <Tabs key={variant} defaultValue="overview">
          <TabsList {...args} variant={variant} aria-label={variantLabels[variant]}>
            {sections.map((section) => (
              <TabsTrigger key={section.value} value={section.value}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ))}
    </div>
  ),
}

/** `orientation="vertical"` on `Tabs` stacks the tabs beside the panel. */
export const Vertical: Story = {
  render: (args) => (
    <div className="grid gap-8">
      {variants.map((variant) => (
        <Tabs key={variant} defaultValue="overview" orientation="vertical" className="w-96">
          <TabsList {...args} variant={variant}>
            {sections.map((section) => (
              <TabsTrigger key={section.value} value={section.value}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {sections.map((section) => (
            <TabsContent key={section.value} value={section.value}>
              {section.body}
            </TabsContent>
          ))}
        </Tabs>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const list of canvas.getAllByRole("tablist")) {
      await expect(list).toHaveAttribute("aria-orientation", "vertical")
    }
  },
}

/** `data-icon="inline-start|inline-end"` trims the padding on that side. */
export const WithIcons: Story = {
  render: (args) => (
    <Tabs defaultValue="overview">
      <TabsList {...args}>
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            <HugeiconsIcon icon={section.icon} strokeWidth={2} data-icon="inline-start" />
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  ),
}

// ---------- States ----------

/** Clicking a tab shows its panel and calls `onValueChange` with its value. */
export const Switching: Story = {
  render: (args) => {
    const onValueChange = fn()
    return (
      <Tabs defaultValue="overview" className="w-96" onValueChange={onValueChange}>
        <TabsList {...args}>
          {sections.map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((section) => (
          <TabsContent key={section.value} value={section.value}>
            {section.body}
          </TabsContent>
        ))}
      </Tabs>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByRole("tab", { name: "ธุรกรรม" })
    await userEvent.click(tab)
    await expect(tab).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByRole("tab", { name: "ภาพรวม" })).toHaveAttribute(
      "aria-selected",
      "false"
    )
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(sections[1].body)
  },
}

/**
 * Tab focuses the active tab; arrow keys move focus between tabs (looping),
 * and Enter or Space activates the focused one.
 */
export const KeyboardNavigation: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    await expect(canvas.getByRole("tab", { name: "ภาพรวม" })).toHaveFocus()
    await userEvent.keyboard("{ArrowRight}")
    const transactions = canvas.getByRole("tab", { name: "ธุรกรรม" })
    await expect(transactions).toHaveFocus()
    await expect(transactions).toHaveAttribute("aria-selected", "false")
    await userEvent.keyboard("{Enter}")
    await expect(transactions).toHaveAttribute("aria-selected", "true")
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}")
    await expect(canvas.getByRole("tab", { name: "เอกสาร" })).toHaveFocus()
  },
}

/**
 * A disabled tab is dimmed and can't be selected. It ignores pointer events,
 * so the check uses the keyboard: `userEvent.click` would throw on it.
 */
export const DisabledTab: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList {...args}>
        <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
        <TabsTrigger value="transactions">ธุรกรรม</TabsTrigger>
        <TabsTrigger value="documents" disabled>
          เอกสาร
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">{sections[0].body}</TabsContent>
      <TabsContent value="transactions">{sections[1].body}</TabsContent>
      <TabsContent value="documents">{sections[2].body}</TabsContent>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    const documents = canvas.getByRole("tab", { name: "เอกสาร" })
    await expect(documents).toHaveAttribute("aria-disabled", "true")
    await expect(getComputedStyle(documents).pointerEvents).toBe("none")
    await userEvent.tab()
    await userEvent.keyboard("{ArrowRight}{ArrowRight}{Enter}")
    await expect(documents).toHaveAttribute("aria-selected", "false")
  },
}

export const DarkMode: Story = {
  ...Variants,
  globals: { theme: "dark" },
}

/** A utility passed via `className` beats the component's own styles. */
export const ClassNameOverride: Story = {
  args: { className: "w-full" },
}

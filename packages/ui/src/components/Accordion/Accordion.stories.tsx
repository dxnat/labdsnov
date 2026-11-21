import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion"
import guidelines from "./Accordion.md?raw"

const faqs = [
  {
    value: "withdraw",
    question: "ฉันถอนเงินได้เมื่อไร?",
    answer: "โดยทั่วไปถอนได้เมื่อถึงอายุเกษียณตามกฎหมายและหยุดทำงานแล้ว ยกเว้นกรณีพิเศษ เช่น เจ็บป่วยร้ายแรง",
  },
  {
    value: "fees",
    question: "ค่าธรรมเนียมคิดอย่างไร?",
    answer: "หักจากบัญชีทุกเดือน 0.15% ของยอดเงิน และค่าบริหารกองทุนตามแผนที่เลือก",
  },
  {
    value: "switch",
    question: "เปลี่ยนแผนการลงทุนได้กี่ครั้ง?",
    answer: "เปลี่ยนได้ไม่จำกัด การเปลี่ยนแผนจะมีผลกับเงินสมทบงวดถัดไป",
  },
]

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    multiple: false,
  },
  argTypes: {
    multiple: { control: "boolean" },
    className: { control: "text" },
  },
  render: (args) => (
    <Accordion {...args} className="w-96">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

/** Frequently asked questions; `multiple` lets several stay open. */
export const Playground: Story = {}

/** Clicking a question opens its answer; opening another closes the first. */
export const OpenOneAtATime: Story = {
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole("button", { name: "ฉันถอนเงินได้เมื่อไร?" })
    const second = canvas.getByRole("button", { name: "ค่าธรรมเนียมคิดอย่างไร?" })
    await userEvent.click(first)
    await expect(first).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(second)
    await expect(second).toHaveAttribute("aria-expanded", "true")
    await waitFor(() => expect(first).toHaveAttribute("aria-expanded", "false"))
  },
}

/** Enter or Space toggles the focused question. */
export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    const first = canvas.getByRole("button", { name: "ฉันถอนเงินได้เมื่อไร?" })
    await expect(first).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(first).toHaveAttribute("aria-expanded", "true")
  },
}

export const DarkMode: Story = {
  args: { defaultValue: ["fees"] },
  globals: { theme: "dark" },
}

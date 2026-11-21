import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Button } from "../Button"
import { Checkbox } from "../Checkbox"
import { Input } from "../Input"
import { RadioGroup, RadioGroupItem } from "../RadioGroup"
import { Switch } from "../Switch"
import { Textarea } from "../Textarea"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  type FieldOrientation,
} from "./Field"
import guidelines from "./Field.md?raw"

// `satisfies Record<…>` makes typecheck fail if an orientation is added to or
// removed from Field without updating these stories.
const orientations = Object.keys({
  vertical: true,
  horizontal: true,
  responsive: true,
} satisfies Record<FieldOrientation, true>) as FieldOrientation[]

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    orientation: "vertical",
  },
  argTypes: {
    orientation: { control: "select", options: orientations },
    className: { control: "text" },
  },
  render: (args) => (
    <Field {...args} className="w-80">
      <FieldLabel htmlFor="field-email" required>
        อีเมล
      </FieldLabel>
      <Input id="field-email" type="email" aria-describedby="field-email-desc" />
      <FieldDescription id="field-email-desc">
        เราจะส่งใบแจ้งยอดประจำปีไปที่อีเมลนี้
      </FieldDescription>
    </Field>
  ),
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "อีเมล" })
    await expect(input).toHaveAccessibleDescription("เราจะส่งใบแจ้งยอดประจำปีไปที่อีเมลนี้")
    await expect(canvas.getByRole("group")).toHaveAttribute("data-orientation", "vertical")
  },
}

/** `data-invalid` colours the field; `FieldError` is announced (`role="alert"`). */
export const Invalid: Story = {
  render: (args) => (
    <Field {...args} className="w-80" data-invalid>
      <FieldLabel htmlFor="field-tfn">เลขประจำตัวผู้เสียภาษี (TFN)</FieldLabel>
      <Input
        id="field-tfn"
        defaultValue="123-456"
        aria-invalid
        aria-describedby="field-tfn-error"
      />
      <FieldError id="field-tfn-error">เลขประจำตัวผู้เสียภาษีต้องมี 9 หลัก</FieldError>
    </Field>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent("ต้องมี 9 หลัก")
    await expect(canvas.getByRole("textbox")).toHaveAccessibleDescription(
      "เลขประจำตัวผู้เสียภาษีต้องมี 9 หลัก"
    )
  },
}

/** `errors` takes messages from a form library; duplicates are shown once. */
export const ErrorList: Story = {
  render: (args) => (
    <Field {...args} className="w-80" data-invalid>
      <FieldLabel htmlFor="field-password">รหัสผ่าน</FieldLabel>
      <Input id="field-password" type="password" aria-invalid />
      <FieldError
        errors={[
          { message: "ต้องมีอย่างน้อย 12 ตัวอักษร" },
          { message: "ต้องมีตัวเลขอย่างน้อย 1 ตัว" },
          { message: "ต้องมีอย่างน้อย 12 ตัวอักษร" },
        ]}
      />
    </Field>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2)
  },
}

/** Checkboxes and switches sit beside their label (`orientation="horizontal"`). */
export const Horizontal: Story = {
  render: () => (
    <FieldGroup className="w-96">
      <Field orientation="horizontal">
        <Checkbox id="field-paper" />
        <FieldLabel htmlFor="field-paper">ส่งเอกสารทางไปรษณีย์ด้วย</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="field-sms" />
        <FieldContent>
          <FieldLabel htmlFor="field-sms">แจ้งเตือนทาง SMS</FieldLabel>
          <FieldDescription>เมื่อมีเงินสมทบเข้าบัญชี</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled="true">
        <Checkbox id="field-disabled" disabled />
        <FieldLabel htmlFor="field-disabled">ตัวเลือกที่ปิดใช้งาน</FieldLabel>
      </Field>
    </FieldGroup>
  ),
}

/** A radio group inside a `FieldSet`, named by its `FieldLegend`. */
export const RadioSet: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend variant="label">ความถี่ของใบแจ้งยอด</FieldLegend>
      <FieldDescription>เลือกได้หนึ่งตัวเลือก</FieldDescription>
      <RadioGroup defaultValue="yearly">
        <Field orientation="horizontal">
          <RadioGroupItem value="quarterly" id="freq-quarterly" />
          <FieldLabel htmlFor="freq-quarterly">ทุกไตรมาส</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="yearly" id="freq-yearly" />
          <FieldLabel htmlFor="freq-yearly">ปีละครั้ง</FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "ความถี่ของใบแจ้งยอด" })).toBeVisible()
  },
}

/** A `FieldLabel` wrapping a whole `Field` becomes a selectable card. */
export const ChoiceCards: Story = {
  render: () => (
    <RadioGroup defaultValue="balanced" className="w-96" aria-label="แผนการลงทุน">
      <FieldLabel htmlFor="card-balanced">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>สมดุล (Balanced)</FieldTitle>
            <FieldDescription>ความเสี่ยงปานกลาง เหมาะกับการลงทุน 5 ปีขึ้นไป</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="balanced" id="card-balanced" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="card-growth">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>เติบโตสูง (High Growth)</FieldTitle>
            <FieldDescription>ความเสี่ยงสูง เหมาะกับการลงทุน 7 ปีขึ้นไป</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="growth" id="card-growth" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  ),
}

/** A complete form: `FieldGroup` spacing, a separator and a submit button. */
export const Form: Story = {
  render: () => (
    <form className="w-96" onSubmit={(event) => event.preventDefault()}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name" required>
            ชื่อ-นามสกุล
          </FieldLabel>
          <Input id="form-name" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-message">ข้อความถึงเจ้าหน้าที่</FieldLabel>
          <Textarea id="form-message" />
        </Field>
        <FieldSeparator>หรือ</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="form-callback" />
          <FieldLabel htmlFor="form-callback">ขอให้เจ้าหน้าที่โทรกลับ</FieldLabel>
        </Field>
        <Button type="submit">ส่งข้อความ</Button>
      </FieldGroup>
    </form>
  ),
}

export const DarkMode: Story = {
  ...Form,
  globals: { theme: "dark" },
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, screen, waitFor } from "storybook/test"

import { usageDoc } from "../../storybook/usageDoc"

import { Label } from "../Label"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./Combobox"
import guidelines from "./Combobox.md?raw"

const countries = [
  "ออสเตรเลีย",
  "นิวซีแลนด์",
  "ไทย",
  "สิงคโปร์",
  "มาเลเซีย",
  "ญี่ปุ่น",
  "สหราชอาณาจักร",
  "สหรัฐอเมริกา",
]

/**
 * Stories target `ComboboxInput`. The list is portalled to `document.body`,
 * so play functions use `screen`.
 */
const meta = {
  title: "Components/Combobox",
  component: ComboboxInput,
  tags: ["autodocs"],
  // Usage guidelines from the doc beside the component, shown on the Docs page.
  parameters: { docs: { description: { component: usageDoc(guidelines) } } },
  args: {
    showTrigger: true,
    showClear: false,
    disabled: false,
  },
  argTypes: {
    showTrigger: { control: "boolean" },
    showClear: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="cb-country">ประเทศที่พำนักทางภาษี</Label>
      <Combobox items={countries}>
        <ComboboxInput {...args} id="cb-country" placeholder="พิมพ์เพื่อค้นหา" />
        <ComboboxContent>
          <ComboboxEmpty>ไม่พบประเทศที่ค้นหา</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
} satisfies Meta<typeof ComboboxInput>

export default meta
type Story = StoryObj<typeof meta>

/** Type to filter the list; `showClear` adds a "×" button. */
export const Playground: Story = {}

/**
 * Typing filters the list; choosing an item fills the field. Typing uses
 * `fireEvent.change`: `userEvent.type` never reaches React's `onChange` here
 * (see AGENTS.md).
 */
export const FilterAndChoose: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "ประเทศที่พำนักทางภาษี" })
    await userEvent.click(input)
    await fireEvent.change(input, { target: { value: "สห" } })
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2))
    await userEvent.click(screen.getByRole("option", { name: "สหราชอาณาจักร" }))
    await waitFor(() => expect(input).toHaveValue("สหราชอาณาจักร"))
  },
}

/** No match shows the `ComboboxEmpty` message. */
export const NoMatch: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "ประเทศที่พำนักทางภาษี" })
    await userEvent.click(input)
    await fireEvent.change(input, { target: { value: "ฝรั่งเศส" } })
    await expect(await screen.findByText("ไม่พบประเทศที่ค้นหา")).toBeInTheDocument()
  },
}

/** `multiple` with chips: each chosen value is a removable chip. */
export const MultipleChips: Story = {
  render: function Render() {
    const anchor = useComboboxAnchor()
    return (
      <div className="grid w-96 gap-2">
        <Label htmlFor="cb-chips">ประเทศที่เคยทำงาน</Label>
        <Combobox items={countries} multiple defaultValue={["ไทย", "ออสเตรเลีย"]}>
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values: string[]) =>
                values.map((value) => <ComboboxChip key={value}>{value}</ComboboxChip>)
              }
            </ComboboxValue>
            <ComboboxChipsInput id="cb-chips" placeholder="เพิ่มประเทศ" />
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>ไม่พบประเทศที่ค้นหา</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("ไทย")).toBeVisible()
    await userEvent.click(canvas.getAllByRole("button", { name: "นำออก" })[0])
    await waitFor(() => expect(canvas.queryByText("ไทย")).toBeNull())
  },
}

export const DarkMode: Story = {
  args: { showClear: true },
  globals: { theme: "dark" },
}

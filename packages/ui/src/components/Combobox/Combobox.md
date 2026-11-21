# Combobox (ช่องค้นหาและเลือก)

## Purpose

ช่องที่พิมพ์เพื่อกรองรายการยาว แล้วเลือกค่า (หรือหลายค่า) จากรายการนั้น

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Label,
} from "labdsnov"

<Label htmlFor="country">ประเทศที่พำนักทางภาษี</Label>
<Combobox items={countries}>
  <ComboboxInput id="country" placeholder="พิมพ์เพื่อค้นหา" />
  <ComboboxContent>
    <ComboboxEmpty>ไม่พบประเทศที่ค้นหา</ComboboxEmpty>
    <ComboboxList>
      {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

- ส่งรายการทั้งหมดเป็น `items` แล้วใช้ฟังก์ชันใน `ComboboxList` เพื่อแสดงเฉพาะที่ตรงกับคำค้น
- ใส่ `ComboboxEmpty` เสมอ แสดงเมื่อไม่มีรายการตรงกับคำค้น
- รายการที่เป็น object ใช้ `itemToStringLabel` ของ `Combobox` บอกว่าข้อความไหนใช้ค้นหาและแสดง

## When to use

- เลือกหนึ่งค่าจากรายการยาวมากที่ผู้ใช้รู้ชื่ออยู่แล้ว เช่น ประเทศ ธนาคาร
- เลือกหลายค่า (`multiple`) แสดงเป็นชิป เช่น ประเทศที่เคยทำงาน

## When not to use

| สถานการณ์                           | ใช้แทน        |
| ---------------------------------- | ------------ |
| รายการไม่ยาว (ไม่ถึงประมาณ 15 ตัวเลือก) | `Select`     |
| 2–5 ตัวเลือกที่ควรเห็นทั้งหมด             | `RadioGroup` |
| ข้อความอิสระที่ไม่ต้องตรงกับรายการ        | `Input`      |

TODO: ยังไม่ได้กำหนดจำนวนตัวเลือกที่ควรเปลี่ยนจาก `Select` เป็น Combobox

## Props and variants

### ComboboxInput

| Prop          | ค่าเริ่มต้น | ความหมาย                      |
| ------------- | ------- | ----------------------------- |
| `showTrigger` | `true`  | ปุ่มลูกศรเปิดรายการ               |
| `showClear`   | `false` | ปุ่ม "×" ล้างค่า (ซ่อนลูกศรเมื่อมีปุ่มนี้) |
| `disabled`    | `false` | ปิดใช้งาน                       |
| `placeholder` | –       | เช่น "พิมพ์เพื่อค้นหา"              |

หน้าตาเหมือน `InputGroup` (และ `Input` แบบ `filled`) กว้างตามเนื้อหา ใส่ `className="w-full"` ในฟอร์ม

### Combobox

| Prop                      | ความหมาย                            |
| ------------------------- | ----------------------------------- |
| `items`                   | รายการทั้งหมด                         |
| `value` / `onValueChange` | ควบคุมค่าที่เลือกจากภายนอก               |
| `defaultValue`            | ค่าที่เลือกไว้ตอนแรก                     |
| `multiple`                | เลือกได้หลายค่า (ใช้กับ `ComboboxChips`) |

### เลือกหลายค่า (ชิป)

ใช้ `ComboboxChips` + `ComboboxValue` + `ComboboxChip` + `ComboboxChipsInput` แทน `ComboboxInput` และส่ง `anchor` จาก `useComboboxAnchor()` ให้ `ComboboxContent` (ดู story `MultipleChips`) ชิปแต่ละอันมีปุ่ม "นำออก"

### ส่วนอื่น ๆ

`ComboboxGroup` + `ComboboxLabel` จัดกลุ่มรายการ, `ComboboxSeparator` เส้นคั่น, `ComboboxItem` `disabled` รายการที่เลือกไม่ได้ รายการที่เลือกแล้วมีเครื่องหมายถูกด้านขวา

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                      |
| ---------------------- | --------------------------- | --------------------------- | ------------------------- |
| `--input`              | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นช่องกรอกและชิป            |
| `--popover`            | `oklch(1 0 0)`              | `oklch(0.228 0.013 107.4)`  | พื้นรายการ                  |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษรในรายการ            |
| `--accent`             | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | พื้นรายการที่ไฮไลต์            |
| `--accent-foreground`  | `oklch(0.228 0.013 107.4)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษรรายการที่ไฮไลต์        |
| `--muted-foreground`   | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)`  | ลูกศร, หัวข้อกลุ่ม, ข้อความไม่พบ |
| `--border`             | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นคั่น                     |
| `--ring`               | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus              |
| `--destructive`        | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง              |

## Example

จาก story `MultipleChips` ใน `Combobox.stories.tsx`:

```tsx
const anchor = useComboboxAnchor()

<Combobox items={countries} multiple defaultValue={["ไทย", "ออสเตรเลีย"]}>
  <ComboboxChips ref={anchor}>
    <ComboboxValue>
      {(values: string[]) => values.map((value) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
    </ComboboxValue>
    <ComboboxChipsInput id="cb-chips" placeholder="เพิ่มประเทศ" />
  </ComboboxChips>
  <ComboboxContent anchor={anchor}>
    <ComboboxEmpty>ไม่พบประเทศที่ค้นหา</ComboboxEmpty>
    <ComboboxList>
      {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

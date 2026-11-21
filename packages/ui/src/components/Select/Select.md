# Select (รายการให้เลือก)

## Purpose

ปุ่มที่เปิดรายการให้เลือกหนึ่งค่า เมื่อตัวเลือกมีมากเกินจะแสดงทั้งหมดในหน้า

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "labdsnov"

const states = { nsw: "นิวเซาท์เวลส์", vic: "วิกตอเรีย", qld: "ควีนส์แลนด์" }

<Label htmlFor="state">รัฐที่อยู่อาศัย</Label>
<Select items={states}>
  <SelectTrigger id="state" className="w-full">
    <SelectValue placeholder="เลือกรัฐ" />
  </SelectTrigger>
  <SelectContent>
    {Object.entries(states).map(([value, label]) => (
      <SelectItem key={value} value={value}>{label}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

- **ส่ง `items` ให้ `Select` เสมอ** (object `{ value: label }` หรือ array `{ value, label }`) ไม่อย่างนั้นปุ่มจะแสดง `value` ดิบ เช่น "nsw" แทนชื่อ
- ปุ่มกว้างเท่าเนื้อหา ใส่ `className="w-full"` เมื่ออยู่ในฟอร์ม
- ควบคุมค่าเอง ใช้ `value` กับ `onValueChange` ในไฟล์ที่มี `"use client"`

## When to use

- เลือกหนึ่งค่าจากรายการยาว (ประมาณ 6 ตัวเลือกขึ้นไป) เช่น รัฐ ประเทศ สินทรัพย์

## When not to use

| สถานการณ์                     | ใช้แทน                                              |
| ---------------------------- | -------------------------------------------------- |
| ตัวเลือกน้อย (2–5) ที่ควรเห็นทั้งหมด | `RadioGroup`                                       |
| รายการยาวมากที่ต้องพิมพ์ค้นหา      | `Combobox` (ดู [Combobox](../Combobox/Combobox.md)) |
| เมนูคำสั่ง เช่น แก้ไข / ลบ        | `DropdownMenu`                                     |
| เลือกวันที่                      | `DatePicker`                                       |

## Anatomy

- **Select**: ตัวครอบ เก็บค่าที่เลือก
  - **SelectTrigger** → **SelectValue**: ปุ่มที่แสดงค่าที่เลือก (หรือ placeholder)
  - **SelectContent**: รายการที่เปิดขึ้น
    - **SelectGroup** → **SelectLabel** + **SelectItem**: จัดกลุ่มตัวเลือกพร้อมหัวข้อ
    - **SelectSeparator**: เส้นคั่นระหว่างกลุ่ม

## Props and variants

### Select

| Prop                      | ค่า               | ค่าเริ่มต้น | ความหมาย                                         |
| ------------------------- | ---------------- | ------- | ------------------------------------------------ |
| `items`                   | object หรือ array | –       | ชื่อที่แสดงของแต่ละค่า                                 |
| `defaultValue`            | value            | –       | ค่าที่เลือกไว้ตอนแรก                                  |
| `value` / `onValueChange` | value / ฟังก์ชัน    | –       | ควบคุมจากภายนอก                                   |
| `multiple`                | `boolean`        | `false` | เลือกได้หลายค่า TODO: ยังไม่มีตัวอย่างและยังไม่ได้ตรวจหน้าตา |
| `disabled`                | `boolean`        | `false` | ปิดใช้งาน จางลง 50%                                |
| `required` / `name`       | –                | –       | สำหรับส่งฟอร์ม                                      |

### SelectTrigger

| Prop           | ค่า              | ค่าเริ่มต้น   | ความหมาย                        |
| -------------- | --------------- | --------- | ------------------------------- |
| `size`         | `default`, `sm` | `default` | ความสูง 36px / 32px              |
| `aria-invalid` | `boolean`       | –         | ข้อมูลไม่ถูกต้อง เส้นขอบและวงแหวนสีแดง |
| `className`    | class           | –         | เช่น `w-full`                    |

### SelectValue / SelectItem

| Prop          | ใช้กับ          | ความหมาย                         |
| ------------- | ------------- | -------------------------------- |
| `placeholder` | `SelectValue` | ข้อความเมื่อยังไม่ได้เลือก เช่น "เลือกรัฐ" |
| `value`       | `SelectItem`  | **บังคับ** ค่าของตัวเลือก             |
| `disabled`    | `SelectItem`  | ตัวเลือกที่เลือกไม่ได้ จางลง 50%        |

`SelectContent` รับ `side`, `align` และ `alignItemWithTrigger` (ค่าเริ่มต้น `true`: รายการเปิดทับปุ่มให้ตัวเลือกปัจจุบันอยู่ตรงปุ่ม)

### พฤติกรรมที่มีให้แล้ว

- หน้าตาปุ่มเหมือน `Input` แบบ `filled` และสูงเท่ากัน วางคู่กันในฟอร์มได้
- ตัวเลือกที่เลือกมีเครื่องหมายถูกด้านขวา รายการยาวเลื่อนได้และมีลูกศรเลื่อนขึ้น/ลง

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                                    |
| ---------------------- | --------------------------- | --------------------------- | --------------------------------------- |
| `--input`              | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นปุ่ม (50%)                              |
| `--muted-foreground`   | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)`  | placeholder, ไอคอนลูกศร, หัวข้อกลุ่ม         |
| `--popover`            | `oklch(1 0 0)`              | `oklch(0.228 0.013 107.4)`  | พื้นรายการ                                |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษรในรายการ                          |
| `--accent`             | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | พื้นตัวเลือกที่โฟกัส                           |
| `--accent-foreground`  | `oklch(0.228 0.013 107.4)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษรตัวเลือกที่โฟกัส                       |
| `--border`             | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นคั่นกลุ่ม                                |
| `--foreground`         | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | เส้นขอบบาง ๆ รอบรายการ (5% สว่าง, 10% มืด) |
| `--ring`               | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus                            |
| `--destructive`        | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง                            |

## Example

จาก story `Groups` ใน `Select.stories.tsx`:

```tsx
<Select
  items={{
    cash: "เงินสด",
    bonds: "ตราสารหนี้",
    shares: "หุ้นออสเตรเลีย",
    global: "หุ้นต่างประเทศ",
  }}
>
  <SelectTrigger className="w-64" aria-label="สินทรัพย์">
    <SelectValue placeholder="เลือกสินทรัพย์" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>ความเสี่ยงต่ำ</SelectLabel>
      <SelectItem value="cash">เงินสด</SelectItem>
      <SelectItem value="bonds">ตราสารหนี้</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>ความเสี่ยงสูง</SelectLabel>
      <SelectItem value="shares">หุ้นออสเตรเลีย</SelectItem>
      <SelectItem value="global" disabled>
        หุ้นต่างประเทศ
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

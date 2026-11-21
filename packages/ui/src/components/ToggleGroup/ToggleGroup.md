# ToggleGroup (กลุ่มปุ่มเลือก)

## Purpose

กลุ่มปุ่มกดค้างสำหรับเลือกหนึ่งตัวเลือก (หรือหลายตัวด้วย `multiple`) ที่เห็นผลทันที เช่น ช่วงเวลาของกราฟ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { ToggleGroup, ToggleGroupItem } from "labdsnov"

;<ToggleGroup
  aria-label="ช่วงเวลาของกราฟ"
  variant="outline"
  size="sm"
  spacing={0}
  defaultValue={["6m"]}
>
  <ToggleGroupItem value="1m">1 เดือน</ToggleGroupItem>
  <ToggleGroupItem value="6m">6 เดือน</ToggleGroupItem>
  <ToggleGroupItem value="1y">1 ปี</ToggleGroupItem>
</ToggleGroup>
```

- ใส่ `aria-label` ที่กลุ่มเสมอ บอกว่าเลือกอะไร
- `value` / `defaultValue` เป็น **array** เสมอ แม้เลือกได้ตัวเดียว เช่น `["6m"]`
- ปุ่มที่มีแต่ไอคอนต้องมี `aria-label`

## When to use

- เปลี่ยนมุมมองของข้อมูลบนหน้าเดียวกัน เช่น ช่วงเวลาของ `Chart` (1 เดือน / 6 เดือน / 1 ปี)
- จัดรูปแบบหลายแบบพร้อมกัน (`multiple`) เช่น ตัวหนา ตัวเอียง

## When not to use

| สถานการณ์                | ใช้แทน                                      |
| ----------------------- | ------------------------------------------ |
| สลับระหว่างส่วนเนื้อหาที่ต่างกัน | `Tabs`                                     |
| เลือกค่าในฟอร์มที่ต้องกดส่ง    | `RadioGroup` (หรือ `Checkbox` ถ้าเลือกหลายค่า) |
| ตัวเลือกมากกว่า 5          | `Select`                                   |
| ปุ่มคำสั่งหลายปุ่มติดกัน        | `ButtonGroup`                              |

## Props and variants

### ToggleGroup

| Prop                      | ค่า                       | ค่าเริ่มต้น      | ความหมาย                            |
| ------------------------- | ------------------------ | ------------ | ----------------------------------- |
| `variant`                 | `default`, `outline`     | `default`    | หน้าตาของทุกปุ่ม (เหมือน `Toggle`)       |
| `size`                    | `default`, `sm`, `lg`    | `default`    | ขนาดของทุกปุ่ม                         |
| `spacing`                 | ตัวเลข                    | `2`          | ระยะห่าง (×4px) `0` = ต่อกันเป็นแถบเดียว |
| `orientation`             | `horizontal`, `vertical` | `horizontal` | แนวของกลุ่ม และปุ่มลูกศรที่ใช้เลื่อน          |
| `multiple`                | `boolean`                | `false`      | เลือกได้หลายปุ่ม                        |
| `value` / `onValueChange` | array / ฟังก์ชัน            | –            | ควบคุมค่าจากภายนอก                    |
| `defaultValue`            | array                    | –            | ค่าที่เลือกไว้ตอนแรก                     |
| `disabled`                | `boolean`                | `false`      | ปิดใช้งานทั้งกลุ่ม                        |

### ToggleGroupItem

`value` (บังคับ), `disabled` และ `aria-label` (เมื่อมีแต่ไอคอน) หน้าตาตาม `variant` / `size` ของกลุ่ม

### States

- ปุ่มที่เลือก: พื้นจาง เส้นขอบเข้ม (contrast 3:1) ตัวอักษรเข้ม ปุ่มที่ไม่ได้เลือกตัวอักษรสีรอง
- **คีย์บอร์ด**: Tab เข้ากลุ่ม ลูกศรเลื่อนระหว่างปุ่ม Space หรือ Enter เพื่อเลือก
- TODO: ยังไม่ได้ตัดสินใจว่าถ้าไม่ใช่ `multiple` จะให้กดปุ่มที่เลือกอยู่ซ้ำเพื่อยกเลิกได้หรือไม่ (ตอนนี้ยกเลิกได้ ทำให้ไม่มีค่าที่เลือก)

## Tokens used

ปุ่มในกลุ่มใช้ token ของ `Toggle` ทั้งหมด (`--toggle-fg`, `--toggle-pressed-bg`, `--toggle-pressed-border` ฯลฯ) และ `--focus-ring` ดูตารางใน [Toggle](../Toggle/Toggle.md) กลุ่มเองไม่มีสี

## Example

จาก story `Playground` ใน `ToggleGroup.stories.tsx`:

```tsx
<ToggleGroup
  aria-label="ช่วงเวลาของกราฟ"
  variant="outline"
  size="sm"
  spacing={0}
  defaultValue={["6m"]}
>
  <ToggleGroupItem value="1m">1 เดือน</ToggleGroupItem>
  <ToggleGroupItem value="6m">6 เดือน</ToggleGroupItem>
  <ToggleGroupItem value="1y">1 ปี</ToggleGroupItem>
  <ToggleGroupItem value="all">ทั้งหมด</ToggleGroupItem>
</ToggleGroup>
```

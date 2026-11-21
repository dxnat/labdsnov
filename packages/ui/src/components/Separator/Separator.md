# Separator (เส้นคั่น)

## Purpose

เส้นบาง ๆ คั่นระหว่างกลุ่มเนื้อหา แนวนอนหรือแนวตั้ง

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Separator } from "labdsnov"

<Separator className="my-4" />

// แนวตั้ง: วางใน flex แถวที่มีความสูง
<div className="flex h-5 items-center gap-4">
  <span>ภาพรวม</span>
  <Separator orientation="vertical" />
  <span>ธุรกรรม</span>
</div>
```

## When to use

- แบ่งส่วนเนื้อหาในการ์ดหรือในเมนู ที่ระยะห่างอย่างเดียวไม่พอ
- คั่นลิงก์หรือข้อมูลสั้น ๆ ที่อยู่แถวเดียวกัน (แนวตั้ง)

## When not to use

- **แบ่งส่วนใหญ่ของหน้า**: ใช้หัวข้อและระยะห่าง
- **ในฟอร์ม** (เช่น "หรือ" ระหว่างทางเลือก): ใช้ `FieldSeparator` (ดู [Field](../Field/Field.md))
- **ในรายการ `Select` / `DropdownMenu`**: ใช้ `SelectSeparator` / `DropdownMenuSeparator`

## Props and variants

| Prop          | ค่า                       | ค่าเริ่มต้น      | ความหมาย                                         |
| ------------- | ------------------------ | ------------ | ------------------------------------------------ |
| `orientation` | `horizontal`, `vertical` | `horizontal` | แนวนอน: หนา 1px กว้างเต็ม แนวตั้ง: กว้าง 1px สูงเท่าแถว |
| `className`   | class                    | –            | ระยะห่างรอบเส้น เช่น `my-4`                         |

เส้นคั่นเป็นแค่การตกแต่ง โปรแกรมอ่านหน้าจออ่านว่าเป็นเส้นคั่น TODO: ยังไม่ได้ตัดสินใจว่าเส้นคั่นเพื่อความสวยงามควรซ่อนจากโปรแกรมอ่านหน้าจอหรือไม่

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token      | โหมดสว่าง                  | โหมดมืด               | ใช้ใน |
| ---------- | ------------------------- | -------------------- | ---- |
| `--border` | `oklch(0.93 0.007 106.5)` | `oklch(1 0 0 / 10%)` | สีเส้น |

## Example

จาก story `Vertical` ใน `Separator.stories.tsx`:

```tsx
<div className="flex h-5 items-center gap-4 text-sm">
  <span>ภาพรวม</span>
  <Separator orientation="vertical" />
  <span>ธุรกรรม</span>
  <Separator orientation="vertical" />
  <span>เอกสาร</span>
</div>
```

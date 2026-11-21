# ScrollArea (พื้นที่เลื่อน)

## Purpose

กล่องขนาดคงที่ที่เนื้อหาเลื่อนได้ มีแถบเลื่อนบางที่หน้าตาเหมือนกันทุกระบบปฏิบัติการ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { ScrollArea } from "labdsnov"

;<ScrollArea className="h-72 w-80 rounded-2xl border">
  <div className="p-4">…</div>
</ScrollArea>
```

- **ต้องกำหนดขนาด** (`h-…` หรือ `w-…`) ด้วย `className` ไม่อย่างนั้นกล่องจะสูงตามเนื้อหาและไม่เลื่อน
- ใส่ระยะขอบ (`p-4`) ที่เนื้อหาข้างใน ไม่ใช่ที่ `ScrollArea`
- เนื้อหากว้างเกิน: เพิ่ม `<ScrollBar orientation="horizontal" />` ไว้ข้างใน

## When to use

- รายการยาวในพื้นที่จำกัด เช่น รายการเคลื่อนไหวใน `Card` หรือ `Popover`
- แถวของการ์ดที่เลื่อนแนวนอน

## When not to use

- **เนื้อหาหลักของหน้า**: ให้หน้าเลื่อนตามปกติ
- **ตารางข้อมูล**: ใช้ `Table` (เลื่อนแนวนอนเองอยู่แล้ว)
- **รายการตัวเลือก**: `Select` / `Combobox` / `DropdownMenu` เลื่อนเองอยู่แล้ว

## Props and variants

ไม่มี variant หรือ size

| Prop          | ใช้กับ         | ความหมาย                                     |
| ------------- | ------------ | -------------------------------------------- |
| `className`   | `ScrollArea` | ขนาด กรอบ มุมโค้ง                              |
| `orientation` | `ScrollBar`  | `vertical` (ค่าเริ่มต้น มีให้แล้ว) หรือ `horizontal` |

- แถบเลื่อนกว้าง 10px ตัวจับสีเทาเข้ม (contrast 3:1)
- **คีย์บอร์ด**: Tab เข้าไปในพื้นที่ (มีวงแหวน focus ด้านใน) แล้วเลื่อนด้วยลูกศร TODO: ยังไม่ได้ตรวจว่าพื้นที่รับโฟกัสได้ในทุกเบราว์เซอร์เมื่อไม่มีปุ่มหรือลิงก์ข้างใน

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                 | โหมดสว่าง           | โหมดมืด | ใช้ใน                                          |
| --------------------- | ------------------ | ------ | --------------------------------------------- |
| `--focus-ring`        | `--ring`           | –      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px) |
| `--scroll-area-thumb` | `--control-border` | –      | แถบเลื่อน                                       |

### Semantic tokens

| Token              | โหมดสว่าง                 | โหมดมืด                    | ใช้ใน                        |
| ------------------ | ------------------------ | ------------------------- | --------------------------- |
| `--ring`           | `oklch(0.45 0.03 106.9)` | `oklch(0.8 0.02 106.9)`   | วงแหวน focus                |
| `--control-border` | `oklch(0.6 0.02 106.9)`  | `oklch(0.55 0.015 106.9)` | ผ่าน token ของคอมโพเนนต์ด้านบน |

## Example

จาก story `Horizontal` ใน `ScrollArea.stories.tsx`:

```tsx
<ScrollArea className="w-96 rounded-2xl border whitespace-nowrap">
  <div className="flex w-max gap-3 p-4">
    {funds.map((name) => (
      <div
        key={name}
        className="flex h-24 w-40 items-end rounded-2xl bg-muted p-3 text-sm font-medium"
      >
        {name}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

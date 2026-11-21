# Switch (สวิตช์เปิด/ปิด)

## Purpose

สวิตช์เปิด/ปิดการตั้งค่าที่มีผลทันที

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Label, Switch } from "labdsnov"

;<div className="flex items-center gap-2">
  <Switch id="email-statements" />
  <Label htmlFor="email-statements">รับใบแจ้งยอดทางอีเมล</Label>
</div>
```

## When to use

- การตั้งค่าที่เปิด/ปิดแล้วมีผลทันที ไม่ต้องกดบันทึก เช่น การแจ้งเตือน การรับเอกสารทางอีเมล

## When not to use

- **ค่าในฟอร์มที่มีผลเมื่อกดส่ง** (เช่น ยอมรับเงื่อนไข): ใช้ `Checkbox`
- **เลือกหนึ่งจากหลายตัวเลือก**: ใช้ `RadioGroup`
- TODO: ยังไม่ได้กำหนดว่าจะแจ้งผู้ใช้อย่างไรเมื่อบันทึกการตั้งค่าสำเร็จหรือไม่สำเร็จ (เช่น ใช้ `toast`)

## Props and variants

| Prop                          | ค่า                | ค่าเริ่มต้น   | ความหมาย                        |
| ----------------------------- | ----------------- | --------- | ------------------------------- |
| `size`                        | `default`, `sm`   | `default` | ขนาด (ดูตารางด้านล่าง)             |
| `checked` / `onCheckedChange` | `boolean` / ฟังก์ชัน | –         | ควบคุมจากภายนอก                  |
| `defaultChecked`              | `boolean`         | `false`   | เปิดไว้ตั้งแต่แรก                    |
| `disabled`                    | `boolean`         | `false`   | ปิดใช้งาน จางลง 50%               |
| `aria-invalid`                | `boolean`         | –         | ข้อมูลไม่ถูกต้อง เส้นขอบและวงแหวนสีแดง |
| `className`                   | class             | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว          |

| Size      | ขนาดราง | ใช้เมื่อ                     |
| --------- | ------- | ------------------------- |
| `default` | 44×20px | ค่าเริ่มต้น                   |
| `sm`      | 28×16px | TODO: ยังไม่ได้กำหนดการใช้งาน |

### States

- **ปิด**: รางสีเทา ปุ่มกลมอยู่ซ้าย
- **เปิด**: รางสีหลัก (ส้ม) ปุ่มกลมเลื่อนไปขวา
- **Focus จากคีย์บอร์ด**: วงแหวนสี ring กด Space เพื่อสลับ

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                 |
| ---------------------- | --------------------------- | --------------------------- | -------------------- |
| `--input`              | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | รางเมื่อปิด (90%)       |
| `--primary`            | `oklch(0.553 0.195 38.402)` | `oklch(0.47 0.157 37.304)`  | รางเมื่อเปิด            |
| `--background`         | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | ปุ่มกลม (โหมดสว่าง)     |
| `--primary-foreground` | `oklch(0.98 0.016 73.684)`  | `oklch(0.98 0.016 73.684)`  | ปุ่มกลมเมื่อเปิด (โหมดมืด) |
| `--foreground`         | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | ปุ่มกลมเมื่อปิด (โหมดมืด)  |
| `--ring`               | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus         |
| `--destructive`        | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง         |

## Example

จาก story `States` ใน `Switch.stories.tsx` (บางส่วน):

```tsx
<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Switch id="sw-on" defaultChecked />
    <Label htmlFor="sw-on">เปิด</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="sw-disabled" disabled defaultChecked />
    <Label htmlFor="sw-disabled">ปิดใช้งาน</Label>
  </div>
</div>
```

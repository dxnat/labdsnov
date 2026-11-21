# Checkbox (ช่องทำเครื่องหมาย)

## Purpose

ช่องเลือกเปิด/ปิดหนึ่งข้อ หรือเลือกได้หลายข้อจากรายการ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Checkbox, Label } from "labdsnov"

;<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">ยอมรับข้อกำหนดและเงื่อนไข</Label>
</div>
```

- ผูกกับ `Label` ด้วย `id` / `htmlFor` เสมอ คลิกที่ข้อความแล้วติ๊กได้
- ในฟอร์ม ใช้คู่กับ `Field orientation="horizontal"` (ดู [Field](../Field/Field.md))

## When to use

- ยอมรับเงื่อนไข หรือยืนยันข้อความหนึ่งข้อ ที่มีผลเมื่อกดส่งฟอร์ม
- เลือกได้หลายข้อจากรายการ เช่น ช่องทางที่ต้องการรับเอกสาร
- "เลือกทั้งหมด" ที่เลือกไว้บางรายการ: ใช้สถานะ `indeterminate` (ขีดแทนเครื่องหมายถูก)

## When not to use

| สถานการณ์                     | ใช้แทน        |
| ---------------------------- | ------------ |
| เลือกได้ข้อเดียวจากหลายข้อ        | `RadioGroup` |
| การตั้งค่าที่มีผลทันทีโดยไม่ต้องกดบันทึก | `Switch`     |
| การกระทำ เช่น "ลบรายการที่เลือก" | `Button`     |

## Props and variants

ไม่มี variant หรือ size กล่องขนาด 16px แต่พื้นที่กดกว้างกว่ากล่องเล็กน้อย

| Prop                          | ค่า                | ค่าเริ่มต้น | ความหมาย                          |
| ----------------------------- | ----------------- | ------- | --------------------------------- |
| `checked` / `onCheckedChange` | `boolean` / ฟังก์ชัน | –       | ควบคุมจากภายนอก                    |
| `defaultChecked`              | `boolean`         | `false` | ติ๊กไว้ตั้งแต่แรก                       |
| `indeterminate`               | `boolean`         | `false` | เลือกไว้บางส่วน แสดงขีดแทนเครื่องหมายถูก |
| `disabled`                    | `boolean`         | `false` | ปิดใช้งาน จางลง 50%                 |
| `required`                    | `boolean`         | `false` | ต้องติ๊กก่อนส่งฟอร์ม                    |
| `name` / `value`              | ข้อความ            | –       | ชื่อและค่าที่ส่งไปกับฟอร์ม                |
| `aria-invalid`                | `boolean`         | –       | ข้อมูลไม่ถูกต้อง เส้นขอบและวงแหวนสีแดง   |
| `className`                   | class             | –       | ปรับหน้าตาเฉพาะจุดครั้งเดียว            |

### States

- **ไม่ได้ติ๊ก**: กล่องพื้นเทา
- **ติ๊กแล้ว / บางส่วน**: กล่องสีหลัก (ส้ม) เครื่องหมายสีอ่อน
- **Focus จากคีย์บอร์ด**: เส้นขอบและวงแหวนสี ring กด Space เพื่อติ๊ก

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                |
| ---------------------- | --------------------------- | --------------------------- | ------------------- |
| `--input`              | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นกล่องที่ไม่ได้ติ๊ก (90%) |
| `--primary`            | `oklch(0.553 0.195 38.402)` | `oklch(0.47 0.157 37.304)`  | พื้นและเส้นขอบเมื่อติ๊ก    |
| `--primary-foreground` | `oklch(0.98 0.016 73.684)`  | `oklch(0.98 0.016 73.684)`  | เครื่องหมายถูกและขีด    |
| `--ring`               | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus        |
| `--destructive`        | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง        |

## Example

จาก story `States` ใน `Checkbox.stories.tsx` (บางส่วน):

```tsx
<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="cb-on" defaultChecked />
    <Label htmlFor="cb-on">เลือกแล้ว</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="cb-some" indeterminate />
    <Label htmlFor="cb-some">เลือกบางรายการ</Label>
  </div>
</div>
```

# Textarea (ช่องกรอกข้อความหลายบรรทัด)

## Purpose

ช่องกรอกข้อความยาวหลายบรรทัด ขยายความสูงตามข้อความที่พิมพ์

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Label, Textarea } from "labdsnov"

;<div className="grid gap-2">
  <Label htmlFor="message">ข้อความ</Label>
  <Textarea id="message" placeholder="พิมพ์ข้อความถึงเจ้าหน้าที่" />
</div>
```

## When to use

- ข้อความที่อาจยาวเกินหนึ่งบรรทัด เช่น ข้อความถึงเจ้าหน้าที่ เหตุผลในการถอนเงิน

## When not to use

- **ข้อมูลสั้นบรรทัดเดียว** (ชื่อ อีเมล ตัวเลข): ใช้ `Input`
- **ข้อความจัดรูปแบบ** (ตัวหนา รายการ): TODO: ยังไม่มีคอมโพเนนต์ rich text editor

## Props and variants

ไม่มี variant หรือ size หน้าตาเหมือน `Input` แบบ `filled` สูงอย่างน้อย 64px และขยายตามข้อความ (ในเบราว์เซอร์ที่รองรับ) ผู้ใช้ลากปรับขนาดเองไม่ได้ ตัวอักษร 16px บนจอแคบ และ 14px บนจอ 768px ขึ้นไป

| Prop                 | ค่า             | ความหมาย                                                 |
| -------------------- | -------------- | -------------------------------------------------------- |
| `id`                 | ข้อความ         | ผูกกับ `Label` ผ่าน `htmlFor`                               |
| `placeholder`        | ข้อความ         | ตัวอย่างสิ่งที่ควรพิมพ์ ไม่ใช่ป้ายชื่อ                                |
| `value` / `onChange` | ข้อความ / ฟังก์ชัน | ควบคุมค่าจากภายนอก (หรือใช้ `defaultValue`)                  |
| `rows`               | ตัวเลข          | TODO: ยังไม่ได้ตรวจว่า `rows` มีผลร่วมกับการขยายตามข้อความอย่างไร |
| `maxLength`          | ตัวเลข          | จำกัดจำนวนตัวอักษร TODO: ยังไม่มีตัวนับตัวอักษร                    |
| `disabled`           | `boolean`      | ปิดใช้งาน จางลง 50%                                        |
| `aria-invalid`       | `boolean`      | ข้อมูลไม่ถูกต้อง แสดงเส้นขอบและวงแหวนสีแดง                      |
| `aria-describedby`   | id ของข้อความ   | ผูกข้อความช่วยเหลือหรือข้อความผิดพลาดใต้ช่อง                      |
| `className`          | class          | ปรับหน้าตาเฉพาะจุดครั้งเดียว                                   |

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                            |
| -------------------- | --------------------------- | --------------------------- | ------------------------------- |
| `--input`            | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นช่อง (50%)                     |
| `--muted-foreground` | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)`  | placeholder                     |
| `--ring`             | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | เส้นขอบและวงแหวน focus           |
| `--destructive`      | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง                    |
| `--radius`           | `0.625rem`                  | –                           | มุมโค้ง (`--radius × 1.8` = 18px) |

## Example

จาก story `Invalid` ใน `Textarea.stories.tsx`:

```tsx
<div className="grid w-80 gap-2">
  <Label htmlFor="ta-reason">เหตุผลในการถอนเงิน</Label>
  <Textarea id="ta-reason" aria-invalid aria-describedby="ta-reason-error" />
  <p id="ta-reason-error" className="text-sm text-destructive">
    กรุณาระบุเหตุผลอย่างน้อย 20 ตัวอักษร
  </p>
</div>
```

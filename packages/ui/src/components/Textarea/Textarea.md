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
| `aria-invalid`       | `boolean`      | ข้อมูลไม่ถูกต้อง แสดงเส้นขอบสีแดงและวงแหวนแดงจาง                |
| `aria-describedby`   | id ของข้อความ   | ผูกข้อความช่วยเหลือหรือข้อความผิดพลาดใต้ช่อง                      |
| `className`          | class          | ปรับหน้าตาเฉพาะจุดครั้งเดียว                                   |

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                 | โหมดสว่าง             | โหมดมืด              | ใช้ใน                                            |
| --------------------- | -------------------- | ------------------- | ----------------------------------------------- |
| `--field-border`      | `--control-border`   | –                   | เส้นขอบช่องกรอก                                   |
| `--field-bg`          | `--input` 50%        | –                   | พื้นช่องกรอก                                       |
| `--field-placeholder` | `--muted-foreground` | –                   | placeholder                                     |
| `--focus-ring`        | `--ring`             | –                   | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px)   |
| `--invalid-border`    | `--destructive`      | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`      | `--destructive` 20%  | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง (ตกแต่ง)                 |

### Semantic tokens

| Token                | โหมดสว่าง                  | โหมดมืด                     | ใช้ใน                            |
| -------------------- | ------------------------- | -------------------------- | ------------------------------- |
| `--input`            | `oklch(0.93 0.007 106.5)` | `oklch(1 0 0 / 15%)`       | พื้นช่อง (50%)                     |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`  | `oklch(0.737 0.021 106.9)` | placeholder                     |
| `--ring`             | `oklch(0.45 0.03 106.9)`  | `oklch(0.8 0.02 106.9)`    | เส้นขอบและวงแหวน focus           |
| `--destructive`      | `oklch(0.505 0.2 27.325)` | `oklch(0.75 0.16 22.216)`  | สถานะไม่ถูกต้อง                    |
| `--radius`           | `0.625rem`                | –                          | มุมโค้ง (`--radius × 1.8` = 18px) |
| `--control-border`   | `oklch(0.6 0.02 106.9)`   | `oklch(0.55 0.015 106.9)`  | ผ่าน token ของคอมโพเนนต์ด้านบน     |

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

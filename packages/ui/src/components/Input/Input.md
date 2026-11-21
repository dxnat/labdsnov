# Input (ช่องกรอกข้อมูล)

## Purpose

ช่องกรอกข้อความบรรทัดเดียว เช่น ชื่อ อีเมล รหัสผ่าน เบอร์โทรศัพท์ หรือเลือกไฟล์

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Input, Label } from "labdsnov"

;<div className="grid gap-2">
  <Label htmlFor="email" required>
    อีเมล
  </Label>
  <Input id="email" type="email" required placeholder="you@example.com" />
</div>
```

## When to use

- ข้อมูลสั้นบรรทัดเดียวในฟอร์ม เช่น ฟอร์มแก้ไขข้อมูลบัญชี เข้าสู่ระบบ
- ใช้คู่กับ `Label` เสมอ (ดู [Label](../Label/Label.md))
- เลือก `type` ให้ตรงกับข้อมูล (`email`, `password`, `tel`, `number`, `search`, `file`) เพื่อให้มือถือแสดงแป้นพิมพ์ที่เหมาะสม

## When not to use

- **ข้อความหลายบรรทัด**: ใช้ `Textarea`
- **เลือกจากรายการ หรือเปิด/ปิด**: ใช้ `Select`, `RadioGroup`, `Checkbox` หรือ `Switch`
- **เลือกวันที่**: ใช้ `DatePicker`
- **ใช้ placeholder แทนป้ายชื่อ**: placeholder หายไปเมื่อเริ่มพิมพ์ ใช้แค่ยกตัวอย่างรูปแบบ เช่น "04xx xxx xxx"

## Props and variants

| Prop                 | ค่า                  | ค่าเริ่มต้น  | ความหมาย                                                    |
| -------------------- | ------------------- | -------- | ----------------------------------------------------------- |
| `variant`            | `filled`, `outline` | `filled` | หน้าตาของช่อง (ดูตารางด้านล่าง)                                  |
| `type`               | ชนิดของ input        | `text`   | ชนิดข้อมูล                                                     |
| `id`                 | ข้อความ              | –        | ใช้ผูกกับ `Label` ผ่าน `htmlFor`                                |
| `placeholder`        | ข้อความ              | –        | ตัวอย่างรูปแบบ เป็นภาษาไทยหรือรูปแบบข้อมูล                          |
| `value` / `onChange` | ข้อความ / ฟังก์ชัน      | –        | ควบคุมค่าจากภายนอก (หรือใช้ `defaultValue`)                     |
| `disabled`           | `boolean`           | `false`  | ปิดใช้งาน จางลง 50% โฟกัสไม่ได้                                  |
| `aria-invalid`       | `boolean`           | –        | ข้อมูลไม่ถูกต้อง แสดงเส้นขอบสีแดงและวงแหวนแดงจาง                   |
| `aria-describedby`   | id ของข้อความ        | –        | ผูกข้อความช่วยเหลือหรือข้อความผิดพลาดใต้ช่อง ให้โปรแกรมอ่านหน้าจออ่านด้วย |
| `required`           | `boolean`           | `false`  | บังคับกรอก ต้องใส่เองแม้ `Label` จะมี `required` แล้ว              |
| `className`          | class               | –        | ปรับหน้าตาเฉพาะจุดครั้งเดียว ชนะสไตล์ของช่องเสมอ                    |

### Variants

| Variant   | หน้าตา            | ใช้เมื่อ                     |
| --------- | ---------------- | ------------------------- |
| `filled`  | พื้นทึบอ่อน มีเส้นขอบ  | ค่าเริ่มต้น ใช้ในฟอร์มทั่วไป      |
| `outline` | พื้นโปร่งใส มีเส้นขอบ | TODO: ยังไม่ได้กำหนดว่าใช้ที่ไหน |

ช่องสูง 36px กว้างเต็มพื้นที่ ทรงแคปซูล ตัวอักษร 16px บนจอแคบ และ 14px บนจอ 768px ขึ้นไป

### States

- **Focus จากคีย์บอร์ด**: เส้นขอบและวงแหวนทึบสี `--focus-ring`
- **ปิดใช้งาน**: จางลง 50%
- **ข้อมูลไม่ถูกต้อง** (`aria-invalid`): เส้นขอบสีแดงและวงแหวนแดงจาง เมื่อโฟกัสวงแหวนเป็นสีแดงทึบ ต้องมีข้อความบอกว่าผิดอย่างไรใต้ช่องเสมอ ใช้ `FieldError` (ดู [Field](../Field/Field.md))

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                 | โหมดสว่าง             | โหมดมืด              | ใช้ใน                                            |
| --------------------- | -------------------- | ------------------- | ----------------------------------------------- |
| `--field-placeholder` | `--muted-foreground` | –                   | placeholder                                     |
| `--field-border`      | `--control-border`   | –                   | เส้นขอบช่องกรอก (contrast 3:1)                    |
| `--field-bg`          | `--input` 50%        | –                   | พื้นช่องกรอก                                       |
| `--focus-ring`        | `--ring`             | –                   | วงแหวน focus จากคีย์บอร์ด (ทึบ 2px)                 |
| `--invalid-border`    | `--destructive`      | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`      | `--destructive` 20%  | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง                         |

### Semantic tokens

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                                |
| -------------------- | -------------------------- | -------------------------- | ----------------------------------- |
| `--input`            | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 15%)`       | พื้น `filled` (50%), เส้นขอบ `outline` |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | placeholder                         |
| `--foreground`       | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ตัวอักษรที่พิมพ์ (สืบทอด), ปุ่มเลือกไฟล์       |
| `--ring`             | `oklch(0.45 0.03 106.9)`   | `oklch(0.8 0.02 106.9)`    | เส้นขอบและวงแหวน focus               |
| `--destructive`      | `oklch(0.505 0.2 27.325)`  | `oklch(0.75 0.16 22.216)`  | สถานะไม่ถูกต้อง                        |
| `--radius`           | `0.625rem`                 | –                          | มุมโค้ง (`--radius × 2.2` = 22px)     |
| `--control-border`   | `oklch(0.6 0.02 106.9)`    | `oklch(0.55 0.015 106.9)`  | ผ่าน token ของคอมโพเนนต์ด้านบน         |

## Example

จาก story `Invalid` ใน `Input.stories.tsx`:

```tsx
<div className="grid gap-2">
  <Label htmlFor="input-tfn">เลขประจำตัวผู้เสียภาษี (TFN)</Label>
  <Input
    id="input-tfn"
    aria-invalid
    defaultValue="123-456"
    aria-describedby="input-tfn-hint"
  />
  <p id="input-tfn-hint" className="text-xs text-destructive">
    เลขประจำตัวผู้เสียภาษี (TFN) ต้องมี 9 หลัก
  </p>
</div>
```

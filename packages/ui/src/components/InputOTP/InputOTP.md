# InputOTP (ช่องกรอกรหัสยืนยัน)

## Purpose

ช่องกรอกรหัสยืนยันแบบใช้ครั้งเดียว (OTP) แยกกล่องละหนึ่งตัวอักษร เช่น รหัส 6 หลักทาง SMS

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

ใช้ไลบรารี `input-otp` (ติดตั้งมากับ `labdsnov` แล้ว)

```tsx
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Label } from "labdsnov"

<Label htmlFor="otp">รหัสยืนยัน 6 หลัก</Label>
<InputOTP id="otp" maxLength={6} onComplete={verify}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

- มีช่องกรอกจริงหนึ่งช่องซ้อนอยู่ใต้กล่อง จึงวาง (paste) รหัสทั้งชุด และกรอกอัตโนมัติจาก SMS บนมือถือได้
- ใส่ `InputOTPSlot` ให้ครบตาม `maxLength` โดย `index` เริ่มที่ 0

## When to use

- รหัสยืนยันตัวตนแบบใช้ครั้งเดียว เมื่อเข้าสู่ระบบหรือยืนยันการถอนเงิน

## When not to use

- **รหัสผ่าน หรือตัวเลขยาวอื่น ๆ** (เลขบัญชี, TFN): ใช้ `Input`
- **PIN ที่ต้องซ่อนตัวเลข**: TODO: ยังไม่มีตัวเลือกซ่อนตัวเลขในกล่อง

## Props and variants

ไม่มี variant หรือ size กล่องละ 36px หน้าตาเหมือน `Input` แบบ `filled` กล่องในกลุ่มเดียวกันต่อกันเป็นแคปซูล

| ส่วน / Prop                      | ความหมาย                                             |
| ------------------------------- | ---------------------------------------------------- |
| `InputOTP` `maxLength`          | **บังคับ** จำนวนตัวอักษร                                 |
| `InputOTP` `value` / `onChange` | ควบคุมค่าจากภายนอก                                     |
| `InputOTP` `onComplete`         | เรียกเมื่อกรอกครบ ใช้ส่งรหัสไปตรวจได้ทันที                    |
| `InputOTP` `pattern`            | จำกัดตัวอักษรที่กรอกได้ TODO: ยังไม่มีตัวอย่าง (เช่น ตัวเลขเท่านั้น) |
| `InputOTP` `disabled`           | ปิดใช้งาน จางลง 50%                                    |
| `InputOTPGroup`                 | กลุ่มกล่องที่ต่อกัน                                         |
| `InputOTPSlot` `index`          | **บังคับ** ตำแหน่งของกล่อง                               |
| `InputOTPSlot` `aria-invalid`   | รหัสไม่ถูกต้อง เส้นขอบสีแดง                                |
| `InputOTPSeparator`             | ขีดคั่นระหว่างกลุ่ม                                        |

กล่องที่กำลังกรอกมีวงแหวนทึบสี `--focus-ring` (สีแดงเมื่อข้อมูลไม่ถูกต้อง) และเคอร์เซอร์กะพริบ

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token              | โหมดสว่าง            | โหมดมืด              | ใช้ใน                                            |
| ------------------ | ------------------- | ------------------- | ----------------------------------------------- |
| `--invalid-border` | `--destructive`     | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`   | `--destructive` 20% | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง                         |
| `--field-border`   | `--control-border`  | –                   | เส้นขอบช่องกรอก (contrast 3:1)                    |
| `--field-bg`       | `--input` 50%       | –                   | พื้นช่องกรอก                                       |
| `--focus-ring`     | `--ring`            | –                   | วงแหวน focus จากคีย์บอร์ด (ทึบ 2px)                 |

### Semantic tokens

| Token              | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                        |
| ------------------ | -------------------------- | -------------------------- | --------------------------- |
| `--input`          | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 15%)`       | พื้นกล่อง (50%) และเส้นขอบ      |
| `--ring`           | `oklch(0.45 0.03 106.9)`   | `oklch(0.8 0.02 106.9)`    | กล่องที่กำลังกรอก               |
| `--foreground`     | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | เคอร์เซอร์                    |
| `--destructive`    | `oklch(0.505 0.2 27.325)`  | `oklch(0.75 0.16 22.216)`  | สถานะไม่ถูกต้อง                |
| `--control-border` | `oklch(0.6 0.02 106.9)`    | `oklch(0.55 0.015 106.9)`  | ผ่าน token ของคอมโพเนนต์ด้านบน |

## Example

จาก story `Invalid` ใน `InputOTP.stories.tsx`:

```tsx
<InputOTP id="otp-invalid" maxLength={6} defaultValue="123456">
  <InputOTPGroup>
    {[0, 1, 2, 3, 4, 5].map((index) => (
      <InputOTPSlot key={index} index={index} aria-invalid />
    ))}
  </InputOTPGroup>
</InputOTP>
<p className="text-sm text-destructive">รหัสไม่ถูกต้อง กรุณาลองอีกครั้ง</p>
```

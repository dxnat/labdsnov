# Button (ปุ่ม)

## Purpose

ปุ่มให้ผู้ใช้สั่งการกระทำในหน้า เช่น ส่งฟอร์ม บันทึก หรือเปิด dialog

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Button, buttonVariants } from "labdsnov"

<Button type="submit">บันทึก</Button>
<Button variant="outline" onClick={onCancel}>ยกเลิก</Button>

// ปุ่มไอคอนอย่างเดียว ต้องมี aria-label
<Button size="icon" variant="ghost" aria-label="ตั้งค่า">
  <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
</Button>

// ลิงก์ไปหน้าอื่นที่หน้าตาเหมือนปุ่ม
import Link from "next/link"

<Link href="/register" className={buttonVariants({ variant: "outline" })}>
  สมัครสมาชิก
</Link>
```

ถ้าใช้ไอคอน ให้ติดตั้ง `@hugeicons/react` และ `@hugeicons/core-free-icons` ในแอปด้วย

## When to use

- การกระทำที่เกิดขึ้นในหน้าเดิม เช่น "บันทึก", "เพิ่มเงินสมทบ", "ลบ"
- ปุ่มส่งฟอร์ม เช่น "เข้าสู่ระบบ" (เต็มความกว้างด้วย `fullWidth`)
- ปุ่มที่เปิด dialog หรือเมนู
- ปุ่มไอคอนอย่างเดียวในแถบเครื่องมือ เช่น "ตั้งค่า"

## When not to use

- **ไปหน้าอื่น**: ใช้ลิงก์ ถ้าต้องให้หน้าตาเหมือนปุ่ม ทำได้ตาม story `AsLink`
- **ป้ายสถานะ**: ใช้ `Badge`
- **ปุ่มหลักหลายปุ่มในพื้นที่เดียว**: ใช้ `default` ปุ่มเดียว ปุ่มอื่นใช้ `outline`, `secondary` หรือ `ghost`

## Props and variants

| Prop                    | ค่า                          | ค่าเริ่มต้น   | ความหมาย                                                        |
| ----------------------- | --------------------------- | --------- | --------------------------------------------------------------- |
| `variant`               | ดูตารางด้านล่าง                | `default` | ระดับความเด่นของปุ่ม                                                |
| `size`                  | ดูตารางด้านล่าง                | `default` | ความสูงและระยะขอบใน                                              |
| `fullWidth`             | `boolean`                   | `false`   | ขยายเต็มความกว้างของพื้นที่ เช่น ปุ่มเข้าสู่ระบบ/สมัครสมาชิก                  |
| `disabled`              | `boolean`                   | `false`   | ปิดใช้งาน จางลง 50% กดและโฟกัสไม่ได้                                 |
| `focusableWhenDisabled` | `boolean`                   | `false`   | ปิดใช้งานแต่ยังโฟกัสได้ เช่น เพื่อแสดงคำอธิบายว่าทำไมกดไม่ได้                |
| `type`                  | `button`, `submit`, `reset` | `button`  | ใช้ `submit` กับปุ่มส่งฟอร์ม                                          |
| `aria-label`            | ข้อความ                      | –         | **บังคับ** สำหรับปุ่มไอคอนอย่างเดียว เป็นภาษาไทย                        |
| `render`                | element                     | –         | ให้ปุ่มทำหน้าที่เป็นส่วนของคอมโพเนนต์อื่น เช่น ปุ่มเปิด/ปิด `Dialog`            |
| `className`             | class                       | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว ชนะสไตล์ของปุ่มเสมอ ถ้าใช้ซ้ำ ให้ขอ variant ใหม่ |

### Variants

| Variant       | ใช้เมื่อ                         | หน้าตา                       |
| ------------- | ----------------------------- | --------------------------- |
| `default`     | การกระทำหลักของพื้นที่ (1 ปุ่มต่อพื้นที่) | พื้นสีหลัก (ส้ม) ตัวอักษรสีอ่อน      |
| `outline`     | ทางเลือกคู่กับปุ่มหลัก เช่น "ยกเลิก"   | พื้นเท่ากับพื้นหลัง มีเส้นขอบ        |
| `secondary`   | การกระทำรอง                   | พื้นเทาอ่อน                    |
| `ghost`       | ปุ่มในแถบเครื่องมือ ปุ่มไอคอน        | โปร่งใส มีพื้นเมื่อ hover         |
| `destructive` | การกระทำที่ลบหรือย้อนกลับไม่ได้      | พื้นแดงจาง ตัวอักษรแดง          |
| `link`        | การกระทำที่ดูเหมือนลิงก์ในข้อความ    | ตัวอักษรสีหลัก ขีดเส้นใต้เมื่อ hover |

TODO: ยังไม่มีเกณฑ์ชัดเจนว่าการกระทำรองควรใช้ `outline` หรือ `secondary`

### Sizes

| Size      | ความสูง  | ใช้กับ                                    |
| --------- | ------- | --------------------------------------- |
| `xs`      | 24px    | TODO: ยังไม่ได้กำหนดการใช้งาน               |
| `sm`      | 32px    | TODO: ยังไม่ได้กำหนดการใช้งาน               |
| `default` | 36px    | ปุ่มทั่วไป ใช้ขนาดนี้เมื่อไม่แน่ใจ                 |
| `lg`      | 40px    | TODO: ยังไม่ได้กำหนดการใช้งาน               |
| `icon-xs` | 24×24px | ปุ่มไอคอนอย่างเดียว ขนาดสอดคล้องกับ `xs`      |
| `icon-sm` | 32×32px | ปุ่มไอคอนอย่างเดียว เช่น ปุ่ม "ปิด" ใน Dialog   |
| `icon`    | 36×36px | ปุ่มไอคอนอย่างเดียว ขนาดสอดคล้องกับ `default` |
| `icon-lg` | 40×40px | ปุ่มไอคอนอย่างเดียว ขนาดสอดคล้องกับ `lg`      |

ทุกขนาดเป็นทรงแคปซูล ตัวอักษร 14px น้ำหนัก medium (`xs` ใช้ 12px) ไอคอน 16px (`xs`, `icon-xs` ใช้ 12px) วางไอคอนหน้าหรือหลังข้อความได้ตาม story `WithIcons`

### States

- **Hover**: พื้นเข้มขึ้นหรือมีพื้นขึ้นมา (`link` ขีดเส้นใต้)
- **กดค้าง**: ปุ่มเลื่อนลง 1px
- **Focus จากคีย์บอร์ด**: เส้นขอบและวงแหวนทึบ 2px สี `--focus-ring` ทุก variant (contrast อย่างน้อย 3:1 กับพื้นหน้า)
- **ปิดใช้งาน**: จางลง 50%
- **ข้อมูลไม่ถูกต้อง** (`aria-invalid`): เส้นขอบและวงแหวนสีแดง
- **เปิดอยู่** (`aria-expanded`, เช่น ปุ่มที่เปิดเมนู): `outline` และ `ghost` คงพื้นไว้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                           | โหมดสว่าง                           | โหมดมืด                 | ใช้ใน                                            |
| ------------------------------- | ---------------------------------- | ---------------------- | ----------------------------------------------- |
| `--button-primary-bg`           | `--primary`                        | –                      | พื้น `default`                                    |
| `--button-primary-fg`           | `--primary-foreground`             | –                      | ตัวอักษร `default`                                |
| `--button-primary-hover-bg`     | `--primary` ผสมดำ 12%              | `--primary` ผสมขาว 12% | พื้น `default` ตอน hover                          |
| `--button-outline-border`       | `--border`                         | –                      | เส้นขอบ `outline`                                |
| `--button-outline-bg`           | `--background`                     | `transparent`          | พื้น `outline`                                    |
| `--button-outline-hover-bg`     | `--muted`                          | `--input`              | พื้น `outline` ตอน hover / เปิดเมนู                 |
| `--button-hover-fg`             | `--foreground`                     | –                      | ตัวอักษร `outline` / `ghost` ตอน hover            |
| `--button-secondary-bg`         | `--secondary`                      | –                      | พื้น `secondary`                                  |
| `--button-secondary-fg`         | `--secondary-foreground`           | –                      | ตัวอักษร `secondary`                              |
| `--button-secondary-hover-bg`   | `--secondary` ผสม`--foreground` 5% | –                      | พื้น `secondary` ตอน hover                        |
| `--button-ghost-hover-bg`       | `--muted`                          | `--muted` 50%          | พื้น `ghost` ตอน hover / เปิดเมนู                   |
| `--button-destructive-bg`       | `--destructive` 10%                | `--destructive` 20%    | พื้น `destructive`                                |
| `--button-destructive-fg`       | `--destructive`                    | –                      | ตัวอักษร `destructive`                            |
| `--button-destructive-hover-bg` | `--destructive` 18%                | `--destructive` 30%    | พื้น `destructive` ตอน hover                      |
| `--button-link-fg`              | `--primary`                        | –                      | ตัวอักษร `link`                                   |
| `--focus-ring`                  | `--ring`                           | –                      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px)   |
| `--invalid-border`              | `--destructive`                    | –                      | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`                | `--destructive` 20%                | `--destructive` 40%    | วงแหวนจางรอบช่องที่ไม่ถูกต้อง (ตกแต่ง)                 |

### Semantic tokens

| Token                    | โหมดสว่าง                     | โหมดมืด                       | ใช้ใน                                        |
| ------------------------ | ---------------------------- | ---------------------------- | ------------------------------------------- |
| `--primary`              | `oklch(0.553 0.195 38.402)`  | `oklch(0.705 0.187 47.604)`  | พื้น `default`, ตัวอักษร `link`                 |
| `--primary-foreground`   | `oklch(0.98 0.016 73.684)`   | `oklch(0.205 0.05 40)`       | ตัวอักษร `default`                            |
| `--secondary`            | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้น `secondary`                              |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)`  | `oklch(0.985 0 0)`           | ตัวอักษร `secondary`                          |
| `--background`           | `oklch(1 0 0)`               | `oklch(0.153 0.006 107.1)`   | พื้น `outline` (โหมดสว่าง)                     |
| `--border`               | `oklch(0.93 0.007 106.5)`    | `oklch(1 0 0 / 10%)`         | เส้นขอบ `outline`                            |
| `--muted`                | `oklch(0.966 0.005 106.5)`   | `oklch(0.286 0.016 107.4)`   | hover ของ `outline`, `ghost`                |
| `--foreground`           | `oklch(0.153 0.006 107.1)`   | `oklch(0.988 0.003 106.5)`   | ตัวอักษรตอน hover, ผสมสี hover ของ `secondary` |
| `--input`                | `oklch(0.93 0.007 106.5)`    | `oklch(1 0 0 / 15%)`         | hover ของ `outline` (โหมดมืด)                |
| `--destructive`          | `oklch(0.505 0.2 27.325)`    | `oklch(0.75 0.16 22.216)`    | `destructive`, สถานะไม่ถูกต้อง                 |
| `--ring`                 | `oklch(0.45 0.03 106.9)`     | `oklch(0.8 0.02 106.9)`      | เส้นขอบและวงแหวน focus                       |
| `--radius`               | `0.625rem`                   | –                            | มุมโค้ง (`--radius × 2.6` = 26px ทรงแคปซูล)    |

## Example

จาก story `WithIcons` ใน `Button.stories.tsx`:

```tsx
<div className="flex flex-wrap items-center gap-3">
  <Button>
    <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
    เพิ่มเงินสมทบ
  </Button>
  <Button variant="outline">
    ถัดไป
    <HugeiconsIcon
      icon={ArrowRight01Icon}
      strokeWidth={2}
      data-icon="inline-end"
    />
  </Button>
</div>
```

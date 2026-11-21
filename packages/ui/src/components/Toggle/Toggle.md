# Toggle (ปุ่มเปิด/ปิด)

## Purpose

ปุ่มที่กดค้างไว้ได้ บอกสถานะเปิดหรือปิดของตัวเลือกเดียว เช่น แสดงเส้นกราฟชุดหนึ่ง

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Toggle } from "labdsnov"

;<Toggle variant="outline" onPressedChange={setShowEmployer}>
  แสดงเงินสมทบจากนายจ้าง
</Toggle>
```

- ข้อความบนปุ่มบอก "สิ่งที่เปิด/ปิด" ไม่ใช่สถานะ (ไม่เขียนว่า "เปิดอยู่") สถานะบอกด้วยหน้าตาและ `aria-pressed`
- ปุ่มที่มีแต่ไอคอนต้องมี `aria-label`

## When to use

- เปิด/ปิดการแสดงผลที่เห็นผลทันที เช่น เส้นกราฟ ตัวกรอง
- ปุ่มจัดรูปแบบ เช่น ตัวหนา

## When not to use

| สถานการณ์                      | ใช้แทน         |
| ----------------------------- | ------------- |
| ตั้งค่าที่บันทึกถาวร (เปิดการแจ้งเตือน) | `Switch`      |
| เลือกหนึ่งจากหลายตัวเลือกที่อยู่ด้วยกัน  | `ToggleGroup` |
| ยืนยันในฟอร์มก่อนส่ง               | `Checkbox`    |
| สั่งการกระทำครั้งเดียว             | `Button`      |

## Props and variants

| Prop                          | ค่า                    | ค่าเริ่มต้น   | ความหมาย               |
| ----------------------------- | --------------------- | --------- | ---------------------- |
| `variant`                     | `default`, `outline`  | `default` | หน้าตา (ดูตารางด้านล่าง)   |
| `size`                        | `default`, `sm`, `lg` | `default` | สูง 36 / 32 / 40px      |
| `pressed` / `onPressedChange` | `boolean` / ฟังก์ชัน     | –         | ควบคุมสถานะจากภายนอก    |
| `defaultPressed`              | `boolean`             | `false`   | กดไว้ตั้งแต่แรก            |
| `disabled`                    | `boolean`             | `false`   | ปิดใช้งาน จางลง 50%      |
| `className`                   | class                 | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว |

| Variant   | หน้าตา              |
| --------- | ------------------ |
| `default` | ไม่มีเส้นขอบจนกว่าจะกด |
| `outline` | มีเส้นขอบจางตลอด     |

### States

- **ไม่ได้กด**: ตัวอักษรสีรอง
- **Hover**: พื้นจาง ตัวอักษรเข้ม
- **กดอยู่**: พื้นจาง เส้นขอบเข้ม (contrast 3:1) ตัวอักษรเข้ม
- **Focus จากคีย์บอร์ด**: วงแหวนทึบสี `--focus-ring` กด Space หรือ Enter เพื่อสลับ

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                     | โหมดสว่าง             | โหมดมืด              | ใช้ใน                                            |
| ------------------------- | -------------------- | ------------------- | ----------------------------------------------- |
| `--toggle-fg`             | `--muted-foreground` | –                   | ตัวอักษร/ไอคอนตอนไม่ได้กด                           |
| `--toggle-hover-bg`       | `--muted`            | –                   | พื้นตอน hover                                     |
| `--toggle-hover-fg`       | `--foreground`       | –                   | ตัวอักษรตอน hover                                 |
| `--toggle-outline-border` | `--border`           | –                   | ขอบ variant `outline` ตอนไม่ได้กด                 |
| `--toggle-pressed-border` | `--control-border`   | –                   | ขอบตอนกดอยู่ (contrast 3:1)                       |
| `--toggle-pressed-bg`     | `--muted`            | –                   | พื้นตอนกดอยู่ / เลือกอยู่                              |
| `--toggle-pressed-fg`     | `--foreground`       | –                   | ตัวอักษรตอนกดอยู่ / เลือกอยู่                          |
| `--focus-ring`            | `--ring`             | –                   | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px)   |
| `--invalid-border`        | `--destructive`      | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`          | `--destructive` 20%  | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง (ตกแต่ง)                 |

### Semantic tokens

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                        |
| -------------------- | -------------------------- | -------------------------- | --------------------------- |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | ตัวอักษรตอนไม่ได้กด             |
| `--ring`             | `oklch(0.45 0.03 106.9)`   | `oklch(0.8 0.02 106.9)`    | วงแหวน focus                |
| `--destructive`      | `oklch(0.505 0.2 27.325)`  | `oklch(0.75 0.16 22.216)`  | สถานะไม่ถูกต้อง                |
| `--border`           | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--control-border`   | `oklch(0.6 0.02 106.9)`    | `oklch(0.55 0.015 106.9)`  | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--foreground`       | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--muted`            | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | ผ่าน token ของคอมโพเนนต์ด้านบน |

## Example

จาก story `Variants` ใน `Toggle.stories.tsx`:

```tsx
<Toggle variant="outline">outline</Toggle>
<Toggle variant="outline" defaultPressed>outline (กดอยู่)</Toggle>
```

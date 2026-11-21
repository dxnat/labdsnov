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

| Prop                          | ค่า                | ค่าเริ่มต้น   | ความหมาย                              |
| ----------------------------- | ----------------- | --------- | ------------------------------------- |
| `size`                        | `default`, `sm`   | `default` | ขนาด (ดูตารางด้านล่าง)                   |
| `checked` / `onCheckedChange` | `boolean` / ฟังก์ชัน | –         | ควบคุมจากภายนอก                        |
| `defaultChecked`              | `boolean`         | `false`   | เปิดไว้ตั้งแต่แรก                          |
| `disabled`                    | `boolean`         | `false`   | ปิดใช้งาน จางลง 50%                     |
| `aria-invalid`                | `boolean`         | –         | ข้อมูลไม่ถูกต้อง เส้นขอบสีแดงและวงแหวนแดงจาง |
| `className`                   | class             | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว                |

| Size      | ขนาดราง | ใช้เมื่อ                     |
| --------- | ------- | ------------------------- |
| `default` | 44×20px | ค่าเริ่มต้น                   |
| `sm`      | 28×16px | TODO: ยังไม่ได้กำหนดการใช้งาน |

### States

- **ปิด**: รางสีเทาเข้ม (contrast 3:1) ปุ่มกลมอยู่ซ้าย
- **เปิด**: รางสีหลัก (ส้ม) ปุ่มกลมเลื่อนไปขวา
- **Focus จากคีย์บอร์ด**: วงแหวนทึบสี `--focus-ring` กด Space เพื่อสลับ

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                    | โหมดสว่าง               | โหมดมืด              | ใช้ใน                                            |
| ------------------------ | ---------------------- | ------------------- | ----------------------------------------------- |
| `--control-checked-bg`   | `--primary`            | –                   | พื้นและเส้นขอบตอนเลือก                              |
| `--switch-track`         | `--control-border`     | –                   | ราง ตอนปิด                                       |
| `--switch-thumb`         | `--background`         | `--foreground`      | ปุ่มเลื่อน ตอนปิด                                    |
| `--switch-thumb-checked` | `--primary-foreground` | –                   | ปุ่มเลื่อน ตอนเปิด                                   |
| `--focus-ring`           | `--ring`               | –                   | วงแหวน focus จากคีย์บอร์ด (ทึบ 2px)                 |
| `--invalid-border`       | `--destructive`        | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`         | `--destructive` 20%    | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง                         |

### Semantic tokens

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                        |
| ---------------------- | --------------------------- | --------------------------- | --------------------------- |
| `--primary`            | `oklch(0.553 0.195 38.402)` | `oklch(0.705 0.187 47.604)` | รางเมื่อเปิด                   |
| `--background`         | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | ปุ่มกลม (โหมดสว่าง)            |
| `--primary-foreground` | `oklch(0.98 0.016 73.684)`  | `oklch(0.205 0.05 40)`      | ปุ่มกลมเมื่อเปิด (โหมดมืด)        |
| `--foreground`         | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | ปุ่มกลมเมื่อปิด (โหมดมืด)         |
| `--ring`               | `oklch(0.45 0.03 106.9)`    | `oklch(0.8 0.02 106.9)`     | วงแหวน focus                |
| `--destructive`        | `oklch(0.505 0.2 27.325)`   | `oklch(0.75 0.16 22.216)`   | สถานะไม่ถูกต้อง                |
| `--control-border`     | `oklch(0.6 0.02 106.9)`     | `oklch(0.55 0.015 106.9)`   | ผ่าน token ของคอมโพเนนต์ด้านบน |

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

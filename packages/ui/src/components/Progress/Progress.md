# Progress (แถบความคืบหน้า)

## Purpose

แถบแสดงสัดส่วนที่ทำไปแล้วของงานหรือเป้าหมาย

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Progress, ProgressLabel, ProgressValue } from "labdsnov"

;<Progress value={62}>
  <ProgressLabel>เงินสมทบปีนี้เทียบกับเพดาน</ProgressLabel>
  <ProgressValue />
</Progress>
```

- `value` คือ 0–100 (เปลี่ยนช่วงได้ด้วย `min` / `max`)
- ถ้าไม่มี `ProgressLabel` ต้องใส่ `aria-label` ให้แถบ

## When to use

- ความคืบหน้าที่วัดได้ เช่น อัปโหลดเอกสาร ขั้นตอนการยื่นคำขอ
- สัดส่วนของเป้าหมาย เช่น เงินสมทบปีนี้เทียบกับเพดาน

## When not to use

- **รอโดยไม่รู้ว่านานเท่าไร**: ใช้ `Skeleton` สำหรับเนื้อหาที่โหลด (หรือ `value={null}` ถ้าต้องเป็นแถบ)
- **เปรียบเทียบตัวเลขหลายค่า**: ใช้ตารางหรือกราฟ TODO: ยังไม่มีคอมโพเนนต์กราฟ

## Props and variants

ไม่มี variant หรือ size แถบสูง 12px กว้างเต็มพื้นที่ ทรงแคปซูล

| Prop          | ค่า                         | ค่าเริ่มต้น     | ความหมาย                                                      |
| ------------- | -------------------------- | ----------- | ------------------------------------------------------------- |
| `value`       | ตัวเลข หรือ `null`           | –           | ค่าปัจจุบัน `null` = ไม่รู้ความคืบหน้า                                 |
| `min` / `max` | ตัวเลข                      | `0` / `100` | ช่วงของค่า                                                      |
| `format`      | `Intl.NumberFormatOptions` | –           | รูปแบบตัวเลขใน `ProgressValue` TODO: ยังไม่ได้ตรวจว่าใช้ภาษาไทยหรือไม่ |
| `aria-label`  | ข้อความ                     | –           | ชื่อของแถบ เมื่อไม่มี `ProgressLabel`                               |
| `className`   | class                      | –           | เช่น ความกว้าง                                                  |

- **ProgressLabel**: ชื่อของแถบ แสดงด้านซ้ายบน (14px, medium)
- **ProgressValue**: ตัวเลข เช่น "62%" แสดงด้านขวาบน (14px, สี muted)
- TODO: ยังไม่ได้กำหนดสีเมื่อเกินเป้าหรือใกล้เพดาน (เช่น สีเตือน)

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                    | โหมดมืด                     | ใช้ใน                    |
| -------------------- | --------------------------- | -------------------------- | ----------------------- |
| `--muted`            | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)` | ราง                     |
| `--primary`          | `oklch(0.553 0.195 38.402)` | `oklch(0.47 0.157 37.304)` | ส่วนที่ทำแล้ว               |
| `--muted-foreground` | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)` | ตัวเลข (`ProgressValue`) |

## Example

จาก story `Playground` ใน `Progress.stories.tsx`:

```tsx
<Progress value={62} className="w-80">
  <ProgressLabel>เงินสมทบปีนี้เทียบกับเพดาน</ProgressLabel>
  <ProgressValue />
</Progress>
```

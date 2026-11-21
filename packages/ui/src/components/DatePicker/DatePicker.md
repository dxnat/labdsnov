# DatePicker (ช่องเลือกวันที่)

## Purpose

ปุ่มในฟอร์มที่เปิดปฏิทินในกล่องลอยเพื่อเลือกวันที่หนึ่งวัน แสดงเป็นภาษาไทยและปี พ.ศ.

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { DatePicker, Label } from "labdsnov"

<Label htmlFor="start-date">วันที่เริ่มงาน</Label>
<DatePicker id="start-date" value={date} onValueChange={setDate} />
```

- แสดงวันที่แบบเดียวกับ `FundCard` เช่น "13 พ.ย. 2569"
- เลือกแล้วกล่องปิดเอง
- shadcn ไม่มีคอมโพเนนต์นี้ (มีแค่ตัวอย่างการประกอบ) ระบบนี้ประกอบจาก `Popover` + `Calendar` + `Button` ให้แล้ว

## When to use

- ช่องวันที่ในฟอร์ม เช่น วันที่เริ่มงาน วันที่ต้องการให้มีผล

## When not to use

- **ช่วงวันที่**: TODO: ยังไม่รองรับช่วง ใช้ `Calendar mode="range"` ใน `Popover` เอง
- **วันที่ไกลมาก เช่น วันเกิด**: ใช้ได้ แต่ต้องเปิด dropdown ปี (story `DateOfBirth`) TODO: ยังไม่มีช่องพิมพ์วันที่
- **แสดงวันที่อย่างเดียว**: ใช้ข้อความ

## Props and variants

| Prop                      | ค่า                   | ค่าเริ่มต้น   | ความหมาย                                                               |
| ------------------------- | -------------------- | --------- | ---------------------------------------------------------------------- |
| `value` / `onValueChange` | `Date` / ฟังก์ชัน       | –         | ควบคุมค่าจากภายนอก                                                       |
| `defaultValue`            | `Date`               | –         | วันที่เลือกไว้ตอนแรก                                                        |
| `placeholder`             | ข้อความ               | "เลือกวันที่" | แสดงเมื่อยังไม่เลือก (สี muted)                                              |
| `id`                      | ข้อความ               | –         | ผูกกับ `Label` ผ่าน `htmlFor`                                             |
| `disabled`                | `boolean`            | `false`   | ปิดใช้งาน                                                                |
| `aria-invalid`            | `boolean`            | –         | ข้อมูลไม่ถูกต้อง                                                            |
| `aria-describedby`        | id                   | –         | ผูกข้อความช่วยเหลือหรือข้อความผิดพลาด                                         |
| `calendarProps`           | props ของ `Calendar` | –         | เช่น `disabled` วันที่เลือกไม่ได้, `captionLayout="dropdown"`, `defaultMonth` |
| `className`               | class                | –         | ปกติกว้าง 240px ใส่ `w-full` ในฟอร์ม                                       |

หน้าตา: ปุ่ม outline ไอคอนปฏิทินด้านซ้าย ข้อความชิดซ้าย TODO: หน้าตาต่างจาก `Input` / `Select` (แบบ `filled`) ยังไม่ได้ตัดสินใจว่าจะทำให้เหมือนกันหรือไม่

## Tokens used

ใช้ token ของ `Button` (`outline`), `Popover` และ `Calendar`

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน         |
| -------------------- | --------------------------- | --------------------------- | ------------ |
| `--border`           | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นขอบปุ่ม     |
| `--background`       | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | พื้นปุ่ม         |
| `--muted-foreground` | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)`  | placeholder  |
| `--ring`             | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus |
| `--destructive`      | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง |

## Example

จาก story `DateOfBirth` ใน `DatePicker.stories.tsx`:

```tsx
<Label htmlFor="dp-dob">วันเกิด</Label>
<DatePicker
  id="dp-dob"
  calendarProps={{
    captionLayout: "dropdown",
    defaultMonth: new Date(1985, 0),
    startMonth: new Date(1940, 0),
    endMonth: new Date(2026, 10),
    disabled: { after: new Date(2026, 10, 13) },
  }}
/>
```

# Calendar (ปฏิทิน)

## Purpose

ตารางเดือนสำหรับเลือกวันที่หรือช่วงวันที่ เป็นภาษาไทยและปี พ.ศ.

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

ใช้ไลบรารี `react-day-picker` และ `date-fns` (ติดตั้งมากับ `labdsnov` แล้ว)

```tsx
"use client"

import { useState } from "react"
import { Calendar } from "labdsnov"

const [date, setDate] = useState<Date>()

<Calendar mode="single" selected={date} onSelect={setDate} />
```

- ภาษาไทยเป็นค่าเริ่มต้น: ชื่อเดือนและวันเป็นภาษาไทย ปีเป็น พ.ศ. (พฤศจิกายน 2569) เหมือน `FundCard`
- ในฟอร์ม ส่วนใหญ่ควรใช้ `DatePicker` ซึ่งเปิดปฏิทินนี้ในกล่องลอย

## When to use

- เลือกวันที่ที่ผู้ใช้ต้องเห็นบริบทของเดือน เช่น วันนัดหมาย
- เลือกช่วงวันที่ (`mode="range"`) เช่น ช่วงของใบแจ้งยอด
- แสดงปฏิทินในหน้าโดยตรง เช่น ในการ์ด

## When not to use

- **วันที่ในช่องฟอร์ม**: ใช้ `DatePicker`
- **วันเกิดหรือวันที่ที่รู้แน่นอน**: พิมพ์ง่ายกว่าเลือก TODO: ยังไม่มีช่องกรอกวันที่แบบพิมพ์ (วว/ดด/ปปปป) ระหว่างนี้ใช้ `captionLayout="dropdown"`

## Props and variants

| Prop                    | ค่า                                  | ค่าเริ่มต้น | ความหมาย                                                            |
| ----------------------- | ----------------------------------- | ------- | ------------------------------------------------------------------- |
| `mode`                  | `single`, `multiple`, `range`       | –       | เลือกวันเดียว หลายวัน หรือช่วง                                            |
| `selected` / `onSelect` | `Date` / ช่วง / ฟังก์ชัน                | –       | วันที่เลือกและฟังก์ชันเมื่อเลือก                                              |
| `defaultMonth`          | `Date`                              | เดือนนี้   | เดือนที่แสดงตอนแรก                                                     |
| `captionLayout`         | `label`, `dropdown`                 | `label` | `dropdown` = เลือกเดือนและปีจากรายการ (ใช้กับ `startMonth` / `endMonth`) |
| `numberOfMonths`        | ตัวเลข                               | `1`     | แสดงหลายเดือน (เรียงแนวนอนบนจอ 768px ขึ้นไป)                            |
| `disabled`              | วันที่ / เงื่อนไข เช่น `{ before: date }` | –       | วันที่เลือกไม่ได้                                                         |
| `showOutsideDays`       | `boolean`                           | `true`  | แสดงวันของเดือนก่อน/ถัดไปแบบจาง                                         |
| `showWeekNumber`        | `boolean`                           | `false` | แสดงเลขสัปดาห์                                                        |
| `buttonVariant`         | variant ของ `Button`                | `ghost` | หน้าตาปุ่มเลื่อนเดือน                                                     |
| `locale`                | locale ของ react-day-picker         | ไทย     | เปลี่ยนภาษา (ปียังเป็น พ.ศ. จนกว่าจะเปลี่ยน `formatters`)                   |

### พฤติกรรมที่มีให้แล้ว

- คีย์บอร์ด: ลูกศรเลื่อนวัน Enter/Space เลือก ปุ่ม "เดือนก่อนหน้า" / "เดือนถัดไป"
- โปรแกรมอ่านหน้าจออ่านวันเต็ม เช่น "วันศุกร์ที่ 13 พฤศจิกายน พ.ศ. 2569, วันนี้, เลือกแล้ว"
- วันนี้มีพื้นเทา วันที่เลือกเป็นสีหลัก (ส้ม) ช่วงตรงกลางพื้นเทา
- ในการ์ดหรือกล่องลอย พื้นหลังของปฏิทินโปร่งใส

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                        | โหมดสว่าง               | โหมดมืด | ใช้ใน                                          |
| ---------------------------- | ---------------------- | ------ | --------------------------------------------- |
| `--calendar-label-fg`        | `--muted-foreground`   | –      | ชื่อวันในสัปดาห์, เลขสัปดาห์                         |
| `--calendar-range-bg`        | `--muted`              | –      | พื้นวันกลางช่วง                                   |
| `--calendar-today-bg`        | `--muted`              | –      | พื้นวันนี้                                         |
| `--calendar-day-selected-bg` | `--primary`            | –      | พื้นวันที่เลือก (และต้น/ปลายช่วง)                     |
| `--calendar-day-selected-fg` | `--primary-foreground` | –      | ตัวอักษรวันที่เลือก                                 |
| `--focus-ring`               | `--ring`               | –      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px) |

### Semantic tokens

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                                 |
| ---------------------- | --------------------------- | --------------------------- | ------------------------------------ |
| `--background`         | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | พื้นปฏิทิน                               |
| `--primary`            | `oklch(0.553 0.195 38.402)` | `oklch(0.705 0.187 47.604)` | วันที่เลือก, ต้นและท้ายช่วง                 |
| `--primary-foreground` | `oklch(0.98 0.016 73.684)`  | `oklch(0.205 0.05 40)`      | ตัวเลขวันที่เลือก                         |
| `--muted`              | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | วันนี้, ตรงกลางช่วง                      |
| `--muted-foreground`   | `oklch(0.5 0.027 107.3)`    | `oklch(0.737 0.021 106.9)`  | ชื่อวัน, วันนอกเดือน, วันที่เลือกไม่ได้         |
| `--ring`               | `oklch(0.45 0.03 106.9)`    | `oklch(0.8 0.02 106.9)`     | วงแหวน focus ของวัน                   |
| `--radius`             | `0.625rem`                  | –                           | มุมโค้งของวัน (`--radius × 2.6` = 26px) |

## Example

จาก story `Range` ใน `Calendar.stories.tsx`:

```tsx
const [range, setRange] = useState<DateRange | undefined>({
  from: new Date(2026, 9, 20),
  to: new Date(2026, 10, 5),
})

<Calendar
  mode="range"
  numberOfMonths={2}
  defaultMonth={new Date(2026, 9, 1)}
  selected={range}
  onSelect={setRange}
  className="rounded-3xl border"
/>
```

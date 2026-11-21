# Chart (กราฟ)

## Purpose

กรอบสำหรับกราฟของ Recharts ที่ใส่สี ป้ายชื่อ tooltip และคำอธิบายสัญลักษณ์ตามระบบดีไซน์

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

ใช้ไลบรารี `recharts` (ติดตั้งมากับ `labdsnov` แล้ว) และ import ชนิดกราฟจาก `recharts` เอง

```tsx
"use client"

import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "labdsnov"

const config = {
  employer: { label: "เงินสมทบจากนายจ้าง", color: "var(--chart-3)" },
} satisfies ChartConfig

<ChartContainer config={config} role="img" aria-label="เงินสมทบรายเดือน มิถุนายน ถึง พฤศจิกายน 2569">
  <BarChart accessibilityLayer data={data}>
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="employer" fill="var(--color-employer)" />
  </BarChart>
</ChartContainer>
```

- **`config`**: แต่ละ key ของข้อมูลมี `label` (ภาษาไทย) และ `color` สีจะกลายเป็น `var(--color-<key>)` ให้ใช้ใน `fill` / `stroke`
- ใช้ token สีกราฟ (`--chart-1` ถึง `--chart-5`) หรือ token อื่น เพื่อให้โหมดมืดเปลี่ยนตามเอง (หรือใช้ `theme: { light, dark }`)
- **การเข้าถึง**: ใส่ `role="img"` และ `aria-label` ที่สรุปกราฟ และ `accessibilityLayer` ให้ Recharts ใช้คีย์บอร์ดดูข้อมูลได้ TODO: ข้อมูลสำคัญควรมีตารางหรือข้อความให้อ่านด้วย ยังไม่ได้ตัดสินใจรูปแบบ

## When to use

- แนวโน้มตามเวลา เช่น ยอดเงินรายเดือน (กราฟพื้นที่หรือเส้น)
- เปรียบเทียบจำนวน เช่น เงินสมทบแยกตามแหล่ง (กราฟแท่ง)

## When not to use

- **ตัวเลขเดียว**: แสดงตัวเลขใน `Card`
- **สัดส่วนของเป้าหมายเดียว**: ใช้ `Progress`
- **ค่าที่ต้องอ่านแม่นยำ**: ใช้ `Table`

## Props and variants

### ChartContainer

| Prop               | ค่า                  | ความหมาย                          |
| ------------------ | ------------------- | --------------------------------- |
| `config`           | `ChartConfig`       | **บังคับ** ป้ายชื่อและสีของแต่ละ key     |
| `className`        | class               | ขนาด ปกติอัตราส่วน 16:9 กว้างเต็มพื้นที่   |
| `initialDimension` | `{ width, height }` | ขนาดก่อนวัดพื้นที่จริง (ค่าเริ่มต้น 320×200) |

### ChartTooltipContent

| Prop            | ค่า                      | ค่าเริ่มต้น | ความหมาย                    |
| --------------- | ----------------------- | ------- | --------------------------- |
| `indicator`     | `dot`, `line`, `dashed` | `dot`   | สัญลักษณ์สีหน้าแต่ละค่า            |
| `hideLabel`     | `boolean`               | `false` | ซ่อนหัวข้อ (เช่น ชื่อเดือน)        |
| `hideIndicator` | `boolean`               | `false` | ซ่อนสัญลักษณ์สี                  |
| `formatter`     | ฟังก์ชัน                   | –       | จัดรูปแบบค่าเอง เช่น สกุลเงิน AUD |

ตัวเลขใน tooltip ใช้รูปแบบภาษาไทย (`toLocaleString("th-TH")`) TODO: ยังไม่ได้แสดงสกุลเงินให้อัตโนมัติ ใช้ `formatter`

### ChartLegendContent

คำอธิบายสัญลักษณ์จาก `config` ใช้กับ `<ChartLegend content={<ChartLegendContent />} />` (`hideIcon` ซ่อนไอคอน)

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                       |
| ---------------------- | --------------------------- | --------------------------- | -------------------------- |
| `--chart-1`            | `oklch(0.553 0.195 38.402)` | `oklch(0.705 0.187 47.604)` | สีกราฟชุดที่ 1: ส้ม (สีหลัก)      |
| `--chart-2`            | `oklch(0.52 0.1 190)`       | `oklch(0.72 0.11 190)`      | สีกราฟชุดที่ 2: เขียวอมฟ้า       |
| `--chart-3`            | `oklch(0.5 0.17 262)`       | `oklch(0.7 0.14 262)`       | สีกราฟชุดที่ 3: น้ำเงิน          |
| `--chart-4`            | `oklch(0.52 0.19 330)`      | `oklch(0.72 0.17 330)`      | สีกราฟชุดที่ 4: ชมพูม่วง         |
| `--chart-5`            | `oklch(0.55 0.15 135)`      | `oklch(0.78 0.17 135)`      | สีกราฟชุดที่ 5: เขียว           |
| `--muted-foreground`   | `oklch(0.5 0.027 107.3)`    | `oklch(0.737 0.021 106.9)`  | ตัวอักษรแกน, ชื่อใน tooltip    |
| `--border`             | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นตาราง (50%), เส้น cursor |
| `--muted`              | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | cursor ของกราฟแท่ง          |
| `--popover`            | `oklch(1 0 0)`              | `oklch(0.228 0.013 107.4)`  | พื้น tooltip                 |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษร tooltip             |

`--chart-1` ถึง `--chart-5` เป็นสีต่างโทนกัน (ส้มสีหลัก, เขียวอมฟ้า, น้ำเงิน, ชมพูม่วง, เขียว) แต่ละสีมี contrast อย่างน้อย 3:1 กับพื้นหน้าและพื้น `Card` ทั้งสองโหมด ใช้ตามลำดับ TODO: ยังไม่ได้ตรวจว่าแยกสีได้สำหรับผู้ที่มองเห็นสีผิดปกติ ควรมีป้ายชื่อหรือ legend เสมอ

## Example

จาก story `BalanceArea` ใน `Chart.stories.tsx`:

```tsx
const balanceConfig = {
  balance: { label: "ยอดเงิน (AUD)", color: "var(--primary)" },
} satisfies ChartConfig

<ChartContainer config={balanceConfig} role="img" aria-label="ยอดเงินในบัญชี มิถุนายน ถึง พฤศจิกายน 2569">
  <AreaChart accessibilityLayer data={balance}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
    <Area dataKey="balance" type="natural" fill="var(--color-balance)" fillOpacity={0.2} stroke="var(--color-balance)" />
  </AreaChart>
</ChartContainer>
```

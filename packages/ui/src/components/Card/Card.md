# Card (การ์ด)

## Purpose

พื้นที่ยกขึ้นมาที่รวมเนื้อหาเรื่องเดียวกัน เช่น สรุปยอดเงิน ผู้รับผลประโยชน์

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "labdsnov"

;<Card>
  <CardHeader>
    <CardTitle>ยอดเงินในบัญชี</CardTitle>
    <CardDescription>ณ วันที่ 13 พ.ย. 2569</CardDescription>
  </CardHeader>
  <CardContent>AU$84,215.37</CardContent>
</Card>
```

## When to use

- สรุปข้อมูลหนึ่งเรื่องบนหน้าแดชบอร์ด เช่น ยอดเงิน แผนการลงทุน ผู้รับผลประโยชน์
- กลุ่มเนื้อหาที่มีหัวข้อ เนื้อหา และปุ่มของตัวเอง

## When not to use

- **ตัวเลือกการลงทุน**: ใช้ `FundCard`
- **การ์ดที่กดเลือกได้**: ใช้การ์ดตัวเลือกของ `Field` (story `ChoiceCards`)
- **จัดระยะห่างอย่างเดียว ไม่มีความหมายว่าเป็นกลุ่ม**: ใช้ระยะห่างธรรมดา การ์ดซ้อนการ์ดทำให้หน้าดูหนัก
- **ข้อความแจ้งเตือน**: ใช้ `Alert`

## Anatomy

- **Card**
  - **CardHeader** → **CardTitle** + **CardDescription** + **CardAction** (มุมขวาบน)
  - **CardContent**
  - **CardFooter**: ปุ่มด้านล่าง

## Props and variants

| Prop        | ค่า              | ค่าเริ่มต้น   | ความหมาย                                  |
| ----------- | --------------- | --------- | ----------------------------------------- |
| `size`      | `default`, `sm` | `default` | ระยะขอบในและระยะห่างระหว่างส่วน: 24px / 16px |
| `className` | class           | –         | เช่น ความกว้าง                              |

- **CardTitle**: ตัวอักษรหัวข้อ 16px medium (`--font-heading`) เป็น `<div>` ไม่ใช่หัวข้อของหน้า TODO: ยังไม่ได้ตัดสินใจว่าควรให้เลือกระดับหัวข้อ (`h2`, `h3`) ได้หรือไม่
- **CardAction**: ปุ่มไอคอนหรือ `Badge` มุมขวาบนของหัวการ์ด ปุ่มไอคอนต้องมี `aria-label`
- ใส่ class `border-b` ที่ `CardHeader` หรือ `border-t` ที่ `CardFooter` เพื่อให้มีเส้นคั่นพร้อมระยะห่างที่ถูกต้อง
- รูปที่เป็นลูกตัวแรกของการ์ดจะชิดขอบบนและมุมโค้งตามการ์ด

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                         | โหมดมืด                     | ใช้ใน                            |
| -------------------- | -------------------------------- | -------------------------- | ------------------------------- |
| `--card`             | `oklch(1 0 0)`                   | `oklch(0.228 0.013 107.4)` | พื้นการ์ด                          |
| `--card-foreground`  | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)` | ตัวอักษร                          |
| `--muted-foreground` | `oklch(0.58 0.031 107.3)`        | `oklch(0.737 0.021 106.9)` | คำอธิบาย                         |
| `--foreground`       | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)` | เส้นขอบบาง ๆ (5% สว่าง, 10% มืด)   |
| `--radius`           | `0.625rem`                       | –                          | มุมโค้ง (`--radius × 2.6` = 26px) |
| `--font-heading`     | กำหนดโดยแอป (IBM Plex Sans Thai) | –                          | หัวข้อการ์ด                        |

## Example

จาก story `Playground` ใน `Card.stories.tsx`:

```tsx
<Card className="w-96">
  <CardHeader>
    <CardTitle>ยอดเงินในบัญชี</CardTitle>
    <CardDescription>ณ วันที่ 13 พ.ย. 2569</CardDescription>
    <CardAction>
      <Badge variant="success">ใช้งานอยู่</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-semibold tabular-nums">AU$84,215.37</p>
    <p className="text-muted-foreground">แผนสมดุล (Balanced)</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="outline">ดูธุรกรรม</Button>
    <Button>เพิ่มเงินสมทบ</Button>
  </CardFooter>
</Card>
```

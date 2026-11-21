# Popover (กล่องลอย)

## Purpose

กล่องลอยข้างปุ่มที่เปิดขึ้นเมื่อคลิก มีเนื้อหาหรือช่องกรอกสั้น ๆ โดยไม่บังทั้งหน้า

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "labdsnov"

;<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    ตั้งเป้าหมายการออม
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>เป้าหมายการออม</PopoverTitle>
      <PopoverDescription>ยอดเงินที่อยากมีเมื่อเกษียณ</PopoverDescription>
    </PopoverHeader>
    …
  </PopoverContent>
</Popover>
```

- ใส่ `PopoverTitle` เสมอ เป็นชื่อของกล่องสำหรับโปรแกรมอ่านหน้าจอ

## When to use

- รายละเอียดเพิ่มเติมหรือการตั้งค่าเล็ก ๆ ที่เกี่ยวกับปุ่มนั้น เช่น ตั้งเป้าหมาย ตัวกรองของตาราง
- คำอธิบายที่มีลิงก์หรือยาวเกิน `Tooltip`

## When not to use

| สถานการณ์                            | ใช้แทน          |
| ----------------------------------- | -------------- |
| คำอธิบายสั้นบรรทัดเดียว                  | `Tooltip`      |
| รายการคำสั่ง (แก้ไข / ลบ)              | `DropdownMenu` |
| เลือกค่าจากรายการ                     | `Select`       |
| ยืนยันการตัดสินใจหรือฟอร์มที่ต้องทำให้เสร็จก่อน | `Dialog`       |

## Props and variants

### PopoverContent

| Prop         | ค่า                               | ค่าเริ่มต้น  | ความหมาย                 |
| ------------ | -------------------------------- | -------- | ------------------------ |
| `side`       | `top`, `right`, `bottom`, `left` | `bottom` | ด้านที่ลอยออกจาก trigger    |
| `align`      | `start`, `center`, `end`         | `center` | การจัดแนวตาม trigger      |
| `sideOffset` | ตัวเลข (px)                       | `4`      | ระยะห่างจาก trigger       |
| `className`  | class                            | –        | เช่น ความกว้าง (ปกติ 288px) |

### Popover

| Prop                    | ค่า                | ค่าเริ่มต้น | ความหมาย             |
| ----------------------- | ----------------- | ------- | -------------------- |
| `open` / `onOpenChange` | `boolean` / ฟังก์ชัน | –       | ควบคุมการเปิดจากภายนอก |
| `defaultOpen`           | `boolean`         | `false` | เปิดไว้ตั้งแต่แรก         |

### พฤติกรรมที่มีให้แล้ว

- คลิก trigger เพื่อเปิด/ปิด กด Escape หรือคลิกนอกกล่องเพื่อปิด แล้วโฟกัสกลับไปที่ trigger
- หน้าตาเหมือนกล่องของ `Dialog` (พื้น popover มุมโค้ง เงา) ระยะขอบใน 16px

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                            |
| ---------------------- | -------------------------- | -------------------------- | ------------------------------- |
| `--popover`            | `oklch(1 0 0)`             | `oklch(0.228 0.013 107.4)` | พื้นกล่อง                          |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ตัวอักษร                          |
| `--muted-foreground`   | `oklch(0.58 0.031 107.3)`  | `oklch(0.737 0.021 106.9)` | คำอธิบาย                         |
| `--foreground`         | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | เส้นขอบบาง ๆ (5% สว่าง, 10% มืด)   |
| `--radius`             | `0.625rem`                 | –                          | มุมโค้ง (`--radius × 2.2` = 22px) |

## Example

จาก story `Playground` ใน `Popover.stories.tsx`:

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    ตั้งเป้าหมายการออม
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>เป้าหมายการออม</PopoverTitle>
      <PopoverDescription>ยอดเงินที่อยากมีเมื่อเกษียณ</PopoverDescription>
    </PopoverHeader>
    <div className="grid gap-2">
      <Label htmlFor="popover-goal">จำนวนเงิน (AUD)</Label>
      <Input id="popover-goal" type="number" defaultValue={500000} />
    </div>
  </PopoverContent>
</Popover>
```

# Drawer (แผงเลื่อน)

## Purpose

แผงที่เลื่อนขึ้นจากขอบจอ (ปกติจากด้านล่าง) และปัดปิดได้ เหมาะกับมือถือ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "labdsnov"

;<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>
    เพิ่มเงินสมทบ
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>เพิ่มเงินสมทบ</DrawerTitle>
      <DrawerDescription>เงินจะเข้าบัญชีภายใน 3 วันทำการ</DrawerDescription>
    </DrawerHeader>
    …
    <DrawerFooter>
      <Button>ยืนยัน</Button>
      <DrawerClose render={<Button variant="outline" />}>ยกเลิก</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

- ใส่ `DrawerTitle` เสมอ เป็นชื่อของแผงสำหรับโปรแกรมอ่านหน้าจอ

## When to use

- งานสั้น ๆ บนมือถือ เช่น ฟอร์มสั้น ตัวเลือก ตัวกรอง (ตอบ TODO "drawer" ใน `Dialog.md`)
- แผงด้านข้าง (`swipeDirection="right"`) เช่น ตัวกรองของตาราง

## When not to use

| สถานการณ์                    | ใช้แทน          |
| --------------------------- | -------------- |
| ยืนยันการกระทำที่ย้อนกลับไม่ได้     | `AlertDialog`  |
| บนจอกว้างที่กล่องกลางจอเหมาะกว่า | `Dialog`       |
| เมนูคำสั่ง                     | `DropdownMenu` |

TODO: ยังไม่ได้ตัดสินใจว่าจะสลับ Dialog (จอกว้าง) กับ Drawer (มือถือ) อัตโนมัติหรือไม่ (shadcn มีตัวอย่าง "Responsive")

## Props and variants

### Drawer

| Prop                    | ค่า                            | ค่าเริ่มต้น | ความหมาย                                            |
| ----------------------- | ----------------------------- | ------- | --------------------------------------------------- |
| `swipeDirection`        | `down`, `up`, `left`, `right` | `down`  | ทิศที่ปัดเพื่อปิด และขอบที่แผงเลื่อนออกมา (`down` = จากด้านล่าง) |
| `showSwipeHandle`       | `boolean`                     | `false` | แถบจับสำหรับปัด                                        |
| `open` / `onOpenChange` | `boolean` / ฟังก์ชัน             | –       | ควบคุมการเปิด/ปิด                                      |
| `modal`                 | `boolean`                     | `true`  | มีฉากหลังมืด และหน้าด้านหลังกดไม่ได้                        |
| `snapPoints`            | รายการความสูง                  | –       | จุดหยุดระหว่างปัด TODO: ยังไม่มีตัวอย่าง                     |

### ขนาด

- จากด้านล่าง/บน: กว้างเต็มจอ สูงตามเนื้อหา สูงสุดเท่าจอลบ 96px
- จากด้านข้าง: กว้าง 75% บนมือถือ และ 384px บนจอ 640px ขึ้นไป
- ห่างขอบจอ 8px มุมโค้ง 26px

### ส่วนอื่น ๆ

`DrawerHeader` (หัวข้อกึ่งกลางบนมือถือ ชิดซ้ายบนจอ 768px ขึ้นไป), `DrawerFooter` (ปุ่มเรียงลงมา), `DrawerClose` (ปิด ใช้ `render={<Button … />}`)

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                         | โหมดมืด                     | ใช้ใน                            |
| ---------------------- | -------------------------------- | -------------------------- | ------------------------------- |
| `--popover`            | `oklch(1 0 0)`                   | `oklch(0.228 0.013 107.4)` | พื้นแผง                           |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)` | ตัวอักษร                          |
| `--muted-foreground`   | `oklch(0.5 0.027 107.3)`         | `oklch(0.737 0.021 106.9)` | คำอธิบาย                         |
| `--muted`              | `oklch(0.966 0.005 106.5)`       | `oklch(0.286 0.016 107.4)` | แถบจับ                           |
| `--border`             | `oklch(0.93 0.007 106.5)`        | `oklch(1 0 0 / 10%)`       | เส้นขอบ (โหมดมืด)                 |
| `--radius`             | `0.625rem`                       | –                          | มุมโค้ง (`--radius × 2.6` = 26px) |
| `--font-heading`       | กำหนดโดยแอป (IBM Plex Sans Thai) | –                          | หัวข้อ                            |

ฉากหลังสีดำ 30% และเบลอ จางลงตามระยะที่ปัด

## Example

จาก story `Playground` ใน `Drawer.stories.tsx`:

```tsx
<Drawer swipeDirection="down" showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>
    เพิ่มเงินสมทบ
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>เพิ่มเงินสมทบ</DrawerTitle>
      <DrawerDescription>เงินจะเข้าบัญชีภายใน 3 วันทำการ</DrawerDescription>
    </DrawerHeader>
    <div className="grid gap-2 p-4">
      <Label htmlFor="drawer-amount">จำนวนเงิน (AUD)</Label>
      <Input id="drawer-amount" type="number" placeholder="0.00" />
    </div>
    <DrawerFooter>
      <Button>ยืนยัน</Button>
      <DrawerClose render={<Button variant="outline" />}>ยกเลิก</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

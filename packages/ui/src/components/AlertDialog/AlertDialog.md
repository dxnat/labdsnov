# AlertDialog (กล่องยืนยัน)

## Purpose

กล่อง modal ที่ต้องตอบก่อนทำต่อ ใช้ยืนยันการกระทำที่ย้อนกลับไม่ได้

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "labdsnov"

;<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    ลบผู้รับผลประโยชน์
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>ลบผู้รับผลประโยชน์?</AlertDialogTitle>
      <AlertDialogDescription>การลบนี้ไม่สามารถย้อนกลับได้</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
      <AlertDialogAction
        variant="destructive"
        onClick={async () => {
          await remove()
          setOpen(false)
        }}
      >
        ลบ
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

- **`AlertDialogAction` ไม่ปิดกล่องเอง**: ปิดเองหลังทำงานสำเร็จ (ควบคุม `open` ในไฟล์ที่มี `"use client"`) ถ้าทำไม่สำเร็จ กล่องยังเปิดอยู่ให้ลองใหม่
- `AlertDialogCancel` ปิดกล่องเสมอ เป็นปุ่ม outline

## When to use

- ยืนยันการกระทำที่ย้อนกลับไม่ได้ เช่น ลบผู้รับผลประโยชน์ ยกเลิกคำขอถอนเงิน (ตอบคำถามที่ค้างใน `Dialog.md`)
- ข้อความที่ผู้ใช้ต้องรับรู้และตอบก่อนทำต่อ

## When not to use

| สถานการณ์                  | ใช้แทน                               |
| ------------------------- | ----------------------------------- |
| การกระทำที่ย้อนกลับได้         | ทำทันทีแล้วแสดง `toast` พร้อมปุ่ม "เลิกทำ" |
| ฟอร์มหรือเนื้อหาที่ปิดได้ตามสะดวก | `Dialog`                            |
| ข้อมูลที่ไม่ต้องตัดสินใจ          | `Alert` หรือ `toast`                 |

## Props and variants

### AlertDialogContent

| Prop        | ค่า              | ค่าเริ่มต้น   | ความหมาย                                                                                           |
| ----------- | --------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `size`      | `default`, `sm` | `default` | `default`: กว้าง 448px บนจอ 640px ขึ้นไป ข้อความชิดซ้าย `sm`: กว้าง 320px ข้อความกึ่งกลาง ปุ่มสองปุ่มเท่ากันวางคู่กัน |
| `className` | class           | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว                                                                             |

บนจอแคบทุกขนาดกว้าง 320px ข้อความกึ่งกลาง

### ส่วนอื่น ๆ

| ส่วน / Prop                            | ความหมาย                                                  |
| ------------------------------------- | --------------------------------------------------------- |
| `AlertDialog` `open` / `onOpenChange` | ควบคุมการเปิด/ปิด                                            |
| `AlertDialogMedia`                    | ไอคอนในวงกลมสีเทา 64px เหนือหัวข้อ (`default`: อยู่ซ้ายบนจอกว้าง) |
| `AlertDialogAction` `variant`         | ปุ่มยืนยัน รับ props ของ `Button` ใช้ `destructive` สำหรับการลบ  |
| `AlertDialogCancel` `variant`         | ค่าเริ่มต้น `outline`                                         |

### ต่างจาก Dialog อย่างไร

- ไม่มีปุ่ม "ปิด" มุมขวาบน และคลิกนอกกล่องไม่ปิด ต้องเลือกปุ่มใดปุ่มหนึ่ง (หรือกด Escape)
- โปรแกรมอ่านหน้าจอประกาศเป็น `alertdialog`
- เปิดแล้วโฟกัสไปที่ปุ่มแรก จึงควรวาง "ยกเลิก" ก่อน ตามที่ WAI-ARIA แนะนำให้โฟกัสปุ่มที่ปลอดภัยที่สุด
- ปุ่มใน footer เรียงเหมือน Dialog: จอกว้างแถวชิดขวา จอแคบปุ่มสุดท้ายอยู่บนสุด

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                         | โหมดมืด                     | ใช้ใน                                  |
| ---------------------- | -------------------------------- | -------------------------- | ------------------------------------- |
| `--popover`            | `oklch(1 0 0)`                   | `oklch(0.228 0.013 107.4)` | พื้นกล่อง                                |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)` | ตัวอักษร                                |
| `--muted-foreground`   | `oklch(0.58 0.031 107.3)`        | `oklch(0.737 0.021 106.9)` | คำอธิบาย                               |
| `--muted`              | `oklch(0.966 0.005 106.5)`       | `oklch(0.286 0.016 107.4)` | วงกลมของ `AlertDialogMedia`           |
| `--foreground`         | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)` | เส้นขอบบาง ๆ รอบกล่อง (5% สว่าง, 10% มืด) |
| `--radius`             | `0.625rem`                       | –                          | มุมโค้ง (`--radius × 2.6` = 26px)       |
| `--font-heading`       | กำหนดโดยแอป (IBM Plex Sans Thai) | –                          | หัวข้อ (18px, medium)                   |

ฉากหลังสีดำ 30% และเบลอ เหมือน `Dialog`

## Example

จาก story `SmallWithMedia` ใน `AlertDialog.stories.tsx`:

```tsx
<AlertDialogContent size="sm">
  <AlertDialogHeader>
    <AlertDialogMedia>
      <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
    </AlertDialogMedia>
    <AlertDialogTitle>ลบเอกสาร?</AlertDialogTitle>
    <AlertDialogDescription>ไฟล์ที่ลบแล้วกู้คืนไม่ได้</AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
    <AlertDialogAction variant="destructive">ลบ</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
```

# Skeleton (โครงร่างระหว่างโหลด)

## Purpose

กล่องสีเทากะพริบเบา ๆ แทนเนื้อหาที่กำลังโหลด ให้เห็นโครงหน้าก่อนข้อมูลมาถึง

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Skeleton } from "labdsnov"

;<div role="status" aria-label="กำลังโหลดยอดเงิน">
  <Skeleton className="h-4 w-48" />
</div>
```

- กำหนดขนาดด้วย `className` ให้เท่ากับเนื้อหาจริง หน้าจะไม่กระโดดเมื่อข้อมูลมาถึง
- ครอบกลุ่ม skeleton ด้วย `role="status"` และ `aria-label` ที่บอกว่ากำลังโหลดอะไร เพราะ Skeleton ไม่มีข้อความให้โปรแกรมอ่านหน้าจออ่าน

## When to use

- เนื้อหาที่รู้รูปร่างล่วงหน้ากำลังโหลด เช่น การ์ดกองทุน ยอดเงิน ตารางธุรกรรม

## When not to use

- **การทำงานที่รู้ความคืบหน้า** (อัปโหลดไฟล์): ใช้ `Progress`
- **การกระทำของผู้ใช้ที่รอผล** (กดบันทึก): ปิดปุ่มและใส่ `Spinner` (ดู [Spinner](../Spinner/Spinner.md))
- **โหลดเร็วมาก** (ต่ำกว่าประมาณ 300ms): skeleton กะพริบแวบเดียวดูรบกวน TODO: ยังไม่ได้กำหนดเวลาหน่วงก่อนแสดง

## Props and variants

ไม่มี variant หรือ size มุมโค้ง 18px ปรับรูปร่างด้วย `className` เช่น `rounded-full` สำหรับรูปโปรไฟล์

| Prop        | ค่า    | ความหมาย                      |
| ----------- | ----- | ----------------------------- |
| `className` | class | **ต้องใส่** ขนาด เช่น `h-4 w-48` |

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token      | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                            |
| ---------- | -------------------------- | -------------------------- | ------------------------------- |
| `--muted`  | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | สีกล่อง                           |
| `--radius` | `0.625rem`                 | –                          | มุมโค้ง (`--radius × 1.8` = 18px) |

## Example

จาก story `FundCardLoading` ใน `Skeleton.stories.tsx`:

```tsx
<div
  className="flex w-64 flex-col gap-3"
  role="status"
  aria-label="กำลังโหลดตัวเลือกการลงทุน"
>
  <Skeleton className="aspect-square w-full rounded-3xl" />
  <Skeleton className="h-3 w-32" />
  <Skeleton className="h-4 w-48" />
  <Skeleton className="h-5 w-24" />
</div>
```

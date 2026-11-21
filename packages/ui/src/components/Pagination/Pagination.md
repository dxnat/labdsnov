# Pagination (การแบ่งหน้า)

## Purpose

ลิงก์เลขหน้าสำหรับรายการยาวที่แบ่งเป็นหลายหน้า เช่น ธุรกรรมย้อนหลัง

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "labdsnov"

;<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

- ทุกหน้ามี URL ของตัวเอง (`href`) ผู้ใช้กดย้อนกลับหรือแชร์ลิงก์ได้
- คำนวณว่าแสดงเลขหน้าไหนเองในแอป Pagination เป็นแค่หน้าตา

## When to use

- รายการที่ยาวเกินจะแสดงในหน้าเดียว และผู้ใช้อาจต้องกลับไปหน้าเดิม เช่น ตารางธุรกรรม

## When not to use

- **รายการสั้น** (ไม่เกินประมาณ 25 แถว): แสดงทั้งหมด
- **ฟีดที่อ่านต่อเนื่อง**: TODO: ยังไม่ได้ตัดสินใจว่าจะใช้ปุ่ม "โหลดเพิ่ม" หรือไม่
- **ขั้นตอนของฟอร์ม**: ใช้ปุ่ม "ถัดไป" / "ย้อนกลับ" (`Button`)

## Props and variants

| ส่วน / Prop                              | ความหมาย                                                                           |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| `Pagination`                            | `<nav>` ชื่อ "การแบ่งหน้า" สำหรับโปรแกรมอ่านหน้าจอ อยู่กึ่งกลาง                               |
| `PaginationLink` `href`                 | ลิงก์ไปหน้านั้น หน้าตาเหมือนปุ่ม ghost ขนาด `icon` (36px)                                   |
| `PaginationLink` `isActive`             | หน้าปัจจุบัน: ปุ่ม outline และ `aria-current="page"`                                     |
| `PaginationLink` `size`                 | ขนาดปุ่ม (ค่าของ `Button`) ค่าเริ่มต้น `icon`                                             |
| `PaginationPrevious` / `PaginationNext` | ลิงก์ "ก่อนหน้า" / "ถัดไป" พร้อมลูกศร บนจอแคบกว่า 640px เหลือแค่ลูกศร เปลี่ยนข้อความได้ด้วย `text` |
| `PaginationEllipsis`                    | "…" ระหว่างเลขหน้า                                                                   |

- TODO: ลิงก์ "ก่อนหน้า" ในหน้าแรก (และ "ถัดไป" ในหน้าสุดท้าย) ยังไม่มีสถานะปิดใช้งาน ซ่อนเองในแอป
- ต่างจาก shadcn: ลิงก์เป็น `<a>` ธรรมดาที่แต่งเหมือนปุ่ม โปรแกรมอ่านหน้าจอจึงอ่านว่าเป็นลิงก์ (ของ shadcn ถูกอ่านว่าเป็นปุ่ม)

## Tokens used

ใช้ token ของ `Button` (variant `ghost` และ `outline`)

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token          | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน           |
| -------------- | -------------------------- | -------------------------- | -------------- |
| `--muted`      | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | hover ของลิงก์   |
| `--border`     | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | เส้นขอบหน้าปัจจุบัน |
| `--background` | `oklch(1 0 0)`             | `oklch(0.153 0.006 107.1)` | พื้นหน้าปัจจุบัน     |
| `--ring`       | `oklch(0.737 0.021 106.9)` | `oklch(0.58 0.031 107.3)`  | วงแหวน focus   |

## Example

จาก story `Playground` ใน `Pagination.stories.tsx`:

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#page-1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#page-1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#page-2" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#page-3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#page-12">12</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#page-3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

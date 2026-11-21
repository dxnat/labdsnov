# Spinner (ไอคอนกำลังโหลด)

## Purpose

ไอคอนหมุน บอกว่ากำลังรอผลของการกระทำ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Button, Spinner } from "labdsnov"

;<Button disabled>
  <Spinner data-icon="inline-start" />
  กำลังบันทึก…
</Button>
```

- โปรแกรมอ่านหน้าจออ่านว่า "กำลังโหลด" เปลี่ยนได้ด้วย `aria-label`
- สีและขนาดตามข้อความรอบ ๆ ปรับขนาดด้วย `className` เช่น `size-6`

## When to use

- ปุ่มที่กดแล้วต้องรอผล เช่น บันทึก ส่งคำขอ: ปิดปุ่ม (`disabled`) ใส่ Spinner และเปลี่ยนข้อความเป็น "กำลัง…"
- พื้นที่เล็ก ๆ ที่กำลังโหลด เช่น ในป้ายสถานะ

## When not to use

| สถานการณ์                          | ใช้แทน                   |
| --------------------------------- | ----------------------- |
| เนื้อหาที่รู้รูปร่างกำลังโหลด (การ์ด ตาราง) | `Skeleton`              |
| งานที่รู้ความคืบหน้า (อัปโหลด)           | `Progress`              |
| Spinner อย่างเดียวกลางหน้า ไม่มีข้อความ | ใส่ข้อความบอกว่ากำลังทำอะไร |

## Props and variants

ไม่มี variant หรือ size ขนาดเริ่มต้น 16px หมุนตลอด

| Prop         | ค่า     | ความหมาย                           |
| ------------ | ------ | ---------------------------------- |
| `aria-label` | ข้อความ | ค่าเริ่มต้น "กำลังโหลด"                 |
| `className`  | class  | ขนาดหรือสี เช่น `size-6 text-primary` |

TODO: ปุ่มยังไม่มี prop `loading` ที่ใส่ Spinner และปิดปุ่มให้อัตโนมัติ ต้องประกอบเองตามตัวอย่าง

## Tokens used

ไม่ใช้ token โดยตรง สีตามข้อความ (`currentColor`)

## Example

จาก story `InButton` ใน `Spinner.stories.tsx` (บางส่วน):

```tsx
<Button disabled>
  <Spinner data-icon="inline-start" />
  กำลังบันทึก…
</Button>
```

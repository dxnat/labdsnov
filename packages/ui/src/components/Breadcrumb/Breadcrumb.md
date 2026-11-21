# Breadcrumb (เส้นทางนำทาง)

## Purpose

แถวลิงก์บอกว่าหน้าปัจจุบันอยู่ตรงไหน และย้อนกลับไปหน้าก่อน ๆ ได้

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "labdsnov"

;<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/" />}>หน้าแรก</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>ผู้รับผลประโยชน์</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

- ลิงก์ของ Next.js ใช้ `render={<Link href="…" />}` ลิงก์ธรรมดาใช้ `href`
- รายการสุดท้ายเป็น `BreadcrumbPage` (ข้อความ ไม่ใช่ลิงก์)

## When to use

- หน้าที่อยู่ลึกกว่า 2 ระดับ เช่น บัญชีของฉัน › ใบแจ้งยอด › ปี 2569

## When not to use

- **หน้าระดับแรก**: ไม่ต้องมี
- **ขั้นตอนตามลำดับ**: TODO: ยังไม่มีคอมโพเนนต์ stepper
- **เมนูหลักของเว็บ**: ใช้ `NavigationMenu`

## Props and variants

ไม่มี variant หรือ size ตัวอักษร 14px สี muted หน้าปัจจุบันสีปกติ

| ส่วน                   | ความหมาย                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| `Breadcrumb`          | `<nav>` ชื่อ "เส้นทางนำทาง" สำหรับโปรแกรมอ่านหน้าจอ                                       |
| `BreadcrumbLink`      | ลิงก์ (`href` หรือ `render`) เข้มขึ้นเมื่อ hover มีวงแหวน focus                              |
| `BreadcrumbPage`      | หน้าปัจจุบัน (`aria-current="page"`)                                                    |
| `BreadcrumbSeparator` | ลูกศร › ระหว่างรายการ ใส่ children เพื่อใช้สัญลักษณ์อื่น เช่น "/"                               |
| `BreadcrumbEllipsis`  | "…" แทนรายการกลางที่ซ่อนไว้ TODO: ยังไม่มีตัวอย่างการเปิดดูรายการที่ซ่อน (เช่น ด้วย `DropdownMenu`) |

บนจอแคบรายการขึ้นบรรทัดใหม่ได้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token          | โหมดสว่าง | โหมดมืด | ใช้ใน                            |
| -------------- | -------- | ------ | ------------------------------- |
| `--focus-ring` | `--ring` | –      | วงแหวน focus จากคีย์บอร์ด (ทึบ 2px) |

### Semantic tokens

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                   |
| -------------------- | -------------------------- | -------------------------- | ---------------------- |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | ลิงก์และตัวคั่น             |
| `--foreground`       | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | หน้าปัจจุบัน, ลิงก์ตอน hover |
| `--ring`             | `oklch(0.45 0.03 106.9)`   | `oklch(0.8 0.02 106.9)`    | วงแหวน focus           |

## Example

จาก story `Collapsed` ใน `Breadcrumb.stories.tsx`:

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#home">หน้าแรก</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#statements">ใบแจ้งยอด</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>ปี 2569</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

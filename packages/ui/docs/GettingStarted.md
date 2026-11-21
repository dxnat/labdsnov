# Getting started (เริ่มต้นใช้งาน)

## Purpose

ตั้งค่าแอป Next.js ให้ใช้ `labdsnov` ได้ ทำครั้งเดียวต่อแอป แล้ว import คอมโพเนนต์ไหนก็ได้

## Requirements

- React 19 และ `react-dom` 19
- Next.js 16 (`FundCard` ใช้ `next/image`)
- Tailwind ในแอป **ไม่จำเป็น** `labdsnov/styles.css` มีสไตล์ครบในตัว

## 1. Install

```bash
pnpm add labdsnov
```

TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ ด้วย `"labdsnov": "workspace:*"` ใน `package.json` ของแอป

ไลบรารีที่คอมโพเนนต์ใช้ (`@base-ui/react`, `sonner`, `react-day-picker`, `date-fns`, `input-otp`, `recharts`, Hugeicons) ติดตั้งมาด้วยเอง

## 2. Root layout

```tsx
// app/layout.tsx
import { IBM_Plex_Sans_Thai } from "next/font/google"
import { Toaster, TooltipProvider } from "labdsnov"
import "labdsnov/styles.css"

const heading = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={heading.variable}>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}
```

- **`import "labdsnov/styles.css"`** ครั้งเดียว: มี token สี มุมโค้ง ค่าเริ่มต้นของ `body` และสไตล์ของทุกคอมโพเนนต์ ถ้าแอปมี CSS ของตัวเอง ให้ import ไฟล์ของแอป **หลัง** บรรทัดนี้
- **`--font-heading`**: ฟอนต์หัวข้อ แอปต้องโหลดเอง (ดู [Typography](./Typography.md)) ไม่กำหนด = หัวข้อใช้ฟอนต์เบราว์เซอร์
- **`lang="th"`**: ให้โปรแกรมอ่านหน้าจออ่านเป็นภาษาไทย
- **`<TooltipProvider>`** ครั้งเดียว ถ้าใช้ `Tooltip`
- **`<Toaster />`** ครั้งเดียว ถ้าใช้ `toast()`

## 3. Dark mode

ใส่ class `dark` ที่ `<html>` แล้วทุก token เปลี่ยนเป็นค่าโหมดมืดเอง เช่น ใช้ `next-themes`:

```tsx
import { ThemeProvider } from "next-themes"

;<html lang="th" className={heading.variable} suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  </body>
</html>
```

`Toaster` ตาม class `dark` เอง ไม่ต้องตั้งค่าเพิ่ม

## 4. Use components

```tsx
import { Button, Field, FieldLabel, Input } from "labdsnov"

<Field>
  <FieldLabel htmlFor="email">อีเมล</FieldLabel>
  <Input id="email" type="email" placeholder="name@example.com" />
</Field>
<Button type="submit">บันทึก</Button>
```

- **อ่าน `<Name>.md` ของคอมโพเนนต์ก่อนใช้** (`src/components/<Name>/<Name>.md` หรือหน้า Docs ใน Storybook) บอกว่าใช้เมื่อไหร่ ไม่ใช้เมื่อไหร่ และมี props อะไร
- คอมโพเนนต์ที่ใช้ hook มี `"use client"` อยู่แล้ว ใช้ใน Server Component ได้เลย แต่ props ที่เป็นฟังก์ชัน (เช่น `onClick`) ต้องส่งจาก Client Component
- ข้อความในคอมโพเนนต์ (เช่น ปุ่มปิด "ปิด", "เลือกวันที่") เป็นภาษาไทย วันที่เป็นปี พ.ศ.

## 5. Customizing

| ต้องการ                      | ทำอย่างไร                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| ปรับเฉพาะจุดครั้งเดียว           | `className` บนคอมโพเนนต์ (ชนะสไตล์ของคอมโพเนนต์เสมอ) ถ้าใช้ซ้ำหลายที่ ให้ขอ variant ใหม่แทน            |
| เปลี่ยนสีทั้งระบบ                | เปลี่ยน semantic token เช่น `--primary` ใน CSS ของแอป (ดู [Colors](./Colors.md))                 |
| เปลี่ยนสีของคอมโพเนนต์เดียวทั้งแอป | เปลี่ยน component token เช่น `--button-primary-bg` (ดู [Component tokens](./ComponentTokens.md)) |
| เปลี่ยนความโค้งทั้งระบบ          | เปลี่ยน `--radius` (ดู [Radius](./Radius.md))                                                   |

สีที่เปลี่ยนต้องยังผ่าน contrast ตาม [Accessibility](./Accessibility.md)

## Using Tailwind in the app

- `styles.css` ไม่มี utility class ของ Tailwind ถ้าแอปใช้ Tailwind v4 ของตัวเอง utility ใน `className` จะชนะสไตล์ของคอมโพเนนต์ เพราะคอมโพเนนต์อยู่ใน layer `components`
- utility ที่ใช้ชื่อ token (เช่น `bg-primary`, `text-muted-foreground`, `rounded-4xl`) ต้องมี `@theme inline` ที่ map token ในแอปเอง (แบบเดียวกับ `src/styles/theme.css`) ไม่อย่างนั้นใช้ `bg-(--primary)` หรือ `var(--primary)` แทน
- TODO: ยังไม่ได้ส่งไฟล์ `@theme` สำหรับ Tailwind ของแอปไปกับแพ็กเกจ

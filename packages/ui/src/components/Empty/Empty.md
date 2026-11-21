# Empty (สถานะว่าง)

## Purpose

ข้อความแทนรายการหรือหน้าที่ยังไม่มีข้อมูล บอกเหตุผลและสิ่งที่ทำต่อได้

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "labdsnov"

;<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} />
    </EmptyMedia>
    <EmptyTitle>ยังไม่มีผู้รับผลประโยชน์</EmptyTitle>
    <EmptyDescription>ระบุผู้รับผลประโยชน์เพื่อให้เงินไปถึงคนที่คุณต้องการ</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>เพิ่มผู้รับผลประโยชน์</Button>
  </EmptyContent>
</Empty>
```

- ใส่ `className="border"` เพื่อให้มีกรอบเส้นประ (ไม่ใส่ = ไม่มีกรอบ)

## When to use

- รายการที่ยังว่าง เช่น ยังไม่มีผู้รับผลประโยชน์ ยังไม่มีเอกสาร
- ผลการค้นหาหรือกรองที่ไม่พบข้อมูล ("ไม่พบธุรกรรม")

## When not to use

- **กำลังโหลด**: ใช้ `Skeleton` (อย่าแสดง "ไม่มีข้อมูล" ก่อนโหลดเสร็จ)
- **ข้อผิดพลาด** (โหลดไม่สำเร็จ): ใช้ `Alert` แบบ `destructive`
- **รายการว่างใน `Select` หรือ `Combobox`**: ใช้ `ComboboxEmpty`

## Props and variants

ไม่มี variant หรือ size ของทั้งกล่อง เนื้อหาอยู่กึ่งกลาง ระยะขอบใน 48px

| ส่วน / Prop             | ความหมาย                                                       |
| ---------------------- | -------------------------------------------------------------- |
| `EmptyMedia` `variant` | `default`: ไอคอนหรือภาพตามขนาดจริง `icon`: ไอคอนในสี่เหลี่ยมเทา 40px |
| `EmptyTitle`           | หัวข้อ (18px, medium) บอกว่าว่างอะไร                               |
| `EmptyDescription`     | บอกเหตุผลหรือสิ่งที่ทำได้ต่อ ลิงก์ในข้อความขีดเส้นใต้                        |
| `EmptyContent`         | ปุ่มหรือการกระทำต่อไป                                              |

- เขียนหัวข้อให้บอกสถานะ ("ยังไม่มีเอกสาร") ไม่ใช่ "ไม่มีข้อมูล"
- TODO: หัวข้อเป็น `<div>` ไม่ใช่หัวข้อของหน้า ยังเลือกระดับหัวข้อไม่ได้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                         | โหมดมืด                     | ใช้ใน                        |
| -------------------- | -------------------------------- | -------------------------- | --------------------------- |
| `--muted`            | `oklch(0.966 0.005 106.5)`       | `oklch(0.286 0.016 107.4)` | พื้นไอคอน (`icon`)            |
| `--foreground`       | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)` | ไอคอน (`icon`)              |
| `--muted-foreground` | `oklch(0.58 0.031 107.3)`        | `oklch(0.737 0.021 106.9)` | คำอธิบาย                     |
| `--border`           | `oklch(0.93 0.007 106.5)`        | `oklch(1 0 0 / 10%)`       | กรอบเส้นประ (เมื่อใส่ `border`) |
| `--font-heading`     | กำหนดโดยแอป (IBM Plex Sans Thai) | –                          | หัวข้อ                        |

## Example

จาก story `NoBorder` ใน `Empty.stories.tsx`:

```tsx
<Empty className="w-96">
  <EmptyHeader>
    <EmptyTitle>ไม่พบธุรกรรม</EmptyTitle>
    <EmptyDescription>ลองเปลี่ยนช่วงวันที่</EmptyDescription>
  </EmptyHeader>
</Empty>
```

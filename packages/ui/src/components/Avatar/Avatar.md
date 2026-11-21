# Avatar (รูปโปรไฟล์)

## Purpose

รูปโปรไฟล์ทรงกลม แสดงอักษรย่อแทนเมื่อไม่มีรูปหรือโหลดรูปไม่ได้

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "labdsnov"

;<Avatar>
  <AvatarImage src={member.photoUrl} alt="สมชาย ใจดี" />
  <AvatarFallback>สจ</AvatarFallback>
</Avatar>
```

- ใส่ `AvatarFallback` เสมอ แสดงระหว่างโหลดรูปและเมื่อรูปเสีย
- อักษรย่อภาษาไทย: ตัวแรกของชื่อและนามสกุล เช่น "สมชาย ใจดี" → "สจ" TODO: ยังไม่ได้กำหนดกฎอักษรย่อ (สระ วรรณยุกต์ ชื่ออังกฤษ)

## When to use

- แสดงตัวตนของสมาชิก ผู้รับผลประโยชน์ หรือเจ้าหน้าที่ ข้างชื่อ

## When not to use

- **รูปที่เป็นเนื้อหา** (ภาพกองทุน เอกสาร): ใช้รูปปกติ
- **แทนชื่อ**: Avatar ไม่บอกว่าเป็นใคร ต้องมีชื่อข้าง ๆ หรือ `alt` ของรูป

## Props and variants

| Prop        | ค่า                    | ค่าเริ่มต้น   | ความหมาย               |
| ----------- | --------------------- | --------- | ---------------------- |
| `size`      | `sm`, `default`, `lg` | `default` | 24px / 32px / 40px     |
| `className` | class                 | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว |

| ส่วน                | ความหมาย                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| `AvatarImage`      | รูป (`src`, `alt`) ตัดเป็นวงกลม                                                    |
| `AvatarFallback`   | อักษรย่อบนพื้นเทา                                                                   |
| `AvatarBadge`      | จุดสีหลักมุมขวาล่าง บอกสถานะ TODO: ยังไม่ได้กำหนดความหมายของจุด และต้องมีข้อความบอกสถานะด้วย |
| `AvatarGroup`      | เรียง Avatar ซ้อนกัน                                                               |
| `AvatarGroupCount` | วงกลม "+2" ท้ายกลุ่ม ขนาดตาม Avatar ในกลุ่ม                                          |

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                           |
| -------------------- | --------------------------- | --------------------------- | ------------------------------ |
| `--muted`            | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | พื้นอักษรย่อ, วงกลม "+2"           |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`    | `oklch(0.737 0.021 106.9)`  | อักษรย่อ                         |
| `--border`           | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นขอบบาง ๆ รอบรูป              |
| `--primary`          | `oklch(0.553 0.195 38.402)` | `oklch(0.705 0.187 47.604)` | จุด `AvatarBadge`               |
| `--background`       | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | วงแหวนรอบ Avatar ในกลุ่มและรอบจุด |

## Example

จาก story `Group` ใน `Avatar.stories.tsx`:

```tsx
<AvatarGroup aria-label="ผู้รับผลประโยชน์ 4 คน">
  <Avatar>
    <AvatarFallback>สห</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>สศ</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+2</AvatarGroupCount>
</AvatarGroup>
```

# Kbd (ปุ่มคีย์บอร์ด)

## Purpose

แสดงปุ่มบนคีย์บอร์ดหรือคีย์ลัด เช่น ⌘ K ในข้อความ เมนู หรือ Tooltip

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Kbd, KbdGroup } from "labdsnov"

;<p>
  กด{" "}
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>{" "}
  เพื่อค้นหากองทุน
</p>
```

- ปุ่มที่กดพร้อมกันใส่ใน `KbdGroup`
- เขียนชื่อปุ่มตามที่พิมพ์บนคีย์บอร์ด (`Enter`, `Esc`, `⌘`) ไม่แปลเป็นภาษาไทย
- TODO: ยังไม่ได้กำหนดว่าจะแสดง ⌘ (macOS) หรือ Ctrl (Windows) ตามเครื่องของผู้ใช้อย่างไร

## When to use

- บอกคีย์ลัดใน Tooltip, เมนู หรือข้อความช่วยเหลือ
- คำใบ้ในช่องค้นหา (ใน `InputGroup`)

## When not to use

- **เป็นปุ่มให้กด**: ใช้ `Button` (Kbd กดไม่ได้)
- **โค้ดหรือค่าที่ผู้ใช้ต้องพิมพ์ตาม เช่น เลขสมาชิก**: ใช้ `<code>` หรือข้อความปกติ

## Props and variants

ไม่มี variant หรือ size สูง 22px ตัวอักษร 12px มุมโค้ง 10px

- **ใน Tooltip**: สีกลับตาม Tooltip อัตโนมัติ
- **ใน InputGroup**: พื้นเปลี่ยนตามช่องกรอก
- `Kbd` และ `KbdGroup` เป็น `<kbd>` ใส่ `className` ได้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token              | โหมดสว่าง             | โหมดมืด             | ใช้ใน                     |
| ------------------ | -------------------- | ------------------ | ------------------------ |
| `--kbd-bg`         | `--muted`            | –                  | พื้นปุ่มคีย์บอร์ด               |
| `--kbd-fg`         | `--muted-foreground` | –                  | ตัวอักษรปุ่มคีย์บอร์ด           |
| `--kbd-tooltip-bg` | `--tooltip-fg` 20%   | `--tooltip-fg` 12% | พื้นปุ่มคีย์บอร์ดใน Tooltip     |
| `--kbd-tooltip-fg` | `--tooltip-fg`       | –                  | ตัวอักษรปุ่มคีย์บอร์ดใน Tooltip |

### Semantic tokens

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                        |
| -------------------- | -------------------------- | -------------------------- | --------------------------- |
| `--muted`            | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | ผ่าน token ของคอมโพเนนต์ด้านบน |

## Example

จาก story `Shortcut` ใน `Kbd.stories.tsx`:

```tsx
<p className="text-sm">
  กด{" "}
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>{" "}
  เพื่อค้นหากองทุน
</p>
```

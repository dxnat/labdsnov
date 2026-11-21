# ButtonGroup (กลุ่มปุ่ม)

## Purpose

รวมปุ่มคำสั่งที่เกี่ยวข้องกัน (และช่องกรอกหรือ Select) ให้เป็นแถบเดียว มุมด้านในเป็นเหลี่ยมและใช้เส้นขอบร่วมกัน

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Button, ButtonGroup } from "labdsnov"

;<ButtonGroup aria-label="ดาวน์โหลดรายงาน">
  <Button variant="outline">PDF</Button>
  <Button variant="outline">Excel</Button>
</ButtonGroup>
```

- ใส่ `aria-label` ที่กลุ่ม บอกว่าปุ่มในกลุ่มทำอะไรร่วมกัน
- ปุ่มที่ไม่มีเส้นขอบ (`default`, `secondary`) ต้องคั่นด้วย `ButtonGroupSeparator`
- ใส่ได้: `Button`, `Input`, `Select`, `InputGroup`, `ButtonGroupText` และ `ButtonGroup` ซ้อน (เว้นระยะ 8px)

## When to use

- คำสั่งที่เป็นชุดเดียวกัน เช่น ดาวน์โหลดหลายรูปแบบ ขยาย/ย่อ
- ปุ่มหลักคู่กับปุ่มเปิดเมนูตัวเลือกเพิ่ม (split button)
- ช่องกรอกที่มีหน่วยและปุ่มติดกัน เช่น "AU$" + จำนวนเงิน + "เพิ่ม"

## When not to use

| สถานการณ์                      | ใช้แทน                  |
| ----------------------------- | ---------------------- |
| เลือกหนึ่งตัวเลือกที่ค้างไว้           | `ToggleGroup`          |
| ปุ่มยืนยัน/ยกเลิกท้ายฟอร์มหรือ Dialog | `Button` แยกกันมีระยะห่าง |
| หน่วยหรือไอคอนในช่องกรอกอย่างเดียว | `InputGroup`           |

## Props and variants

### ButtonGroup

| Prop          | ค่า                       | ค่าเริ่มต้น      | ความหมาย                     |
| ------------- | ------------------------ | ------------ | ---------------------------- |
| `orientation` | `horizontal`, `vertical` | `horizontal` | แถวหรือคอลัมน์                  |
| `aria-label`  | ข้อความ                   | –            | ชื่อของกลุ่มสำหรับโปรแกรมอ่านหน้าจอ |

### ส่วนอื่น ๆ

- `ButtonGroupText`: ข้อความหรือหน่วยที่กดไม่ได้ เช่น "AU$" พื้นจาง มีเส้นขอบ (`render` เปลี่ยน element ได้ เช่น `<Label />`)
- `ButtonGroupSeparator`: เส้นคั่นระหว่างปุ่มที่ไม่มีเส้นขอบ (`orientation` ค่าเริ่มต้น `vertical`)

ปุ่มที่โฟกัสจากคีย์บอร์ดยกขึ้นด้านบน วงแหวน focus จึงไม่ถูกปุ่มข้าง ๆ บัง

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                      | โหมดสว่าง       | โหมดมืด | ใช้ใน                     |
| -------------------------- | -------------- | ------ | ------------------------ |
| `--button-group-text-bg`   | `--muted`      | –      | พื้น `ButtonGroupText`     |
| `--button-group-text-fg`   | `--foreground` | –      | ตัวอักษร `ButtonGroupText` |
| `--button-group-separator` | `--input`      | –      | เส้นคั่นระหว่างปุ่ม            |

### Semantic tokens

| Token          | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                        |
| -------------- | -------------------------- | -------------------------- | --------------------------- |
| `--border`     | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | เส้นขอบ `ButtonGroupText`    |
| `--foreground` | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--input`      | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 15%)`       | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--muted`      | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | ผ่าน token ของคอมโพเนนต์ด้านบน |

## Example

จาก story `WithInput` ใน `ButtonGroup.stories.tsx`:

```tsx
<ButtonGroup aria-label="เงินสมทบเพิ่มเติม">
  <ButtonGroupText>AU$</ButtonGroupText>
  <Input
    aria-label="จำนวนเงิน"
    type="number"
    placeholder="0.00"
    className="w-36"
  />
  <Button>เพิ่ม</Button>
</ButtonGroup>
```

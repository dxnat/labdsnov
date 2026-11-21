# InputGroup (ช่องกรอกพร้อมส่วนเสริม)

## Purpose

ช่องกรอกที่มีไอคอน ข้อความ หรือปุ่มอยู่ในกรอบเดียวกัน เช่น "AU$" หน้าจำนวนเงิน หรือปุ่มคัดลอก

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Label } from "labdsnov"

<Label htmlFor="amount">จำนวนเงินสมทบเพิ่มเติม</Label>
<InputGroup>
  <InputGroupInput id="amount" type="number" placeholder="0.00" />
  <InputGroupAddon>
    <InputGroupText>AU$</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

- ใช้ `InputGroupInput` / `InputGroupTextarea` แทน `Input` / `Textarea` ในกลุ่ม (ไม่มีพื้นและกรอบของตัวเอง)
- วาง `InputGroupAddon` ไว้หลังช่องกรอกใน code ได้เสมอ ตำแหน่งที่แสดงกำหนดด้วย `align`

## When to use

- หน่วยหรือสกุลเงินที่ติดกับค่า เช่น "AU$", "%"
- ไอคอนค้นหาในช่องค้นหา
- ปุ่มที่ทำงานกับค่าในช่อง เช่น แสดง/ซ่อนรหัสผ่าน คัดลอก
- ช่องข้อความที่มีแถวด้านล่าง เช่น ตัวนับตัวอักษร

## When not to use

- **ปุ่มส่งฟอร์ม**: วาง `Button` นอกช่อง
- **ป้ายชื่อของช่อง**: ใช้ `Label` / `FieldLabel` ไม่ใช่ข้อความในกลุ่ม
- **เลือกจากรายการ**: ใช้ `Select` หรือ `Combobox`

## Props and variants

หน้าตาเหมือน `Input` แบบ `filled` สูง 36px เมื่อช่องกรอกได้โฟกัส ทั้งกลุ่มมีวงแหวน เมื่อช่องกรอกมี `aria-invalid` ทั้งกลุ่มเป็นสีแดง

### InputGroupAddon `align`

| Align          | ตำแหน่ง                     |
| -------------- | -------------------------- |
| `inline-start` | ซ้ายของช่องกรอก (ค่าเริ่มต้น)    |
| `inline-end`   | ขวาของช่องกรอก              |
| `block-start`  | แถวด้านบน (กลุ่มสูงขึ้นเป็นแนวตั้ง) |
| `block-end`    | แถวด้านล่าง เช่น ตัวนับตัวอักษร   |

คลิกที่ addon (นอกปุ่ม) แล้วโฟกัสไปที่ช่องกรอก

### InputGroupButton `size`

| Size           | ขนาด                      |
| -------------- | ------------------------- |
| `xs` (ค่าเริ่มต้น) | สูง 24px มีข้อความ           |
| `sm`           | ตามขนาด `sm` ของ `Button` |
| `icon-xs`      | 24×24px ไอคอนอย่างเดียว     |
| `icon-sm`      | 32×32px ไอคอนอย่างเดียว     |

ปุ่มเป็น `ghost` โดยค่าเริ่มต้น ปุ่มไอคอนอย่างเดียวต้องมี `aria-label`

- **InputGroupText**: ข้อความหรือไอคอนสี muted เช่น "AU$"
- TODO: ยังไม่มีสถานะปิดใช้งานของทั้งกลุ่มที่ตั้งให้อัตโนมัติ ต้องใส่ `data-disabled="true"` ที่ `InputGroup` เอง

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                                              |
| -------------------- | --------------------------- | --------------------------- | ------------------------------------------------- |
| `--input`            | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นกลุ่ม (50%)                                       |
| `--muted-foreground` | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)`  | ข้อความและไอคอนใน addon                            |
| `--ring`             | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus ของทั้งกลุ่ม                             |
| `--destructive`      | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง                                      |
| `--radius`           | `0.625rem`                  | –                           | มุมโค้ง (`--radius × 2.6` = 26px, มี textarea: 18px) |

## Example

จาก story `WithButtons` ใน `InputGroup.stories.tsx`:

```tsx
<InputGroup className="w-80">
  <InputGroupInput defaultValue="123 456 789" aria-label="เลขสมาชิก" readOnly />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="แสดง">
      <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
    </InputGroupButton>
    <InputGroupButton size="icon-xs" aria-label="คัดลอก">
      <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

# RadioGroup (ตัวเลือกแบบเลือกได้ข้อเดียว)

## Purpose

เลือกได้หนึ่งข้อจากรายการสั้น ๆ ที่เห็นทุกตัวเลือกพร้อมกัน

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Label, RadioGroup, RadioGroupItem } from "labdsnov"

;<RadioGroup defaultValue="balanced" aria-label="แผนการลงทุน">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="balanced" id="plan-balanced" />
    <Label htmlFor="plan-balanced">สมดุล (Balanced)</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="growth" id="plan-growth" />
    <Label htmlFor="plan-growth">เติบโตสูง (High Growth)</Label>
  </div>
</RadioGroup>
```

- ตั้งชื่อให้ทั้งกลุ่ม: `aria-label` หรือวางใน `FieldSet` ที่มี `FieldLegend` (ดู [Field](../Field/Field.md))
- ตัวเลือกที่มีคำอธิบายยาว ทำเป็นการ์ดให้เลือกได้ตาม story `ChoiceCards` ของ Field

## When to use

- เลือกหนึ่งข้อจาก 2–5 ตัวเลือก ที่ผู้ใช้ควรเห็นทุกตัวเลือกก่อนตัดสินใจ เช่น แผนการลงทุน ความถี่ของใบแจ้งยอด

## When not to use

| สถานการณ์               | ใช้แทน                   |
| ---------------------- | ----------------------- |
| ตัวเลือกมาก (เกิน 5–7 ข้อ) | `Select`                |
| เลือกได้หลายข้อ           | `Checkbox`              |
| เปิด/ปิดอย่างเดียว         | `Switch` หรือ `Checkbox` |
| สลับมุมมองของเนื้อหา       | `Tabs`                  |

TODO: ยังไม่ได้กำหนดจำนวนตัวเลือกสูงสุดก่อนเปลี่ยนไปใช้ `Select`

## Props and variants

ไม่มี variant หรือ size วงกลมขนาด 16px ตัวเลือกเรียงลงมาห่างกัน 12px

### RadioGroup

| Prop                      | ค่า              | ค่าเริ่มต้น | ความหมาย                      |
| ------------------------- | --------------- | ------- | ----------------------------- |
| `defaultValue`            | value ของตัวเลือก | –       | ตัวเลือกที่เลือกไว้ตอนแรก           |
| `value` / `onValueChange` | value / ฟังก์ชัน   | –       | ควบคุมจากภายนอก                |
| `name`                    | ข้อความ          | –       | ชื่อที่ส่งไปกับฟอร์ม                 |
| `disabled`                | `boolean`       | `false` | ปิดใช้งานทั้งกลุ่ม                  |
| `aria-label`              | ข้อความ          | –       | ชื่อของกลุ่ม เมื่อไม่มี `FieldLegend` |
| `className`               | class           | –       | ปรับหน้าตาเฉพาะจุดครั้งเดียว        |

### RadioGroupItem

| Prop           | ค่า        | ความหมาย                        |
| -------------- | --------- | ------------------------------- |
| `value`        | ข้อความ    | **บังคับ** ค่าของตัวเลือกนี้           |
| `id`           | ข้อความ    | ผูกกับ `Label` ผ่าน `htmlFor`      |
| `disabled`     | `boolean` | ปิดใช้งานตัวเลือกนี้ จางลง 50%        |
| `aria-invalid` | `boolean` | ข้อมูลไม่ถูกต้อง เส้นขอบและวงแหวนสีแดง |

### พฤติกรรมที่มีให้แล้ว

- กด Tab แล้วโฟกัสไปที่ตัวเลือกที่เลือกอยู่ ลูกศรขึ้น/ลงเลื่อนและเลือกตัวเลือกถัดไปทันที

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                   |
| ---------------------- | --------------------------- | --------------------------- | ---------------------- |
| `--input`              | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นวงกลมที่ไม่ได้เลือก (90%) |
| `--primary`            | `oklch(0.553 0.195 38.402)` | `oklch(0.47 0.157 37.304)`  | พื้นวงกลมที่เลือก           |
| `--primary-foreground` | `oklch(0.98 0.016 73.684)`  | `oklch(0.98 0.016 73.684)`  | จุดตรงกลาง              |
| `--ring`               | `oklch(0.737 0.021 106.9)`  | `oklch(0.58 0.031 107.3)`   | วงแหวน focus           |
| `--destructive`        | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | สถานะไม่ถูกต้อง           |

## Example

จาก story `Playground` ใน `RadioGroup.stories.tsx`:

```tsx
<RadioGroup defaultValue="balanced" aria-label="แผนการลงทุน" className="w-72">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="conservative" id="plan-conservative" />
    <Label htmlFor="plan-conservative">อนุรักษ์นิยม (Conservative)</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="balanced" id="plan-balanced" />
    <Label htmlFor="plan-balanced">สมดุล (Balanced)</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="growth" id="plan-growth" />
    <Label htmlFor="plan-growth">เติบโตสูง (High Growth)</Label>
  </div>
</RadioGroup>
```

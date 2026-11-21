# Accordion (ส่วนพับเก็บได้)

## Purpose

รายการหัวข้อที่กดเปิดดูเนื้อหาได้ทีละส่วน เช่น คำถามที่พบบ่อย

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "labdsnov"

;<Accordion>
  <AccordionItem value="withdraw">
    <AccordionTrigger>ฉันถอนเงินได้เมื่อไร?</AccordionTrigger>
    <AccordionContent>โดยทั่วไปถอนได้เมื่อถึงอายุเกษียณ…</AccordionContent>
  </AccordionItem>
</Accordion>
```

## When to use

- คำถามที่พบบ่อย หรือรายละเอียดรองที่ผู้ใช้ส่วนใหญ่ไม่ต้องอ่านทั้งหมด
- ลดความยาวหน้าบนมือถือ เมื่อแต่ละส่วนอ่านแยกกันได้

## When not to use

| สถานการณ์               | ใช้แทน                        |
| ---------------------- | ---------------------------- |
| ข้อมูลสำคัญที่ทุกคนต้องเห็น    | แสดงในหน้าเลย                 |
| สลับมุมมองของเนื้อหาเดียวกัน | `Tabs`                       |
| ขั้นตอนที่ต้องทำตามลำดับ     | TODO: ยังไม่มีคอมโพเนนต์ stepper |

## Props and variants

ไม่มี variant หรือ size กรอบมุมโค้ง 18px ส่วนที่เปิดมีพื้นเทาจาง

| ส่วน / Prop                            | ค่าเริ่มต้น | ความหมาย                                   |
| ------------------------------------- | ------- | ------------------------------------------ |
| `Accordion` `multiple`                | `false` | เปิดได้หลายส่วนพร้อมกัน (ปกติเปิดส่วนใหม่ ส่วนเดิมปิด) |
| `Accordion` `defaultValue`            | –       | ส่วนที่เปิดไว้ตอนแรก เช่น `["fees"]`             |
| `Accordion` `value` / `onValueChange` | –       | ควบคุมจากภายนอก                             |
| `AccordionItem` `value`               | –       | ชื่อของส่วน                                   |
| `AccordionItem` `disabled`            | `false` | เปิดไม่ได้ จางลง 50%                          |

### พฤติกรรมที่มีให้แล้ว

- หัวข้อเป็นปุ่มอยู่ในหัวข้อ (heading) กด Enter หรือ Space เพื่อเปิด/ปิด ลูกศรด้านขวาชี้ลงเมื่อปิด ชี้ขึ้นเมื่อเปิด
- เนื้อหาเลื่อนเปิด/ปิดแบบมีแอนิเมชัน
- เพิ่มวงแหวน focus ให้หัวข้อ (shadcn ไม่มี) เพื่อให้เห็นโฟกัสจากคีย์บอร์ด
- TODO: ระดับของหัวข้อ (`h3`) ยังเปลี่ยนตามโครงสร้างหน้าไม่ได้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token          | โหมดสว่าง | โหมดมืด | ใช้ใน                                          |
| -------------- | -------- | ------ | --------------------------------------------- |
| `--focus-ring` | `--ring` | –      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px) |

### Semantic tokens

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                            |
| -------------------- | -------------------------- | -------------------------- | ------------------------------- |
| `--border`           | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | กรอบและเส้นคั่น                    |
| `--muted`            | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | พื้นส่วนที่เปิด (50%)                 |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | ลูกศร                            |
| `--ring`             | `oklch(0.45 0.03 106.9)`   | `oklch(0.8 0.02 106.9)`    | วงแหวน focus                    |
| `--radius`           | `0.625rem`                 | –                          | มุมโค้ง (`--radius × 1.8` = 18px) |

## Example

จาก story `Playground` ใน `Accordion.stories.tsx` (สองส่วน):

```tsx
<Accordion className="w-96">
  <AccordionItem value="withdraw">
    <AccordionTrigger>ฉันถอนเงินได้เมื่อไร?</AccordionTrigger>
    <AccordionContent>
      โดยทั่วไปถอนได้เมื่อถึงอายุเกษียณตามกฎหมายและหยุดทำงานแล้ว
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="fees">
    <AccordionTrigger>ค่าธรรมเนียมคิดอย่างไร?</AccordionTrigger>
    <AccordionContent>หักจากบัญชีทุกเดือน 0.15% ของยอดเงิน</AccordionContent>
  </AccordionItem>
</Accordion>
```

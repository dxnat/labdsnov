# Collapsible (ส่วนพับได้)

## Purpose

ซ่อนและแสดงเนื้อหาส่วนเดียวด้วยปุ่ม เช่น รายละเอียดค่าธรรมเนียม

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "labdsnov"

;<Collapsible>
  <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
    ดูรายละเอียด
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
```

- ปุ่มไม่มีหน้าตาของตัวเอง ใช้ `render={<Button … />}`
- ข้อความบนปุ่มบอกว่าจะเห็นอะไร เช่น "ดูรายละเอียด" ปุ่มบอกสถานะเปิด/ปิดผ่าน `aria-expanded` เอง
- ไอคอนลูกศรหมุนได้ด้วย `[&[data-panel-open]_svg]:rotate-180` บนปุ่ม (ดู story)

## When to use

- รายละเอียดเสริมที่คนส่วนใหญ่ไม่ต้องอ่าน เช่น การคำนวณค่าธรรมเนียม
- ตัวเลือกขั้นสูงในฟอร์ม

## When not to use

| สถานการณ์                      | ใช้แทน        |
| ----------------------------- | ------------ |
| หลายส่วนเรียงกัน เช่น คำถามที่พบบ่อย | `Accordion`  |
| ข้อมูลที่ผู้ใช้ต้องเห็นเพื่อตัดสินใจ       | แสดงในหน้าเลย |
| เนื้อหาลอยทับหน้า                 | `Popover`    |

## Props and variants

ไม่มี variant หรือ size

| Prop                    | ใช้กับ                 | ความหมาย                                                            |
| ----------------------- | -------------------- | ------------------------------------------------------------------- |
| `open` / `onOpenChange` | `Collapsible`        | ควบคุมการเปิดจากภายนอก                                                |
| `defaultOpen`           | `Collapsible`        | เปิดไว้ตั้งแต่แรก                                                        |
| `disabled`              | `Collapsible`        | ปิดใช้งานปุ่ม                                                           |
| `keepMounted`           | `CollapsibleContent` | เก็บเนื้อหาไว้ในหน้าตอนปิด (ค้นหาด้วย Ctrl+F ได้เมื่อใช้คู่กับ `hiddenUntilFound`) |

- ความสูงของเนื้อหาเลื่อนเปิด/ปิดใน 200ms
- **คีย์บอร์ด**: Tab ไปที่ปุ่ม Enter หรือ Space เพื่อเปิด/ปิด

## Tokens used

ไม่มีสีของตัวเอง สีมาจาก `Button` ที่ใช้เป็นปุ่ม และเนื้อหาที่ใส่

## Example

จาก story `Playground` ใน `Collapsible.stories.tsx`:

```tsx
<Collapsible className="w-80">
  <div className="flex items-center justify-between gap-2">
    <p className="text-sm font-medium">ค่าธรรมเนียมรายปี 0.85%</p>
    <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
      ดูรายละเอียด
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent>
    <ul className="mt-2 grid gap-1 rounded-2xl bg-muted p-3 text-sm">
      <li>ค่าบริหารกองทุน 0.60%</li>
      <li>ค่าดูแลบัญชี 0.20%</li>
      <li>ค่าประกันภัย 0.05%</li>
    </ul>
  </CollapsibleContent>
</Collapsible>
```

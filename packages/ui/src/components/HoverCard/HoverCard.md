# HoverCard (การ์ดตัวอย่าง)

## Purpose

การ์ดลอยที่แสดงตัวอย่างข้อมูลเมื่อชี้เมาส์หรือโฟกัสที่ลิงก์ เช่น สรุปกองทุนบนชื่อกองทุน

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "labdsnov"

;<HoverCard>
  <HoverCardTrigger href="/funds/balanced">กองทุนสมดุล</HoverCardTrigger>
  <HoverCardContent>…</HoverCardContent>
</HoverCard>
```

- `HoverCardTrigger` เป็นลิงก์ (`<a>`) **ต้องมี `href`** ไปหน้าที่มีข้อมูลครบ เพราะบนมือถือไม่มี hover
- เนื้อหาในการ์ดเป็นข้อมูลเสริมเท่านั้น ข้อมูลเดียวกันต้องหาได้จากหน้าที่ลิงก์ไป

## When to use

- ตัวอย่างสั้น ๆ ของสิ่งที่ลิงก์ไป เช่น ความเสี่ยงและผลตอบแทนของกองทุน

## When not to use

| สถานการณ์                        | ใช้แทน                    |
| ------------------------------- | ------------------------ |
| คำอธิบายสั้นบรรทัดเดียวของปุ่มหรือไอคอน | `Tooltip`                |
| เนื้อหาที่มีปุ่มหรือช่องกรอกให้ใช้งาน      | `Popover` (เปิดด้วยการคลิก) |
| ข้อมูลที่ผู้ใช้ต้องเห็นเพื่อทำงานให้สำเร็จ   | แสดงในหน้าเลย             |

## Props and variants

### HoverCardContent

| Prop         | ค่า                               | ค่าเริ่มต้น  | ความหมาย                      |
| ------------ | -------------------------------- | -------- | ----------------------------- |
| `side`       | `top`, `right`, `bottom`, `left` | `bottom` | ด้านที่การ์ดเปิด (สลับเองถ้าที่ไม่พอ)   |
| `align`      | `start`, `center`, `end`         | `center` | การจัดแนวกับลิงก์                 |
| `sideOffset` | px                               | `4`      | ระยะห่างจากลิงก์                 |
| `className`  | class                            | –        | เช่น เปลี่ยนความกว้าง (ปกติ 288px) |

### HoverCard / HoverCardTrigger

| Prop                    | ใช้กับ               | ความหมาย             |
| ----------------------- | ------------------ | -------------------- |
| `delay` / `closeDelay`  | `HoverCardTrigger` | หน่วงก่อนเปิด / ปิด (ms) |
| `open` / `onOpenChange` | `HoverCard`        | ควบคุมการเปิดจากภายนอก |
| `defaultOpen`           | `HoverCard`        | เปิดไว้ตั้งแต่แรก         |

- เปิดเมื่อชี้เมาส์หรือโฟกัสลิงก์ด้วยคีย์บอร์ด ปิดเมื่อเลื่อนออกหรือกด Escape
- หน้าตาเหมือน `Popover`: พื้นกล่องลอย มุมโค้ง 22px เงา

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                    |
| ---------------------- | -------------------------- | -------------------------- | ----------------------- |
| `--popover`            | `oklch(1 0 0)`             | `oklch(0.228 0.013 107.4)` | พื้นการ์ด                  |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ตัวอักษร                  |
| `--foreground`         | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | เส้นขอบจาง (5% / มืด 10%) |

## Example

จาก story `Playground` ใน `HoverCard.stories.tsx`:

```tsx
<HoverCard>
  <HoverCardTrigger
    href="#balanced"
    className="font-medium text-primary underline underline-offset-4"
  >
    กองทุนสมดุล
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">กองทุนสมดุล (Balanced)</p>
        <Badge variant="warning">ความเสี่ยงปานกลาง</Badge>
      </div>
      <p className="text-muted-foreground">
        หุ้น 60% ตราสารหนี้และเงินสด 40% เหมาะกับการออมระยะ 7 ปีขึ้นไป
      </p>
      <p>ผลตอบแทนย้อนหลัง 5 ปี 6.8% ต่อปี</p>
    </div>
  </HoverCardContent>
</HoverCard>
```

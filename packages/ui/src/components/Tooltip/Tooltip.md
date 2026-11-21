# Tooltip (คำอธิบายลอย)

## Purpose

ข้อความสั้น ๆ ที่ลอยขึ้นเมื่อชี้หรือโฟกัสที่ปุ่ม อธิบายว่าปุ่มหรือคำนั้นคืออะไร

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "labdsnov"

// วาง TooltipProvider ครั้งเดียวที่ root layout
<TooltipProvider>{children}</TooltipProvider>

<Tooltip>
  <TooltipTrigger render={<Button size="icon-sm" variant="ghost" aria-label="ค่าธรรมเนียมคืออะไร" />}>
    <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
  </TooltipTrigger>
  <TooltipContent>หักจากบัญชีทุกเดือน 0.15% ของยอดเงิน</TooltipContent>
</Tooltip>
```

- trigger ต้องเป็นสิ่งที่โฟกัสได้ (ปุ่ม) ผู้ใช้คีย์บอร์ดจึงเปิดได้ ใช้ `render={<Button … />}`

## When to use

- อธิบายปุ่มไอคอนอย่างเดียว (ข้อความเดียวกับ `aria-label`)
- คำอธิบายสั้นของศัพท์ เช่น ค่าธรรมเนียม หน่วยลงทุน

## When not to use

- **ข้อมูลที่ผู้ใช้ต้องรู้เพื่อทำงานให้สำเร็จ**: แสดงในหน้าเลย (เช่น `FieldDescription`) เพราะบนมือถือไม่มีการชี้ (hover) TODO: ยังไม่ได้ตรวจพฤติกรรมเมื่อแตะบนมือถือ
- **เนื้อหาที่มีลิงก์ ปุ่ม หรือยาวหลายบรรทัด**: ใช้ `Popover`
- **ข้อความผิดพลาด**: ใช้ `FieldError` หรือ `Alert`

## Props and variants

### TooltipContent

| Prop         | ค่า                               | ค่าเริ่มต้น  | ความหมาย               |
| ------------ | -------------------------------- | -------- | ---------------------- |
| `side`       | `top`, `right`, `bottom`, `left` | `top`    | ด้านที่ลอยออกจาก trigger  |
| `align`      | `start`, `center`, `end`         | `center` | การจัดแนวตาม trigger    |
| `sideOffset` | ตัวเลข (px)                       | `4`      | ระยะห่างจาก trigger     |
| `className`  | class                            | –        | ปรับหน้าตาเฉพาะจุดครั้งเดียว |

### Tooltip / TooltipProvider

| Prop                    | ใช้กับ              | ความหมาย                             |
| ----------------------- | ----------------- | ------------------------------------ |
| `delay`                 | `TooltipProvider` | หน่วงก่อนเปิด (ms) ค่าเริ่มต้น `0` คือเปิดทันที |
| `open` / `onOpenChange` | `Tooltip`         | ควบคุมการเปิดจากภายนอก                 |
| `defaultOpen`           | `Tooltip`         | เปิดไว้ตั้งแต่แรก                         |

หน้าตา: กล่องกลับสี (พื้นสีตัวอักษร ตัวอักษรสีพื้นหลัง) 12px กว้างสูงสุด 320px มีลูกศรชี้ไปที่ trigger

### พฤติกรรมที่มีให้แล้ว

- เปิดเมื่อชี้เมาส์หรือโฟกัสด้วยคีย์บอร์ด กด Escape เพื่อปิด

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token          | โหมดสว่าง       | โหมดมืด | ใช้ใน      |
| -------------- | -------------- | ------ | --------- |
| `--tooltip-bg` | `--foreground` | –      | พื้นและลูกศร |
| `--tooltip-fg` | `--background` | –      | ตัวอักษร    |

### Semantic tokens

| Token          | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน          |
| -------------- | -------------------------- | -------------------------- | ------------- |
| `--foreground` | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | พื้นกล่องและลูกศร |
| `--background` | `oklch(1 0 0)`             | `oklch(0.153 0.006 107.1)` | ตัวอักษร        |

## Example

จาก story `Playground` ใน `Tooltip.stories.tsx`:

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger
      render={
        <Button size="icon-sm" variant="ghost" aria-label="ค่าธรรมเนียมคืออะไร" />
      }
    >
      <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
    </TooltipTrigger>
    <TooltipContent>หักจากบัญชีทุกเดือน 0.15% ของยอดเงิน</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

# Dialog (กล่องโต้ตอบ)

## Purpose

หน้าต่างแบบ modal ที่ลอยทับหน้า ให้ผู้ใช้ตัดสินใจหรือกรอกข้อมูลสั้น ๆ ให้เสร็จก่อนกลับไปทำงานต่อ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "labdsnov"

;<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    เปลี่ยนแผนการลงทุน
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>เปลี่ยนแผนการลงทุน</DialogTitle>
      <DialogDescription>การเปลี่ยนแผนจะมีผลกับเงินสมทบงวดถัดไป</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
      <DialogClose render={<Button />}>เปลี่ยนแผน</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

ควบคุมการเปิด/ปิดเอง (เช่น ปิดหลังบันทึกสำเร็จ) ใช้ `open` กับ `onOpenChange` ในไฟล์ที่มี `"use client"`:

```tsx
"use client"

import { useState } from "react"

const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>…</Dialog>
```

## When to use

- ยืนยันการตัดสินใจสำคัญที่ผู้ใช้เริ่มเอง เช่น เปลี่ยนแผนการลงทุน
- ยืนยันการกระทำที่ย้อนกลับไม่ได้: **ใช้ `AlertDialog`** (ดู [AlertDialog](../AlertDialog/AlertDialog.md)) ซึ่งประกาศเป็น `alertdialog` และปิดด้วยการคลิกนอกกล่องไม่ได้ ตัวอย่าง `ConfirmDelete` ด้านล่างเขียนไว้ก่อนมี AlertDialog
- ฟอร์มสั้น ๆ 1–3 ช่อง ที่ไม่ต้องออกจากหน้าเดิม เช่น แก้ไขข้อมูลบัญชี

ใช้เท่าที่จำเป็น ระบบดีไซน์หลัก (Carbon, Atlassian, Polaris) ถือว่า modal เป็นทางเลือกท้าย ๆ เพราะขัดจังหวะผู้ใช้

## When not to use

| สถานการณ์                           | ใช้แทน                                        |
| ---------------------------------- | -------------------------------------------- |
| ข้อความแจ้งที่ไม่ต้องตอบ (เช่น "บันทึกแล้ว") | `toast` (ดู [Toaster](../Toaster/Toaster.md)) |
| งานที่ผู้ใช้ทำบ่อย                       | ทำในหน้าโดยตรง                                |
| เนื้อหายาว ตารางใหญ่ หรือฟอร์มหลายขั้นตอน | หน้าใหม่                                       |
| การกระทำที่ย้อนกลับได้ (ลบแล้วกู้คืนได้)     | ทำทันทีแล้วให้ "เลิกทำ" แทนการถามยืนยัน             |
| เปิด dialog ซ้อนจาก dialog           | รวมเป็น dialog เดียว หรือย้ายไปหน้าใหม่            |
| ตัวเลือกเล็ก ๆ ข้างปุ่ม                  | `Popover` หรือ `DropdownMenu`                 |
| แผงที่เลื่อนขึ้นจากขอบจอบนมือถือ           | `Drawer` (ดู [Drawer](../Drawer/Drawer.md))   |

## Anatomy

ประกอบด้วยส่วนเหล่านี้ ซ้อนกันตามลำดับ:

- **Dialog**: ตัวครอบ ควบคุมการเปิด/ปิด
  - **DialogTrigger**: ปุ่มที่เปิด dialog (ใช้ `Button` ผ่าน `render`)
  - **DialogContent**: กล่องที่ลอยกลางจอ มีฉากหลังมืดและเบลอ และปุ่ม "ปิด" มุมขวาบน
    - **DialogHeader** → **DialogTitle** (บังคับ) + **DialogDescription** (แนะนำ)
    - เนื้อหา เช่น ช่องกรอกข้อมูล
    - **DialogFooter** → ปุ่ม **DialogClose** (ใช้ `Button` ผ่าน `render`)

ชื่อเรื่องและคำอธิบายจะถูกอ่านโดยโปรแกรมอ่านหน้าจอเมื่อเปิด dialog จึงต้องมี `DialogTitle` เสมอ

## Props and variants

### Dialog

| Prop                      | ค่า                              | ค่าเริ่มต้น | ความหมาย                                        |
| ------------------------- | ------------------------------- | ------- | ----------------------------------------------- |
| `open` / `onOpenChange`   | `boolean` / ฟังก์ชัน               | –       | ควบคุมการเปิด/ปิดจากภายนอก                         |
| `defaultOpen`             | `boolean`                       | `false` | เปิดไว้ตั้งแต่แรก                                    |
| `modal`                   | `true`, `false`, `"trap-focus"` | `true`  | `true` = ล็อกโฟกัส ล็อกการเลื่อนหน้า และกดนอกกล่องไม่ได้ |
| `disablePointerDismissal` | `boolean`                       | `false` | ปิดการปิด dialog เมื่อคลิกนอกกล่อง                    |

### DialogContent

| Prop              | ค่า                          | ค่าเริ่มต้น       | ความหมาย                                      |
| ----------------- | --------------------------- | ------------- | --------------------------------------------- |
| `size`            | `sm`, `default`, `lg`, `xl` | `default`     | ความกว้างสูงสุด (ดูตารางด้านล่าง)                   |
| `showCloseButton` | `boolean`                   | `true`        | แสดงปุ่มไอคอน "ปิด" มุมขวาบน                      |
| `initialFocus`    | element                     | ช่องแรกที่โฟกัสได้ | element ที่ได้โฟกัสเมื่อเปิด                         |
| `finalFocus`      | element                     | ปุ่มที่เปิด        | element ที่ได้โฟกัสเมื่อปิด                          |
| `className`       | class                       | –             | ปรับหน้าตาเฉพาะจุดครั้งเดียว ชนะสไตล์ของ dialog เสมอ |

| Size      | ความกว้างสูงสุด (จอ 640px ขึ้นไป) | ใช้กับ (จาก stories)        |
| --------- | ---------------------------- | ------------------------- |
| `sm`      | 384px                        | ยืนยันการลบ, ฟอร์มสั้น         |
| `default` | 448px                        | ยืนยันการตัดสินใจทั่วไป         |
| `lg`      | 512px                        | TODO: ยังไม่มีตัวอย่างการใช้งาน |
| `xl`      | 672px                        | TODO: ยังไม่มีตัวอย่างการใช้งาน |

บนจอแคบกว่า 640px ทุกขนาดกว้างเต็มจอ เว้นขอบซ้าย-ขวาข้างละ 16px

### DialogFooter

| Prop              | ค่า        | ค่าเริ่มต้น | ความหมาย                                               |
| ----------------- | --------- | ------- | ------------------------------------------------------ |
| `showCloseButton` | `boolean` | `false` | เพิ่มปุ่ม outline "ปิด" ท้ายแถว ใช้กับ dialog ที่แจ้งข้อมูลอย่างเดียว |

### พฤติกรรมที่มีให้แล้ว

- กด **Escape**, ปุ่ม "ปิด", หรือคลิกนอกกล่อง (ค่าเริ่มต้น) เพื่อปิด
- เปิดแล้วโฟกัสย้ายเข้า dialog ไปที่ช่องแรกที่โฟกัสได้ และวนอยู่ภายใน dialog ปิดแล้วโฟกัสกลับไปที่ปุ่มที่เปิด
- หน้าด้านหลังเลื่อนและคลิกไม่ได้ขณะเปิด
- ปุ่มใน footer: จอกว้างเรียงเป็นแถวชิดขวา จอแคบซ้อนเป็นแนวตั้งโดยปุ่มสุดท้ายอยู่บนสุด ดังนั้น **ใส่ปุ่มยกเลิกก่อน แล้วปุ่มหลักทีหลัง** ปุ่มหลักจะอยู่ขวาสุด (จอกว้าง) หรือบนสุด (จอแคบ)
- เปิด/ปิดด้วยการจางและย่อ-ขยายเล็กน้อย 100ms

## Content rules

ตามแนวทางของ WAI-ARIA APG, Carbon, Atlassian, Polaris และ Apple HIG

- **ชื่อเรื่อง**: บอกสิ่งที่กำลังจะทำ ใช้คำเดียวกับปุ่มที่เปิด (เปิดจาก "แก้ไขข้อมูลบัญชี" → ชื่อ "แก้ไขข้อมูลบัญชี") สำหรับการยืนยัน เขียนเป็นคำถาม เช่น "ลบบัญชีผู้รับผลประโยชน์?"
- **คำอธิบาย**: บอกผลที่จะตามมา ถ้าย้อนกลับไม่ได้ต้องบอกตรง ๆ ไม่ต้องอธิบายว่าปุ่มทำอะไร
- **ปุ่ม**: ไม่เกิน 3 ปุ่ม มีปุ่มหลักปุ่มเดียว ใช้คำกริยาที่เจาะจง ("บันทึก", "ลบ", "เปลี่ยนแผน") หลีกเลี่ยง "ตกลง", "ใช่/ไม่", "ส่ง"
- **การกระทำอันตราย**: ปุ่มหลักใช้ `Button variant="destructive"` และต้องมีปุ่ม "ยกเลิก" เสมอ
- **ปุ่ม "ปิด" มุมขวาบน**: เก็บไว้เป็นค่าเริ่มต้น ซ่อนได้ (`showCloseButton={false}`) เฉพาะเมื่อ footer มีปุ่ม "ยกเลิก" ให้ออกได้แล้ว เช่น การยืนยันการลบ
- **เนื้อหายาว**: TODO: ตอนนี้ dialog ไม่จำกัดความสูงและไม่มีการเลื่อนเฉพาะเนื้อหา ถ้าเนื้อหาสูงกว่าจอให้ย้ายไปหน้าใหม่ จนกว่าจะตัดสินใจเรื่องนี้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css` ปุ่มใน dialog ใช้ token ของ `Button`

| Token                  | โหมดสว่าง                         | โหมดมืด                       | ใช้ใน                                   |
| ---------------------- | -------------------------------- | ---------------------------- | -------------------------------------- |
| `--popover`            | `oklch(1 0 0)`                   | `oklch(0.228 0.013 107.4)`   | พื้นของกล่อง                              |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)`   | ตัวอักษรในกล่อง                           |
| `--foreground`         | `oklch(0.153 0.006 107.1)`       | `oklch(0.988 0.003 106.5)`   | เส้นขอบบาง ๆ รอบกล่อง (5% สว่าง, 10% มืด)  |
| `--muted-foreground`   | `oklch(0.58 0.031 107.3)`        | `oklch(0.737 0.021 106.9)`   | ตัวอักษรคำอธิบาย                          |
| `--secondary`          | `oklch(0.967 0.001 286.375)`     | `oklch(0.274 0.006 286.033)` | พื้นปุ่ม "ปิด" มุมขวาบน                      |
| `--radius`             | `0.625rem`                       | –                            | มุมโค้งของกล่อง (`--radius × 2.6` = 26px) |
| `--font-heading`       | กำหนดโดยแอป (IBM Plex Sans Thai) | –                            | ชื่อเรื่อง (16px, medium)                  |
| `--font-sans`          | system font stack                | –                            | คำอธิบายและเนื้อหา (14px)                 |

ฉากหลังเป็นสีดำ 30% และเบลอ ซึ่งเป็นค่าตายตัว ไม่ใช่ token TODO: ตัดสินใจว่าควรเป็น token หรือไม่ ระยะห่างภายในกล่องคือ 24px

## Example

จาก story `ConfirmDelete` ใน `Dialog.stories.tsx`:

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="destructive" />}>
    ยืนยันการลบ
  </DialogTrigger>
  <DialogContent size="sm" showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>ลบบัญชีผู้รับผลประโยชน์?</DialogTitle>
      <DialogDescription>
        การลบนี้ไม่สามารถย้อนกลับได้ ข้อมูลผู้รับผลประโยชน์จะถูกลบออกจากบัญชีของคุณ
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
      <DialogClose render={<Button variant="destructive" />}>ลบ</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Open questions (TODO)

ช่องว่างระหว่าง Dialog ปัจจุบันกับมาตรฐาน ยังไม่ได้แก้:

- **Alert dialog**: แก้แล้ว ใช้ `AlertDialog` สำหรับการยืนยัน TODO: ย้ายตัวอย่าง `ConfirmDelete` ไปใช้ AlertDialog
- **โฟกัสแรกในการยืนยันการลบ**: ใน `AlertDialog` โฟกัสไปที่ "ยกเลิก" ตามที่ APG แนะนำ (มี story `OpenAndCancel` ตรวจ)
- **คลิกนอกกล่อง**: Carbon ไม่ให้ปิดเมื่อ dialog มีปุ่มการกระทำ ส่วน Atlassian และ Base UI ให้ปิด ตอนนี้ปิดได้ (ค่าเริ่มต้น)
- **มือถือ**: มี `Drawer` แล้ว TODO: ยังไม่ได้ตัดสินใจว่าจะสลับ Dialog กับ Drawer ตามขนาดจออัตโนมัติหรือไม่

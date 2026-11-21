# Typography (ตัวอักษร)

## Purpose

ระบบใช้ฟอนต์สองชุด: หัวข้อใช้ IBM Plex Sans Thai ส่วนเนื้อหาใช้ฟอนต์ของระบบปฏิบัติการที่รองรับภาษาไทย

## Fonts

| Token            | ฟอนต์                                                                                                | ใช้กับ                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `--font-heading` | IBM Plex Sans Thai (แอปเป็นคนโหลด)                                                                   | `h1`–`h6` และหัวข้อของ Card, Dialog, AlertDialog, Drawer, Empty, FundCard |
| `--font-sans`    | `system-ui` แล้วสำรองด้วย Leelawadee UI (Windows), Thonburi (macOS/iOS), Noto Sans Thai (Android) ฯลฯ | เนื้อหาทั้งหมด                                                              |

- **แอปต้องกำหนด `--font-heading` เอง** เช่น `next/font/google` กับ `variable: "--font-heading"` ที่ `<html>` ถ้าไม่กำหนด หัวข้อจะใช้ฟอนต์ของเบราว์เซอร์ ดู [Getting started](./GettingStarted.md)
- TODO: ยังไม่ได้ตัดสินใจว่าจะส่งฟอนต์หัวข้อมากับไลบรารีหรือไม่

## Sizes used by components

ใช้ขนาดของ Tailwind (`1rem` = 16px)

| ขนาด        | px  | น้ำหนัก             | ใช้ใน                                                          |
| ----------- | --- | ----------------- | ------------------------------------------------------------- |
| `text-lg`   | 18  | medium / semibold | หัวข้อ AlertDialog, Empty, ยอดเงินใน FundCard                    |
| `text-base` | 16  | medium            | หัวข้อ Card, Dialog, Drawer, FundCard; ตัวอักษรในช่องกรอกบนจอแคบ   |
| `text-sm`   | 14  | normal / medium   | ขนาดหลักของคอมโพเนนต์: ปุ่ม, ช่องกรอกบนจอ 768px ขึ้นไป, เมนู, คำอธิบาย |
| `text-xs`   | 12  | medium            | Badge, ปุ่ม `xs`, หัวข้อกลุ่มในเมนู, Tooltip                         |

- **ช่องกรอกใช้ 16px บนจอแคบ** เพื่อไม่ให้ iOS ซูมเข้าเมื่อแตะ แล้วลดเป็น 14px บนจอ 768px ขึ้นไป
- **ตัวเลขที่เทียบกัน** (ยอดเงิน, เปอร์เซ็นต์) ใช้ `tabular-nums`
- **ภาษาไทยต้องการระยะบรรทัดมากกว่าภาษาอังกฤษ** เพราะมีสระและวรรณยุกต์บนล่าง หลีกเลี่ยง `leading-none` กับข้อความหลายบรรทัด
- ตัวอักษรสีรอง (`--muted-foreground`) ใช้กับคำอธิบาย ไม่ใช้กับข้อความหลัก

TODO: ยังไม่มี type scale สำหรับหน้าจอ (หัวข้อหน้า, หัวข้อส่วน) และยังไม่มีคอมโพเนนต์ตัวอักษร

## Dates and numbers

- วันที่เป็นภาษาไทยปี พ.ศ. (`th-TH`) เช่น "13 พ.ย. 2569" ดู [Calendar](../src/components/Calendar/Calendar.md) และ [DatePicker](../src/components/DatePicker/DatePicker.md)
- เงินจัดรูปแบบด้วย `Intl.NumberFormat("th-TH", { style: "currency", currency: "AUD" })` ดู [FundCard](../src/components/FundCard/FundCard.md)

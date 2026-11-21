# Toaster (ข้อความแจ้งชั่วคราว)

## Purpose

ข้อความสั้น ๆ ที่ลอยขึ้นมุมจอ แจ้งผลของการกระทำแล้วหายไปเอง

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

ใช้ไลบรารี `sonner` (ติดตั้งมากับ `labdsnov` แล้ว)

```tsx
// app/layout.tsx: วาง Toaster ครั้งเดียวทั้งแอป
import { Toaster } from "labdsnov"

;<body>
  {children}
  <Toaster />
</body>
```

```tsx
// ในไฟล์ที่มี "use client"
import { toast } from "labdsnov"

toast.success("เปลี่ยนแผนการลงทุนแล้ว", { description: "มีผลกับเงินสมทบงวดถัดไป" })
toast.error("ไม่สามารถบันทึกได้ กรุณาลองอีกครั้ง")
toast("ลบผู้รับผลประโยชน์แล้ว", { action: { label: "เลิกทำ", onClick: undo } })
```

- โหมดมืดตาม class `dark` ที่ `<html>` อัตโนมัติ

## When to use

- ยืนยันผลของการกระทำที่ผู้ใช้เพิ่งทำ เช่น บันทึกแล้ว ส่งคำขอแล้ว
- การกระทำที่ย้อนกลับได้: แสดงพร้อมปุ่ม "เลิกทำ" แทนการถามยืนยันด้วย `Dialog`

## When not to use

| สถานการณ์                 | ใช้แทน                                       |
| ------------------------ | ------------------------------------------- |
| ข้อมูลที่ต้องอยู่ให้เห็นจนกว่าจะแก้ | `Alert`                                     |
| ข้อผิดพลาดของช่องในฟอร์ม     | `FieldError` (ดู [Field](../Field/Field.md)) |
| ต้องให้ผู้ใช้ตัดสินใจ           | `Dialog`                                    |
| ข้อมูลสำคัญที่ผู้ใช้ห้ามพลาด      | `Alert` หรือ `Dialog` เพราะ toast หายไปเอง   |

## Props and variants

### toast()

| เรียกใช้                                                | ไอคอน                          |
| ----------------------------------------------------- | ------------------------------ |
| `toast(ข้อความ)`                                       | ไม่มี                            |
| `toast.success(ข้อความ)`                               | เครื่องหมายถูกในวงกลม             |
| `toast.info(ข้อความ)`                                  | ตัว i ในวงกลม                   |
| `toast.warning(ข้อความ)`                               | สามเหลี่ยมเตือน                   |
| `toast.error(ข้อความ)`                                 | กากบาทในวงกลม                  |
| `toast.promise(promise, { loading, success, error })` | ไอคอนหมุนระหว่างรอ แล้วเปลี่ยนตามผล |

ตัวเลือกที่ใช้บ่อย: `description` (ข้อความรอง), `action: { label, onClick }` (ปุ่ม), `duration` (มิลลิวินาที)

### Toaster

| Prop          | ค่า                                     | ค่าเริ่มต้น        | ความหมาย                                                     |
| ------------- | -------------------------------------- | -------------- | ------------------------------------------------------------ |
| `position`    | `top-left` … `bottom-right` (6 ตำแหน่ง) | `bottom-right` | มุมที่แสดง TODO: ยังไม่ได้กำหนดตำแหน่งสำหรับแอป                      |
| `richColors`  | `boolean`                              | `false`        | พื้นสีตามประเภท (เขียว แดง ฯลฯ) ของ sonner เอง ไม่ใช่ token ของเรา |
| `closeButton` | `boolean`                              | `false`        | แสดงปุ่มปิด                                                     |
| `theme`       | `light`, `dark`, `system`              | ตาม `.dark`    | บังคับโหมดสี                                                    |

TODO: ไอคอนทุกประเภทเป็นสีเดียวกับข้อความ (ไม่มีสีตามประเภท) ยังไม่ได้ตัดสินใจว่าจะใช้ `--success` / `--warning` / `--destructive` หรือไม่

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน         |
| ---------------------- | -------------------------- | -------------------------- | ------------ |
| `--popover`            | `oklch(1 0 0)`             | `oklch(0.228 0.013 107.4)` | พื้น toast     |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ตัวอักษร       |
| `--border`             | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | เส้นขอบ       |
| `--radius`             | `0.625rem`                 | –                          | มุมโค้ง (10px) |

## Example

จาก story `ShowToast` ใน `Toaster.stories.tsx`:

```tsx
<>
  <Toaster />
  <Button
    variant="outline"
    onClick={() =>
      toast.success("เปลี่ยนแผนการลงทุนแล้ว", {
        description: "มีผลกับเงินสมทบงวดถัดไป",
      })
    }
  >
    สำเร็จ
  </Button>
</>
```

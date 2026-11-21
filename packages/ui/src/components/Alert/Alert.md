# Alert (กล่องข้อความแจ้ง)

## Purpose

กล่องข้อความในหน้า แจ้งข้อมูลสำคัญหรือปัญหาที่ผู้ใช้ควรรู้ตอนนี้

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Alert, AlertDescription, AlertTitle } from "labdsnov"

;<Alert variant="destructive">
  <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
  <AlertTitle>ไม่สามารถรับเงินสมทบได้</AlertTitle>
  <AlertDescription>ข้อมูลบัญชีธนาคารของคุณไม่ถูกต้อง</AlertDescription>
</Alert>
```

- วางไอคอนเป็นลูกตัวแรก ไอคอนจะอยู่ซ้าย ข้อความอยู่ขวา
- ถ้าใช้ไอคอน ให้ติดตั้ง `@hugeicons/react` และ `@hugeicons/core-free-icons` ในแอปด้วย

## When to use

- ข้อมูลที่เกี่ยวกับหน้านี้และควรอยู่ให้เห็นจนกว่าจะแก้ เช่น บัญชีธนาคารไม่ถูกต้อง ยังไม่ได้ระบุผู้รับผลประโยชน์
- ข้อผิดพลาดของทั้งฟอร์ม (ข้อผิดพลาดของแต่ละช่องใช้ `FieldError`)

## When not to use

| สถานการณ์                                 | ใช้แทน                                        |
| ---------------------------------------- | -------------------------------------------- |
| ผลของการกระทำที่หายไปเองได้ (เช่น "บันทึกแล้ว") | `toast` (ดู [Toaster](../Toaster/Toaster.md)) |
| ต้องให้ผู้ใช้ตัดสินใจก่อนทำต่อ                    | `Dialog`                                     |
| ข้อผิดพลาดของช่องเดียว                       | `FieldError` (ดู [Field](../Field/Field.md))  |
| สถานะสั้น ๆ ของรายการ                      | `Badge`                                      |

## Props and variants

| Prop        | ค่า                       | ค่าเริ่มต้น   | ความหมาย               |
| ----------- | ------------------------ | --------- | ---------------------- |
| `variant`   | `default`, `destructive` | `default` | ดูตารางด้านล่าง           |
| `className` | class                    | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว |

| Variant       | หน้าตา                           | ใช้เมื่อ             |
| ------------- | ------------------------------- | ----------------- |
| `default`     | พื้นการ์ด ตัวอักษรปกติ คำอธิบายสี muted | ข้อมูลทั่วไป          |
| `destructive` | พื้นการ์ด ตัวอักษรและไอคอนสีแดง       | ข้อผิดพลาด สิ่งที่ต้องแก้ |

TODO: ยังไม่มี variant สำเร็จ (`success`) หรือคำเตือน (`warning`) แม้จะมี token `--success` / `--warning` แล้ว

- **AlertTitle**: หัวข้อ (14px, medium)
- **AlertDescription**: รายละเอียด ลิงก์ในข้อความขีดเส้นใต้
- **AlertAction**: ปุ่มเล็กมุมขวาบน เช่น `Button size="xs"`

ทุก Alert ประกาศให้โปรแกรมอ่านหน้าจออ่านทันที (`role="alert"`) TODO: ข้อมูลทั่วไปที่ไม่เร่งด่วนอาจไม่ควรขัดจังหวะ ยังไม่ได้ตัดสินใจว่าจะเปลี่ยนตาม variant หรือไม่

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                            |
| -------------------- | -------------------------- | -------------------------- | ------------------------------- |
| `--card`             | `oklch(1 0 0)`             | `oklch(0.228 0.013 107.4)` | พื้นกล่อง                          |
| `--card-foreground`  | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ตัวอักษร (`default`)              |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | คำอธิบาย (`default`)             |
| `--destructive`      | `oklch(0.505 0.2 27.325)`  | `oklch(0.75 0.16 22.216)`  | ตัวอักษรและไอคอน (`destructive`)  |
| `--border`           | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | เส้นขอบ                          |
| `--radius`           | `0.625rem`                 | –                          | มุมโค้ง (`--radius × 1.8` = 18px) |

## Example

จาก story `WithAction` ใน `Alert.stories.tsx`:

```tsx
<Alert className="w-96">
  <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
  <AlertTitle>ยังไม่ได้ระบุผู้รับผลประโยชน์</AlertTitle>
  <AlertDescription>ระบุผู้รับผลประโยชน์เพื่อให้เงินไปถึงคนที่คุณต้องการ</AlertDescription>
  <AlertAction>
    <Button size="xs" variant="outline">
      ระบุเลย
    </Button>
  </AlertAction>
</Alert>
```

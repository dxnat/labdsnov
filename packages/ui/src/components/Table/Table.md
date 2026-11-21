# Table (ตาราง)

## Purpose

ตารางข้อมูลเป็นแถวและคอลัมน์ ให้อ่านและเปรียบเทียบได้ง่าย เช่น รายการธุรกรรม

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "labdsnov"

;<Table>
  <TableCaption>ธุรกรรมล่าสุดในบัญชีของคุณ</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>วันที่</TableHead>
      <TableHead className="text-right">จำนวนเงิน</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>13 พ.ย. 2569</TableCell>
      <TableCell className="text-right tabular-nums">AU$1,245.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

- ใส่ `TableCaption` เสมอ เป็นชื่อของตารางสำหรับโปรแกรมอ่านหน้าจอ (แสดงใต้ตาราง)
- ตัวเลขเงิน: ชิดขวา (`text-right`) และใช้ตัวเลขความกว้างเท่ากัน (`tabular-nums`) ทั้งหัวคอลัมน์และเซลล์

## When to use

- ข้อมูลหลายแถวที่มีคอลัมน์เหมือนกัน และต้องเปรียบเทียบระหว่างแถว เช่น ธุรกรรม เงินสมทบรายเดือน

## When not to use

- **ข้อมูลเรื่องเดียวไม่กี่ค่า**: ใช้ `Card`
- **ตัวเลือกการลงทุน**: ใช้ `FundCard`
- **จัดหน้า (layout)**: ใช้ CSS grid / flex ไม่ใช่ตาราง
- **เรียงลำดับ กรอง แบ่งหน้า**: TODO: Table เป็นแค่โครงตาราง ยังไม่มีคอมโพเนนต์ data table ที่ทำสิ่งเหล่านี้

## Anatomy

- **Table** (มีกล่องครอบที่เลื่อนแนวนอนได้)
  - **TableCaption**: ชื่อตาราง
  - **TableHeader** → **TableRow** → **TableHead**: หัวคอลัมน์
  - **TableBody** → **TableRow** → **TableCell**
  - **TableFooter**: แถวสรุป เช่น ยอดรวม (พื้นสีเทาจาง ตัวอักษร medium)

## Props and variants

ไม่มี variant หรือ size ทุกส่วนรับ props ของ element ตารางปกติ (เช่น `colSpan`) และ `className`

- ตารางกว้างเต็มพื้นที่ ข้อความในเซลล์ไม่ขึ้นบรรทัดใหม่ ถ้าตารางกว้างกว่าจอ ผู้ใช้เลื่อนตารางไปด้านข้างได้
- แถวมีพื้นจางเมื่อ hover ใส่ `data-state="selected"` ที่ `TableRow` เพื่อไฮไลต์แถวที่เลือก
- หัวคอลัมน์สูง 48px เซลล์มีระยะขอบใน 12px
- TODO: บนมือถือ ตารางกว้างต้องเลื่อนด้านข้าง ยังไม่ได้ตัดสินใจว่าจะเปลี่ยนเป็นรายการการ์ดบนจอแคบหรือไม่

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                                         |
| -------------------- | -------------------------- | -------------------------- | -------------------------------------------- |
| `--border`           | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | เส้นคั่นแถว                                     |
| `--muted`            | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | พื้นแถวตอน hover (50%), แถวที่เลือก, แถวสรุป (50%) |
| `--foreground`       | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | หัวคอลัมน์                                      |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`   | `oklch(0.737 0.021 106.9)` | ชื่อตาราง (caption)                            |

## Example

จาก story `Playground` ใน `Table.stories.tsx` (แถวเดียว):

```tsx
<Table>
  <TableCaption>ธุรกรรมล่าสุดในบัญชีของคุณ</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>วันที่</TableHead>
      <TableHead>รายการ</TableHead>
      <TableHead>สถานะ</TableHead>
      <TableHead className="text-right">จำนวนเงิน</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>13 พ.ย. 2569</TableCell>
      <TableCell>เงินสมทบจากนายจ้าง</TableCell>
      <TableCell>
        <Badge variant="success">สำเร็จ</Badge>
      </TableCell>
      <TableCell className="text-right tabular-nums">AU$1,245.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>รวม</TableCell>
      <TableCell className="text-right tabular-nums">AU$1,245.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

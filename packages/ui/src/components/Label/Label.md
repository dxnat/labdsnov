# Label (ป้ายชื่อช่องกรอก)

## Purpose

ป้ายชื่อของช่องกรอกข้อมูล บอกว่าช่องนั้นให้กรอกอะไร และบอกว่าบังคับกรอกหรือไม่

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Input, Label } from "labdsnov"

;<div className="grid gap-2">
  <Label htmlFor="full-name" required>
    ชื่อ-นามสกุล
  </Label>
  <Input id="full-name" required />
</div>
```

`htmlFor` ของ Label ต้องตรงกับ `id` ของช่องกรอก

## When to use

- ทุกช่อง `Input` ต้องมี Label ผูกไว้ คลิกที่ Label แล้วโฟกัสจะไปที่ช่อง และโปรแกรมอ่านหน้าจออ่านชื่อนี้เป็นชื่อของช่อง
- วางไว้เหนือช่อง ห่างกัน 8px ตาม stories
- ช่องที่บังคับกรอก ใส่ `required` ให้มีดอกจันสีแดงต่อท้าย

## When not to use

- **หัวข้อของส่วนหรือของหน้า**: ใช้หัวข้อ (heading) แทน
- **ข้อความช่วยเหลือหรือข้อความผิดพลาดใต้ช่อง**: ใช้ `FieldDescription` / `FieldError` ผูกด้วย `aria-describedby` (ดู [Field](../Field/Field.md)) ในฟอร์มใช้ `FieldLabel` แทน Label ได้
- **ป้ายที่ไม่ได้ผูกกับช่องใด**: ถ้าไม่มี `htmlFor` ป้ายจะไม่ทำหน้าที่ใด ๆ

## Props and variants

ไม่มี variant หรือ size ตัวอักษร 14px น้ำหนัก medium

| Prop        | ค่า        | ค่าเริ่มต้น | ความหมาย                                    |
| ----------- | --------- | ------- | ------------------------------------------- |
| `htmlFor`   | id ของช่อง | –       | ผูกป้ายกับช่องกรอก **ต้องใส่เสมอ**                |
| `required`  | `boolean` | `false` | แสดงดอกจันสีแดงต่อท้ายข้อความ                    |
| `children`  | ข้อความ    | –       | ชื่อช่อง เป็นภาษาไทย สั้น เช่น "อีเมล", "ชื่อ-นามสกุล" |
| `className` | class     | –       | ปรับหน้าตาเฉพาะจุดครั้งเดียว ชนะสไตล์ของป้ายเสมอ    |

- `required` เป็นแค่เครื่องหมายที่มองเห็น ไม่ได้ทำให้ช่องบังคับกรอก ต้องใส่ `required` ที่ `Input` ด้วย TODO: ยังไม่ได้ตรวจว่าโปรแกรมอ่านหน้าจออ่านดอกจันออกมาหรือไม่
- **สถานะปิดใช้งาน**: ป้ายจางลง 50% เมื่อช่องที่ผูกไว้ถูกปิดใช้งาน แต่ **ไม่เกิดขึ้นเอง** ต้องจัดโครงสร้างตาม story `DisabledPeer` หรือ `DisabledGroup` ถ้าวางป้ายเหนือช่องแบบปกติ ป้ายจะไม่จาง

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token           | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                 |
| --------------- | -------------------------- | -------------------------- | -------------------- |
| `--foreground`  | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ข้อความ (สืบทอดจากหน้า) |
| `--destructive` | `oklch(0.505 0.2 27.325)`  | `oklch(0.75 0.16 22.216)`  | ดอกจันของ `required`  |
| `--font-sans`   | system font stack          | –                          | ข้อความ               |

## Example

จาก story `WithInput` ใน `Label.stories.tsx`:

```tsx
<div className="grid w-80 gap-2">
  <Label htmlFor="label-email" required>
    อีเมล
  </Label>
  <Input id="label-email" type="email" placeholder="you@example.com" />
</div>
```

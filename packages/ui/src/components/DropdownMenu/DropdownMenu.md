# DropdownMenu (เมนูคำสั่ง)

## Purpose

รายการคำสั่งที่เปิดจากปุ่ม เช่น แก้ไข ดาวน์โหลด ลบ ของรายการหนึ่ง

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "labdsnov"

;<DropdownMenu>
  <DropdownMenuTrigger
    render={<Button size="icon" variant="ghost" aria-label="ตัวเลือกเพิ่มเติม" />}
  >
    <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>แก้ไข</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onClick={onDelete}>
      ลบ
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

- ปุ่มไอคอนอย่างเดียวที่เปิดเมนูต้องมี `aria-label`

## When to use

- คำสั่งหลายอย่างของรายการเดียว ที่ไม่อยากแสดงเป็นปุ่มทั้งหมด เช่น เมนู "…" ในแถวตารางหรือการ์ด
- ตัวเลือกการแสดงผลเล็ก ๆ เช่น เลือกคอลัมน์ (checkbox item) หรือการเรียงลำดับ (radio item)

## When not to use

| สถานการณ์          | ใช้แทน                    |
| ----------------- | ------------------------ |
| เลือกค่าในฟอร์ม      | `Select`                 |
| การกระทำหลักของหน้า | `Button` ที่มองเห็นตลอด     |
| นำทางไปหน้าอื่น      | ลิงก์ หรือ `NavigationMenu` |
| เนื้อหาหรือช่องกรอก   | `Popover`                |

## Anatomy

- **DropdownMenu** → **DropdownMenuTrigger** + **DropdownMenuContent**
  - **DropdownMenuGroup** → **DropdownMenuLabel** + **DropdownMenuItem**
  - **DropdownMenuCheckboxItem**: ติ๊กได้หลายข้อ
  - **DropdownMenuRadioGroup** → **DropdownMenuRadioItem**: เลือกได้ข้อเดียว
  - **DropdownMenuSub** → **DropdownMenuSubTrigger** + **DropdownMenuSubContent**: เมนูย่อย
  - **DropdownMenuSeparator**: เส้นคั่น
  - **DropdownMenuShortcut**: แสดงปุ่มลัดท้ายรายการ (แค่แสดง ไม่ได้ผูกคีย์ให้)

## Props and variants

### DropdownMenuItem

| Prop       | ค่า                       | ค่าเริ่มต้น   | ความหมาย                                                |
| ---------- | ------------------------ | --------- | ------------------------------------------------------- |
| `variant`  | `default`, `destructive` | `default` | `destructive` = ตัวอักษรและไอคอนสีแดง สำหรับลบหรือย้อนกลับไม่ได้ |
| `inset`    | `boolean`                | `false`   | เยื้องซ้าย ให้ตรงกับรายการที่มีไอคอน                            |
| `disabled` | `boolean`                | `false`   | จางลง 50% เลือกไม่ได้                                      |
| `onClick`  | ฟังก์ชัน                    | –         | สิ่งที่ทำเมื่อเลือก                                            |

`inset` ใช้กับ `DropdownMenuLabel`, `DropdownMenuSubTrigger`, `DropdownMenuCheckboxItem` และ `DropdownMenuRadioItem` ได้ด้วย

### DropdownMenuContent

| Prop        | ค่า                               | ค่าเริ่มต้น  | ความหมาย                           |
| ----------- | -------------------------------- | -------- | ---------------------------------- |
| `side`      | `top`, `right`, `bottom`, `left` | `bottom` | ด้านที่เปิดออกจาก trigger              |
| `align`     | `start`, `center`, `end`         | `start`  | การจัดแนวตาม trigger                |
| `className` | class                            | –        | กว้างอย่างน้อย 192px หรือเท่ากับ trigger |

### พฤติกรรมที่มีให้แล้ว

- เลือกรายการแล้วเมนูปิดเอง เปิดด้วยคีย์บอร์ดแล้วโฟกัสอยู่ที่รายการแรก ลูกศรขึ้น/ลงเลื่อนระหว่างรายการ (รายการที่ปิดใช้งานรับโฟกัสได้แต่เลือกไม่ได้) Escape ปิดเมนู
- การยืนยันการลบ: เปิด `Dialog` จากรายการ `destructive` อีกขั้นหนึ่ง TODO: ยังไม่มีตัวอย่างใน stories

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

| Token                  | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                                              |
| ---------------------- | --------------------------- | --------------------------- | ------------------------------------------------- |
| `--popover`            | `oklch(1 0 0)`              | `oklch(0.228 0.013 107.4)`  | พื้นเมนู                                             |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษร                                            |
| `--accent`             | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | พื้นรายการที่โฟกัส                                     |
| `--accent-foreground`  | `oklch(0.228 0.013 107.4)`  | `oklch(0.988 0.003 106.5)`  | ตัวอักษรรายการที่โฟกัส                                 |
| `--muted-foreground`   | `oklch(0.58 0.031 107.3)`   | `oklch(0.737 0.021 106.9)`  | หัวข้อกลุ่ม, ปุ่มลัด                                     |
| `--destructive`        | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | รายการ `destructive` (พื้นตอนโฟกัส 10% สว่าง, 20% มืด) |
| `--border`             | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นคั่น (50%)                                       |
| `--foreground`         | `oklch(0.153 0.006 107.1)`  | `oklch(0.988 0.003 106.5)`  | เส้นขอบบาง ๆ รอบเมนู (5% สว่าง, 10% มืด)              |

## Example

จาก story `Playground` ใน `DropdownMenu.stories.tsx`:

```tsx
<DropdownMenu>
  <DropdownMenuTrigger
    render={
      <Button size="icon" variant="outline" aria-label="ตัวเลือกผู้รับผลประโยชน์" />
    }
  >
    <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>ผู้รับผลประโยชน์</DropdownMenuLabel>
      <DropdownMenuItem>
        <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
        แก้ไข
      </DropdownMenuItem>
      <DropdownMenuItem disabled>ส่งต่อให้ที่ปรึกษา</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
      ลบ
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

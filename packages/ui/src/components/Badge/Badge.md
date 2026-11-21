# Badge (ป้ายสถานะ)

## Purpose

ป้ายข้อความสั้น ๆ บอกสถานะหรือระดับของสิ่งที่อยู่ข้าง ๆ เช่น สถานะรายการ หรือระดับความเสี่ยงของกองทุน

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Badge } from "labdsnov"

<Badge variant="success">สำเร็จ</Badge>

// เป็นลิงก์
<Badge variant="outline" render={<a href="/funds" />}>แนะนำ</Badge>
```

ถ้าใช้ไอคอน ให้ติดตั้ง `@hugeicons/react` และ `@hugeicons/core-free-icons` ในแอปด้วย

## When to use

- บอกสถานะของรายการ เช่น สำเร็จ / รอดำเนินการ / ไม่สำเร็จ
- บอกระดับความเสี่ยง: ต่ำ = `success`, ปานกลาง = `warning`, สูง = `destructive`
- ติดป้ายสั้น ๆ ให้รายการ เช่น "แนะนำ" และทำให้กดได้ (เป็นลิงก์) เมื่อมีหน้าปลายทาง
- ข้อความยาว 1–2 คำ ป้ายมีความสูงคงที่และข้อความไม่ขึ้นบรรทัดใหม่

## When not to use

- **สำหรับการกระทำ** เช่น บันทึก ส่ง ยกเลิก: ใช้ `Button` แทน Badge ไม่ใช่ปุ่ม และไม่มีสไตล์ hover เว้นแต่จะเป็นลิงก์
- **ข้อความยาวหรือประโยค**: ข้อความจะไม่ตัดบรรทัดและล้นออกนอกป้าย ใช้ข้อความปกติแทน
- **ใช้สีอย่างเดียวสื่อความหมาย**: ต้องมีข้อความบอกสถานะเสมอ (เช่น "ความเสี่ยงสูง" ไม่ใช่ป้ายสีแดงเปล่า ๆ)
- TODO: ยังไม่ได้กำหนดว่าใช้ Badge แสดงตัวเลขนับ (เช่น จำนวนแจ้งเตือน) ได้หรือไม่

## Props and variants

| Prop        | ค่า                           | ค่าเริ่มต้น   | ความหมาย                                                                 |
| ----------- | ---------------------------- | --------- | ------------------------------------------------------------------------ |
| `variant`   | ดูตารางด้านล่าง                 | `default` | ความหมายของป้าย                                                           |
| `children`  | ข้อความ (และไอคอนได้)          | –         | ข้อความบนป้าย เป็นภาษาไทย                                                   |
| `render`    | element เช่น `<a href="…" />` | –         | ทำให้ป้ายเป็นลิงก์ เมื่อเป็นลิงก์จะขีดเส้นใต้ตอน hover                                |
| `className` | class                        | –         | ปรับหน้าตาเฉพาะจุดครั้งเดียว ชนะสไตล์ของป้ายเสมอ ถ้าใช้ซ้ำหลายที่ ให้ขอ variant ใหม่แทน |

Badge มีขนาดเดียว (ไม่มี prop `size`): สูง 20px ตัวอักษร 12px น้ำหนัก medium ทรงแคปซูล ไอคอนในป้ายมีขนาด 12px

### Variants

| Variant       | ใช้เมื่อ                               | หน้าตา                          |
| ------------- | ----------------------------------- | ------------------------------ |
| `default`     | TODO: ยังไม่ได้กำหนดการใช้งาน           | พื้นสีหลัก (ส้ม) ตัวอักษรสีอ่อน         |
| `secondary`   | TODO: ยังไม่ได้กำหนดการใช้งาน           | พื้นเทาอ่อน ตัวอักษรเข้ม             |
| `outline`     | ป้ายกำกับทั่วไป เช่น "แนะนำ" (จาก story) | พื้นโปร่งใส มีเส้นขอบ               |
| `success`     | สำเร็จ, ความเสี่ยงต่ำ                   | พื้นเขียวจาง ตัวอักษรเขียว           |
| `warning`     | รอดำเนินการ, ความเสี่ยงปานกลาง         | พื้นเหลืองอมส้มจาง ตัวอักษรเหลืองอมส้ม |
| `destructive` | ไม่สำเร็จ, ความเสี่ยงสูง                 | พื้นแดงจาง ตัวอักษรแดง             |

`success` / `warning` / `destructive` ใช้พื้นสีจาง (10% ในโหมดสว่าง, 20% ในโหมดมืด) ส่วน `default` ใช้พื้นทึบ จึงเด่นกว่า

### States

- **Hover** (เฉพาะเมื่อเป็นลิงก์): ขีดเส้นใต้ สีไม่เปลี่ยน
- **Focus จากคีย์บอร์ด**: เส้นขอบและวงแหวนทึบสี `--focus-ring` ทุก variant
- **ข้อมูลไม่ถูกต้อง** (`aria-invalid`): เส้นขอบและวงแหวนสีแดง TODO: ยังไม่ชัดว่ากรณีไหนที่ป้ายควรอยู่ในสถานะนี้

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css` เปลี่ยนสีของป้ายที่ token ไม่ใช่ที่ตัวคอมโพเนนต์

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                    | โหมดสว่าง                 | โหมดมืด              | ใช้ใน                                            |
| ------------------------ | ------------------------ | ------------------- | ----------------------------------------------- |
| `--badge-default-bg`     | `--primary`              | –                   | พื้น `default`                                    |
| `--badge-default-fg`     | `--primary-foreground`   | –                   | ตัวอักษร `default`                                |
| `--badge-secondary-bg`   | `--secondary`            | –                   | พื้น `secondary`                                  |
| `--badge-secondary-fg`   | `--secondary-foreground` | –                   | ตัวอักษร `secondary`                              |
| `--badge-outline-border` | `--border`               | –                   | เส้นขอบ `outline`                                |
| `--badge-outline-fg`     | `--foreground`           | –                   | ตัวอักษร `outline`                                |
| `--badge-destructive-bg` | `--destructive` 10%      | `--destructive` 20% | พื้น `destructive`                                |
| `--badge-destructive-fg` | `--destructive`          | –                   | ตัวอักษร `destructive`                            |
| `--badge-success-bg`     | `--success` 10%          | `--success` 20%     | พื้น `success`                                    |
| `--badge-success-fg`     | `--success`              | –                   | ตัวอักษร `success`                                |
| `--badge-warning-bg`     | `--warning` 10%          | `--warning` 20%     | พื้น `warning`                                    |
| `--badge-warning-fg`     | `--warning`              | –                   | ตัวอักษร `warning`                                |
| `--focus-ring`           | `--ring`                 | –                   | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px)   |
| `--invalid-border`       | `--destructive`          | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`         | `--destructive` 20%      | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง (ตกแต่ง)                 |

### Semantic tokens

| Token                    | โหมดสว่าง                     | โหมดมืด                       | ใช้ใน                                        |
| ------------------------ | ---------------------------- | ---------------------------- | ------------------------------------------- |
| `--primary`              | `oklch(0.553 0.195 38.402)`  | `oklch(0.705 0.187 47.604)`  | พื้น `default`                                |
| `--primary-foreground`   | `oklch(0.98 0.016 73.684)`   | `oklch(0.205 0.05 40)`       | ตัวอักษร `default`                            |
| `--secondary`            | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้น `secondary`                              |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)`  | `oklch(0.985 0 0)`           | ตัวอักษร `secondary`                          |
| `--border`               | `oklch(0.93 0.007 106.5)`    | `oklch(1 0 0 / 10%)`         | เส้นขอบ `outline`                            |
| `--foreground`           | `oklch(0.153 0.006 107.1)`   | `oklch(0.988 0.003 106.5)`   | ตัวอักษร `outline`                            |
| `--success`              | `oklch(0.49 0.12 150)`       | `oklch(0.75 0.16 150)`       | `success` (ตัวอักษร + พื้นจาง)                  |
| `--warning`              | `oklch(0.5 0.12 60)`         | `oklch(0.82 0.15 80)`        | `warning` (ตัวอักษร + พื้นจาง)                  |
| `--destructive`          | `oklch(0.505 0.2 27.325)`    | `oklch(0.75 0.16 22.216)`    | `destructive` และสถานะไม่ถูกต้อง               |
| `--ring`                 | `oklch(0.45 0.03 106.9)`     | `oklch(0.8 0.02 106.9)`      | วงแหวน focus                                |
| `--radius`               | `0.625rem`                   | –                            | ฐานของมุมโค้ง (ป้ายใช้ `--radius × 2.2` = 22px) |

ตัวอักษรบนพื้นของทุก variant ผ่าน WCAG AA (อย่างน้อย 4.5:1) ทั้งสองโหมด รวมถึงบนพื้น `Card`

## Example

จาก story `RiskLevels` ใน `Badge.stories.tsx`:

```tsx
<div className="flex flex-wrap items-center gap-2">
  <Badge variant="success">ความเสี่ยงต่ำ</Badge>
  <Badge variant="warning">ความเสี่ยงปานกลาง</Badge>
  <Badge variant="destructive">ความเสี่ยงสูง</Badge>
</div>
```

# Button (ปุ่ม)

ปุ่มหลักของระบบดีไซน์ สร้างบน `Button` ของ [Base UI](https://base-ui.com) (`@base-ui/react/button`) สไตล์ทั้งหมดอยู่ใน CSS module แยกจาก markup และปรับหน้าตาด้วย props เชิงความหมาย (semantic props) แทนการส่ง class เอง

```tsx
import { Button } from "labdsnov"

;<Button>เข้าสู่ระบบ</Button>
```

---

## โครงสร้างไฟล์

```
src/components/ui/Button/
├── Button.tsx          # markup + แปลง props เป็น class (ไม่มี class string ของ Tailwind)
├── Button.module.css   # สไตล์ทั้งหมด (@apply Tailwind ภายใน @layer components)
├── index.ts            # export * from "./Button"
└── Button.md           # เอกสารนี้
```

| ไฟล์                | หน้าที่                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button.tsx`        | รับ props `variant` / `size` / `fullWidth` แล้วแปลงเป็น class ของ CSS module ผ่าน lookup ที่มี type (`variantClass`, `sizeClass`) และใส่ `className` ของผู้ใช้ไว้ท้ายสุด |
| `Button.module.css` | กำหนดสไตล์ base, variant, size, modifier และ state โดยอ้างอิง token จาก `src/app/globals.css` ผ่าน `@reference`                                                          |
| `index.ts`          | ให้ import จากโฟลเดอร์ได้โดยตรง: `@/components/ui/Button`                                                                                                                |

### สิ่งที่ export

| ชื่อ               | ชนิด      | คำอธิบาย                                                                             |
| ------------------ | --------- | ------------------------------------------------------------------------------------ |
| `Button`           | component | ปุ่ม                                                                                 |
| `buttonVariants()` | function  | คืนค่า class ของปุ่ม ใช้กับ element ที่ไม่ใช่ `<Button>` เช่น `Link`                 |
| `ButtonProps`      | type      | props ทั้งหมดของ `Button`                                                            |
| `ButtonVariant`    | type      | `"default" \| "outline" \| "secondary" \| "ghost" \| "destructive" \| "link"`        |
| `ButtonSize`       | type      | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` |

---

## Props

รับ props ทั้งหมดของ Base UI Button (`disabled`, `type`, `onClick`, `render`, `focusableWhenDisabled` ฯลฯ) รวมกับ props ด้านล่าง

| Prop        | ชนิด                          | ค่าเริ่มต้น | คำอธิบาย                                                                           |
| ----------- | ----------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `variant`   | `ButtonVariant`               | `"default"` | ระดับความเด่นของปุ่ม                                                               |
| `size`      | `ButtonSize`                  | `"default"` | ความสูงและระยะขอบใน ขนาด `icon*` เป็นปุ่มสี่เหลี่ยมจัตุรัส                         |
| `fullWidth` | `boolean`                     | `false`     | ขยายเต็มความกว้างของ container เช่น ปุ่มส่งฟอร์มเข้าสู่ระบบ/สมัครสมาชิก            |
| `className` | `string \| (state) => string` | –           | class เพิ่มเติม ชนะสไตล์ของคอมโพเนนต์เสมอ (ดู [การ override](#การ-override-สไตล์)) |

### Data attributes ที่ render ออกมา

| Attribute       | ค่า                            | ใช้ทำอะไร                                  |
| --------------- | ------------------------------ | ------------------------------------------ |
| `data-slot`     | `"button"`                     | ระบุว่าเป็นส่วนไหนของคอมโพเนนต์            |
| `data-variant`  | ค่าของ `variant`               | ใช้เลือกด้วย selector / ตรวจสอบใน DevTools |
| `data-size`     | ค่าของ `size`                  | เช่นเดียวกัน                               |
| `data-disabled` | (Base UI ใส่ให้เมื่อ disabled) | ใช้กับสไตล์สถานะปิดใช้งาน                  |

---

## โครงสร้างปุ่ม (Anatomy)

```
┌────────────────────────────────────────────┐
│  [ไอคอนหน้า]   ข้อความ   [ไอคอนหลัง]   │  ← .root + .variant* + .size*
└────────────────────────────────────────────┘
   data-icon=        gap         data-icon=
   "inline-start"                "inline-end"
```

- **Container (`.root`)**: `inline-flex` จัดกึ่งกลางทั้งแนวตั้งและแนวนอน ไม่หด (`shrink-0`) ข้อความไม่ขึ้นบรรทัดใหม่ เลือกข้อความไม่ได้ (`select-none`) มีเส้นขอบ 1px โปร่งใสเสมอ เพื่อให้ variant ที่มีเส้นขอบมีขนาดเท่ากับ variant อื่น
- **ไอคอน (`svg`)**: ขนาดเริ่มต้น 16px (12px ใน `xs` / `icon-xs`) คลิกทะลุได้ (`pointer-events: none`) ถ้า svg มี class ที่ขึ้นต้นด้วย `size-` จะไม่ถูกบังคับขนาด
- **ระยะขอบเมื่อมีไอคอน**: ใส่ `data-icon="inline-start"` หรือ `data-icon="inline-end"` ที่ไอคอน แล้วปุ่มจะลด padding ด้านนั้นลงเล็กน้อยให้ดูสมดุล

```tsx
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

;<Button>
  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
  เพิ่มเงินสมทบ
</Button>
```

---

## Variants

| Variant       | ใช้เมื่อ                               | พื้นหลัง                            | ตัวอักษร                 | Hover                               |
| ------------- | -------------------------------------- | ----------------------------------- | ------------------------ | ----------------------------------- |
| `default`     | การกระทำหลักของหน้า (1 ปุ่มต่อพื้นที่) | `--primary`                         | `--primary-foreground`   | `--primary` 80%                     |
| `secondary`   | การกระทำรอง                            | `--secondary`                       | `--secondary-foreground` | `--secondary` ผสม `--foreground` 5% |
| `outline`     | ทางเลือกคู่กับปุ่มหลัก เช่น "ยกเลิก"   | `--background` + เส้นขอบ `--border` | สืบทอด                   | `--muted` / ตัวอักษร `--foreground` |
| `ghost`       | ปุ่มในแถบเครื่องมือ ปุ่มไอคอน          | โปร่งใส                             | สืบทอด                   | `--muted` / ตัวอักษร `--foreground` |
| `destructive` | การกระทำที่ลบหรือย้อนกลับไม่ได้        | `--destructive` 10%                 | `--destructive`          | `--destructive` 20%                 |
| `link`        | การกระทำที่ดูเหมือนลิงก์ในข้อความ      | โปร่งใส                             | `--primary`              | ขีดเส้นใต้ (offset 4px)             |

**โหมดมืด** (`.dark`)

| Variant       | สิ่งที่เปลี่ยน                           |
| ------------- | ---------------------------------------- |
| `outline`     | พื้นหลังโปร่งใส hover เป็น `--input` 30% |
| `ghost`       | hover เป็น `--muted` 50%                 |
| `destructive` | พื้นหลัง `--destructive` 20% hover 30%   |

**สถานะเปิดอยู่** (`aria-expanded="true"` เช่น ปุ่มที่เปิดเมนู): `outline` และ `ghost` ใช้พื้นหลัง `--muted` ค้างไว้ ส่วน `secondary` คงสี `--secondary`

> สไตล์ hover ทำงานเฉพาะอุปกรณ์ที่มี hover จริง (`@media (hover: hover)`) บนมือถือจะไม่ค้างสี hover หลังแตะ

---

## Sizes

| Size      | ความสูง       | Padding ซ้าย-ขวา | ระยะห่าง (gap) | ขนาดตัวอักษร | ขนาดไอคอน | Padding ด้านที่มีไอคอน |
| --------- | ------------- | ---------------- | -------------- | ------------ | --------- | ---------------------- |
| `xs`      | 24px (`h-6`)  | 10px             | 4px            | 12px / 16px  | 12px      | 8px                    |
| `sm`      | 32px (`h-8`)  | 12px             | 4px            | 14px / 20px  | 16px      | 8px                    |
| `default` | 36px (`h-9`)  | 12px             | 6px            | 14px / 20px  | 16px      | 10px                   |
| `lg`      | 40px (`h-10`) | 16px             | 6px            | 14px / 20px  | 16px      | 12px                   |
| `icon-xs` | 24 × 24px     | –                | –              | –            | 12px      | –                      |
| `icon-sm` | 32 × 32px     | –                | –              | –            | 16px      | –                      |
| `icon`    | 36 × 36px     | –                | –              | –            | 16px      | –                      |
| `icon-lg` | 40 × 40px     | –                | –              | –            | 16px      | –                      |

ขนาดตัวอักษรเขียนเป็น `ขนาด / line-height`

---

## States (สถานะ)

สไตล์สถานะเขียนไว้ **หลัง** variant ใน CSS เพื่อให้ชนะ variant เสมอ

| สถานะ                 | Selector                                    | สไตล์                                                                                   |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Focus (คีย์บอร์ด)     | `:focus-visible`                            | เส้นขอบ `--ring` + วงแหวน 3px สี `--ring` 30%                                           |
| Focus (`destructive`) | `:focus-visible`                            | เส้นขอบ `--destructive` 40% + วงแหวน `--destructive` 20% (มืด: 40%)                     |
| กดค้าง                | `:active` (ยกเว้นปุ่มที่มี `aria-haspopup`) | เลื่อนลง 1px                                                                            |
| ปิดใช้งาน             | `:disabled`, `[data-disabled]`              | ความทึบ 50% คลิกไม่ได้                                                                  |
| ข้อมูลไม่ถูกต้อง      | `[aria-invalid="true"]`                     | เส้นขอบ `--destructive` + วงแหวน 3px `--destructive` 20% (มืด: เส้นขอบ 50%, วงแหวน 40%) |

ทุกการเปลี่ยนแปลงมี transition 150ms (`transition-all`)

---

## Design tokens ที่ใช้

Token ทั้งหมดกำหนดใน `src/app/globals.css` (`:root` สำหรับโหมดสว่าง, `.dark` สำหรับโหมดมืด) และเชื่อมกับ Tailwind ผ่าน `@theme inline` **แก้สีของปุ่มที่ token ไม่ใช่ที่ CSS module**

### สี

| Token                    | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                                          |
| ------------------------ | ---------------------------- | ---------------------------- | ---------------------------------------------- |
| `--primary`              | `oklch(0.553 0.195 38.402)`  | `oklch(0.47 0.157 37.304)`   | พื้นหลัง `default`, ตัวอักษร `link`            |
| `--primary-foreground`   | `oklch(0.98 0.016 73.684)`   | `oklch(0.98 0.016 73.684)`   | ตัวอักษร `default`                             |
| `--secondary`            | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้นหลัง `secondary`                           |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)`  | `oklch(0.985 0 0)`           | ตัวอักษร `secondary`                           |
| `--muted`                | `oklch(0.966 0.005 106.5)`   | `oklch(0.286 0.016 107.4)`   | hover ของ `outline`, `ghost`                   |
| `--foreground`           | `oklch(0.153 0.006 107.1)`   | `oklch(0.988 0.003 106.5)`   | ตัวอักษรตอน hover, ผสมสี hover ของ `secondary` |
| `--background`           | `oklch(1 0 0)`               | `oklch(0.153 0.006 107.1)`   | พื้นหลัง `outline` (โหมดสว่าง)                 |
| `--border`               | `oklch(0.93 0.007 106.5)`    | `oklch(1 0 0 / 10%)`         | เส้นขอบ `outline`                              |
| `--input`                | `oklch(0.93 0.007 106.5)`    | `oklch(1 0 0 / 15%)`         | hover ของ `outline` (โหมดมืด)                  |
| `--ring`                 | `oklch(0.737 0.021 106.9)`   | `oklch(0.58 0.031 107.3)`    | เส้นขอบและวงแหวนตอน focus                      |
| `--destructive`          | `oklch(0.577 0.245 27.325)`  | `oklch(0.704 0.191 22.216)`  | `destructive`, สถานะ invalid                   |

สีที่มีเปอร์เซ็นต์ (เช่น `--primary` 80%) คำนวณด้วย `color-mix(in oklab, <token> <n>%, transparent)` จาก Tailwind จึงเปลี่ยนตาม token อัตโนมัติ

### รูปทรงและตัวอักษร

| Token                          | ค่า                                             | ใช้ใน                                                              |
| ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------ |
| `--radius`                     | `0.625rem`                                      | ฐานของมุมโค้ง                                                      |
| `--radius-4xl` (`rounded-4xl`) | `calc(var(--radius) * 2.6)` = 26px              | มุมโค้งของปุ่ม ซึ่งมากกว่าครึ่งความสูงทุกขนาด ปุ่มจึงเป็นทรงแคปซูล |
| `--font-sans`                  | system font stack (รองรับภาษาไทย)               | ตัวอักษรบนปุ่ม (สืบทอดจาก `<html>`)                                |
| น้ำหนักตัวอักษร                | `500` (`font-medium`)                           | ข้อความบนปุ่ม                                                      |
| ระยะห่าง                       | หน่วยละ 4px (`--spacing: 0.25rem` ของ Tailwind) | ความสูง, padding, gap                                              |

---

## ตัวอย่างการใช้งาน

```tsx
// ปุ่มหลัก + ปุ่มรองในฟอร์ม
<Button fullWidth type="submit">เข้าสู่ระบบ</Button>
<Button fullWidth variant="outline">สมัครสมาชิก</Button>

// ปุ่มไอคอนอย่างเดียว ต้องมี aria-label เสมอ
<Button size="icon" variant="ghost" aria-label="ตั้งค่า">
  <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
</Button>

// ใช้เป็น trigger ของ Dialog (Base UI ใช้ render แทน asChild)
<DialogTrigger render={<Button variant="destructive" />}>ลบบัญชี</DialogTrigger>

// ทำให้ลิงก์ดูเหมือนปุ่ม
import Link from "next/link"
import { buttonVariants } from "labdsnov"

<Link href="/register" className={buttonVariants({ variant: "outline" })}>
  สมัครสมาชิก
</Link>
```

---

## การ override สไตล์

สไตล์ของปุ่มอยู่ใน cascade layer `components` ส่วน utility ของ Tailwind อยู่ใน layer `utilities` ที่มาทีหลัง **class ที่ส่งผ่าน `className` จึงชนะสไตล์ของปุ่มเสมอ** ไม่ว่า selector จะมี specificity เท่าไร

```tsx
<Button className="rounded-md">มุมโค้งน้อยลง</Button>
```

แนวทาง:

1. **เปลี่ยนสีทั้งระบบ**: แก้ token ใน `globals.css`
2. **หน้าตาที่ใช้ซ้ำหลายที่**: เพิ่ม variant / size / prop ใหม่ (ดูหัวข้อถัดไป) ไม่ใช่ส่ง `className` ซ้ำในหลายหน้า
3. **ปรับเฉพาะจุดครั้งเดียว**: ใช้ `className`

---

## การเพิ่ม variant หรือ size ใหม่

ตัวอย่าง เพิ่ม variant `success`

1. เพิ่ม class ใน `Button.module.css` ส่วน Variants (ก่อนส่วน States):

   ```css
   .variantSuccess {
     @apply bg-emerald-600 text-white hover:bg-emerald-600/80;
   }
   ```

   ถ้ามีสไตล์โหมดมืด ให้เขียนเป็น `:global(.dark) .variantSuccess { @apply … }` ห้ามใช้ `dark:` ใน `@apply` (CSS Modules จะเปลี่ยนชื่อ class `.dark` ทำให้ใช้ไม่ได้) เช่นเดียวกับ `group-*:` และ `peer-*:`

2. เพิ่มใน lookup ของ `Button.tsx`:

   ```ts
   const variantClass = {
     // …
     success: styles.variantSuccess,
   } as const
   ```

   type `ButtonVariant` จะได้ค่า `"success"` เพิ่มโดยอัตโนมัติ

3. อัปเดตตารางในเอกสารนี้ และเพิ่มตัวอย่างในหน้ารวมคอมโพเนนต์ (`src/app/page.tsx`)

> ถ้าสีใหม่จะใช้กับหลายคอมโพเนนต์ ให้เพิ่มเป็น token ใน `globals.css` ก่อน (เช่น `--success` ใน `:root` และ `.dark` แล้ว map เป็น `--color-success` ใน `@theme inline`) แล้วใช้ `bg-success` แทนสีตายตัว

---

## การเข้าถึง (Accessibility)

- ปุ่มไอคอนอย่างเดียวต้องมี `aria-label` (ภาษาไทย)
- ใช้ `type="submit"` กับปุ่มส่งฟอร์ม
- ถ้าต้องการให้ปุ่มที่ปิดใช้งานยังโฟกัสได้ (เช่น เพื่อแสดง tooltip อธิบายเหตุผล) ใช้ prop `focusableWhenDisabled` ของ Base UI ซึ่งจะใส่ `aria-disabled` แทน attribute `disabled` ส่วน `data-disabled` ยังอยู่ ปุ่มจึงยังได้สไตล์ปิดใช้งานเหมือนเดิม
- วงแหวน focus แสดงเฉพาะตอนใช้คีย์บอร์ด (`:focus-visible`)

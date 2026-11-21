# Field (ช่องในฟอร์ม)

## Purpose

จัดป้ายชื่อ ช่องกรอก ข้อความช่วยเหลือ และข้อความผิดพลาดของหนึ่งช่องในฟอร์มให้เป็นแบบเดียวกันทั้งระบบ

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "labdsnov"

;<Field data-invalid={hasError}>
  <FieldLabel htmlFor="email" required>
    อีเมล
  </FieldLabel>
  <Input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby="email-desc email-error"
  />
  <FieldDescription id="email-desc">
    เราจะส่งใบแจ้งยอดประจำปีไปที่อีเมลนี้
  </FieldDescription>
  <FieldError id="email-error">{errorMessage}</FieldError>
</Field>
```

- **ผูกข้อความเอง**: ใส่ `id` ให้ `FieldDescription` / `FieldError` แล้วอ้างถึงด้วย `aria-describedby` ที่ช่องกรอก Field ไม่ผูกให้อัตโนมัติ
- **สถานะผิดพลาด**: ใส่ `data-invalid` ที่ `Field` (ทั้งช่องเป็นสีแดง) และ `aria-invalid` ที่ช่องกรอก
- **สถานะปิดใช้งาน**: ใส่ `data-disabled="true"` ที่ `Field` (ป้ายชื่อจางลง) และ `disabled` ที่ช่องกรอก
- `FieldError` ไม่แสดงอะไรเมื่อไม่มีข้อความ จึงวางไว้ได้ตลอด และโปรแกรมอ่านหน้าจอจะอ่านทันทีเมื่อข้อความปรากฏ

## When to use

- ทุกช่องในฟอร์ม: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`
- กลุ่มตัวเลือก (checkbox หลายข้อ, radio group) ใช้ `FieldSet` + `FieldLegend` เป็นชื่อของกลุ่ม
- ตัวเลือกที่มีคำอธิบายยาว ทำเป็นการ์ดให้เลือก: `FieldLabel` ครอบ `Field` ทั้งก้อน (story `ChoiceCards`)

## When not to use

- **ข้อความที่ไม่เกี่ยวกับช่องใดช่องหนึ่ง** เช่น ข้อผิดพลาดของทั้งฟอร์ม: ใช้ `Alert`
- **ป้ายชื่อเดี่ยว ๆ ที่ไม่มีข้อความช่วยเหลือ**: ใช้ `Label` ก็พอ

## Anatomy

- **FieldGroup**: เรียงหลายช่องห่างกัน 28px
  - **Field**: หนึ่งช่อง
    - **FieldLabel** (หรือ **FieldTitle** ในการ์ด): ป้ายชื่อ
    - ช่องกรอก
    - **FieldContent**: ครอบป้ายชื่อและคำอธิบาย เมื่อวางข้างช่องทำเครื่องหมายหรือสวิตช์
    - **FieldDescription**: ข้อความช่วยเหลือ
    - **FieldError**: ข้อความผิดพลาด
  - **FieldSeparator**: เส้นคั่น มีข้อความตรงกลางได้ เช่น "หรือ"
- **FieldSet** → **FieldLegend**: กลุ่มช่องที่เกี่ยวข้องกัน พร้อมชื่อกลุ่ม

## Props and variants

### Field

| Prop            | ค่า                                     | ค่าเริ่มต้น    | ความหมาย               |
| --------------- | -------------------------------------- | ---------- | ---------------------- |
| `orientation`   | `vertical`, `horizontal`, `responsive` | `vertical` | ดูตารางด้านล่าง           |
| `data-invalid`  | `boolean`                              | –          | ข้อความในช่องเป็นสีแดง     |
| `data-disabled` | `"true"`                               | –          | ป้ายชื่อจางลง 50%         |
| `className`     | class                                  | –          | ปรับหน้าตาเฉพาะจุดครั้งเดียว |

| Orientation  | หน้าตา                                               | ใช้กับ                                   |
| ------------ | --------------------------------------------------- | -------------------------------------- |
| `vertical`   | ป้ายชื่ออยู่บน ช่องกรอกกว้างเต็ม                            | `Input`, `Textarea`, `Select`          |
| `horizontal` | ช่องกรอกอยู่ข้างป้ายชื่อ                                   | `Checkbox`, `Switch`, `RadioGroupItem` |
| `responsive` | แนวตั้งบนจอแคบ แนวนอนเมื่อ `FieldGroup` กว้าง 448px ขึ้นไป | ฟอร์มตั้งค่าที่ป้ายชื่ออยู่ซ้าย ช่องอยู่ขวา           |

### อื่น ๆ

| Part / Prop                 | ความหมาย                                                                 |
| --------------------------- | ------------------------------------------------------------------------ |
| `FieldLabel` `required`     | ดอกจันสีแดง (เหมือน `Label`) ต้องใส่ `required` ที่ช่องกรอกเองด้วย                |
| `FieldLegend` `variant`     | `legend` (ค่าเริ่มต้น, 16px) เป็นหัวข้อกลุ่ม หรือ `label` (14px) ให้ดูเหมือนป้ายชื่อช่อง  |
| `FieldError` `errors`       | รับ `[{ message }]` จากไลบรารีฟอร์ม ข้อความซ้ำแสดงครั้งเดียว หลายข้อแสดงเป็นรายการ |
| `FieldSeparator` `children` | ข้อความกลางเส้น เช่น "หรือ"                                                  |

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token          | โหมดสว่าง | โหมดมืด | ใช้ใน                                          |
| -------------- | -------- | ------ | --------------------------------------------- |
| `--focus-ring` | `--ring` | –      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px) |

### Semantic tokens

| Token                | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                                  |
| -------------------- | --------------------------- | --------------------------- | ------------------------------------- |
| `--destructive`      | `oklch(0.505 0.2 27.325)`   | `oklch(0.75 0.16 22.216)`   | ข้อความผิดพลาด, ทั้งช่องเมื่อ `data-invalid` |
| `--muted-foreground` | `oklch(0.5 0.027 107.3)`    | `oklch(0.737 0.021 106.9)`  | ข้อความช่วยเหลือ, ข้อความกลางเส้นคั่น        |
| `--primary`          | `oklch(0.553 0.195 38.402)` | `oklch(0.705 0.187 47.604)` | ลิงก์ในข้อความช่วยเหลือตอน hover           |
| `--border`           | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 10%)`        | เส้นคั่น, เส้นขอบการ์ดตัวเลือก               |
| `--input`            | `oklch(0.93 0.007 106.5)`   | `oklch(1 0 0 / 15%)`        | พื้นการ์ดตัวเลือก: เมื่อเลือก 30%, hover 40%  |
| `--ring`             | `oklch(0.45 0.03 106.9)`    | `oklch(0.8 0.02 106.9)`     | วงแหวน focus ของการ์ดตัวเลือก            |
| `--background`       | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | พื้นหลังข้อความกลางเส้นคั่น                  |

## Example

จาก story `Invalid` ใน `Field.stories.tsx`:

```tsx
<Field className="w-80" data-invalid>
  <FieldLabel htmlFor="field-tfn">เลขประจำตัวผู้เสียภาษี (TFN)</FieldLabel>
  <Input
    id="field-tfn"
    defaultValue="123-456"
    aria-invalid
    aria-describedby="field-tfn-error"
  />
  <FieldError id="field-tfn-error">เลขประจำตัวผู้เสียภาษีต้องมี 9 หลัก</FieldError>
</Field>
```

## Open questions (TODO)

- **ผูก `aria-describedby` อัตโนมัติ**: ตอนนี้ต้องใส่ `id` เอง Base UI มี `Field` ที่ผูกให้อัตโนมัติ ยังไม่ได้ตัดสินใจว่าจะเปลี่ยนไปใช้หรือไม่
- **ทั้งช่องเป็นสีแดง**: `data-invalid` ทำให้ป้ายชื่อและข้อความช่วยเหลือเป็นสีแดงด้วย (ตาม shadcn) ยังไม่ได้ตัดสินใจว่าต้องการแบบนี้หรือให้แดงเฉพาะข้อความผิดพลาด

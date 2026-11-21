# Component tokens (token ของคอมโพเนนต์)

## Purpose

สีของแต่ละส่วนของคอมโพเนนต์ ชี้ไปที่ [semantic token](./Colors.md) ใช้เมื่อต้องการปรับคอมโพเนนต์เดียวโดยไม่กระทบที่อื่น

## How to use

- **ปกติไม่ต้องแตะ**: เปลี่ยน semantic token แล้ว component token ที่ชี้ไปจะเปลี่ยนตาม
- **ปรับคอมโพเนนต์เดียวทั้งแอป**: กำหนดค่าใหม่ใน CSS ของแอป หลัง import `labdsnov/styles.css`

  ```css
  :root,
  .dark {
    --button-primary-hover-bg: color-mix(in oklab, var(--primary) 80%, black);
  }
  ```

- **ปรับเฉพาะบางส่วนของหน้า**: กำหนดที่ element ครอบ เช่น `<section style={{ "--field-bg": "var(--card)" }}>`
- **ค่าที่ต่างตามโหมด** (เช่น พื้นจาง 10% / 20%) กำหนดใน `.dark` ไม่ใช่ใน CSS ของคอมโพเนนต์
- ค่าใหม่ต้องยังผ่าน contrast: รัน `pnpm tokens:check` (ดู [Accessibility](./Accessibility.md))

TODO: ยังไม่ได้ตัดสินใจว่า component token เป็น public API (เปลี่ยนชื่อ = breaking change) หรือไม่

## Reading the tables

- **โหมดสว่าง / โหมดมืด**: token ที่ชี้ไป `--primary` 10% = `--primary` โปร่งแสง 10% ส่วน "ผสมดำ 12%" = ผสมกับสีดำ 12%
- **โหมดมืด "–"**: ใช้ค่าเดียวกับโหมดสว่าง (แต่ semantic token ที่ชี้ไปยังเปลี่ยนตามโหมด)
- ทุกคอมโพเนนต์มีตาราง "Component tokens" ของตัวเองใน `<Name>.md` ด้วย

## Tokens

<!-- generated:component -->

### Shared states

| Token              | โหมดสว่าง            | โหมดมืด              | ใช้กับ                                            |
| ------------------ | ------------------- | ------------------- | ----------------------------------------------- |
| `--focus-ring`     | `--ring`            | –                   | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px)   |
| `--invalid-border` | `--destructive`     | –                   | เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง |
| `--invalid-ring`   | `--destructive` 20% | `--destructive` 40% | วงแหวนจางรอบช่องที่ไม่ถูกต้อง (ตกแต่ง)                 |

### Button

| Token                           | โหมดสว่าง                            | โหมดมืด                 | ใช้กับ                                 |
| ------------------------------- | ----------------------------------- | ---------------------- | ------------------------------------ |
| `--button-primary-bg`           | `--primary`                         | –                      | พื้น `default`                         |
| `--button-primary-fg`           | `--primary-foreground`              | –                      | ตัวอักษร `default`                     |
| `--button-primary-hover-bg`     | `--primary` ผสมดำ 12%               | `--primary` ผสมขาว 12% | พื้น `default` ตอน hover               |
| `--button-secondary-bg`         | `--secondary`                       | –                      | พื้น `secondary`                       |
| `--button-secondary-fg`         | `--secondary-foreground`            | –                      | ตัวอักษร `secondary`                   |
| `--button-secondary-hover-bg`   | `--secondary` ผสม `--foreground` 5% | –                      | พื้น `secondary` ตอน hover             |
| `--button-outline-bg`           | `--background`                      | `transparent`          | พื้น `outline`                         |
| `--button-outline-border`       | `--border`                          | –                      | เส้นขอบ `outline`                     |
| `--button-outline-hover-bg`     | `--muted`                           | `--input`              | พื้น `outline` ตอน hover / เปิดเมนู      |
| `--button-ghost-hover-bg`       | `--muted`                           | `--muted` 50%          | พื้น `ghost` ตอน hover / เปิดเมนู        |
| `--button-hover-fg`             | `--foreground`                      | –                      | ตัวอักษร `outline` / `ghost` ตอน hover |
| `--button-destructive-bg`       | `--destructive` 10%                 | `--destructive` 20%    | พื้น `destructive`                     |
| `--button-destructive-hover-bg` | `--destructive` 18%                 | `--destructive` 30%    | พื้น `destructive` ตอน hover           |
| `--button-destructive-fg`       | `--destructive`                     | –                      | ตัวอักษร `destructive`                 |
| `--button-link-fg`              | `--primary`                         | –                      | ตัวอักษร `link`                        |

### Badge

| Token                    | โหมดสว่าง                 | โหมดมืด              | ใช้กับ                 |
| ------------------------ | ------------------------ | ------------------- | -------------------- |
| `--badge-default-bg`     | `--primary`              | –                   | พื้น `default`         |
| `--badge-default-fg`     | `--primary-foreground`   | –                   | ตัวอักษร `default`     |
| `--badge-secondary-bg`   | `--secondary`            | –                   | พื้น `secondary`       |
| `--badge-secondary-fg`   | `--secondary-foreground` | –                   | ตัวอักษร `secondary`   |
| `--badge-outline-border` | `--border`               | –                   | เส้นขอบ `outline`     |
| `--badge-outline-fg`     | `--foreground`           | –                   | ตัวอักษร `outline`     |
| `--badge-destructive-bg` | `--destructive` 10%      | `--destructive` 20% | พื้น `destructive`     |
| `--badge-destructive-fg` | `--destructive`          | –                   | ตัวอักษร `destructive` |
| `--badge-success-bg`     | `--success` 10%          | `--success` 20%     | พื้น `success`         |
| `--badge-success-fg`     | `--success`              | –                   | ตัวอักษร `success`     |
| `--badge-warning-bg`     | `--warning` 10%          | `--warning` 20%     | พื้น `warning`         |
| `--badge-warning-fg`     | `--warning`              | –                   | ตัวอักษร `warning`     |

### Text fields: Input, Textarea, Select trigger, InputGroup, Combobox, InputOTP

| Token                 | โหมดสว่าง             | โหมดมืด | ใช้กับ                |
| --------------------- | -------------------- | ------ | ------------------- |
| `--field-bg`          | `--input` 50%        | –      | พื้นช่องกรอก           |
| `--field-border`      | `--control-border`   | –      | เส้นขอบช่องกรอก       |
| `--field-placeholder` | `--muted-foreground` | –      | placeholder         |
| `--field-icon`        | `--muted-foreground` | –      | ไอคอนในช่อง เช่น ลูกศร |

### Checkbox, RadioGroup, Switch

| Token                    | โหมดสว่าง               | โหมดมืด         | ใช้กับ                     |
| ------------------------ | ---------------------- | -------------- | ------------------------ |
| `--control-bg`           | `--background`         | `--input` 50%  | พื้นตอนยังไม่เลือก            |
| `--control-checked-bg`   | `--primary`            | –              | พื้นและเส้นขอบตอนเลือก       |
| `--control-checked-fg`   | `--primary-foreground` | –              | เครื่องหมายถูก / จุด ตอนเลือก |
| `--switch-track`         | `--control-border`     | –              | ราง Switch ตอนปิด         |
| `--switch-thumb`         | `--background`         | `--foreground` | ปุ่มเลื่อน Switch ตอนปิด      |
| `--switch-thumb-checked` | `--primary-foreground` | –              | ปุ่มเลื่อน Switch ตอนเปิด     |

### Tabs

| Token                      | โหมดสว่าง             | โหมดมืด    | ใช้กับ                        |
| -------------------------- | -------------------- | --------- | --------------------------- |
| `--tabs-list-bg`           | `--muted`            | –         | พื้นแคปซูล (`default`)         |
| `--tabs-trigger-fg`        | `--muted-foreground` | –         | ตัวอักษรแท็บที่ไม่ได้เลือก          |
| `--tabs-trigger-active-bg` | `--background`       | `--input` | พื้นแท็บที่เลือก (`default`)      |
| `--tabs-trigger-active-fg` | `--foreground`       | –         | ตัวอักษรแท็บที่เลือก และตอน hover |
| `--tabs-indicator`         | `--foreground`       | –         | เส้นใต้แท็บที่เลือก (`line`)      |

### Progress

| Token                  | โหมดสว่าง    | โหมดมืด | ใช้กับ         |
| ---------------------- | ----------- | ------ | ------------ |
| `--progress-track`     | `--muted`   | –      | ราง          |
| `--progress-indicator` | `--primary` | –      | แถบความคืบหน้า |

### Menus and lists: Select, DropdownMenu, Combobox, NavigationMenu

| Token                             | โหมดสว่าง              | โหมดมืด              | ใช้กับ               |
| --------------------------------- | --------------------- | ------------------- | ------------------ |
| `--menu-item-highlight-bg`        | `--accent`            | –                   | พื้นรายการที่ไฮไลต์     |
| `--menu-item-highlight-fg`        | `--accent-foreground` | –                   | ตัวอักษรรายการที่ไฮไลต์ |
| `--menu-label-fg`                 | `--muted-foreground`  | –                   | หัวข้อกลุ่ม, ปุ่มลัด      |
| `--menu-destructive-fg`           | `--destructive`       | –                   | ตัวอักษรรายการลบ     |
| `--menu-destructive-highlight-bg` | `--destructive` 10%   | `--destructive` 20% | พื้นรายการลบที่ไฮไลต์   |

### Tooltip

| Token          | โหมดสว่าง       | โหมดมืด | ใช้กับ      |
| -------------- | -------------- | ------ | --------- |
| `--tooltip-bg` | `--foreground` | –      | พื้นและลูกศร |
| `--tooltip-fg` | `--background` | –      | ตัวอักษร    |

### Calendar

| Token                        | โหมดสว่าง               | โหมดมืด | ใช้กับ                      |
| ---------------------------- | ---------------------- | ------ | ------------------------- |
| `--calendar-day-selected-bg` | `--primary`            | –      | พื้นวันที่เลือก (และต้น/ปลายช่วง) |
| `--calendar-day-selected-fg` | `--primary-foreground` | –      | ตัวอักษรวันที่เลือก             |
| `--calendar-range-bg`        | `--muted`              | –      | พื้นวันกลางช่วง               |
| `--calendar-today-bg`        | `--muted`              | –      | พื้นวันนี้                     |
| `--calendar-label-fg`        | `--muted-foreground`   | –      | ชื่อวันในสัปดาห์, เลขสัปดาห์     |

<!-- /generated:component -->

ตารางในหน้านี้สร้างจาก `theme.css` ด้วย `pnpm tokens:docs` อย่าแก้ในตารางโดยตรง

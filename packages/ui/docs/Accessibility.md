# Accessibility (การเข้าถึง)

## Purpose

เกณฑ์ที่ทุกคอมโพเนนต์และทุกหน้าจอต้องผ่าน: WCAG 2.2 ระดับ AA ทั้งโหมดสว่างและโหมดมืด

## Color contrast

| สิ่งที่ตรวจ                                                                   | เกณฑ์    | WCAG   |
| ------------------------------------------------------------------------- | ------- | ------ |
| ตัวอักษร (รวม placeholder, ตัวอักษรบนพื้นจาง, ตอน hover)                        | ≥ 4.5:1 | 1.4.3  |
| ขอบช่องกรอกและตัวควบคุม, วงแหวน focus, สถานะเลือก/เปิด, ไอคอนที่มีความหมาย, สีกราฟ | ≥ 3:1   | 1.4.11 |
| เส้นตกแต่ง (ขอบ Card, เส้นคั่น), สถานะปิดใช้งาน                                  | ไม่บังคับ  | –      |

- **ตรวจด้วยคำสั่ง**: `pnpm tokens:check` คำนวณ contrast ของทุกคู่ในตารางด้านล่างจาก `theme.css` (รวมสีโปร่งแสงและ `color-mix` ทับพื้นจริง) ไม่ผ่านจะจบด้วย error
- **คู่สีใหม่**: ถ้าเพิ่มคอมโพเนนต์หรือ token ที่วางตัวอักษรบนพื้นใหม่ เพิ่มคู่นั้นใน `CONTRAST_PAIRS` ใน `scripts/tokens.mjs`
- **สีที่แอปกำหนดเอง** (ผ่าน `className` หรือ override token) ต้องผ่านเกณฑ์เดียวกัน

## Focus

- ทุกคอมโพเนนต์ที่โฟกัสได้มีวงแหวนทึบ 2px สี `--focus-ring` เมื่อโฟกัสจากคีย์บอร์ด รวมถึง variant `destructive`
- ช่องที่ข้อมูลไม่ถูกต้องและกำลังโฟกัส: วงแหวนเป็นสีแดงทึบ (`--invalid-border`) เพื่อให้ยังเห็นว่าโฟกัสอยู่
- อย่าซ่อนวงแหวนด้วย `outline-none` / `ring-0` ใน `className`

## Invalid state

- ใส่ `aria-invalid` ที่ช่อง: เส้นขอบสีแดง (`--invalid-border`) และวงแหวนแดงจาง (`--invalid-ring`)
- สีแดงอย่างเดียวไม่พอ ต้องมีข้อความบอกว่าผิดอย่างไรใต้ช่องเสมอ (`FieldError`) และผูกด้วย `aria-describedby`

## Other rules

- ภาษาของข้อความในคอมโพเนนต์เป็นภาษาไทย รวมถึง `aria-label` (เช่น ปุ่มปิด "ปิด")
- ปุ่มที่มีแต่ไอคอนต้องมี `aria-label`
- ลิงก์ที่หน้าตาเหมือนปุ่มเป็น `<a>` ไม่ใช่ `Button` (ดู [Button](../src/components/Button/Button.md))
- พื้นที่กดของ Checkbox / Radio / Switch ใหญ่กว่าตัวที่เห็น (อย่างน้อย 24×24px)
- TODO: ยังไม่ได้ตรวจขนาดพื้นที่กดของปุ่ม `xs` / `icon-xs` (24px) กับเกณฑ์ 2.5.8 ในทุกบริบท
- TODO: ยังไม่ได้ตรวจกับโปรแกรมอ่านหน้าจอจริง (VoiceOver, NVDA)

## Checked pairs

ค่าเป็นอัตราส่วน contrast (เช่น 4.93 = 4.93:1) สร้างด้วย `pnpm tokens:docs`

<!-- generated:contrast -->

| คู่สี                             | ตัวหน้า                        | พื้น                                | เกณฑ์  | สว่าง  | มืด    |
| ------------------------------ | ---------------------------- | --------------------------------- | ----- | ----- | ----- |
| ตัวอักษรหลักบนพื้นหน้า               | `--foreground`               | `--background`                    | 4.5:1 | 19.59 | 18.93 |
| ตัวอักษรใน Card                  | `--card-foreground`          | `--card`                          | 4.5:1 | 19.59 | 16.38 |
| ตัวอักษรในกล่องลอย                | `--popover-foreground`       | `--popover`                       | 4.5:1 | 19.59 | 16.38 |
| คำอธิบายบนพื้นหน้า                 | `--muted-foreground`         | `--background`                    | 4.5:1 | 5.97  | 8.43  |
| คำอธิบายบนพื้น muted              | `--muted-foreground`         | `--muted`                         | 4.5:1 | 5.41  | 6.14  |
| คำอธิบายใน Card                 | `--muted-foreground`         | `--card`                          | 4.5:1 | 5.97  | 7.30  |
| คำอธิบายในกล่องลอย               | `--muted-foreground`         | `--popover`                       | 4.5:1 | 5.97  | 7.30  |
| คำอธิบายในรายการที่ไฮไลต์          | `--muted-foreground`         | `--accent`                        | 4.5:1 | 5.41  | 6.14  |
| placeholder ในช่องกรอก          | `--field-placeholder`        | `--field-bg`                      | 4.5:1 | 5.40  | 7.17  |
| ค่าในช่องกรอก                    | `--foreground`               | `--field-bg`                      | 4.5:1 | 17.71 | 16.11 |
| เส้นขอบช่องกรอก                  | `--field-border`             | `--background`                    | 3:1   | 3.93  | 4.05  |
| เส้นขอบช่องกรอกใน Card           | `--field-border`             | `--card`                          | 3:1   | 3.93  | 3.50  |
| เส้นขอบช่องกรอกในกล่องลอย         | `--field-border`             | `--popover`                       | 3:1   | 3.93  | 3.50  |
| ไอคอนในช่องกรอก                 | `--field-icon`               | `--field-bg`                      | 3:1   | 5.40  | 7.17  |
| วงแหวน focus                   | `--focus-ring`               | `--background`                    | 3:1   | 7.40  | 10.52 |
| วงแหวน focus ใน Card           | `--focus-ring`               | `--card`                          | 3:1   | 7.40  | 9.10  |
| วงแหวน focus ในกล่องลอย         | `--focus-ring`               | `--popover`                       | 3:1   | 7.40  | 9.10  |
| เส้นขอบเมื่อไม่ถูกต้อง               | `--invalid-border`           | `--background`                    | 3:1   | 6.52  | 8.06  |
| เส้นขอบเมื่อไม่ถูกต้องใน Card        | `--invalid-border`           | `--card`                          | 3:1   | 6.52  | 6.98  |
| Button default                 | `--button-primary-fg`        | `--button-primary-bg`             | 4.5:1 | 4.93  | 6.46  |
| Button default ตอน hover       | `--button-primary-fg`        | `--button-primary-hover-bg`       | 4.5:1 | 6.48  | 7.44  |
| Button secondary               | `--button-secondary-fg`      | `--button-secondary-bg`           | 4.5:1 | 16.11 | 14.26 |
| Button secondary ตอน hover     | `--button-secondary-fg`      | `--button-secondary-hover-bg`     | 4.5:1 | 14.26 | 12.63 |
| Button outline                 | `--foreground`               | `--button-outline-bg`             | 4.5:1 | 19.59 | 18.93 |
| Button outline ตอน hover       | `--button-hover-fg`          | `--button-outline-hover-bg`       | 4.5:1 | 17.76 | 12.71 |
| Button ghost ตอน hover         | `--button-hover-fg`          | `--button-ghost-hover-bg`         | 4.5:1 | 17.76 | 16.63 |
| Button destructive             | `--button-destructive-fg`    | `--button-destructive-bg`         | 4.5:1 | 5.46  | 5.92  |
| Button destructive ตอน hover   | `--button-destructive-fg`    | `--button-destructive-hover-bg`   | 4.5:1 | 4.70  | 4.74  |
| Button link                    | `--button-link-fg`           | `--background`                    | 4.5:1 | 5.23  | 6.99  |
| Badge default                  | `--badge-default-fg`         | `--badge-default-bg`              | 4.5:1 | 4.93  | 6.46  |
| Badge secondary                | `--badge-secondary-fg`       | `--badge-secondary-bg`            | 4.5:1 | 16.11 | 14.26 |
| Badge outline                  | `--badge-outline-fg`         | `--background`                    | 4.5:1 | 19.59 | 18.93 |
| Badge destructive              | `--badge-destructive-fg`     | `--badge-destructive-bg`          | 4.5:1 | 5.46  | 5.92  |
| Badge destructive ใน Card      | `--badge-destructive-fg`     | `--badge-destructive-bg`          | 4.5:1 | 5.46  | 4.91  |
| Badge success                  | `--badge-success-fg`         | `--badge-success-bg`              | 4.5:1 | 5.14  | 6.61  |
| Badge warning                  | `--badge-warning-fg`         | `--badge-warning-bg`              | 4.5:1 | 5.38  | 7.45  |
| ข้อความผิดพลาดใน Card / Alert    | `--destructive`              | `--card`                          | 4.5:1 | 6.52  | 6.98  |
| ข้อความสำเร็จ                    | `--success`                  | `--background`                    | 4.5:1 | 5.92  | 9.37  |
| ข้อความเตือน                     | `--warning`                  | `--background`                    | 4.5:1 | 6.23  | 11.06 |
| ขอบ Checkbox / Radio ที่ยังไม่เลือก | `--control-border`           | `--control-bg`                    | 3:1   | 3.93  | 3.44  |
| Checkbox / Radio ที่เลือกแล้ว      | `--control-checked-bg`       | `--background`                    | 3:1   | 5.23  | 6.99  |
| เครื่องหมายถูก / จุด               | `--control-checked-fg`       | `--control-checked-bg`            | 3:1   | 4.93  | 6.46  |
| ราง Switch ตอนปิด               | `--switch-track`             | `--background`                    | 3:1   | 3.93  | 4.05  |
| ปุ่มเลื่อน Switch ตอนปิด            | `--switch-thumb`             | `--switch-track`                  | 3:1   | 3.93  | 4.68  |
| ปุ่มเลื่อน Switch ตอนเปิด           | `--switch-thumb-checked`     | `--control-checked-bg`            | 3:1   | 4.93  | 6.46  |
| แท็บที่ไม่ได้เลือก                   | `--tabs-trigger-fg`          | `--tabs-list-bg`                  | 4.5:1 | 5.41  | 6.14  |
| แท็บที่เลือก                       | `--tabs-trigger-active-fg`   | `--tabs-trigger-active-bg`        | 4.5:1 | 19.59 | 12.71 |
| แท็บ line ที่ไม่ได้เลือก             | `--tabs-trigger-fg`          | `--background`                    | 4.5:1 | 5.97  | 8.43  |
| เส้นใต้แท็บ line                  | `--tabs-indicator`           | `--background`                    | 3:1   | 19.59 | 18.93 |
| แถบ Progress บนราง             | `--progress-indicator`       | `--progress-track`                | 3:1   | 4.74  | 5.09  |
| รายการเมนูที่ไฮไลต์                | `--menu-item-highlight-fg`   | `--menu-item-highlight-bg`        | 4.5:1 | 15.37 | 13.79 |
| หัวข้อกลุ่มในเมนู                   | `--menu-label-fg`            | `--popover`                       | 4.5:1 | 5.97  | 7.30  |
| รายการลบในเมนู                  | `--menu-destructive-fg`      | `--popover`                       | 4.5:1 | 6.52  | 6.98  |
| รายการลบที่ไฮไลต์                 | `--menu-destructive-fg`      | `--menu-destructive-highlight-bg` | 4.5:1 | 5.46  | 4.91  |
| Tooltip                        | `--tooltip-fg`               | `--tooltip-bg`                    | 4.5:1 | 19.59 | 18.93 |
| วันที่เลือกใน Calendar             | `--calendar-day-selected-fg` | `--calendar-day-selected-bg`      | 4.5:1 | 4.93  | 6.46  |
| วันกลางช่วงใน Calendar           | `--foreground`               | `--calendar-range-bg`             | 4.5:1 | 17.76 | 13.79 |
| ชื่อวันใน Calendar                | `--calendar-label-fg`        | `--popover`                       | 4.5:1 | 5.97  | 7.30  |
| Toggle ที่ไม่ได้กด                 | `--toggle-fg`                | `--background`                    | 4.5:1 | 5.97  | 8.43  |
| Toggle ตอน hover               | `--toggle-hover-fg`          | `--toggle-hover-bg`               | 4.5:1 | 17.76 | 13.79 |
| Toggle ที่กดอยู่                   | `--toggle-pressed-fg`        | `--toggle-pressed-bg`             | 4.5:1 | 17.76 | 13.79 |
| ขอบ Toggle ที่กดอยู่               | `--toggle-pressed-border`    | `--background`                    | 3:1   | 3.93  | 4.05  |
| ข้อความใน ButtonGroup           | `--button-group-text-fg`     | `--button-group-text-bg`          | 4.5:1 | 17.76 | 13.79 |
| Kbd                            | `--kbd-fg`                   | `--kbd-bg`                        | 4.5:1 | 5.41  | 6.14  |
| Kbd ในกล่องลอย                  | `--kbd-fg`                   | `--kbd-bg`                        | 4.5:1 | 5.41  | 6.14  |
| Kbd ใน Tooltip                 | `--kbd-tooltip-fg`           | `--kbd-tooltip-bg`                | 4.5:1 | 10.96 | 14.60 |
| ช่วงที่เลือกของ Slider บนราง       | `--slider-range`             | `--slider-track`                  | 3:1   | 4.74  | 5.09  |
| ขอบราง Slider                  | `--slider-track-border`      | `--background`                    | 3:1   | 3.93  | 4.05  |
| ขอบปุ่มเลื่อน Slider               | `--slider-thumb-border`      | `--background`                    | 3:1   | 5.23  | 6.99  |
| ปุ่มเลื่อน Slider บนช่วงที่เลือก       | `--slider-thumb-bg`          | `--slider-range`                  | 3:1   | 5.23  | 6.99  |
| แถบเลื่อนของ ScrollArea          | `--scroll-area-thumb`        | `--background`                    | 3:1   | 3.93  | 4.05  |
| สีกราฟชุดที่ 1                     | `--chart-1`                  | `--background`                    | 3:1   | 5.23  | 6.99  |
| สีกราฟชุดที่ 1 ใน Card             | `--chart-1`                  | `--card`                          | 3:1   | 5.23  | 6.05  |
| สีกราฟชุดที่ 2                     | `--chart-2`                  | `--background`                    | 3:1   | 5.15  | 8.29  |
| สีกราฟชุดที่ 2 ใน Card             | `--chart-2`                  | `--card`                          | 3:1   | 5.15  | 7.17  |
| สีกราฟชุดที่ 3                     | `--chart-3`                  | `--background`                    | 3:1   | 6.18  | 7.25  |
| สีกราฟชุดที่ 3 ใน Card             | `--chart-3`                  | `--card`                          | 3:1   | 6.18  | 6.28  |
| สีกราฟชุดที่ 4                     | `--chart-4`                  | `--background`                    | 3:1   | 6.13  | 7.30  |
| สีกราฟชุดที่ 4 ใน Card             | `--chart-4`                  | `--card`                          | 3:1   | 6.13  | 6.31  |
| สีกราฟชุดที่ 5                     | `--chart-5`                  | `--background`                    | 3:1   | 4.60  | 10.30 |
| สีกราฟชุดที่ 5 ใน Card             | `--chart-5`                  | `--card`                          | 3:1   | 4.60  | 8.91  |

<!-- /generated:contrast -->

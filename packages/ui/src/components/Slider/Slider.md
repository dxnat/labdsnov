# Slider (แถบเลื่อนเลือกค่า)

## Purpose

เลือกตัวเลข (หรือช่วงตัวเลข) ภายในขอบเขตที่กำหนด โดยลากหรือกดปุ่มลูกศร

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import { Label, Slider } from "labdsnov"

<Label id="rate-label">อัตราเงินสมทบเพิ่มเติม {rate}%</Label>
<Slider
  value={rate}
  onValueChange={(v) => setRate(v as number)}
  min={0}
  max={15}
  step={0.5}
  getAriaLabel={() => "อัตราเงินสมทบเพิ่มเติม"}
  getAriaValueText={(formatted) => `${formatted}% ของเงินเดือน`}
/>
```

- **ตั้งชื่อเสมอ** ด้วย `getAriaLabel` และใส่ `getAriaValueText` ให้มีหน่วย (%, บาท, ปี)
- **แสดงค่าที่เลือกเป็นตัวเลข** ข้าง ๆ เสมอ ตำแหน่งปุ่มอย่างเดียวอ่านค่าแม่นไม่ได้
- ตัวเลขจัดรูปแบบภาษาไทย (`locale="th-TH"`) เปลี่ยนได้ด้วย `locale` และ `format`

## When to use

- ค่าที่ไม่ต้องแม่นยำมากและอยากเห็นผลทันที เช่น อัตราเงินสมทบ 0–15% ในเครื่องคำนวณ
- ช่วงค่า เช่น อายุ 30–60 ปี (`value` สองค่า)

## When not to use

| สถานการณ์               | ใช้แทน                                  |
| ---------------------- | -------------------------------------- |
| จำนวนเงินที่ต้องพิมพ์แม่นยำ   | `Input type="number"` หรือ `InputGroup` |
| ตัวเลือกไม่กี่ค่าที่มีชื่อ        | `RadioGroup` หรือ `ToggleGroup`         |
| แสดงความคืบหน้า (กดไม่ได้) | `Progress`                             |

TODO: ยังไม่ได้ตัดสินใจว่าเครื่องคำนวณควรมีช่องพิมพ์ค่าคู่กับ Slider หรือไม่

## Props and variants

| Prop                      | ค่า                                     | ค่าเริ่มต้น      | ความหมาย                                  |
| ------------------------- | -------------------------------------- | ------------ | ----------------------------------------- |
| `value` / `onValueChange` | ตัวเลข หรือ array สองค่า / ฟังก์ชัน          | –            | ควบคุมค่าจากภายนอก                          |
| `defaultValue`            | ตัวเลข หรือ array สองค่า                  | `min`        | ค่าเริ่มต้น array = มีสองปุ่ม (ช่วง)              |
| `min` / `max`             | ตัวเลข                                  | `0` / `100`  | ขอบเขต                                    |
| `step` / `largeStep`      | ตัวเลข                                  | `1` / `10`   | ระยะต่อการกดลูกศร / Page Up-Down            |
| `orientation`             | `horizontal`, `vertical`               | `horizontal` | แนวนอนเต็มความกว้าง หรือแนวตั้งสูงอย่างน้อย 160px |
| `getAriaLabel`            | `(index) => ข้อความ`                    | –            | ชื่อของแต่ละปุ่ม                               |
| `getAriaValueText`        | `(formatted, value, index) => ข้อความ`  | –            | ข้อความที่อ่านออกเสียงสำหรับค่า                  |
| `format` / `locale`       | ตัวเลือกของ `Intl.NumberFormat` / locale | – / `th-TH`  | รูปแบบตัวเลข                                |
| `disabled`                | `boolean`                              | `false`      | ปิดใช้งาน จางลง 50%                         |

หน้าตา: รางสูง 8px มีขอบ (contrast 3:1) ช่วงที่เลือกสีหลัก ปุ่มเลื่อน 24×16px พื้นขาวขอบสีหลัก

- **คีย์บอร์ด**: ลูกศรเลื่อนทีละ `step`, Page Up/Down ทีละ `largeStep`, Home/End ไปสุดขอบ
- **Focus**: วงแหวนทึบสี `--focus-ring` รอบปุ่มเลื่อน เว้นระยะ 2px

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token                   | โหมดสว่าง           | โหมดมืด | ใช้ใน                                          |
| ----------------------- | ------------------ | ------ | --------------------------------------------- |
| `--slider-track-border` | `--control-border` | –      | ขอบราง (contrast 3:1)                         |
| `--slider-track`        | `--muted`          | –      | ราง                                           |
| `--slider-range`        | `--primary`        | –      | ช่วงที่เลือก                                      |
| `--slider-thumb-border` | `--primary`        | –      | ขอบปุ่มเลื่อน                                     |
| `--slider-thumb-bg`     | `--background`     | –      | พื้นปุ่มเลื่อน                                      |
| `--focus-ring`          | `--ring`           | –      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px) |

### Semantic tokens

| Token              | โหมดสว่าง                    | โหมดมืด                      | ใช้ใน                        |
| ------------------ | --------------------------- | --------------------------- | --------------------------- |
| `--ring`           | `oklch(0.45 0.03 106.9)`    | `oklch(0.8 0.02 106.9)`     | วงแหวน focus                |
| `--background`     | `oklch(1 0 0)`              | `oklch(0.153 0.006 107.1)`  | ระยะเว้นรอบวงแหวน focus      |
| `--control-border` | `oklch(0.6 0.02 106.9)`     | `oklch(0.55 0.015 106.9)`   | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--muted`          | `oklch(0.966 0.005 106.5)`  | `oklch(0.286 0.016 107.4)`  | ผ่าน token ของคอมโพเนนต์ด้านบน |
| `--primary`        | `oklch(0.553 0.195 38.402)` | `oklch(0.705 0.187 47.604)` | ผ่าน token ของคอมโพเนนต์ด้านบน |

## Example

จาก story `Range` ใน `Slider.stories.tsx`:

```tsx
<Slider
  defaultValue={[30, 60]}
  min={18}
  max={75}
  getAriaLabel={(index) => (index === 0 ? "อายุต่ำสุด" : "อายุสูงสุด")}
  getAriaValueText={(formatted) => `${formatted} ปี`}
/>
```

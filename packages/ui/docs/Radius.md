# Radius (มุมโค้ง)

## Purpose

มุมโค้งทั้งหมดคำนวณจาก token เดียว `--radius` (`0.625rem` = 10px) เปลี่ยนค่านี้แล้วทุกคอมโพเนนต์โค้งมากขึ้นหรือน้อยลงตามสัดส่วน

## Scale

| ระดับ   | ค่า               | px   | ใช้ใน                                                        |
| ------ | ---------------- | ---- | ----------------------------------------------------------- |
| `sm`   | `--radius × 0.6` | 6px  | ลิงก์ใน Breadcrumb (วงแหวน focus)                             |
| `md`   | `--radius × 0.8` | 8px  | –                                                           |
| `lg`   | `--radius`       | 10px | –                                                           |
| `xl`   | `--radius × 1.4` | 14px | Tooltip, ไอคอนใน Empty, tooltip ของ Chart                   |
| `2xl`  | `--radius × 1.8` | 18px | Textarea, Alert, Accordion, Skeleton, รายการในเมนู, แท็บแนวตั้ง |
| `3xl`  | `--radius × 2.2` | 22px | Input, Select, Badge, InputOTP, Popover, เมนู                |
| `4xl`  | `--radius × 2.6` | 26px | Button, Card, Dialog, AlertDialog, Drawer                   |
| `full` | วงกลม/แคปซูล      | –    | Avatar, Switch, RadioGroup, Progress, Tabs                  |

- Checkbox ใช้ 5px ตายตัว (กล่อง 16px)
- **หน้าตาโดยรวม**: ปุ่มและช่องกรอกเป็นทรงแคปซูล กล่องใหญ่ (Card, Dialog) โค้งมาก
- **ในแอปที่ใช้ Tailwind**: `rounded-2xl` ฯลฯ ได้ค่าตามตารางนี้เฉพาะเมื่อแอปมี `@theme inline` แบบเดียวกับ `theme.css` (ค่าปกติของ Tailwind ต่างกัน เช่น `rounded-4xl` = 32px) ไม่อย่างนั้นใช้ `rounded-[calc(var(--radius)*2.6)]`
- **ของที่ซ้อนกัน**: มุมด้านในควรโค้งน้อยกว่ามุมด้านนอก (ด้านใน ≈ ด้านนอก − ระยะห่าง) เช่น ปุ่มใน Card

TODO: ยังไม่ได้ตัดสินใจว่าจะมี token มุมโค้งเฉพาะคอมโพเนนต์ (เช่น `--button-radius`) หรือไม่

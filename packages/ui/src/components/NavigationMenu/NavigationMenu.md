# NavigationMenu (เมนูนำทาง)

## Purpose

แถบเมนูหลักของเว็บ มีลิงก์ตรงและเมนูที่เปิดแผงลิงก์ย่อย

## Import and usage

**ตั้งค่าครั้งเดียวในแอป** (ใช้ร่วมกันทุกคอมโพเนนต์):

1. ติดตั้ง `labdsnov` พร้อม `react`, `react-dom` และ `next` (ต้องเป็นแอป Next.js) TODO: ยังไม่ได้เผยแพร่บน npm ตอนนี้ใช้ได้เฉพาะใน monorepo นี้ (`"labdsnov": "workspace:*"`)
2. import สไตล์ครั้งเดียวที่ root layout: `import "labdsnov/styles.css"`
3. กำหนดตัวแปร `--font-heading` (แอปใช้ IBM Plex Sans Thai) และใส่ class `dark` ที่ `<html>` เมื่อต้องการโหมดมืด

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "labdsnov"

;<NavigationMenu aria-label="เมนูหลัก">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
        หน้าแรก
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>บัญชีของฉัน</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/transactions">ธุรกรรม</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

- ลิงก์ระดับบนที่ไม่มีแผงย่อย ใส่ `className={navigationMenuTriggerStyle()}` ให้หน้าตาเหมือนปุ่มเปิดเมนู
- ใส่ `aria-label` ให้เมนูเมื่อมีเมนูนำทางหลายชุดในหน้า
- ลิงก์ของ Next.js ใช้ `render={<Link href="…" />}`

## When to use

- เมนูหลักบนจอกว้าง ที่มีหมวดหมู่และลิงก์ย่อย เช่น บัญชีของฉัน / ลงทุน / เอกสาร

## When not to use

| สถานการณ์                  | ใช้แทน                                      |
| ------------------------- | ------------------------------------------ |
| เมนูบนมือถือ                 | TODO: ยังไม่ได้ออกแบบเมนูบนมือถือ (เช่น `Drawer`) |
| คำสั่งของรายการ (แก้ไข / ลบ) | `DropdownMenu`                             |
| สลับมุมมองในหน้าเดียวกัน       | `Tabs`                                     |
| บอกตำแหน่งของหน้าปัจจุบัน      | `Breadcrumb`                               |

## Props and variants

| ส่วน / Prop                                 | ความหมาย                                                    |
| ------------------------------------------ | ----------------------------------------------------------- |
| `NavigationMenu` `align`                   | การจัดแนวแผงย่อยตามปุ่ม: `start` (ค่าเริ่มต้น), `center`, `end`     |
| `NavigationMenu` `value` / `onValueChange` | ควบคุมว่าแผงไหนเปิด                                            |
| `NavigationMenuTrigger`                    | ปุ่มเปิดแผงย่อย มีลูกศรที่หมุนเมื่อเปิด                                 |
| `NavigationMenuContent`                    | แผงลิงก์ย่อย กำหนดความกว้างเอง เช่น `<ul className="grid w-80">` |
| `NavigationMenuLink` `active`              | หน้าปัจจุบัน: พื้นเทาจาง                                          |
| `NavigationMenuIndicator`                  | ลูกศรเล็กใต้ปุ่มที่เปิด (ไม่บังคับ)                                    |

### พฤติกรรมที่มีให้แล้ว

- เปิดแผงเมื่อชี้เมาส์หรือคลิก แผงทุกอันใช้กล่องเดียวกันที่เปลี่ยนขนาดและเลื่อนระหว่างแผง
- คีย์บอร์ด: Tab ไปที่ปุ่ม Enter/Space เปิด Escape ปิด TODO: ยังไม่ได้ตรวจการใช้ลูกศรระหว่างปุ่ม

## Tokens used

ค่าทั้งหมดมาจาก `src/styles/theme.css`

### Component tokens

token เฉพาะของคอมโพเนนต์นี้ ชี้ไปที่ semantic token ด้านล่าง เปลี่ยนที่นี่เพื่อปรับเฉพาะคอมโพเนนต์นี้ (โหมดมืด "–" = ใช้ค่าเดียวกับโหมดสว่าง)

| Token          | โหมดสว่าง | โหมดมืด | ใช้ใน                                          |
| -------------- | -------- | ------ | --------------------------------------------- |
| `--focus-ring` | `--ring` | –      | วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px) |

### Semantic tokens

| Token                  | โหมดสว่าง                   | โหมดมืด                     | ใช้ใน                                         |
| ---------------------- | -------------------------- | -------------------------- | -------------------------------------------- |
| `--muted`              | `oklch(0.966 0.005 106.5)` | `oklch(0.286 0.016 107.4)` | hover / focus ของปุ่มและลิงก์, ลิงก์ที่ active (50%) |
| `--popover`            | `oklch(1 0 0)`             | `oklch(0.228 0.013 107.4)` | พื้นแผงย่อย                                     |
| `--popover-foreground` | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | ตัวอักษรในแผง                                  |
| `--foreground`         | `oklch(0.153 0.006 107.1)` | `oklch(0.988 0.003 106.5)` | เส้นขอบบาง ๆ รอบแผง (5% สว่าง, 10% มืด)         |
| `--border`             | `oklch(0.93 0.007 106.5)`  | `oklch(1 0 0 / 10%)`       | ลูกศร indicator                               |
| `--ring`               | `oklch(0.45 0.03 106.9)`   | `oklch(0.8 0.02 106.9)`    | วงแหวน focus                                 |

## Example

จาก story `Playground` ใน `NavigationMenu.stories.tsx` (บางส่วน):

```tsx
<NavigationMenu aria-label="เมนูหลัก">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="#home" className={navigationMenuTriggerStyle()}>
        หน้าแรก
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>ลงทุน</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-64 gap-1">
          <li>
            <NavigationMenuLink href="#options">
              ตัวเลือกการลงทุน
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="#switch">เปลี่ยนแผน</NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

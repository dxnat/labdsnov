# Contributing (การพัฒนาระบบ)

## Purpose

ขั้นตอนเพิ่มหรือแก้คอมโพเนนต์และ token ให้เหมือนกันทั้งระบบ สำหรับนักพัฒนาและ AI agent (กฎแบบละเอียดอยู่ใน `AGENTS.md` ที่ root ของ repo)

## Setup

```bash
pnpm install
pnpm storybook        # http://localhost:6006
```

ห้าม `npm publish` / `pnpm publish` จนกว่าจะถึงรอบเผยแพร่

## Add a component

1. **สร้างโฟลเดอร์** `packages/ui/src/components/<Name>/` ที่มี 5 ไฟล์:

   | ไฟล์                  | เนื้อหา                                                                                     |
   | -------------------- | ----------------------------------------------------------------------------------------- |
   | `<Name>.tsx`         | คอมโพเนนต์ ครอบ `@base-ui/react` ไม่มี class ของ Tailwind ในไฟล์ map prop ไป class ของ module |
   | `<Name>.module.css`  | สไตล์ด้วย `@apply` ใน `@layer components` สีมาจาก component token เท่านั้น                      |
   | `index.ts`           | export ส่วนที่เป็น public                                                                     |
   | `<Name>.stories.tsx` | story ละสถานะ พร้อม `play` ตรวจพฤติกรรม ข้อความภาษาไทย                                       |
   | `<Name>.md`          | usage doc ภาษาไทย (ดูหัวข้อด้านล่าง)                                                           |

2. **export** จาก `packages/ui/src/index.ts` (เรียงตามตัวอักษร)
3. ถ้าคอมโพเนนต์ใช้ hook หรือ context ใส่ `"use client"` บรรทัดแรก และเพิ่มชื่อในรายการของ `AGENTS.md`
4. **ข้อความที่ผู้ใช้เห็น** (รวม `aria-label`) เป็นภาษาไทย วันที่เป็นปี พ.ศ.

## Styling rules

- **สี**: ใช้ component token แบบ `@apply bg-(--button-primary-bg) text-(--button-primary-fg);` ถ้ายังไม่มี เพิ่มใน `theme.css` (ดูหัวข้อ token ด้านล่าง) ไม่ใช้ค่าสีตรง ๆ หรือ `bg-primary/80`
- **Focus**: `focus-visible:border-(--focus-ring) focus-visible:ring-2 focus-visible:ring-(--focus-ring)` ทุกตัวที่โฟกัสได้
- **ข้อมูลไม่ถูกต้อง**: `aria-invalid:border-(--invalid-border) aria-invalid:ring-3 aria-invalid:ring-(--invalid-ring) aria-invalid:focus-visible:ring-2 aria-invalid:focus-visible:ring-(--invalid-border)`
- **โหมดมืด**: สีที่ต่างตามโหมดกำหนดใน `.dark` ของ `theme.css` ไม่ใช่ `:global(.dark)` ในไฟล์ module
- **ลำดับ**: กฎสถานะ (focus, invalid, disabled) อยู่หลังกฎ variant
- **มุมโค้ง**: ใช้ระดับจาก [Radius](./Radius.md) ไม่ใช้ค่า px ตรง ๆ

## Add or change a token

1. แก้ `packages/ui/src/styles/theme.css`
   - **semantic token**: ใส่ทั้งใน `:root` และ `.dark` และเพิ่มใน `@theme inline` ถ้าต้องการ utility ชื่อสั้น
   - **component token**: ใส่ใน `:root, .dark` ใต้ความเห็นชื่อกลุ่ม (เช่น `/* Button */`) ชี้ไปที่ semantic token ค่าที่ต่างในโหมดมืดใส่ใน `.dark` ด้านล่าง
2. เพิ่มคำอธิบายภาษาไทยของ token ใน `SEMANTIC_DESC` / `COMPONENT_DESC` ใน `packages/ui/scripts/tokens.mjs`
3. ถ้า token วางตัวอักษรหรือขอบบนพื้นใหม่ เพิ่มคู่ใน `CONTRAST_PAIRS`
4. รัน

   ```bash
   pnpm tokens:check   # ทุกคู่ต้องผ่าน WCAG AA
   pnpm tokens:docs    # สร้างตารางใน docs/Colors.md, ComponentTokens.md, Accessibility.md
   ```

5. แก้ตาราง "Tokens used" ใน `<Name>.md` ของคอมโพเนนต์ที่ใช้ token นั้น
6. ค่าสีมาจากแอป DSADV (`src/app/globals.css`) TODO: ยังไม่ได้ตัดสินใจว่าไฟล์ไหนเป็นต้นฉบับ แจ้งทีมแอปเมื่อเปลี่ยนค่า

## Write the usage doc

`<Name>.md` มีหัวข้อตามลำดับนี้ (ดูตัวอย่างใน [Button](../src/components/Button/Button.md)):

1. **Purpose**: หนึ่งบรรทัด
2. **Import and usage**: การตั้งค่าครั้งเดียวในแอป, import และตัวอย่างสั้น ๆ
3. **When to use** / **When not to use** (บอกว่าใช้อะไรแทน)
4. **Props and variants**: เฉพาะที่มีจริง
5. **Tokens used**: ตาราง "Component tokens" แล้วตาราง "Semantic tokens" พร้อมค่าโหมดสว่าง/มืด
6. **Example**: หนึ่งตัวอย่างที่ยกมาจาก story

- เขียนให้นักออกแบบและ AI agent อ่าน ไม่ใส่รายละเอียดการ implement (export, data attribute, class)
- สิ่งที่ยังไม่แน่ใจหรือยังไม่ได้ตัดสินใจ เขียนเป็น `TODO:` ห้ามเดา
- แก้ prop, variant, token หรือพฤติกรรม ต้องแก้ `.md` ใน change เดียวกัน
- story file import doc ด้วย `import guidelines from "./<Name>.md?raw"` แล้วส่งผ่าน `usageDoc()` เข้า `parameters.docs.description.component` เพื่อแสดงในหน้า Docs

## Write stories

- `tags: ["autodocs"]` และใช้ `fn()` กับ event prop
- หนึ่ง story ต่อหนึ่งสถานะ: disabled, `aria-invalid`, focus จากคีย์บอร์ด, โหมดมืด (`globals: { theme: "dark" }`)
- `play` ตรวจด้วยสถานะ (`aria-expanded`, `data-open`) ไม่ใช่ `toBeVisible()` เพราะ popup มี animation
- พิมพ์ข้อความใน `play` ใช้ `fireEvent.change` ไม่ใช่ `userEvent.type`
- popup ถูก portal ไปที่ `document.body` ค้นด้วย `screen` ไม่ใช่ `canvas`

## Before you open a pull request

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm tokens:check
```

- เปิด Storybook ดูทุก story ที่แก้ ทั้งโหมดสว่างและมืด และดูว่า `play` ผ่านในแผง Interactions
- hover และสถานะ `:active` บังคับใน story ไม่ได้ ตรวจด้วยมือ
- ตรวจ `packages/ui/dist/` ตามหัวข้อ "Checking a build" ใน `AGENTS.md`

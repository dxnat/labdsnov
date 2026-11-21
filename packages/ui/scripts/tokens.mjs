#!/usr/bin/env node
/*
 * Reads src/styles/theme.css and
 *   check  – computes WCAG contrast for every pair in CONTRAST_PAIRS, in light
 *            and dark mode, and exits 1 if one fails.
 *   docs   – rewrites the generated tables in docs/*.md (between
 *            <!-- generated:NAME --> and <!-- /generated:NAME -->).
 *
 * Usage: node scripts/tokens.mjs check | docs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const themePath = path.join(root, "src/styles/theme.css")
const docsDir = path.join(root, "docs")

// ---------- Contrast pairs ----------
// [foreground token, background token, minimum ratio, Thai label, page token under the background]
// 4.5 = text (WCAG 1.4.3), 3 = control edges, focus rings, states, chart marks (WCAG 1.4.11).
const CONTRAST_PAIRS = [
  ["foreground", "background", 4.5, "ตัวอักษรหลักบนพื้นหน้า"],
  ["card-foreground", "card", 4.5, "ตัวอักษรใน Card"],
  ["popover-foreground", "popover", 4.5, "ตัวอักษรในกล่องลอย"],
  ["muted-foreground", "background", 4.5, "คำอธิบายบนพื้นหน้า"],
  ["muted-foreground", "muted", 4.5, "คำอธิบายบนพื้น muted"],
  ["muted-foreground", "card", 4.5, "คำอธิบายใน Card"],
  ["muted-foreground", "popover", 4.5, "คำอธิบายในกล่องลอย"],
  ["muted-foreground", "accent", 4.5, "คำอธิบายในรายการที่ไฮไลต์"],
  ["field-placeholder", "field-bg", 4.5, "placeholder ในช่องกรอก"],
  ["foreground", "field-bg", 4.5, "ค่าในช่องกรอก"],
  ["field-border", "background", 3, "เส้นขอบช่องกรอก"],
  ["field-border", "card", 3, "เส้นขอบช่องกรอกใน Card", "card"],
  ["field-border", "popover", 3, "เส้นขอบช่องกรอกในกล่องลอย", "popover"],
  ["field-icon", "field-bg", 3, "ไอคอนในช่องกรอก"],
  ["focus-ring", "background", 3, "วงแหวน focus"],
  ["focus-ring", "card", 3, "วงแหวน focus ใน Card", "card"],
  ["focus-ring", "popover", 3, "วงแหวน focus ในกล่องลอย", "popover"],
  ["invalid-border", "background", 3, "เส้นขอบเมื่อไม่ถูกต้อง"],
  ["invalid-border", "card", 3, "เส้นขอบเมื่อไม่ถูกต้องใน Card", "card"],
  ["button-primary-fg", "button-primary-bg", 4.5, "Button default"],
  [
    "button-primary-fg",
    "button-primary-hover-bg",
    4.5,
    "Button default ตอน hover",
  ],
  ["button-secondary-fg", "button-secondary-bg", 4.5, "Button secondary"],
  [
    "button-secondary-fg",
    "button-secondary-hover-bg",
    4.5,
    "Button secondary ตอน hover",
  ],
  ["foreground", "button-outline-bg", 4.5, "Button outline"],
  [
    "button-hover-fg",
    "button-outline-hover-bg",
    4.5,
    "Button outline ตอน hover",
  ],
  ["button-hover-fg", "button-ghost-hover-bg", 4.5, "Button ghost ตอน hover"],
  ["button-destructive-fg", "button-destructive-bg", 4.5, "Button destructive"],
  [
    "button-destructive-fg",
    "button-destructive-hover-bg",
    4.5,
    "Button destructive ตอน hover",
  ],
  ["button-link-fg", "background", 4.5, "Button link"],
  ["badge-default-fg", "badge-default-bg", 4.5, "Badge default"],
  ["badge-secondary-fg", "badge-secondary-bg", 4.5, "Badge secondary"],
  ["badge-outline-fg", "background", 4.5, "Badge outline"],
  ["badge-destructive-fg", "badge-destructive-bg", 4.5, "Badge destructive"],
  [
    "badge-destructive-fg",
    "badge-destructive-bg",
    4.5,
    "Badge destructive ใน Card",
    "card",
  ],
  ["badge-success-fg", "badge-success-bg", 4.5, "Badge success"],
  ["badge-warning-fg", "badge-warning-bg", 4.5, "Badge warning"],
  ["destructive", "card", 4.5, "ข้อความผิดพลาดใน Card / Alert"],
  ["success", "background", 4.5, "ข้อความสำเร็จ"],
  ["warning", "background", 4.5, "ข้อความเตือน"],
  ["control-border", "control-bg", 3, "ขอบ Checkbox / Radio ที่ยังไม่เลือก"],
  ["control-checked-bg", "background", 3, "Checkbox / Radio ที่เลือกแล้ว"],
  ["control-checked-fg", "control-checked-bg", 3, "เครื่องหมายถูก / จุด"],
  ["switch-track", "background", 3, "ราง Switch ตอนปิด"],
  ["switch-thumb", "switch-track", 3, "ปุ่มเลื่อน Switch ตอนปิด"],
  ["switch-thumb-checked", "control-checked-bg", 3, "ปุ่มเลื่อน Switch ตอนเปิด"],
  ["tabs-trigger-fg", "tabs-list-bg", 4.5, "แท็บที่ไม่ได้เลือก"],
  ["tabs-trigger-active-fg", "tabs-trigger-active-bg", 4.5, "แท็บที่เลือก"],
  ["tabs-trigger-fg", "background", 4.5, "แท็บ line ที่ไม่ได้เลือก"],
  ["tabs-indicator", "background", 3, "เส้นใต้แท็บ line"],
  ["progress-indicator", "progress-track", 3, "แถบ Progress บนราง"],
  [
    "menu-item-highlight-fg",
    "menu-item-highlight-bg",
    4.5,
    "รายการเมนูที่ไฮไลต์",
    "popover",
  ],
  ["menu-label-fg", "popover", 4.5, "หัวข้อกลุ่มในเมนู"],
  ["menu-destructive-fg", "popover", 4.5, "รายการลบในเมนู"],
  [
    "menu-destructive-fg",
    "menu-destructive-highlight-bg",
    4.5,
    "รายการลบที่ไฮไลต์",
    "popover",
  ],
  ["tooltip-fg", "tooltip-bg", 4.5, "Tooltip"],
  [
    "calendar-day-selected-fg",
    "calendar-day-selected-bg",
    4.5,
    "วันที่เลือกใน Calendar",
  ],
  ["foreground", "calendar-range-bg", 4.5, "วันกลางช่วงใน Calendar"],
  ["calendar-label-fg", "popover", 4.5, "ชื่อวันใน Calendar", "popover"],
  ["toggle-fg", "background", 4.5, "Toggle ที่ไม่ได้กด"],
  ["toggle-hover-fg", "toggle-hover-bg", 4.5, "Toggle ตอน hover"],
  ["toggle-pressed-fg", "toggle-pressed-bg", 4.5, "Toggle ที่กดอยู่"],
  ["toggle-pressed-border", "background", 3, "ขอบ Toggle ที่กดอยู่"],
  ["button-group-text-fg", "button-group-text-bg", 4.5, "ข้อความใน ButtonGroup"],
  ["kbd-fg", "kbd-bg", 4.5, "Kbd"],
  ["kbd-fg", "kbd-bg", 4.5, "Kbd ในกล่องลอย", "popover"],
  ["kbd-tooltip-fg", "kbd-tooltip-bg", 4.5, "Kbd ใน Tooltip", "tooltip-bg"],
  ["slider-range", "slider-track", 3, "ช่วงที่เลือกของ Slider บนราง"],
  ["slider-track-border", "background", 3, "ขอบราง Slider"],
  ["slider-thumb-border", "background", 3, "ขอบปุ่มเลื่อน Slider"],
  ["slider-thumb-bg", "slider-range", 3, "ปุ่มเลื่อน Slider บนช่วงที่เลือก"],
  ["scroll-area-thumb", "background", 3, "แถบเลื่อนของ ScrollArea"],
  ...[1, 2, 3, 4, 5].flatMap((i) => [
    [`chart-${i}`, "background", 3, `สีกราฟชุดที่ ${i}`],
    [`chart-${i}`, "card", 3, `สีกราฟชุดที่ ${i} ใน Card`, "card"],
  ]),
]

// ---------- Descriptions (Thai) for the docs tables ----------
// Every token in theme.css needs one, so a new token can't ship undocumented.
const SEMANTIC_DESC = {
  background: "พื้นหน้า",
  foreground: "ตัวอักษรหลัก",
  card: "พื้น Card",
  "card-foreground": "ตัวอักษรใน Card",
  popover: "พื้นกล่องลอย (Popover, เมนู, Dialog)",
  "popover-foreground": "ตัวอักษรในกล่องลอย",
  primary: "สีหลักของแบรนด์ (ส้ม): ปุ่มหลัก, ตัวเลือกที่เลือกแล้ว, ลิงก์",
  "primary-foreground": "ตัวอักษรบน `--primary`",
  secondary: "พื้นปุ่ม/ป้ายรอง",
  "secondary-foreground": "ตัวอักษรบน `--secondary`",
  muted: "พื้นจาง (แคปซูลแท็บ, Skeleton, ราง Progress)",
  "muted-foreground": "ตัวอักษรรอง: คำอธิบาย, placeholder, หัวข้อกลุ่ม",
  accent: "พื้นรายการที่ไฮไลต์ในเมนู",
  "accent-foreground": "ตัวอักษรบน `--accent`",
  destructive: "ข้อผิดพลาด การกระทำที่ลบหรือย้อนกลับไม่ได้ (ใช้เป็นตัวอักษรหรือพื้นจาง)",
  success: "สำเร็จ ความเสี่ยงต่ำ (ใช้เป็นตัวอักษรหรือพื้นจาง)",
  warning: "รอดำเนินการ ความเสี่ยงปานกลาง (ใช้เป็นตัวอักษรหรือพื้นจาง)",
  border: "เส้นตกแต่ง: ขอบ Card, เส้นคั่น, ตาราง (ไม่ต้องผ่าน 3:1)",
  input: "พื้นจางของช่องกรอก (ใช้แบบโปร่งแสง)",
  "control-border": "ขอบที่บอกว่าเป็นช่องกรอกหรือตัวควบคุม (ต้องผ่าน 3:1)",
  ring: "สีวงแหวน focus",
  "chart-1": "สีกราฟชุดที่ 1: ส้ม (สีหลัก)",
  "chart-2": "สีกราฟชุดที่ 2: เขียวอมฟ้า",
  "chart-3": "สีกราฟชุดที่ 3: น้ำเงิน",
  "chart-4": "สีกราฟชุดที่ 4: ชมพูม่วง",
  "chart-5": "สีกราฟชุดที่ 5: เขียว",
  radius: "ฐานของมุมโค้งทั้งหมด (ดู Radius)",
  sidebar: "พื้นแถบข้าง (สำหรับแอป ยังไม่มีคอมโพเนนต์ใช้)",
  "sidebar-foreground": "ตัวอักษรในแถบข้าง",
  "sidebar-primary": "สีหลักในแถบข้าง",
  "sidebar-primary-foreground": "ตัวอักษรบน `--sidebar-primary`",
  "sidebar-accent": "รายการที่ไฮไลต์ในแถบข้าง",
  "sidebar-accent-foreground": "ตัวอักษรบน `--sidebar-accent`",
  "sidebar-border": "เส้นในแถบข้าง",
  "sidebar-ring": "วงแหวน focus ในแถบข้าง",
}
const COMPONENT_DESC = {
  "focus-ring": "วงแหวน focus จากคีย์บอร์ดของทุกคอมโพเนนต์ (ทึบ 2px)",
  "invalid-border": "เส้นขอบเมื่อข้อมูลไม่ถูกต้อง และวงแหวน focus ขณะไม่ถูกต้อง",
  "invalid-ring": "วงแหวนจางรอบช่องที่ไม่ถูกต้อง (ตกแต่ง)",
  "button-primary-bg": "พื้น `default`",
  "button-primary-fg": "ตัวอักษร `default`",
  "button-primary-hover-bg": "พื้น `default` ตอน hover",
  "button-secondary-bg": "พื้น `secondary`",
  "button-secondary-fg": "ตัวอักษร `secondary`",
  "button-secondary-hover-bg": "พื้น `secondary` ตอน hover",
  "button-outline-bg": "พื้น `outline`",
  "button-outline-border": "เส้นขอบ `outline`",
  "button-outline-hover-bg": "พื้น `outline` ตอน hover / เปิดเมนู",
  "button-ghost-hover-bg": "พื้น `ghost` ตอน hover / เปิดเมนู",
  "button-hover-fg": "ตัวอักษร `outline` / `ghost` ตอน hover",
  "button-destructive-bg": "พื้น `destructive`",
  "button-destructive-hover-bg": "พื้น `destructive` ตอน hover",
  "button-destructive-fg": "ตัวอักษร `destructive`",
  "button-link-fg": "ตัวอักษร `link`",
  "badge-default-bg": "พื้น `default`",
  "badge-default-fg": "ตัวอักษร `default`",
  "badge-secondary-bg": "พื้น `secondary`",
  "badge-secondary-fg": "ตัวอักษร `secondary`",
  "badge-outline-border": "เส้นขอบ `outline`",
  "badge-outline-fg": "ตัวอักษร `outline`",
  "badge-destructive-bg": "พื้น `destructive`",
  "badge-destructive-fg": "ตัวอักษร `destructive`",
  "badge-success-bg": "พื้น `success`",
  "badge-success-fg": "ตัวอักษร `success`",
  "badge-warning-bg": "พื้น `warning`",
  "badge-warning-fg": "ตัวอักษร `warning`",
  "field-bg": "พื้นช่องกรอก",
  "field-border": "เส้นขอบช่องกรอก",
  "field-placeholder": "placeholder",
  "field-icon": "ไอคอนในช่อง เช่น ลูกศร",
  "control-bg": "พื้นตอนยังไม่เลือก",
  "control-checked-bg": "พื้นและเส้นขอบตอนเลือก",
  "control-checked-fg": "เครื่องหมายถูก / จุด ตอนเลือก",
  "switch-track": "ราง Switch ตอนปิด",
  "switch-thumb": "ปุ่มเลื่อน Switch ตอนปิด",
  "switch-thumb-checked": "ปุ่มเลื่อน Switch ตอนเปิด",
  "tabs-list-bg": "พื้นแคปซูล (`default`)",
  "tabs-trigger-fg": "ตัวอักษรแท็บที่ไม่ได้เลือก",
  "tabs-trigger-active-bg": "พื้นแท็บที่เลือก (`default`)",
  "tabs-trigger-active-fg": "ตัวอักษรแท็บที่เลือก และตอน hover",
  "tabs-indicator": "เส้นใต้แท็บที่เลือก (`line`)",
  "progress-track": "ราง",
  "progress-indicator": "แถบความคืบหน้า",
  "menu-item-highlight-bg": "พื้นรายการที่ไฮไลต์",
  "menu-item-highlight-fg": "ตัวอักษรรายการที่ไฮไลต์",
  "menu-label-fg": "หัวข้อกลุ่ม, ปุ่มลัด",
  "menu-destructive-fg": "ตัวอักษรรายการลบ",
  "menu-destructive-highlight-bg": "พื้นรายการลบที่ไฮไลต์",
  "tooltip-bg": "พื้นและลูกศร",
  "tooltip-fg": "ตัวอักษร",
  "calendar-day-selected-bg": "พื้นวันที่เลือก (และต้น/ปลายช่วง)",
  "calendar-day-selected-fg": "ตัวอักษรวันที่เลือก",
  "calendar-range-bg": "พื้นวันกลางช่วง",
  "calendar-today-bg": "พื้นวันนี้",
  "calendar-label-fg": "ชื่อวันในสัปดาห์, เลขสัปดาห์",
  "toggle-fg": "ตัวอักษร/ไอคอนตอนไม่ได้กด",
  "toggle-hover-bg": "พื้นตอน hover",
  "toggle-hover-fg": "ตัวอักษรตอน hover",
  "toggle-pressed-bg": "พื้นตอนกดอยู่ / เลือกอยู่",
  "toggle-pressed-fg": "ตัวอักษรตอนกดอยู่ / เลือกอยู่",
  "toggle-pressed-border": "ขอบตอนกดอยู่ (contrast 3:1)",
  "toggle-outline-border": "ขอบ variant `outline` ตอนไม่ได้กด",
  "button-group-text-bg": "พื้น `ButtonGroupText`",
  "button-group-text-fg": "ตัวอักษร `ButtonGroupText`",
  "button-group-separator": "เส้นคั่นระหว่างปุ่ม",
  "kbd-bg": "พื้นปุ่มคีย์บอร์ด",
  "kbd-fg": "ตัวอักษรปุ่มคีย์บอร์ด",
  "kbd-tooltip-bg": "พื้นปุ่มคีย์บอร์ดใน Tooltip",
  "kbd-tooltip-fg": "ตัวอักษรปุ่มคีย์บอร์ดใน Tooltip",
  "slider-track": "ราง",
  "slider-track-border": "ขอบราง (contrast 3:1)",
  "slider-range": "ช่วงที่เลือก",
  "slider-thumb-bg": "พื้นปุ่มเลื่อน",
  "slider-thumb-border": "ขอบปุ่มเลื่อน",
  "scroll-area-thumb": "แถบเลื่อน",
}

// ---------- Parse theme.css ----------
function parseTheme() {
  const css = fs.readFileSync(themePath, "utf8")
  const semLight = {},
    semDark = {},
    comp = {},
    compDark = {},
    groups = []
  for (const [, rawSel, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = rawSel
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split(";")
      .pop()
      .split(",")
      .map((s) => s.trim())
      .join(",")
    const isRoot = sel === ":root",
      isDark = sel === ".dark",
      isComp = sel === ":root,.dark"
    if (!isRoot && !isDark && !isComp) continue
    let group = null
    for (const line of body.split("\n")) {
      const c = line.match(/^\s*\/\*\s*(.+?)\s*\*\/\s*$/)
      if (c && isComp) {
        group = { name: c[1], tokens: [] }
        groups.push(group)
        continue
      }
      const m = line.match(/^\s*--([\w-]+):\s*([^;]+);/)
      if (!m) continue
      const [, k, v] = m,
        val = v.trim().replace(/\s+/g, " ")
      if (isComp) {
        comp[k] = val
        group?.tokens.push(k)
      } else if (isRoot) semLight[k] = val
      else if (k in comp) compDark[k] = val
      else semDark[k] = val
    }
  }
  return { semLight, semDark, comp, compDark, groups }
}

// ---------- Colour maths (OKLab, WCAG 2 relative luminance) ----------
function splitTop(s) {
  const out = []
  let depth = 0,
    cur = ""
  for (const ch of s) {
    if (ch === "(") depth++
    if (ch === ")") depth--
    if (ch === "," && depth === 0) {
      out.push(cur.trim())
      cur = ""
    } else cur += ch
  }
  out.push(cur.trim())
  return out
}
function parseColor(vars, v, depth = 0) {
  if (depth > 20) throw new Error(`reference loop at ${v}`)
  v = v.trim()
  let m
  if (v === "transparent") return { lab: [0, 0, 0], alpha: 0 }
  if (v === "black") return { lab: [0, 0, 0], alpha: 1 }
  if (v === "white") return { lab: [1, 0, 0], alpha: 1 }
  if ((m = v.match(/^var\(--([\w-]+)\)$/))) {
    if (!(m[1] in vars)) throw new Error(`unknown token --${m[1]}`)
    return parseColor(vars, vars[m[1]], depth + 1)
  }
  if (
    (m = v.match(
      /^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\)$/
    ))
  ) {
    const h = (+m[3] * Math.PI) / 180
    return {
      lab: [+m[1], +m[2] * Math.cos(h), +m[2] * Math.sin(h)],
      alpha: m[4] ? +m[4] / (m[5] ? 100 : 1) : 1,
    }
  }
  if ((m = v.match(/^color-mix\(in oklab,(.*)\)$/))) {
    const [a, b] = splitTop(m[1]).map((part) => {
      const q = part.match(/^(.*?)(?:\s+([\d.]+)%)?$/)
      return {
        c: parseColor(vars, q[1], depth + 1),
        p: q[2] ? +q[2] / 100 : null,
      }
    })
    const pa = a.p ?? (b.p != null ? 1 - b.p : 0.5),
      pb = 1 - pa
    const alpha = a.c.alpha * pa + b.c.alpha * pb
    const lab =
      alpha === 0
        ? [0, 0, 0]
        : [0, 1, 2].map(
            (i) =>
              (a.c.lab[i] * a.c.alpha * pa + b.c.lab[i] * b.c.alpha * pb) /
              alpha
          )
    return { lab, alpha }
  }
  throw new Error(`can't parse colour "${v}"`)
}
function toSrgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
    .map((x) => Math.min(1, Math.max(0, x)))
    .map((x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055))
}
// Token painted over `under` (sRGB), alpha composited the way browsers do.
function paint(vars, token, under) {
  const c = parseColor(vars, `var(--${token})`)
  const rgb = toSrgb(c.lab)
  return c.alpha >= 1
    ? rgb
    : rgb.map((x, i) => x * c.alpha + under[i] * (1 - c.alpha))
}
const luminance = (rgb) => {
  const [r, g, b] = rgb.map((x) =>
    x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
function measure(theme) {
  const modes = {
    light: { ...theme.semLight, ...theme.comp },
    dark: {
      ...theme.semLight,
      ...theme.semDark,
      ...theme.comp,
      ...theme.compDark,
    },
  }
  return CONTRAST_PAIRS.map(
    ([fg, bg, min, label, pageToken = "background"]) => {
      const result = { fg, bg, min, label }
      for (const [mode, vars] of Object.entries(modes)) {
        const page = paint(vars, pageToken, [1, 1, 1])
        const bgRgb = paint(vars, bg, page)
        result[mode] = contrast(paint(vars, fg, bgRgb), bgRgb)
      }
      return result
    }
  )
}

// ---------- Docs ----------
function showRef(v) {
  if (v == null) return "–"
  let m
  if ((m = v.match(/^var\(--([\w-]+)\)$/))) return `\`--${m[1]}\``
  if (
    (m = v.match(
      /^color-mix\(in oklab, var\(--([\w-]+)\) (\d+)%, transparent\)$/
    ))
  )
    return `\`--${m[1]}\` ${m[2]}%`
  if (
    (m = v.match(
      /^color-mix\(in oklab, var\(--([\w-]+)\) (\d+)%, (black|white|var\(--([\w-]+)\))\)$/
    ))
  ) {
    const other =
      m[3] === "black" ? "ดำ" : m[3] === "white" ? "ขาว" : ` \`--${m[4]}\``
    return `\`--${m[1]}\` ผสม${other} ${100 - +m[2]}%`
  }
  return `\`${v}\``
}
function table(header, rows) {
  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n")
}
const pending = new Map()
function replaceGenerated(file, name, content) {
  const p = path.join(docsDir, file)
  const s = pending.get(p) ?? fs.readFileSync(p, "utf8")
  const re = new RegExp(
    `(<!-- generated:${name} -->)[\\s\\S]*?(<!-- /generated:${name} -->)`
  )
  if (!re.test(s))
    throw new Error(`${file}: missing <!-- generated:${name} --> markers`)
  pending.set(p, s.replace(re, `$1\n\n${content}\n\n$2`))
}
// Format with the repo's Prettier config so `pnpm format` doesn't fight the generator.
async function flush() {
  const prettier = await import("prettier")
  for (const [p, s] of pending) {
    const options = (await prettier.resolveConfig(p)) ?? {}
    fs.writeFileSync(p, await prettier.format(s, { ...options, filepath: p }))
  }
}
function writeDocs(theme, results) {
  const missing = [
    ...Object.keys(theme.semLight).filter((k) => !(k in SEMANTIC_DESC)),
    ...Object.keys(theme.comp).filter((k) => !(k in COMPONENT_DESC)),
  ]
  if (missing.length)
    throw new Error(
      `add a description in scripts/tokens.mjs for: ${missing.map((k) => "--" + k).join(", ")}`
    )

  const semRows = (filter) =>
    Object.keys(theme.semLight)
      .filter(filter)
      .map((k) => [
        `\`--${k}\``,
        `\`${theme.semLight[k]}\``,
        k in theme.semDark ? `\`${theme.semDark[k]}\`` : "–",
        SEMANTIC_DESC[k],
      ])
  const head = ["Token", "โหมดสว่าง", "โหมดมืด", "ใช้กับ"]
  const isChart = (k) => k.startsWith("chart-"),
    isSidebar = (k) => k.startsWith("sidebar"),
    isRadius = (k) => k === "radius"
  replaceGenerated(
    "Colors.md",
    "semantic",
    table(
      head,
      semRows((k) => !isChart(k) && !isSidebar(k) && !isRadius(k))
    )
  )
  replaceGenerated("Colors.md", "chart", table(head, semRows(isChart)))
  replaceGenerated("Colors.md", "sidebar", table(head, semRows(isSidebar)))

  const groups = theme.groups.map(
    (g) =>
      `### ${g.name}\n\n` +
      table(
        head,
        g.tokens.map((k) => [
          `\`--${k}\``,
          showRef(theme.comp[k]),
          showRef(theme.compDark[k]),
          COMPONENT_DESC[k],
        ])
      )
  )
  replaceGenerated("ComponentTokens.md", "component", groups.join("\n\n"))

  const fmt = (r) => `${r.toFixed(2)}`
  replaceGenerated(
    "Accessibility.md",
    "contrast",
    table(
      ["คู่สี", "ตัวหน้า", "พื้น", "เกณฑ์", "สว่าง", "มืด"],
      results.map((r) => [
        r.label,
        `\`--${r.fg}\``,
        `\`--${r.bg}\``,
        `${r.min}:1`,
        fmt(r.light),
        fmt(r.dark),
      ])
    )
  )
}

// ---------- Main ----------
const cmd = process.argv[2]
const theme = parseTheme()
const results = measure(theme)
const failures = results.flatMap((r) =>
  ["light", "dark"].filter((m) => r[m] < r.min).map((m) => ({ ...r, mode: m }))
)
if (cmd === "check") {
  for (const f of failures)
    console.error(
      `FAIL ${f.mode.padEnd(5)} ${f[f.mode].toFixed(2)} < ${f.min}  --${f.fg} on --${f.bg}  (${f.label})`
    )
  console.log(
    failures.length
      ? `${failures.length} of ${results.length * 2} pairs fail WCAG AA`
      : `all ${results.length * 2} pairs pass WCAG AA`
  )
  process.exit(failures.length ? 1 : 0)
} else if (cmd === "docs") {
  writeDocs(theme, results)
  await flush()
  console.log(
    "updated docs/Colors.md, docs/ComponentTokens.md, docs/Accessibility.md"
  )
  if (failures.length)
    console.warn(
      `warning: ${failures.length} pairs fail; run \`pnpm tokens:check\``
    )
} else {
  console.error("usage: node scripts/tokens.mjs check | docs")
  process.exit(2)
}

import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "cn"

import styles from "./Slider.module.css"

type SliderProps = SliderPrimitive.Root.Props & {
  /** Accessible name of each thumb, e.g. `() => "อัตราเงินสมทบ"`. Needed when no `aria-labelledby` points at a visible label. */
  getAriaLabel?: SliderPrimitive.Thumb.Props["getAriaLabel"]
  /** Text read out for the value, e.g. `(formatted) => \`${formatted} ต่อเดือน\``. */
  getAriaValueText?: SliderPrimitive.Thumb.Props["getAriaValueText"]
}

/**
 * Pick a number (or a range, with a two-item `value`) by dragging or with the
 * arrow keys. Numbers are formatted in Thai (`locale="th-TH"`) unless set.
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  locale = "th-TH",
  getAriaLabel,
  getAriaValueText,
  ...props
}: SliderProps) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [value ?? defaultValue ?? min]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(styles.root, className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      locale={locale}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className={styles.control}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={styles.track}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={styles.range}
          />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            data-slot="slider-thumb"
            className={styles.thumb}
            getAriaLabel={getAriaLabel}
            getAriaValueText={getAriaValueText}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider, type SliderProps }

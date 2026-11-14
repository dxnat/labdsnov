import * as React from "react"
import Image from "next/image"
import { PieChartIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import styles from "./FundCard.module.css"

const unitPriceFormat = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const priceDateFormat = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

/** Local calendar date as YYYY-MM-DD (toISOString would shift it to UTC). */
function toDateAttr(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

type FundCardProps = Omit<React.ComponentProps<"article">, "children"> & {
  /** Investment option name, e.g. "สมดุล (Balanced)". */
  name: string
  /** Fund manager or fund name shown above the option name. */
  manager: string
  /** Price per unit in AUD, shown with 4 decimal places. */
  unitPrice: number
  /** Date the unit price applies to. */
  priceDate?: Date
  /** Square cover image; a placeholder is shown when omitted. */
  image?: { src: string; alt: string }
}

function FundCard({
  name,
  manager,
  unitPrice,
  priceDate,
  image,
  className,
  ...props
}: FundCardProps) {
  return (
    <article
      data-slot="fund-card"
      className={cn(styles.root, className)}
      {...props}
    >
      <div data-slot="fund-card-media" className={styles.media}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 40rem) 16rem, 50vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <HugeiconsIcon icon={PieChartIcon} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div data-slot="fund-card-body" className={styles.body}>
        <p className={styles.manager}>{manager}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>
          <span className={styles.priceValue}>
            {unitPriceFormat.format(unitPrice)}
          </span>
          <span className={styles.priceMeta}>
            ต่อหน่วย
            {priceDate && (
              <>
                {" · ณ วันที่ "}
                <time dateTime={toDateAttr(priceDate)}>
                  {priceDateFormat.format(priceDate)}
                </time>
              </>
            )}
          </span>
        </p>
      </div>
    </article>
  )
}

export { FundCard, type FundCardProps }

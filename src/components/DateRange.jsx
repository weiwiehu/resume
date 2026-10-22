import styles from './DateRange.module.css'

export default function DateRange({ start, end, presentLabel }) {
  return (
    <p className={styles.date}>
      {start.replace('-', '.')} – {end ? end.replace('-', '.') : presentLabel}
    </p>
  )
}

import styles from './Tags.module.css'

export default function Tags({ items }) {
  return (
    <ul className={styles.tags}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  )
}

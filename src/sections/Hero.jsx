import styles from './Hero.module.css'

export default function Hero({ basics, switchLabel, onSwitchLang }) {
  const github = basics.profiles.find((p) => p.network === 'GitHub')

  return (
    <header className={styles.hero}>
      <button type="button" className={styles.lang} onClick={onSwitchLang}>
        {switchLabel}
      </button>
      <h1>{basics.name}</h1>
      <p className={styles.label}>{basics.label}</p>
      <ul className={styles.contacts}>
        <li>{basics.location.city}</li>
        <li>
          <a href={`mailto:${basics.email}`}>{basics.email}</a>
        </li>
        {github && (
          <li>
            <a href={github.url} target="_blank" rel="noreferrer">
              <svg className={styles.icon} aria-hidden="true">
                <use href={`${import.meta.env.BASE_URL}icons.svg#github-icon`}></use>
              </svg>
              {github.username}
            </a>
          </li>
        )}
      </ul>
    </header>
  )
}

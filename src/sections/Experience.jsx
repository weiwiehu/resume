import { useEffect, useRef, useState } from 'react'
import DateRange from '../components/DateRange'
import Tags from '../components/Tags'
import styles from './Experience.module.css'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Experience({ title, items, presentLabel }) {
  const [open, setOpen] = useState(
    () => new Set(reduceMotion ? items.map((_, i) => i) : [0]),
  )
  const [focus, setFocus] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    if (reduceMotion) return
    // 段落頂端越過畫面 70% 基準線就展開，往回捲到基準線以下就收合（第一段固定展開）
    const openObserver = new IntersectionObserver(
      (entries) => {
        setOpen((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const i = Number(entry.target.dataset.index)
            if (i === 0) return
            const line = entry.rootBounds?.bottom ?? innerHeight * 0.7
            if (entry.boundingClientRect.top < line) next.add(i)
            else next.delete(i)
          })
          return next
        })
      },
      { rootMargin: '0px 0px -30% 0px' },
    )
    // 基準線所在的段落為焦點，其餘淡化；落在段落間空隙時維持上一個焦點
    const focusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setFocus(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-70% 0px -29% 0px' },
    )
    itemRefs.current.forEach((el) => {
      if (!el) return
      openObserver.observe(el)
      focusObserver.observe(el)
    })
    return () => {
      openObserver.disconnect()
      focusObserver.disconnect()
    }
  }, [items])

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section id="experience">
      <h2>{title}</h2>
      <ol className={styles.timeline}>
        {items.map((job, i) => {
          const isOpen = open.has(i)
          const bodyId = `experience-${i}`
          return (
            <li
              key={`${job.name}-${job.startDate}`}
              ref={(el) => (itemRefs.current[i] = el)}
              data-index={i}
              className={`${styles.item} ${isOpen ? styles.open : ''} ${
                !reduceMotion && i !== focus ? styles.dim : ''
              }`}
            >
              <div className={styles.header}>
                <h3>
                  <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={isOpen}
                    aria-controls={bodyId}
                    onClick={() => toggle(i)}
                  >
                    {job.position}
                    {job.type && <span className={styles.type}>{job.type}</span>}
                  </button>
                </h3>
                <DateRange start={job.startDate} end={job.endDate} presentLabel={presentLabel} />
              </div>
              <p>{job.name}</p>
              <div id={bodyId} className={styles.body} inert={!isOpen}>
                <div className={styles.inner}>
                  <p>{job.summary}</p>
                  <ul>
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <Tags items={job.keywords} />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

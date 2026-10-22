import DateRange from '../components/DateRange'

export default function Experience({ title, items, presentLabel }) {
  return (
    <section id="experience">
      <h2>{title}</h2>
      {items.map((job) => (
        <article key={`${job.name}-${job.startDate}`} className="entry">
          <h3>
            {job.position} · {job.name}
          </h3>
          <DateRange start={job.startDate} end={job.endDate} presentLabel={presentLabel} />
          <p>{job.summary}</p>
          <ul>
            {job.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

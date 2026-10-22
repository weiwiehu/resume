import DateRange from '../components/DateRange'

export default function Education({ title, items, presentLabel }) {
  return (
    <section id="education">
      <h2>{title}</h2>
      {items.map((edu) => (
        <article key={`${edu.institution}-${edu.startDate}`} className="entry">
          <h3>{edu.institution}</h3>
          <DateRange start={edu.startDate} end={edu.endDate} presentLabel={presentLabel} />
          <p>
            {edu.area} · {edu.studyType}
          </p>
        </article>
      ))}
    </section>
  )
}

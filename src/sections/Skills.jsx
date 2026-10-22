import Tags from '../components/Tags'

export default function Skills({ title, items }) {
  return (
    <section id="skills">
      <h2>{title}</h2>
      {items.map((skill) => (
        <article key={skill.name} className="entry">
          <h3>{skill.name}</h3>
          <Tags items={skill.keywords} />
        </article>
      ))}
    </section>
  )
}

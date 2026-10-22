import Tags from '../components/Tags'

export default function Projects({ title, items }) {
  return (
    <section id="projects">
      <h2>{title}</h2>
      {items.map((project) => (
        <article key={project.name} className="entry">
          <h3>
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          </h3>
          <p>{project.description}</p>
          <Tags items={project.keywords} />
        </article>
      ))}
    </section>
  )
}

interface RepositoryItemProps {
  repository: {
    name: string,
    description: string,
    html_url: string
  }
}

export const RepositoryItem = (props: RepositoryItemProps) => {
  return (
    <li>
      <strong>{props.repository.name}</strong>
      <p>{props.repository.description}</p>

      <a href={props.repository.html_url}>
        Acessar reposiótio
      </a>
    </li>
  )
}

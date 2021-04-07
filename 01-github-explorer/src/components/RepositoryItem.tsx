interface RepositoryItemProps {
    // para fazer essa prop ser opcional, bastaria fazer o seguinte: repository?: ... 
    repository: {
        name: string;
        description: string;
        html_url: string
    }
}

export function RepositoryItem(props: RepositoryItemProps) {
    return (
        <li>
            <strong>{props.repository.name ?? 'Default'}</strong>
            <p>{props.repository.description ?? ''}</p>

            <a href={props.repository.html_url ?? '#'}>
                Acessar Repositório
            </a>
        </li>
    );
}
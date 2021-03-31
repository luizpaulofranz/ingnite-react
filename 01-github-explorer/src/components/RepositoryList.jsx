import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';

export function RepositoryList() {

    // hook useState, retorna dois parametros, um eh a variavel em questão o outro eh o callBack q devemos executar para alterar essa vairavel
    // recebe como parametro o valor inicial da variavel que criamos repositories
    // funciona como o setState do react antigo, reexecuta essa function
    const [repositories, setRepositories] = useState([]);

    // useEffect substitui os antigos lifeCycle do react, primeiro parametro a function a ser chamada, o segundo a lista de 
    // variaveis que quando alteradas disparam o callBack, se passarmos uma lista vazia funciona como o componentDidMount, executa uma unica vez
    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
        .then( response => response.json())
        .then( data => setRepositories(data))
    }, []);

    return (
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>
            <ul>
                { repositories.map(repository => <RepositoryItem key={repository.name} repository={repository} />) }
            </ul>
        </section>
    );
}
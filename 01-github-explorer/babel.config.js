// Babel serve para transpilar codigos JS, principalmente das versoes ES6 para crossbrowser
// mas tambem para transpilar codigos jsx em js msm, como eh o caso.

module.exports = {
    // preset-env verifica qual o ambiente que meu código JS vai executar para melhorar a transpilação do código, se for browser ou node, ha diferencas
    // preset-react serve para o babel considerar o JSX do react
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript', // para usar o typescript, tivemos de adicionar como dep de desenvolvimento.
        ['@babel/preset-react', {
            runtime: 'automatic' // essa config adiciona o import do React automaticamente nos arquivos jsx
        }]
    ]
}
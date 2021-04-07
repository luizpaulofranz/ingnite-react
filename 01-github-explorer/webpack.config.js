/*
Usando esse cara, todos os nossos imports JS ficam agrupados em um unico arquivo bundle minificado.
diversas das dependencias de desenvolvimento sao utilizadas aqui nas configuracoes desse cara.
eh o Web-pack o responsável por orquestrar a criação do bundle final, delegando "loaders" pros diversos tipos
de arquivos que existem no projeto, como JSX, SASS, CSS etc.
*/

// webpack serve para converter os imports feitos dentro do JS para imports entendíveis dentro do browser por assim dizer
// por exemplo, não podemos importar um arquivo CSS em um arquivo JS e esperar que isso funcione no browser
// além disso, podemos configurar o webpack para pre-processar algumas coisas, como arquivos .sass por exemplo

// require eh o formato de import CommomJS usado pelo Node
// os import do JS sao do ES6 e nem todos os browsers dao suporte, babel passa tratando isso pra nos
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

// controle de ambiente de prod/dev
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    // essa configuracao eh para o source-maps, para podermos debugar o app pelo codigo escrito e não pelo codigo do bundle.js
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    // path controla os caminhos nos diferentes SOs
    // indica o ponto de entrada
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // indica onde isso vai ficar
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // extensoes que o webpack vai considerar e assim não precisamos colocar as extencoes nos imports do codigo react
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        // configura as regras de como os arquivos serao importados no bundle final
        rules: [
            // aqui configuramos os arquivos .jsx, devem ser processados pelo babel-loader
            {
                test: /\.(j|t)sx$/, // tanto para arquivos Jsx ou Tsx, typescript ou JS
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // integracao entre o babel e o webpack
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
                
            },
            {   // organiza os imports do CSS/SASS
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        // essa config injeta automaticamente o arquivo bundle.js no index.html, e joga n apasta dist
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        // esses && funcionam como um ternario sem o else, porem se for false isso retorna um false, por isso o filter abaixo
        isDevelopment && new ReactRefreshWebpackPlugin() // plugin pra manter o estado do app entre os hot-reloads (por isso apenas em dev)
    ].filter(Boolean),
    // esse cara controla 2 coisas, um é o efeito watch, para recriar o bundle.js ao alterar algum arquivo, e outro fornece um servidor na porta 8080.
    // eh o pacote web-pack-dev-server: só precisamos rodar yarn webpack serve
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'public'),
    }
}
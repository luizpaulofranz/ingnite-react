// utilizando o export assim, quem importa eh obrigado a importar uma variavel App.
// recomenda-se usar esse formato
export function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

// o export default, ao importar esse arquivo, sempre sera esse o modulo que vai ir pra la,
// não importando qual o nome q eu uso ao importar, exemplo: "import Batata from App.tsx"
// export default App;

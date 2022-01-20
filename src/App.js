import logo from './logo.svg';
import './App.css';
import ListadoResultados from './ListaResultados';
import FormularioNumeros from './FormNumerico';
import CoordenadaFlecha from './CoordenadasFlecha';
import { useState } from "react";
import { useEffect } from "react";

function App() {

  /** Propiedades */
  const [operaciones, setOperacion] = useState([])
  function sumar(event) {
    event.preventDefault();
    const v1 = parseInt(event.target.valor1.value, 10)
    const v2 = parseInt(event.target.valor2.value, 10)
    const suma = v1 + v2
    const nuevo = {
      resultado: suma,
      valor1: v1,
      valor2: v2
    }
    setOperacion([nuevo, ...operaciones])
    event.target.valor1.value = ''
    event.target.valor2.value = ''
  }

  /** Hook - useEffect */
  const [texto, setTexto] = useState("")
  useEffect(() => document.title = texto, [texto])
  function cambiar(e) {
    setTexto(e.target.value)
  }

  const [visible, setVisible] = useState(true)
  function ocultar() {
    setVisible(false)
  }

  /** Fetch - Recuperar datos de un Server */
  const [articulos, setArticulos] = useState([])
  const [recuperado, setRecuperado] = useState(false)
  function mostrarTabla() {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map(art => {
              return (
                <tr key={art.codigo}>
                  <td>{art.codigo}</td>
                  <td>{art.descripcion}</td>
                  <td>{art.precio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  useEffect(() => {
    fetch('http://scratchya.com.ar/react/datos.php')
      .then((response) => {
        return response.json()
      })
      .then((articulos) => {
        setArticulos(articulos)
        setRecuperado(true)
      })
  }, [])
  
  // Return App
  return (
    <div>
      <div>
        <h2>Propiedades</h2>
        <FormularioNumeros onSumarrrr={sumar} />
        <ListadoResultados resultados={operaciones} />
        </div>
        <div>
          <h2>Hook - useEffect</h2>
          <p><input type="text" onChange={cambiar} /></p>
          <p>{texto}</p>
        </div>
        <div>
          <h2>Coordenada Mousemove</h2>
          {visible ? <CoordenadaFlecha /> : <p>Se oculto la coordenada</p>}
          <button onClick={ocultar}>Ocultar</button>
        </div>
        <div>
          <h2>Fetch - Datos recuperado de un Server</h2>
          {recuperado ? mostrarTabla() : <div>recuperando datos...</div>}
        </div>
    </div>
  );
}

export default App;

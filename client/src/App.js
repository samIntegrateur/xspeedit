import {useEffect, useRef, useState} from 'react';

const API_URL = 'http://localhost:8200';

function App() {

  const articlesInput = useRef();

  const [results, setResults] = useState('');

  useEffect(() => {
    fetch(`${API_URL}`)
      .then(response => {
        console.log('test api url', response);
      });
  }, []);


  const getResults = () => {

    fetch(`${API_URL}/createBoxes?articles=${articlesInput.current.value || ''}`)
      .then(response => response.json())
      .then((results) => {
        setResults(results);
      })
  }

  return (
    <div className="App">
      <h1>XspeedIt</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <form className="form">

        <div  className="formGroup">
          <label className="formLabel" htmlFor="articles">
            Chaîne d'articles en entrée
          </label>
          <input defaultValue={163841689525773}
                 ref={articlesInput}
                 id="articles"
                 type="number"
                 className="formControl"
                 placeholder="Ex: 163841689525773" />
        </div>
        <button type="button" className="btn" onClick={getResults}>
          Calculer les emballages
        </button>
      </form>

      <div className="results">
        { results ? (
          <p>Chaîne d'articles emballées : <strong>{results}</strong></p>
        ) : ''}
      </div>
    </div>
  );
}

export default App;

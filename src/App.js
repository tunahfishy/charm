import logo from './logo.svg';
import './App.css';
// import useRef
import { useRef } from 'react'
import handleSubmit from './handles/handlesubmit';

function App() {
  const dataRef = useRef()

  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }

  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}


export default App;

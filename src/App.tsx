import "./App.css";
import { useRef } from "react";
import handleSubmit from "./handles/handlesubmit";
import React from "react";

function App() {
  const dataRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataRef.current) {
      handleSubmit(dataRef.current.value);
      dataRef.current.value = "";
    }
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;

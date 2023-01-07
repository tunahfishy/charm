import "./App.css";
import { useEffect, useRef } from "react";
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

  const get_auth_url = async () => {
    fetch("http://localhost:4000/auth/get_auth_url").then((res) => res.text()).then((url) => {
      // redirect the user
      window.open(url, '_blank', 'noreferrer');
    })
  }

  // send a GET request to the server
  useEffect(() => {

    /*
      .then((res) => res.json())
      .then((data) => console.log(data));
      */
  }, []);

  return (
    <div className="App">
      <button onClick={() => {
          get_auth_url()
        }}>Authorize Google</button>
      <form onSubmit={submitHandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;

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

function AuthRedirect() {
  useEffect(() => {
    console.log(window.location.search)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');

    console.log(code)
    if (code) {
      // send the code to the server side and redirect them to the home page
      fetch("http://localhost:4000/auth/save_credentials?code=" + code).then((res) => res.text()).then((token) => {
        window.location.href = "http://localhost:3000";
      })
    }
  }, []);
  return (
    <div className="App">
      <h1>Redirecting...</h1>
    </div>
  );
}

export {App, AuthRedirect};

import "./App.css";
import { useEffect, useRef } from "react";
import handleSubmit from "./handles/handlesubmit";
import React from "react";
// get variable from .env file
const { SERVER_URL, WEB_URL } = {
  SERVER_URL: "https://light-hounds-lie-186-209-159-5.loca.lt",
  WEB_URL: "https://3050-186-209-159-5.ngrok.io"
};

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
    console.log(SERVER_URL + "/auth/get_auth_url")
    fetch(SERVER_URL + "/auth/get_auth_url").then((res) => res.text()).then((url) => {
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
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');
    if (code) {
      /*
      fetch("https://red-items-kneel-186-209-159-5.loca.lt/ping/", {
        mode: 'cors',
        headers:{
          'Access-Control-Allow-Origin':'*'
        }
      }).then((res) => res.text()).then((token) => {
        console.log("Will redirect you")
        window.location.href = "http://localhost:3000";
      })*/

      // send the code to the server side and redirect them to the home page
      fetch(SERVER_URL + "/auth/save_credentials?code=" + code, {
        mode: 'cors',
        headers:{
          'Access-Control-Allow-Origin':'*'
        }
      }).then((res) => res.text()).then((token) => {
        console.log("Will redirect you")
        // @ts-ignore
        window.location.href = WEB_URL;
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

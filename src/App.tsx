import "./App.css";
import { useEffect, useRef } from "react";
import handleSubmit from "./handles/handlesubmit";
import React from "react";
import { Link, Button } from "@nextui-org/react";


function App() {
  // const dataRef = useRef<HTMLInputElement>(null);

  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (dataRef.current) {
  //     handleSubmit(dataRef.current.value);
  //     dataRef.current.value = "";
  //   }
  // };

  // send a GET request to the server
  useEffect(() => {
    /*
      .then((res) => res.json())
      .then((data) => console.log(data));
      */
  }, []);

  return (
    <div className="App">
      <div className={"home"}>
        <div className="title">ChaRM</div>
        <div className={"slogan"}>ChaRM Your Network</div>
        <Link href={`/profiles`}>
          <Button>Enter</Button>
        </Link>
      </div>

      {/* <form onSubmit={submitHandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form> */}
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

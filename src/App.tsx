import "./App.css";
import { useEffect, useRef } from "react";
import handleSubmit from "./handles/handlesubmit";
import React from "react";
import { Link, Button } from "@nextui-org/react";

// get variable from .env file
const { SERVER_URL, WEB_URL } = {
  SERVER_URL: "https://charmserver-production.up.railway.app",
  WEB_URL: "https://projectunicorn-2463b.web.app",
};

function App() {
  // const dataRef = useRef<HTMLInputElement>(null);

  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (dataRef.current) {
  //     handleSubmit(dataRef.current.value);
  //     dataRef.current.value = "";
  //   }
  // };

  const get_auth_url = async () => {
    console.log(SERVER_URL + "/auth/get_auth_url");
    fetch(SERVER_URL + "/auth/get_auth_url")
      .then((res) => res.text())
      .then((url) => {
        // redirect the user
        window.open(url, "_blank", "noreferrer");
      });
  };

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
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const scope = urlParams.get("scope");
    if (code) {
      console.log("Got the code")


      // send the code to the server side and redirect them to the home page
      fetch(SERVER_URL + "/auth/save_credentials?code=" + code, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.text())
        .then((token) => {
          console.log("Will redirect you");
          // @ts-ignore
          window.location.href = WEB_URL;
        });
    }
  }, []);
  return (
    <div className="App">
      <h1>Redirecting...</h1>
    </div>
  );
}

export { App, AuthRedirect };

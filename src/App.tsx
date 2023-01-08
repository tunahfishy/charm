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

export default App;

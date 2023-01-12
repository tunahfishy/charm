import { useEffect, useRef, useState } from "react";
import "../App.css";
import Profile from "../components/profile";

export default function Profiles() {
  const profiles = [{ name: "tinah" }, { name: "caine" }, { name: "boyd" }];
  const [ans, setAns] = useState<ReadableStream<Uint8Array> | null | []>([]);
  const dataRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/queryBios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { query: dataRef.current?.value },
      }),
    })
      .then(async (response) => {
        const data = response.json();
        data.then((data) => {
          console.log(data.body);
          setAns(data.body);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div className="layout">
        <div className="title">Network</div>
        {profiles.map((profile, key) => {
          return <Profile profile={profile["name"]} key={key}></Profile>;
        })}

        <div className="layout">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Query Your Network" ref={dataRef} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <p>{String(ans)}</p>
      </div>
    </div>
  );
}

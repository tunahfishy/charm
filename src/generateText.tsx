import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import "./App.css";
import { useEffect, useState, useInsertionEffect, useRef } from "react";
import { valid } from "semver";

const API_KEY = "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";
const MODEL_ID = "text-davinci-003";

const configuration = new Configuration({
  organization: "org-9AXU57OVamayjrkxMCoA4cwK",
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

function GenerateText(): JSX.Element {
  const [editableEmail, setEditableEmail] = useState("");
  const dataRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const response = axios
      .post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt: dataRef.current?.value,
          max_tokens: 2048,
          temperature: 0.5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((generatedText) => {
        console.log(generatedText.data.choices[0].text);
        setEditableEmail(generatedText.data.choices[0].text);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableEmail(e.target.value);
  };

  const handleSend = () => {
    // TODO
  };

  return (
    <div className="App">
      <div className="layout">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="query" ref={dataRef} />
          <button type="submit">Submit</button>
          <textarea value={editableEmail} onChange={handleChange} />
          <button onClick={handleSend}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default GenerateText;

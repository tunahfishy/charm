import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import "./App.css";
import { useState, useRef } from "react";

// TODO: REPLACE
const API_KEY = "sk-replace";

const configuration = new Configuration({
  organization: "org-9AXU57OVamayjrkxMCoA4cwK",
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

function Features(): JSX.Element {
  const dataRef = useRef<HTMLInputElement>(null);
  const [features, setFeatures] = useState("");
  const [ans, setAns] = useState();

  const processText = (text: string): string => {
    return text[0] === "?" ? text.slice(1) : text;
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const prompt =
      "what skills would the person who best fits this prompt have? What keywords exist? List this out as a string of keywords separated by commas. Prompt: " +
      dataRef.current?.value;
    console.log(prompt);

    axios
      .post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt: prompt,
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
        const unprocessedText = generatedText.data.choices[0].text;
        const features = processText(unprocessedText);
        setFeatures(features);
        // based on bios
        // fetch("http://127.0.0.1:5000/queryContacts", {
        // based on emails
        fetch("http://127.0.0.1:5000/queryEmails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // data: { query: features },
            data: { query: 'poker', userEmail: "tinahh@mit.edu" },

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
        return features;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <div className="layout">
        <form onSubmit={handleSubmit}>
          <p>
            Write a prompt for the type of query you want to create features for
          </p>
          <input
            type="text"
            placeholder="Who would be most likely to be a good chess player?"
            ref={dataRef}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{features}</p>
        <p>{ans}</p>
      </div>
    </div>
  );
}

export default Features;

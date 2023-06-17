// import { useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import { config } from "dotenv";
config();

function App() {
  console.log(process.env.OPENAI_API_KEY);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello world" }],
    })
    .then((res) => {
      console.log(res);
    });

  return (
    <div className="w-[320px] h-[540px] bg-white border border-gray-400 rounded-lg">
      <h1 className="bg-green-500 text-white text-4xl text-center font-semibold rounded-t-lg">
        Chatgpt
      </h1>
      <div className="flex flex-col gap-3 m-3">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="bg-gray-100 w-full"
        ></textarea>
        <button className="bg-green-500 text-white text-2xl px-1 py-3">
          Generate
        </button>
      </div>
      <div className="m-3">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="bg-gray-100 w-full"
        ></textarea>
      </div>
    </div>
  );
}

export default App;

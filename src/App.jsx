import { useState } from "react";

function App() {
  const [responses, setResponses] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState("");

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleToneChange = (event) => {
    setSelectedTone(event.target.value);
  };

  const handleSendPrompt = async () => {
    try {
      const numResponses = 3;
      const responsePromises = Array.from(
        { length: numResponses },
        async () => {
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                messages: [
                  {
                    role: "system",
                    content: `You are ChatGPT, a large language model trained by OpenAI. Please respond in a ${setSelectedTone} tone`,
                  },
                  {
                    role: "user",
                    content: prompt,
                  },
                ],
                model: "gpt-3.5-turbo",
              }),
            }
          );
          const json = await response.json();
          console.log(json.choices[0].message.content);
          return json.choices[0].message.content;
        }
      );

      const generatedResponses = await Promise.all(responsePromises);
      setResponses(generatedResponses);
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <div className="w-[320px] h-[540px] bg-white border border-gray-400 rounded-lg">
      <h1 className="bg-green-500 text-white text-4xl text-center font-semibold rounded-t-lg">
        Chatgpt
      </h1>
      <div className="flex flex-col gap-3 m-3">
        <textarea
          name="prompt"
          id="prompt"
          value={prompt}
          cols="30"
          rows="10"
          className="bg-gray-100 w-full"
          onChange={handlePromptChange}
        />
        <select
          name="tone"
          id="tone"
          value={selectedTone}
          onChange={handleToneChange}
        >
          <option value="">Choose a tone</option>
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
        </select>
        <button
          onClick={handleSendPrompt}
          className="bg-green-500 text-white text-2xl px-1 py-3"
        >
          Generate
        </button>
      </div>
      <div className="m-3">
        {responses.map((response, index) => (
          <div key={index}>
            <textarea
              name="response"
              id="response"
              value={response}
              onChange={() => {}}
              readOnly
              cols="30"
              rows="10"
              className="bg-gray-100 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

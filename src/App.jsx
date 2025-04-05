import { useState } from 'react'
import { BounceLoader } from 'react-spinners'
import './App.css'

function App() {
  const [text, setText] = useState("");
  const [writePrompt, setWritePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // This part is for the possible backend! Not in use right now. 
  const handleSubmit = async () => {
    if (text.trim() === "") {
      setWritePrompt("Please provide some feedback.");
      return;
    }
    setWritePrompt("");
    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch("https://cc-module-4-backend-open-cloud-computing-2025-spring.2.rahtiapp.fi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from backend");
      }

      const data = await response.json()
      setFeedback(data.result);
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to connect to the backend.")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="container">
      <h1>My Sentiment App</h1>
      <textarea
        placeholder="Enter a short feedback..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
      />
      {writePrompt && <div className="writePrompt">{writePrompt}</div>}

      <div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? <BounceLoader size={20} /> : 'Load results'}
        </button>
      </div>

      {feedback && (
        <div
          className={`feedback ${
            feedback === "Positive" 
            ? "feedback-positive" 
            : feedback === "Neutral" 
            ? "feedback-neutral" 
            : "feedback-negative"
          }`}
        >
          Evaluation: {feedback}
        </div>
      )}
    </div>
  );
}

export default App;

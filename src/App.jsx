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
    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json()
      // This would be the actual response from backend. 
      alert("Response from backend: " + data.result)
    } catch (error) {
      // Without a backend, it will result in an error. 
      console.error("Error:", error)
      alert("Failed to connect to the backend.")
    }
  };

  // This is for simulating a call to backend. 
  const handleButtonClick = () => {
    // Check if text area is empty
    if (text.trim() === "") {
      setWritePrompt("Please provide some feedback.");
      // Exit if no text is given
      return;
    }
    // Clear previous prompts if text is not empty
    setWritePrompt("");

    setLoading(true);
    setTimeout(() => {
      setLoading(false)

      // Randomize result
      const results = ["Positive", "Neutral", "Negative"];
      const randomResult = results[Math.floor(Math.random() * results.length)];

      // Set feedback state
      setFeedback(randomResult);
    }, 2000);
  }

  return (
    <div className="container">
      <h1>My Sentiment App</h1>
      <textarea
        placeholder="Enter a short feedback..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
      />
      {/* <button onClick={handleSubmit}>Send</button> */}

      {writePrompt && <div className="writePrompt">{writePrompt}</div>}

      <div>
        <button onClick={handleButtonClick} disabled={loading}>
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

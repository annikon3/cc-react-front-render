import { useState } from 'react'
import { BounceLoader } from 'react-spinners'
import './App.css'

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // This part is for the possible backend. 
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    alert("Evaluation: Positive")
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

      <div>
        <button onClick={handleButtonClick} disabled={loading}>
          {loading ? <BounceLoader size={20} /> : 'Load results'}
        </button>
      </div>

    </div>
  );
}

export default App;

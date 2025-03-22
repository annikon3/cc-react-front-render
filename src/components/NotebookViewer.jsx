import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function NotebookViewer() {
  const [notebook, setNotebook] = useState(null);

  useEffect(() => {
    // Load Thebe.js dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.com/thebe@latest/lib/index.js";
    script.async = true;
    document.body.appendChild(script);

    // Load notebook from public folder
    fetch("/my_sentiment.ipynb") 
      .then((res) => res.json())
      .then((data) => setNotebook(data))
      .catch((error) => console.error("Error loading notebook:", error));
  }, []);

  useEffect(() => {
    if (notebook) {
    // Activate Thebe.js after loading
      window.thebelab.bootstrap();
    }
  }, [notebook]);

  // Function to extract and clean the output
  const extractOutput = (output) => {
    if (output.output_type === "execute_result" && output.data["text/plain"]) {
    // Get the output string
      const rawText = output.data["text/plain"].join(""); 
      // Extract value
      const match = rawText.match(/array\(\['(.*?)'\], dtype=object\)/); 
      // Return cleaned text
      return match ? match[1] : rawText; 
    }
    return "";
  };

  return (
    <div>
      <h1>Run Jupyter Notebook in React</h1>
      <div className="notebook-container">
        {notebook ? (
          notebook.cells.map((cell, index) => (
            <div
              key={index}
              className={cell.cell_type === "code" ? "code-cell" : "markdown-cell"}
            >
              {cell.cell_type === "markdown" ? (
                <ReactMarkdown>{cell.source ? cell.source.join("") : ""}</ReactMarkdown>
              ) : (
                <div>
                  <pre>{cell.source ? cell.source.join("") : "No content"}</pre>
                  <button
                    className="thebe-execute-button"
                    onClick={() => window.thebelab.runCell(index)}
                  >
                    Run
                  </button>

                  {/* Display cell outputs */}
                  {cell.outputs && cell.outputs.length > 0 && (
                    <div className="output-container">
                      <strong>Output:</strong>
                      {cell.outputs.map((output, idx) => (
                        <pre key={idx}>{extractOutput(output)}</pre>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading notebook...</p>
        )}
      </div>
    </div>
  );
}

export default NotebookViewer;
import { useState } from 'react'
import './App.css'
import { generateContent } from './gemini'

const MODES = [
  { id: 'rewrite', label: 'Rewrite Bullet Points' },
  { id: 'tone', label: 'Tailor Tone' },
  { id: 'improve', label: 'Suggest Improvements' },
]

function App() {
  const [inputText, setInputText] = useState('')
  const [selectedMode, setSelectedMode] = useState('rewrite')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleGenerate = async () => {
    setIsLoading(true)
    setOutputText('')
    setErrorText('')

    try {
      const result = await generateContent(selectedMode, inputText)
      setOutputText(result)
    } catch (error) {
      setErrorText('Something went wrong while generating. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Resume & Portfolio Content Assistant</h1>

      <div className="mode-selector">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            className={selectedMode === mode.id ? 'mode-button active' : 'mode-button'}
            onClick={() => setSelectedMode(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="panels">
        <div className="panel">
          <label htmlFor="input-text">Paste your resume or project description</label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text here..."
            rows={14}
          />
        </div>

        <div className="panel">
          <label htmlFor="output-text">Result</label>
          <textarea
            id="output-text"
            value={outputText}
            readOnly
            placeholder="Output will appear here..."
            rows={14}
          />
        </div>
      </div>

      <button
        className="generate-button"
        onClick={handleGenerate}
        disabled={!inputText.trim() || isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>

      {errorText && <p className="error-text">{errorText}</p>}
    </div>
  )
}

export default App
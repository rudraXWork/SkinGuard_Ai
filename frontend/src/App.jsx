import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000'

const LESION_INFO = {
  'Actinic Keratoses (akiec)': {
    name: 'Actinic Keratoses',
    description: 'A rough, scaly patch that develops on sun-exposed skin. These are often precancerous and require monitoring.',
    risk: 'Medium - may develop into skin cancer',
  },
  'Basal Cell Carcinoma (bcc)': {
    name: 'Basal Cell Carcinoma',
    description: 'The most common type of skin cancer. It grows slowly and rarely spreads to other parts of the body if treated early.',
    risk: 'Moderate - requires medical treatment',
  },
  'Benign Keratosis-like Lesions (bkl)': {
    name: 'Benign Keratosis-like Lesions',
    description: 'Common, non-cancerous growths that appear as brown, black, or tan bumps on the skin. Usually harmless.',
    risk: 'Low - typically benign',
  },
  'Dermatofibroma (df)': {
    name: 'Dermatofibroma',
    description: 'A common, harmless skin nodule that is firm and may be slightly darker than surrounding skin. Often benign.',
    risk: 'Low - typically benign',
  },
  'Melanoma (mel)': {
    name: 'Melanoma',
    description: 'The most dangerous type of skin cancer. Early detection is crucial for better prognosis. Immediate medical consultation recommended.',
    risk: 'High - requires immediate medical attention',
  },
  'Melanocytic Nevi (nv)': {
    name: 'Melanocytic Nevi',
    description: 'Commonly known as a mole. These are usually benign pigmented lesions that are present from birth or develop later.',
    risk: 'Low - typically benign',
  },
  'Vascular Lesions (vasc)': {
    name: 'Vascular Lesions',
    description: 'Lesions caused by dilated blood vessels, such as cherry angiomas or hemangiomas. Usually benign.',
    risk: 'Low - typically benign',
  },
}

function formatConfidence(confidence) {
  if (confidence == null) return '—'
  const normalized = Math.min(Math.max(confidence, 0), 1)
  return `${Math.round(normalized * 10000) / 100}%`
}

function App() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [showInfo, setShowInfo] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const acceptedTypes = useMemo(
    () => ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
    []
  )

  const handleFileSelection = (fileList) => {
    const nextFile = fileList?.[0]
    if (!nextFile) {
      return
    }

    if (!acceptedTypes.includes(nextFile.type)) {
      setError('Please upload a JPG, PNG, or WEBP image file.')
      return
    }

    if (nextFile.size > 10 * 1024 * 1024) {
      setError('The selected file exceeds the 10 MB size limit.')
      return
    }

    setError('')
    setResult(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setFile(nextFile)
    setPreviewUrl(URL.createObjectURL(nextFile))
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleFileSelection(event.dataTransfer.files)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleInputChange = (event) => {
    handleFileSelection(event.target.files)
  }

  const openFileDialog = () => {
    if (!isLoading) {
      fileInputRef.current?.click()
    }
  }

  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !isLoading) {
      event.preventDefault()
      openFileDialog()
    }
  }

  const submitPrediction = async () => {
    if (!file) {
      setError('Please choose an image first.')
      return
    }

    setIsLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Prediction failed')
      }

      const payload = await response.json()
      const entry = {
        prediction: payload.prediction,
        confidence: payload.confidence,
        timestamp: new Date().toISOString(),
      }
      setResult(entry)
      setHistory((prev) => [entry, ...prev].slice(0, 5))
    } catch (err) {
      setError(err.message || 'Unable to reach the prediction service.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <main className="glass-card">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          className="sr-only"
          onChange={handleInputChange}
          disabled={isLoading}
          aria-label="Upload skin lesion image"
        />
        <header className="hero">
          <h1>SkinGuard AI</h1>
          <p>
            Upload a dermatoscopic image to receive an instant prediction from
            your custom MobileNetV2 model trained on the HAM10000 dataset.
          </p>
        </header>

        <section
          className={`dropzone ${isDragging ? 'dropzone--active' : ''} ${
            previewUrl ? 'dropzone--uploaded' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
          onKeyDown={handleKeyDown}
          role="button"
          aria-label="Upload skin lesion image"
          tabIndex={0}
        >
          {previewUrl ? (
            <div className="preview-wrapper">
              <img className="preview" src={previewUrl} alt="Uploaded preview" />
              <button
                type="button"
                className="replace-button"
                onClick={(event) => {
                  event.stopPropagation()
                  openFileDialog()
                }}
                disabled={isLoading}
              >
                Choose another image
              </button>
            </div>
          ) : (
            <div className="dropzone__placeholder">
              <span className="dropzone__badge">Step 1</span>
              <h2>Drag &amp; drop or browse</h2>
              <p>Supports JPG, PNG, or WEBP images up to 10 MB.</p>
              <button
                type="button"
                className="upload-button"
                onClick={(event) => {
                  event.stopPropagation()
                  openFileDialog()
                }}
                disabled={isLoading}
              >
                Select an image
              </button>
            </div>
          )}
        </section>

        <div className="actions">
          <button
            className="primary-button"
            type="button"
            onClick={submitPrediction}
            disabled={isLoading || !file}
          >
            {isLoading ? 'Analyzing…' : 'Run Prediction'}
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
              }
              setFile(null)
              setResult(null)
              setPreviewUrl('')
              setError('')
            }}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>

        {error && <div className="alert alert--error">{error}</div>}

        {result && (
          <section className="result-card">
            <div className="result-header">
              <div>
                <span className="dropzone__badge">Result</span>
                <h3>{result.prediction}</h3>
              </div>
              <button
                type="button"
                className="info-button"
                onClick={() => setShowInfo(true)}
                title="Learn more about this condition"
              >
                ℹ️ Info
              </button>
            </div>
            <p className="result-card__confidence">
              Confidence{' '}
              <strong>{formatConfidence(result.confidence)}</strong>
            </p>
            <div className="confidence-bar">
              <div
                className="confidence-bar__fill"
                style={{
                  width: `${Math.min(Math.max(result.confidence ?? 0, 0), 1) * 100}%`,
                }}
              />
            </div>
            <p className="result-card__note">
              This model is a clinical decision support tool and should not
              replace diagnosis from a medical professional.
            </p>
          </section>
        )}

        {history.length > 0 && (
          <section className="history">
            <h4>Recent predictions</h4>
            <ul>
              {history.map((item, index) => (
                <li key={`${item.prediction}-${index}`}>
                  <span>
                    {item.prediction}
                    <small>{new Date(item.timestamp).toLocaleTimeString()}</small>
                  </span>
                  <span>{formatConfidence(item.confidence)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {showInfo && result && (
        <div className="modal-overlay" onClick={() => setShowInfo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowInfo(false)}
              aria-label="Close info modal"
            >
              ✕
            </button>
            {LESION_INFO[result.prediction] && (
              <>
                <h2>{LESION_INFO[result.prediction].name}</h2>
                <div className="modal-body">
                  <div className="info-section">
                    <h4>Description</h4>
                    <p>{LESION_INFO[result.prediction].description}</p>
                  </div>
                  <div className="info-section">
                    <h4>Risk Level</h4>
                    <p className="risk-level">{LESION_INFO[result.prediction].risk}</p>
                  </div>
                  <div className="info-section info-warning">
                    <p>
                      <strong>⚠️ Important:</strong> This AI prediction is for educational and informational purposes only. 
                      Always consult with a qualified dermatologist or healthcare professional for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
                <button
                  className="modal-button"
                  onClick={() => setShowInfo(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <footer className="footer">
        <p>
          Powered by MobileNetV2 · Backend running on{' '}
          <code>{API_BASE_URL}</code>
        </p>
      </footer>
    </div>
  )
}

export default App

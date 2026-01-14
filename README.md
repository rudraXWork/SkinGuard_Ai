<h1>🧴 SkinGuard AI</h1>
<p><strong>SkinGuard AI</strong> is a full-stack AI-powered web application that detects skin cancer from images using deep learning.</p>

<div class="note">
⚠️ This project is for <strong>educational and research purposes only</strong>.  
It is not intended for real medical diagnosis.
</div>

<hr>

<h2>🚀 What This Project Does</h2>
<p>
SkinGuard AI allows users to upload skin lesion images through a web interface.
The image is processed by a deep learning model on the backend, which predicts
whether the lesion is cancerous or non-cancerous.
</p>

<p><strong>Flow:</strong> Image → AI Model → Prediction → Web UI</p>

<hr>

<h2>🧠 AI / Machine Learning Details</h2>
<p>
The backend uses a Convolutional Neural Network (CNN) with transfer learning
based on <strong>MobileNetV2</strong>.
</p>

<pre>
MobileNetV2 → Feature Extraction
GlobalAveragePooling → Feature Compression
Dense Layers → Classification
Dropout → Overfitting Control
Adam Optimizer → Faster Learning
</pre>

<hr>

<h2>🛠️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
    <li>React.js</li>
    <li>Tailwind CSS</li>
    <li>Vite</li>
    <li>JavaScript</li>
</ul>

<h3>Backend</h3>
<ul>
    <li>Python</li>
    <li>Flask / FastAPI</li>
    <li>TensorFlow & Keras</li>
</ul>

<h3>Machine Learning</h3>
<ul>
    <li>CNN (Convolutional Neural Network)</li>
    <li>Transfer Learning</li>
    <li>Image Classification</li>
</ul>

<hr>

<h2>🗂️ Project Structure</h2>

<pre>
SkinGuard_Ai/
├── backend/
│   ├── app.py                 # Backend API
│   ├── skin_cancer_model.py   # Model loading & prediction
│   ├── data/                  # Dataset
│   ├── images/                # Uploaded images
│   ├── __pycache__/
│   └── Untitled2.ipynb        # Model training notebook
│
├── frontend/
│   ├── src/                   # React components
│   ├── public/                # Static assets
│   ├── dist/                  # Production build
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
</pre>

<hr>

<h2>▶️ How to Run the Project</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre>
git clone https://github.com/rudraXWork/SkinGuard_Ai.git
cd SkinGuard_Ai
</pre>

<h3>2️⃣ Run Backend</h3>
<pre>
cd backend
pip install -r requirements.txt
python app.py
</pre>

<p>Backend runs on <strong>http://localhost:5000</strong></p>

<h3>3️⃣ Run Frontend</h3>
<pre>
cd frontend
npm install
npm run dev
</pre>

<p>Frontend runs on <strong>http://localhost:5173</strong></p>

<hr>

<h2>✨ Features</h2>
<ul>
    <li>Skin image upload</li>
    <li>AI-based cancer prediction</li>
    <li>React + Tailwind responsive UI</li>
    <li>REST API based communication</li>
</ul>

<hr>

<h2>⚠️ Disclaimer</h2>
<p>
This application is not a certified medical tool.
Predictions may not be accurate.
Always consult a qualified dermatologist for medical advice.
</p>

<hr>

<h2>👨‍💻 Author</h2>
<p>
<strong>Rudra</strong><br>
Engineering | Data Science | AI & ML<br>
GitHub: <a href="https://github.com/rudraXWork" target="_blank" style="color:#38bdf8;">rudraXWork</a>
</p>

<hr>

<h2>🌱 Future Improvements</h2>
<ul>
    <li>Add confidence percentage</li>
    <li>Improve dataset size</li>
    <li>Docker deployment</li>
    <li>Cloud hosting</li>
    <li>User authentication</li>
</ul>

<div class="footer">
    © 2026 SkinGuard AI • Built for learning & exploration
</div>

</body>
</html>

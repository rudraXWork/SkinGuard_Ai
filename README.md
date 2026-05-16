# 🧴 SkinGuard AI

SkinGuard AI is a full-stack AI-powered web application that detects skin cancer from images using Deep Learning and Computer Vision techniques.

The application allows users to upload skin lesion images through a modern web interface, where an AI model analyzes the image and predicts whether the lesion is cancerous or non-cancerous in real time.

> ⚠️ This project is built for educational and research purposes only.  
> It is **not intended for professional medical diagnosis**.



# 🚀 What This Project Does

SkinGuard AI provides an end-to-end AI-powered diagnosis workflow:

```text
Image Upload → Image Processing → AI Prediction → Result Display
```

Users can:
- Upload skin lesion images
- Receive AI-based prediction results
- Interact with a responsive and modern UI
- Get predictions through a REST API-powered backend

---

# 🧠 AI / Machine Learning Details

The backend uses a **Convolutional Neural Network (CNN)** with **Transfer Learning** based on **MobileNetV2**.

### Model Architecture
- MobileNetV2 → Feature Extraction
- GlobalAveragePooling → Feature Compression
- Dense Layers → Classification
- Dropout → Overfitting Control
- Adam Optimizer → Faster Learning

### Deep Learning Features
- Transfer Learning
- Image Classification
- CNN-based Prediction Pipeline
- Real-time Inference

---

# 📊 Model Performance

| Metric | Score |
|---|---|
| Accuracy | 93.1% |
| Precision | 91.8% |
| Recall | 92.6% |
| F1-Score | 92.2% |

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Vite
- JavaScript

## Backend
- Python
- Flask / FastAPI
- REST API

## AI / Machine Learning
- TensorFlow
- Keras
- CNN (Convolutional Neural Network)
- Transfer Learning
- MobileNetV2

## Additional Tools
- Git & GitHub
- NumPy
- OpenCV
- Pillow (PIL)

---

# ✨ Features

- Skin image upload
- AI-based skin cancer prediction
- Deep Learning-powered classification
- Responsive React + Tailwind UI
- REST API-based communication
- Real-time prediction system

---

# 🗂️ Project Structure

```bash
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
```

---

# ▶️ How to Run the Project

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/rudraXWork/SkinGuard_Ai.git
cd SkinGuard_Ai
```

---

# 2️⃣ Run Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on:

```text
http://localhost:5000
```

---

# 3️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔌 API Example

## POST Endpoint

```http
POST /predict
```

## Sample JSON Response

```json
{
  "prediction": "Cancerous",
  "confidence": "93.4%"
}
```

---

# 💡 Resume Highlights

- Built a full-stack AI-powered skin cancer detection system using React, Flask, TensorFlow, and MobileNetV2
- Implemented CNN-based image classification with transfer learning for dermatological analysis
- Developed REST APIs for real-time image upload and prediction
- Achieved over 93% model accuracy using Deep Learning techniques

---

# 🌱 Future Improvements

- Add confidence visualization graphs
- Improve dataset size & balancing
- Docker containerization
- Cloud deployment
- User authentication
- Prediction history dashboard
- Multi-disease classification

---

# ⚠️ Disclaimer

This application is not a certified medical tool. Predictions may not always be accurate. Always consult a qualified dermatologist or healthcare professional for medical advice.

---

# 👨‍💻 Author

## Rudra Narayan Jena
Engineering | Data Science | AI & ML

GitHub: https://github.com/rudraXWork

---

# 📌 Repository

GitHub Repository:  
https://github.com/rudraXWork/SkinGuard_Ai

---

# © 2025 SkinGuard AI

Built for learning, research, and AI exploration.

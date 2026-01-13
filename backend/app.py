import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import io


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


app = Flask(__name__)
CORS(app)

# --- 2. Load the Trained Deep Learning Model ---
try:
    model = tf.keras.models.load_model('skin_cancer_model.h5')
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

CLASS_NAMES = [
    "Actinic Keratoses (akiec)",
    "Basal Cell Carcinoma (bcc)",
    "Benign Keratosis-like Lesions (bkl)",
    "Dermatofibroma (df)",
    "Melanoma (mel)",
    "Melanocytic Nevi (nv)",
    "Vascular Lesions (vasc)"
]

# --- 4. Define Image Preprocessing Function ---
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# --- 5. Define the Prediction API Endpoint ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model is not available'}), 500
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        img_bytes = file.read()
        processed_image = preprocess_image(img_bytes)
        prediction_probs = model.predict(processed_image)
        predicted_class_index = np.argmax(prediction_probs)
        predicted_class_name = CLASS_NAMES[predicted_class_index]
        confidence = float(np.max(prediction_probs))
        
        return jsonify({
            'prediction': predicted_class_name,
            'confidence': confidence
        })
    
    except Exception as e:
        print(f"❌ An error occurred: {e}")
        return jsonify({'error': 'Failed to process the image'}), 500

# --- 6. Run the Flask Application ---
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
# /Users/rudrajena/Desktop/react/.venv/bin/python app.py
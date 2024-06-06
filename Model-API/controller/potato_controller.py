import logging
from flask import jsonify
from keras._tf_keras.keras.models import load_model
from keras._tf_keras.keras.preprocessing import image
import io
import numpy as np
import os

# Load the model
model_path = os.path.join(os.path.dirname(__file__), '../model/potato_model.h5')
model = load_model(model_path)

logging.basicConfig(level=logging.DEBUG)

def predict_potato(request):
    if 'file' not in request.files:
        logging.error('No file part in the request')
        return jsonify({'message': 'No file found'}), 400

    file = request.files['file']

    if file.filename == '':
        logging.error('No file selected for uploading')
        return jsonify({'message': 'No file selected'}), 400

    try:
        img = image.load_img(io.BytesIO(file.read()), target_size=(256, 256))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x /= 255.0

        classes = model.predict(x, batch_size=1)
        predicted_class_indices = np.argmax(classes, axis=1)

        class_labels = ['Early Blight', 'Late Blight', 'Healthy', 'Non Potato']
        predicted_label = class_labels[predicted_class_indices[0]]

        response = {
            'prediction': predicted_label,
            'confidence': round(np.max(classes) * 100, 2)
        }

        return jsonify(response), 200
    except Exception as e:
        logging.error(f"Error processing the image: {e}")
        return jsonify({'message': 'Something went wrong'}), 500

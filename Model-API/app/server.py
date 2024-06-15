from fastapi import FastAPI,UploadFile,File
import numpy as np
from keras.models import load_model
from PIL import Image
import io
import os

app = FastAPI()

model = load_model('app/potato_model.h5')

class_names = np.array(['Early Blight', 'Late Blight', 'Healthy'])

@app.post ('/predict')
async def predict(file : UploadFile = File(...)):
    """
    Predicts the class of an uploaded image.

    Args:
        file (UploadFile): An image file to predict.

    Returns:
        dict: A dictionary containing the predicted class.
    """

    image = await file.read()
    image = Image.open(io.BytesIO(image))
    image = image.resize((150,150))
    image = np.array(image)/255.0
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)
    predicted_class = class_names[np.argmax(prediction)]
    response = {'prediction': predicted_class}

    if predicted_class == 'Early Blight':
        response.update({
            'Disease Name': 'Early Blight',
            'Description': 'Early Blight is a common disease of Potato. It is caused by the fungus Alternaria solani. Early blight can be prevented by applying fungicide to control it.',
            'Solution': 'Apply fungicide to control early blight. '
        })

    elif predicted_class == 'Late Blight':
        response.update({
            'Disease Name': 'Late Blight',
            'Description': 'Late Blight is a common disease of Potato. It is caused by the fungus Alternaria solani. Late blight can be prevented by applying fungicide to control it.',
            'Solution': 'Apply fungicide to control late blight. '
        })

    elif predicted_class == 'Healthy':
        response.update({
            'Disease Name': 'Healthy',
            'Description': 'Potato is a healthy crop.',
            'Solution': 'No action is required. '
        })

    return response


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)

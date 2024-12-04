# from flask import Flask, render_template, request
# import pickle

# app = Flask(__name__)

# model = pickle.load(open('iris_model.sav', 'rb'))


# @app.route('/')
# def home():
#     return render_template('index.html', **locals())


# @app.route("/predict" , methods=['POST','GET'])
# def predict():
#     SepalLengthCm = float(request.form['SepalLengthCm'])
#     SepalWidthCm = float(request.form['SepalWidthCm'])
#     PetalLengthCm = float(request.form['PetalLengthCm'])
#     PetalWidthCm = float(request.form['PetalWidthCm'])
#     result = model.predict([[SepalLengthCm,  SepalWidthCm , PetalLengthCm , PetalWidthCm]])[0]
#     return render_template('index.html',**locals())


# if __name__ == '__main__':
#     app.run(host='0.0.0.0')


from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

CORS(app)

# Load the pre-trained model
model = pickle.load(open('iris_model.sav', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Check if the expected fields are present
    if not all(key in data for key in ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']):
        return jsonify({'error': 'Missing required fields'}), 400

    # Extract values from the incoming JSON data
    sepal_length = data['sepal_length']
    sepal_width = data['sepal_width']
    petal_length = data['petal_length']
    petal_width = data['petal_width']

    # You can print the data to see what the server receives
    print(f"Received data: {data}")

    # Proceed with the prediction (example with a dummy model)
    features = [[sepal_length, sepal_width, petal_length, petal_width]]
    prediction = model.predict(features)

    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0')

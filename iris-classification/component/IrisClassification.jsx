import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import './IrisClassification.css';

const IrisClassification = () => {
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [petalWidth, setPetalWidth] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const flowerImages = {
    'Iris-setosa': './img/setosa.jpg',
    'Iris-versicolor': './img/vericolor.jpg',
    'Iris-virginica': './img/virginica.jpg',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform prediction logic here (e.g., send input data to the backend or use a local model)
    // Assuming you get the prediction response (e.g., 'Iris-setosa')
    const formData = {
        sepalLength :sepalLength,
        sepalWidth : sepalWidth,
        petalLength :petalLength,
        petalWidth : petalWidth
    }
    try {
        const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sepal_length: parseFloat(sepalLength),
            sepal_width: parseFloat(sepalWidth),
            petal_length: parseFloat(petalLength),
            petal_width: parseFloat(petalWidth),
          }),
        });
        
        const data = await response.json();

        if (data.prediction) {
            setPrediction(data.prediction);
        } else {
            setErrorMessage('Prediction failed. Please try again.');
            setOpenSnackbar(true);
        }
    } catch (error) {
        setErrorMessage(error.message);
        setOpenSnackbar(true);
    }

    
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container">
      <Paper elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Iris Flower Classification
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Sepal Length"
            type="number"
            fullWidth
            value={sepalLength}
            onChange={(e) => setSepalLength(e.target.value)}
            required
          />
          <TextField
            label="Sepal Width"
            type="number"
            fullWidth
            value={sepalWidth}
            onChange={(e) => setSepalWidth(e.target.value)}
            required
          />
          <TextField
            label="Petal Length"
            type="number"
            fullWidth
            value={petalLength}
            onChange={(e) => setPetalLength(e.target.value)}
            required
          />
          <TextField
            label="Petal Width"
            type="number"
            fullWidth
            value={petalWidth}
            onChange={(e) => setPetalWidth(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!sepalLength || !sepalWidth || !petalLength || !petalWidth}
          >
            Classify Flower
          </Button>
        </form>
        
        {/* Prediction Result */}
        {prediction && (
          <div>
            <Typography variant="h6" align="center" gutterBottom>
              Predicted Class: {prediction}
            </Typography>
            <div className="relative">
              <img 
                src={flowerImages[prediction]} 
                alt={prediction} 
                className="flower" 
              />
            </div>
          </div>
        )}
      </Paper>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default IrisClassification;

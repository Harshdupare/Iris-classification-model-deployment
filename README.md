Iris Classification Model Deployment with Flask, Docker, and Kubernetes
=======================================================================

Project Overview
----------------

This project demonstrates the deployment of an Iris classification model as a REST API using Flask, containerized with Docker, and deployed on a Kubernetes cluster. It showcases skills in machine learning, containerization, and DevOps.

Tech Stack
----------

-   Python
-   Flask (for REST API)
-   Scikit-learn (for ML model)
-   Docker
-   Kubernetes
-   Helm (optional for Kubernetes deployment)

Setup Instructions
------------------

### Model Development and API Setup

1.  **Clone the repository**:

    bash

    Copy code

    `git clone https://github.com/your-repo/ml-flask-docker-k8s.git
    cd ml-flask-docker-k8s`

2.  **Create a virtual environment and install dependencies**:

    bash

    Copy code

    `python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt`

3.  **Run the Flask app**:

    bash

    Copy code

    `python app.py`

4.  **Test the API endpoint**:

    bash

    Copy code

    `http://127.0.0.1:5000/predict`

### Dockerization

1.  **Write a Dockerfile to containerize the Flask application**:

    Dockerfile

    Copy code

    `FROM python:3.9

    WORKDIR /app 

    COPY . /app

    RUN pip install -r requirements.txt

    EXPOSE 5000

    CMD python ./index.py`

2.  **Build the Docker image**:

    bash

    Copy code

    `docker build -t ml-flask-app .`

3.  **Run the Docker container locally**:

    bash

    Copy code

    `docker run -p 5000:5000 ml-flask-app`

### Kubernetes Setup

1.  **Set up a local Kubernetes cluster using Minikube**:

    bash

    Copy code

    `minikube start`

2.  **Write Kubernetes deployment and service YAML files**:

    `iris.yaml`:

    yaml

    Copy code

    `apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: irisapp
    spec:
    selector:
        matchLabels:
        app: irisapp
    template:
        metadata:
        labels:
            app: irisapp
        spec:
        containers:
        - name: iris
            image: harshdupare/irisclass:v1.0
            resources:
            limits:
                memory: "128Mi"
                cpu: "500m"
            ports:
            - containerPort: 5000`
    ---

    `apiVersion: v1
    kind: Service
    metadata:
    name: irisapp-service
    spec:
    selector:
        app: irisapp
    ports:
        - protocol: TCP
        port: 80
        targetPort: 5000
        nodePort: 30000
    type: NodePort`

3.  **Deploy the Dockerized application on the Kubernetes cluster**:

    bash

    Copy code

    `kubectl apply -f iris.yaml`

4.  **Access the application**:

    bash

    Copy code

    `minikube service ml-flask-app`

Conclusion
----------

This project demonstrates the complete workflow of developing, containerizing, and deploying a machine learning model as a REST API. By following the steps outlined above, you can deploy your own machine learning models and APIs using Flask, Docker, and Kubernetes.
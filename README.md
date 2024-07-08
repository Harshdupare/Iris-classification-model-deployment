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

Setup Instructions
------------------

### Model Development and API Setup

1.  **Clone the repository**:

   ```sh
    git clone https://github.com/your-repo/ml-flask-docker-k8s.git
    cd ml-flask-docker-k8s
   ```

2.  **Create a virtual environment and install dependencies**:

     ```sh
         python3 -m venv venv
         source venv/bin/activate
         pip install -r requirements.txt
    ```

3.  **Run the Flask app**:

    ```sh
    python app.py
    ```

5.  **Test the API endpoint**:
    ```
    http://127.0.0.1:5000/predict
    ```

### Dockerization

1.  **Write a Dockerfile to containerize the Flask application**:

     ```sh

        FROM python:3.9
    
        WORKDIR /app 
    
        COPY . /app
    
        RUN pip install -r requirements.txt
    
        EXPOSE 5000
    
        CMD python ./index.py
    ```
2.  **Build the Docker image**:

   ```sh
        docker build -t iris .
   ```
3.  **Run the Docker container locally**:

    ```sh
        docker run -d -p 5000:5000 iris
    ```
4. **Create a repository in docker hub and push the image**:
   ```sh
       docker tag iris your-docker-username/iris:latest
   ```
   ```sh
      docker push your-docker-username/iris:latest
   ```
### Kubernetes Setup

1.  **Set up a local Kubernetes cluster using Minikube**:

     ```sh
        minikube start
     ```

3.  **Write Kubernetes deployment and service YAML files**:

    `iris.yaml`:

    
   ```sh
        apiVersion: apps/v1
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
                image: replace your image name from doker registry (example :->harshdupare/irisclass:v1.0)
                resources:
                limits:
                    memory: "128Mi"
                    cpu: "500m"
                ports:
                - containerPort: 5000
        ---
    
        apiVersion: v1
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
        type: NodePort
   ```

4.  **Deploy the Dockerized application on the Kubernetes cluster**:

   ```sh
    kubectl apply -f iris.yaml
   ```

6.  **Access the application**:
   ```sh
    $ kubectl port-forward your-pod-name  8080:5000
   ```
    ![image](https://github.com/Harshdupare/Iris-classification-model-deployment/assets/114917629/0531af0d-e474-410a-911b-aa6cd151768c)

7. **output**:
   ![image](https://github.com/Harshdupare/Iris-classification-model-deployment/assets/114917629/6b2afdc7-d59f-4636-8737-2fef865417ad)

   
Conclusion
----------

This project demonstrates the complete workflow of developing, containerizing, and deploying a machine learning model as a REST API. By following the steps outlined above, you can deploy your own machine learning models and APIs using Flask, Docker, and Kubernetes.

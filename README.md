# MongoDB Crud Microservice API

This project is a simple **MongoDB CRUD Microservice API** developed using **Node.js** and **Express** that performs both basic crud operations. In this task, you will **Dockerize** the application to enable consistent deployment across different environments.

## Technologies Used

- **Node.js**
- **Express**
- **REST API**
- **Microservice Architecture**
- **Winston** - logging
- **dotenv** - environment variable management
- **CORS** - enabling cross-origin requests
- **Docker**
- **Kubernetes**
- **Kubectl**
- **MongoDB**
- **Docker Compose**

## Requirements

Before getting started, ensure you have the following installed:

- **Git**: To clone the repository and manage version control.
- **Visual Studio Code** (VSCode): A popular IDE for editing and running JavaScript applications.
- **Node.js**: To run the application. You can download it from [nodejs.org](https://nodejs.org/).
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Isuruperera18/sit737-2025-prac7p.git
cd sit737-2025-prac7p
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Configuration

Create a `.env` file in the root directory with the following content:

```bash
PORT=3000
```

### 4. Start the Application

Run the application using:

```bash
npm start
```

The API will start on `http://localhost:3000`. Modify the `.env` file if you need a different port.

## API Endpoints

### 1. Get All Records
- **Endpoint:** `GET /api/records`
- **Response:**
  ```json
  {
    "records": []
  }
  ```

### 2. Create a record

- **Endpoint:** `POST /api/records`
- **Request Body:**
  ```json
  {
    "name": "Jhone",
    "description":"Added to IT Dept"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Record created successfully",
    "record": {
        "name": "Jhone",
        "description": "Added to IT Dept",
        "_id": "681a3989e6a190ac2209241a",
        "createdAt": "2025-05-06T16:32:09.636Z",
        "updatedAt": "2025-05-06T16:32:09.636Z",
        "__v": 0
    }
  }
  ```

### 3. Get a Record

- **Endpoint:** `GET /api/records/681a3989e6a190ac2209241a`

- **Response:**
  ```json
  {
    "record": {
        "_id": "681a3989e6a190ac2209241a",
        "name": "Jhone",
        "description": "Added to IT Dept",
        "createdAt": "2025-05-06T16:32:09.636Z",
        "updatedAt": "2025-05-06T16:32:09.636Z",
        "__v": 0
    }
  }
  ```

### 4. Update a record

- **Endpoint:** `PUT /api/records/681a3989e6a190ac2209241a`
- **Request Body:**
  ```json
  {
    "name": "Jhone",
    "description":"Added to IT Dept updated"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Record updated successfully",
    "record": {
        "_id": "681a3989e6a190ac2209241a",
        "name": "Jhone",
        "description": "Added to IT Dept updated",
        "createdAt": "2025-05-06T16:32:09.636Z",
        "updatedAt": "2025-05-06T16:37:04.480Z",
        "__v": 0
    }
  }
  ```

### 5. Delete a record

- **Endpoint:** `DELETE /api/records/681a3989e6a190ac2209241a`

- **Response:**
  ```json
  {
    "message": "Record deleted successfully"
  }
  ```

## Error Handling

If invalid inputs or missing parameters are provided, the API will return meaningful error messages.

### Example Errors

- **Missing route or parameters:**
- **Endpoint:** `DELETE /api/records`
  ```json
  {
      "status": "error",
      "message": "Route not found",
      "path": "/api/records/"
  }
  ```
- **Name Required:**
- **Endpoint:** `POST /api/records`
- **Request Body:**
  ```json
  {
    "description":"Added to IT Dept"
  }
  ```
- **Response:**
  ```json
  {
      "message": "Error creating record",
      "error": {
          "errors": {
              "name": {
                  "name": "ValidatorError",
                  "message": "Name is required",
                  "properties": {
                      "message": "Name is required",
                      "type": "required",
                      "path": "name",
                      "fullPath": "name"
                  },
                  "kind": "required",
                  "path": "name"
              }
          },
          "_message": "Record validation failed",
          "name": "ValidationError",
          "message": "Record validation failed: name: Name is required"
      }
  }
  ```
## Dockerizing the Application

This section guides you through containerizing the application using Docker.

#### 1. Install Docker  
Ensure Docker Desktop is installed and running on your machine.

#### 2. Create a Dockerfile (Dockerfile)
create a dockerfile in the project root folder with the name as `Dockerfile` without any file extension
```bash
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### 3. Create a Docker Compose File (docker-compose.yml)
```bash
version: '3.8'

services:
  mongo-crud:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

#### 4. Install Docker Extension in VSCode
To install the Docker extension in Visual Studio Code:

  1. Open **Visual Studio Code**.
  2. Go to the **Extensions** view by clicking on the Extensions icon in the Activity Bar on the side of the window.
  3. In the search box, type **Docker**.
  4. Select the **Docker** extension by **Microsoft** from the search results.
  5. Click **Install** to install the extension.

#### 5. Log in to Docker Hub from VSCode

After installing the Docker extension, you need to log in to Docker Hub:

  1. Open the **Command Palette** by pressing `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac).
  2. Type **Docker: Sign In** and select the **Docker: Sign In** command.
  3. A prompt will appear for you to enter your **Docker Hub username** and **password**.
  4. After successfully logging in, you should see your Docker Hub account in the Docker view of the sidebar.

## Set Up Kubernetes Cluster

#### 1. Install Minikube 
```bash
choco install minikube
brew install minikube
 ```
#### 2. Start Minikube:
```bash
minikube start
 ```

#### 3. Check cluster status:
```bash
kubectl cluster-info
 ```

## Build and Push Docker Image
#### 1. Build the Docker Image

```bash
docker build -t sit737-2025-prac7p .
```

#### 2. Push your image to DockerHub:

```bash
docker tag sit737-2025-prac7p s223182277/sit737-2025-prac7p
docker push s223182277/sit737-2025-prac7p
```
You can check my Docker Hub image registry at the following URL: https://hub.docker.com/r/s223182277/sit737-2025-prac6p

## Create Kubernetes Deployment

#### 1. Create a deployment.yaml file in root:
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sit737-2025-prac7p-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sit737-2025-prac7p
  template:
    metadata:
      labels:
        app: sit737-2025-prac7p
    spec:
      containers:
      - name: sit737-2025-prac7p
        image: s223182277/sit737-2025-prac7p:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        env:
          - name: MONGO_URI
            value: mongodb://admin:adminpass@mongodb-service.default.svc.cluster.local:27017
```

#### 2. Apply the deployment:
```bash
kubectl apply -f deployment.yaml
```

#### 3. Check if pods are running:
```bash
kubectl get pods
```

## Create Kubernetes Service
This service exposes your app so you can access it.

#### 1. Create a service.yaml file:
```bash
apiVersion: v1
kind: Service
metadata:
  name: sit737-2025-prac7p-service
spec:
  type: NodePort
  selector:
    app: sit737-2025-prac7p
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
```

#### 2. Apply the service:
```bash
kubectl apply -f service.yaml
```
#### 3. Get service info:
```bash
kubectl get services
```
#### 4. Create a mongo-deployment.yaml file:
```bash
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - port: 27017
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo:6
          ports:
            - containerPort: 27017
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-username
            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongo-root-password
          volumeMounts:
            - name: mongo-storage
              mountPath: /data/db
      volumes:
        - name: mongo-storage
          persistentVolumeClaim:
            claimName: mongo-pvc
```
#### 5. Create mongo-pv-pvc.yaml file
```bash
# mongo-pv-pvc.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mongo-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/mongo
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```
## Run the Application
#### 1. Port-forward for local access:
Run this command to access your Node.js app at http://localhost:3000
```bash
kubectl port-forward service/sit737-2025-prac7p-service 3000:3000
```
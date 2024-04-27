# K-Hotels

K-Hotels is a full-featured hotel application that uses a microservices architecture. The application is organized using a monorepo pattern, containing all services within a single repository. 

## Services

The application consists of the following microservices:

- **Auth-srv**: Handles authentication and user management.
- **Hotel-srv**: Manages hotel-related operations.
- **Expiration-srv**: Handles timing and expiration tasks.
- **Order-srv**: Manages order processing.
- **Payment-srv**: Handles payment transactions.
- **Client-srv**: Serves the frontend application.

## Technologies

- **Docker and Kubernetes**: Used for containerization and orchestration, simplifying deployment.
- **CI/CD**: Continuous Integration and Continuous Deployment for efficient development workflows.

## Local Development Setup

Follow these steps to run the project locally:

### Prerequisites

- Ensure Docker and Kubernetes are running on your host machine. Download Docker [here](https://www.docker.com/products/docker-desktop).
- Install [Skaffold](https://skaffold.dev/) for local development automation.

### Initial Setup

1. **Clone the repository:**

   ```bash
   git@github.com:kingsleyoha1/k-hotels.git

2. Set up Ingress-Nginx:Apply the ingress-nginx controller to enable ingress management in Kubernetes:
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

3. Configure Local Domain:Add k-hotels.dev to your /etc/hosts to access the application via a friendly URL:
127.0.0.1 k-hotels.dev

4. Configuration
Create a config folder inside the infra/k8s directory and add the following configurations:

4.1 ConfigMap (configmap.yaml):
apiVersion: v1
kind: ConfigMap
metadata:
  name: hotels-configmap
data:
  CLOUDINARY_NAME: <your-cloudinary-name>
  CLOUDINARY_API_KEY: <your-cloudinary-api-key>
  CLOUDINARY_API_SECRET: <your-cloudinary-api-secret>
  STRIPE_KEY: <your-stripe-key>
Replace placeholders with your Cloudinary and Stripe credentials.
4.2 Secrets (secret.yaml):
apiVersion: v1
kind: Secret
metadata:
  name: hotels-secrets
type: Opaque
data:
  MONGO_URI: <base64-encoded-mongo-uri>
  MONGO_URI_HOTEL: <base64-encoded-mongo-uri-hotel>
  MONGO_URI_ORDERS: <base64-encoded-mongo-uri-orders>
  MONGO_URI_PAYMENTS: <base64-encoded-mongo-uri-payments>
  JWT_KEY: <base64-encoded-jwt-key>
  RABBITMQ_URL: <base64-encoded-rabbitmq-url>
  REDIS_HOST: <base64-encoded-redis-host>
Ensure all sensitive data is base64 encoded.

5. Running the Application
Start the application with Skaffold:At the root directory of the project, run:
skaffold dev
Access the Application:Open your browser and navigate to:
http://k-hotels.dev or https://k-hotels.dev

Contribution
Contributions are welcome. Please fork the repository and submit pull requests to contribute.


This README is structured to guide a developer through setting up and running the application locally, including necessary configurations and how to use tools like Docker, Kubernetes, and Skaffold. It also introduces how to prepare and apply Kubernetes configurations, such as ConfigMaps and Secrets, which are crucial for managing environment-specific settings.

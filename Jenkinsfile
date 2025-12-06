pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = "sandipanseth/social-media"
        IMAGE_TAG = "build-${env.BUILD_NUMBER}"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Sandipan-seth/Social-Media.git'
            }
        }

        stage('Show Image Tag') {
            steps {
                echo "Docker Image Tag: ${IMAGE_TAG}"
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKERHUB_REPO%:%IMAGE_TAG% ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat "echo %PASS% | docker login -u %USER% --password-stdin"
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                bat "docker push %DOCKERHUB_REPO%:%IMAGE_TAG%"
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop social-media || true
                docker rm social-media || true
                docker run -d --name social-media --env-file .env -p 3000:3000 %DOCKERHUB_REPO%:%IMAGE_TAG%
                '''
            }
        }
    }
}

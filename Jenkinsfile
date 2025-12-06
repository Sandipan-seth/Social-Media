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
                withCredentials([file(credentialsId: 'envfile', variable: 'ENVFILE')]) {
                    bat """
                    docker stop social-media 2>nul
                    docker rm social-media 2>nul
                    docker run -d --env-file %ENVFILE% -p 3000:3000 --name social-media sandipanseth/social-media:%IMAGE_TAG%
                """
        }
    }
}
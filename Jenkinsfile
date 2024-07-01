pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    def app = 'demo-app'
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDENTIALS') {
                        def appImage = docker.build("dayasuyal/${app}")
                        appImage.push("latest")
                    }
                }
            }
        }
    }
}


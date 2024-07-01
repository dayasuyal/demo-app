pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-creds', url: 'https://github.com/dayasuyal/demo-app.git'
            }
        }
        stage('Build') {
            steps {
                script {
                    def app = docker.build("dayasuyal/demo-app")
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub') {
                        app.push('latest')
                    }
                }
            }
        }
    }
}


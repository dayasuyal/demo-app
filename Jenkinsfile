pipeline {
    agent {
        docker {
            image 'dayasuyal/my-node-docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dayasuyal/demo-app.git'
            }
        }
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build("dayasuyal/demo-app:${env.BUILD_ID}")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                docker pull dayasuyal/demo-app:${BUILD_ID}
                docker stop demo-app || true
                docker rm demo-app || true
                docker run -d -p 3030:3030 --name demo-app dayasuyal/demo-app:${BUILD_ID}
                '''
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
    triggers {

        // Trigger on SCM changes (for Git)

        pollSCM('* * * * *') 
    }
}


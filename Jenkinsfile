pipeline {
    agent {
        docker {
            image 'node:14'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Install Docker') {
            steps {
                sh '''
                apt-get update
                apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common
                curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
                add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
                apt-get update
                apt-get install -y docker-ce-cli
                '''
            }
        }
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
}


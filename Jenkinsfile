pipeline {

    agent {

        docker {

            image 'node:14'

            args '-v /var/run/docker.sock:/var/run/docker.sock'

        }

    }

    environment {

        DOCKERHUB_CREDENTIALS = credentials('dockerhub')

        APP_NAME = 'demo-app'

        DOCKER_REPO = 'dayasuyal/demo-app'

        PORT = '3030'

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

                    dockerImage = docker.build("${DOCKER_REPO}:${env.BUILD_ID}")

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

                script {

                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {

                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {

                            docker.pull("${DOCKER_REPO}:${env.BUILD_ID}")

                            docker.stop(APP_NAME, true)

                            docker.rm(APP_NAME, true)

                            docker.run("-d -p ${PORT}:${PORT} --name ${APP_NAME} ${DOCKER_REPO}:${env.BUILD_ID}")

                        }

                    }

                }

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


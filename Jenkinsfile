pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "romeops/k6_modular"
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull the project from GitHub
                git branch: 'main', url: 'https://github.com/romic-azure/K6_jnkns_dckr.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t ${DOCKER_IMAGE} .'
                    } else {
                        bat 'docker build -t %DOCKER_IMAGE% .'
                    }
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin
                        '''
                    } else {
                        bat '''
                        echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                        '''
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker push ${DOCKER_IMAGE}'
                    } else {
                        bat 'docker push %DOCKER_IMAGE%'
                    }
                }
            }
        }

        stage('Run k6 Tests and Generate Report') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker run ${DOCKER_IMAGE} run /k6-test/main.js --out json=/k6-test/results/k6-results.json'
                    } else {
                        bat 'docker run %DOCKER_IMAGE% run /k6-test/main.js --out json=/k6-test/results/k6-results.json'
                    }
                }
            }
        }

        stage('Archive Test Results') {
            steps {
                script {
                    // Make sure the results directory exists
                    if (isUnix()) {
                        sh 'mkdir -p results'
                    } else {
                        bat 'mkdir results'
                    }
                    // Copy the result from the container to the Jenkins workspace
                    if (isUnix()) {
                        sh 'docker cp $(docker ps -alq):/k6-test/results/k6-results.json ./results/k6-results.json'
                    } else {
                        bat 'docker cp $(docker ps -alq):/k6-test/results/k6-results.json ./results/k6-results.json'
                    }
                }
                // Archive the results
                archiveArtifacts artifacts: 'results/k6-results.json', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'docker system prune -f'
                } else {
                    bat 'docker system prune -f'
                }
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
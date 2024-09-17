pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'romeops'
        DOCKER_HUB_CREDENTIALS = credentials ('dockerhub-credentials')
    }

    stages {
        stage('Build and Push Image') {
            steps {
                
                git branch: 'main', url: 'https://github.com/your-github-username/your-repo-name.git'
                sh 'docker build -t ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER} .'
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    sh "docker push ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}"

                }
            }
        }
    }
}
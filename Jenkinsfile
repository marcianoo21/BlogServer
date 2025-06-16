pipeline {
    agent any

    environment {
        TARGET_HOST = credentials('app-server-host')
    }

    stages {
        stage('Deploy') {
            steps {
                sshagent (credentials: ['ssh-key-id']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $TARGET_HOST <<EOF
                        cd ~/BlogServer
                        git pull origin main
                        docker-compose down
                        docker-compose up -d --build
                        EOF
                    '''
                }
            }
        }
    }
}

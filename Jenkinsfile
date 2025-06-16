pipeline {
    agent any

    environment {
        TARGET_HOST = credentials('app-server-host')      // np. ec2-user@1.2.3.4
    }

    stages {
        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'ec2-private-key-text', variable: 'SSH_KEY')]) {
                    sh '''
                        echo "$SSH_KEY" > private_key.pem
                        chmod 600 private_key.pem
                        ssh -o StrictHostKeyChecking=no -i private_key.pem $TARGET_HOST <<EOF
                        cd ~/BlogServer
                        git pull origin main
                        docker-compose down
                        docker-compose up -d --build
                        EOF
                        rm private_key.pem
                    '''
                }
            }
        }
    }
}

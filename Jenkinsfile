pipeline {
    agent any

    environment {
        TARGET_HOST = credentials('app-server-host-2')
    }

    stages {
        stage('Clean') {
    steps {
        sh 'rm -rf node_modules/.vite'
        sh 'npm ci'
    }
}
        stage('Deploy to EC2') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa $TARGET_HOST << 'EOF'
                cd ~/BlogServer
                git pull origin main
                docker-compose down
                docker-compose up -d --build
EOF
                """
            }
        }
    }
}

pipeline {
    agent any

    environment {
        TARGET_HOST = '3.66.230.238'
    }

    stages {
        stage('Deploy to EC2') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa ec2-user@$TARGET_HOST << 'EOF'
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

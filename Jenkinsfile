pipeline {
    agent any

    environment {
            TARGET_HOST = credentials('app-server-host')
        }

    stages {
        stage('Test SSH') {
            steps {            
               sh '''
                ssh -i /var/lib/jenkins/.ssh/id_rsa ec2-user@3.77.199.104 
                ssh $TARGET_HOST<<EOF
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

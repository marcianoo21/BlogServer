pipeline {
    agent any

    environment {
            TARGET_HOST = '3.66.230.238' //credentials('app-server-host-2')
        }

    stages {
        stage('Test SSH') {
            steps {            
               sh '''
                ssh -i /var/lib/jenkins/.ssh/id_rsa $TARGET_HOST<<EOF
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

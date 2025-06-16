// pipeline {
//     agent any

//     environment {
//         TARGET_HOST = credentials('app-server-host') 
//     }

//     stages {
//         stage('Deploy') {
//             steps {
//                 withCredentials([string(credentialsId: 'ec2-private-key-text', variable: 'SSH_KEY')]) {
//                     sh '''
//                         echo "$SSH_KEY" > private_key.pem
//                         chmod 600 private_key.pem
//                         ssh -o StrictHostKeyChecking=no -i private_key.pem $TARGET_HOST <<EOF
//                         cd ~/BlogServer
//                         git pull origin main
//                         docker-compose down
//                         docker-compose up -d --build
//                         EOF
//                         rm private_key.pem
//                     '''
//                 }
//             }
//         }
//     }
// }


// pipeline {
//     agent any

//     environment {
//         TARGET_HOST = credentials('app-server-host')  
//     }

//     stages {
//         stage('Deploy') {
//             steps {
//                 withCredentials([string(credentialsId: 'ec2-private-key-text', variable: 'SSH_KEY')]) {
//                     sh '''
//                         echo "$SSH_KEY" > private_key.pem
//                         chmod 600 private_key.pem
//                         ssh -v -o StrictHostKeyChecking=no -i private_key.pem $TARGET_HOST "echo SSH connection successful"
//                         ssh -tt -o StrictHostKeyChecking=no -i private_key.pem $TARGET_HOST <<EOF
//                         cd ~/BlogServer
//                         git pull origin main
//                         docker-compose down
//                         docker-compose up -d --build
//                         EOF
//                         rm private_key.pem
//                     '''
//                 }
//             }
//         }
//     }
// }


pipeline {
    agent any

    stages {
        stage('Test SSH') {
            steps {
                sshagent(['ec2-private-key-text']) {
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@3.71.114.206 'echo SSH connection successful'"
                }
            }
        }
    }
}

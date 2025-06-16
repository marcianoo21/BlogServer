// pipeline {
//     agent any

//     environment {
//         TARGET_HOST = credentials('app-server-host')
//     }

//     stages {
//         stage('Deploy') {
//             steps {
//                 sshagent (credentials: ['ssh-key-id']) {
//                     sh '''
//                         ssh $TARGET_HOST <<EOF
//                         cd ~/BlogServer
//                         git pull origin main
//                         docker-compose down
//                         docker-compose up -d --build
//                         EOF
//                     '''
//                 }
//             }
//         }
//     }
// }


pipeline {
    agent any
    stages {
        stage('Test SSH Agent') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh 'ssh-add -l'  // lista załadowanych kluczy, powinieneś zobaczyć fingerprint
                }
            }
        }
    }
}

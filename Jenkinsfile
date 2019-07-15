pipeline {
    agent any
    environment {
        HUB_DOMAIN = 'hub.k8s.com' // 'docker 私有仓库域'
        PROJECT_NAME = 'cms' // 项目名称
        NAMESPACE_NAME = 'cms' // namespace名称
        DEPLOYMENT_NAME = 'frontend' // deployment 名称
        CONTAINER_NAME = 'frontend' // 容器名称
    }
    tools {nodejs "NodeJS 12.4.0"}
    stages {
        stage('获取SCM') {
            steps{
                checkout scm
            }
        }
        stage('Env') {
            steps {
                sh 'npm install -g yarn'
                sh 'npm install -g jest'
                sh 'yarn -v'
                sh 'yarn'
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'yarn test'
        //     }
        // }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
        stage('构建并推送镜像') {
            steps{
                echo '开始构建镜像。。。'
                withCredentials([usernamePassword(credentialsId: 'docker-register', passwordVariable: 'dockerPassword', usernameVariable: 'dockerUser')]) {
                    sh "./cicd_script/build_image.sh ${HUB_DOMAIN} ${dockerUser} ${dockerPassword} ${PROJECT_NAME} ${CONTAINER_NAME}"
                }
            }
        }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //         sh "./cicd_script/deploy_image.sh ${NAMESPACE_NAME} ${DEPLOYMENT_NAME} ${CONTAINER_NAME}"
        //     }
        // }
    }
    post{
        always {
            echo '执行完毕'
            deleteDir()
        }
        failure{
            echo '执行失败'
        }
        success{
            echo 'pipeline 执行成功'
        }
        unstable{
            echo '测试失败，需要检查测试或者查看编码规范！'
        }
        aborted{
            echo 'Pipeline 被终止，如需继续，请重新运行 pipeline'
        }
    }
}
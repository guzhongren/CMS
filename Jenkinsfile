pipeline {
    agent any
    parameters {
        string(name: 'hub_domain', defaultValue: 'hub.k8s.com', description: 'docker 私有仓库域')
        string(name: 'project_name', defaultValue: 'cms', description: '项目名称')
        string(name: 'namespace_name', defaultValue: 'cms', description: 'namespace名称')
        string(name: 'deployment_name', defaultValue: 'frontend', description: 'deployment 名称')
        string(name: 'container_name', defaultValue: 'frontend', description: '容器名称')
    }
    tools {NodeJS "NodeJS 12.4.0"}
    stages {
        stage('获取SCM') {
            steps{
                checkout scm
            }
        }
        stage('Env') {
            steps {
                sh 'npm install -g yarn'
                sh 'yarn -v'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
        stage('构建并推送镜像') {
            steps{
                echo '开始构建镜像。。。'
                withCredentials([usernamePassword(credentialsId: 'docker-register', passwordVariable: 'dockerPassword', usernameVariable: 'dockerUser')]) {
                    sh "./cicd_script/build_image.sh ${params.hub_domain} ${dockerUser} ${dockerPassword} ${params.project_name} ${params.container_name}"
                }
            }
        }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //         sh "./cicd_script/deploy_image.sh ${params.namespace_name} ${params.deployment_name} ${params.container_name}"
        //     }
        // }
    }
    post{
        always {
            echo '执行完毕'
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
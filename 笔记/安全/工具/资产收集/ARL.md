# ARL(Asset Reconnaissance Lighthouse)资产侦察灯塔系统

Python 3.6 Docker Images Github Issues Github Stars

资产灯塔，不仅仅是域名收集

简介
> 旨在快速侦察与目标关联的互联网资产，构建基础资产信息库。 协助甲方安全团队或者渗透测试人员有效侦察和检索资产，发现存在的薄弱点和攻击面。

系统要求:
目前暂不支持Windows。Linux和MAC建议采用Docker运行，系统配置最低2核4G。
由于自动资产发现过程中会有大量的的发包，建议采用云服务器可以带来更好的体验。


**Docker 启动**
拉取镜像
```
docker pull tophant/arl
```

**docker-compose 启动**

git clone https://github.com/TophantTechnology/ARL
cd ARL/docker/

生成自启动服务

systemctl enable docker.service


docker-compose up -d

> 登录页面，默认端口5003, 默认用户名密码admin/arlpass





### docker

使用docker 搭建`PHP`环境

**PHP**

- PHP 5.2

|PHP版本|系统版本|	Apache 版本|Web路径|COMMAND|
|-|-|-|-|-|
|5.2.17|Ubuntu 16.04.5|2.2.22|	/var/www/html|/init.sh|
```bash
# 拉取镜像
docker pull seti/php52:latest

# 运行容器
docker run -d -p 8080:80 --name PHP5.2 seti/php52:latestW
```

- PHP 5.6

|PHP版本|系统版本|	Apache 版本|Web路径|COMMAND|
|-|-|-|-|-|
|5.6.40|Ubuntu 16.04.5|2.4.37|/var/www/app|/sbin/entrypoint.sh|

```bash
# 拉取镜像
docker pull romeoz/docker-apache-php:5.6

# 运行容器
docker run -d -p 8080:80 --name PHP5.6 romeoz/docker-apache-php:5.6
```

- PHP 7.3

|PHP版本|系统版本|	Apache 版本|Web路径|COMMAND|
|-|-|-|-|-|
|7.3.10|Ubuntu 18.04.3|2.4.4|/var/www/app|/sbin/entrypoint.sh|

```bash
# 拉取镜像
docker pull romeoz/docker-apache-php:7.3

# 运行容器
docker run -d -p 8080:80 --name PHP7.3 romeoz/docker-apache-php:7.3
```

**LAMP**


- PHP 5.6.28 + MariaDB 10.1.19

|PHP版本|MariaDB版本|系统版本|Apache 版本	|Web路径|	COMMAND|
|-|-|-|-|-|-|
|5.6.28	|10.1.19	|Alpine Linux 3.4	|2.4.23|	/var/www/html|	/start.sh|

MySQL 的用户名和密码信息：
|用户名|密码|
|-|-|
|root|空|

```bash
# 拉取镜像
docker pull janes/alpine-lamp:latest

# 运行容器
docker run -d -p 8080:80 --name LAMP janes/alpine-lamp:latest
```


- PHP 5.5.9 + MySQL 5.5.61

|PHP版本|MySQL版本|系统版本|Apache 版本	|Web路径|	COMMAND|
|-|-|-|-|-|-|
|5.5.9	|5.5.61	|Ubuntu 14.04.5		|2.4.7|	/var/www/html|	/start.sh|

MySQL 的用户名和密码信息：

|用户名|密码|
|-|-|
|root|root|

```bash
# 拉取镜像
docker pull medicean/vulapps:base_lamp

# 运行容器
docker run -d -p 8080:80 --name LAMP medicean/vulapps:base_lamp
```

- PHP 7.3.22 + MariaDB 10.4.15

|PHP版本|MariaDB版本|系统版本|Apache 版本	|Web路径|	COMMAND|
|-|-|-|-|-|-|
|7.3.22	|10.4.15	|Alpine Linux 3.11|2.4.46|/var/www/localhost/htdocs|/entry.sh|

MySQL 的用户名和密码信息：

|用户名|密码|
|-|-|
|root|root|

```bash
# 拉取镜像
docker pull sqlsec/alpine-lamp

# 运行容器 记住要指定密码
docker run -d -p 8080:80 --name LAMP -e MYSQL_ROOT_PASSWORD=root sqlsec/alpine-lamp
```


## docker 指令

docker中的常用代码：
```bash
# 使用docker attach进入Docker容器
docker ps -a

# 获取目标机器的shell
 docker attach 44fc0f0582d9 /bin/shell

# 获取目标机器的shell
 docker exec -it a75482c765e5febee126 /bin/bash  /bin/sh

# 基本操作
docker run -d -p 物理端口1:容器端口1 -p 物理端口2:物理端口2 --name 容器名 <image-name>:<tag>

docker exec -it 容器名/ID bash

# 容器打包镜像
docker commit -a "作者" -m "备注" 容器ID <image-name>:<tag>

# 将容器打包成规范的镜像
docker commit -m <exiting-Container> <hub-user>/<repo-name>[:<tag>]


# 磁盘挂载
docker run -d -p 8080:80 -v 本机路径:容器路径 --name 容器名  <image-name>:<tag>


# 物理机拷贝到容器
docker cp test.txt 容器ID:/var/www/html

# 容器拷贝到物理机
docker cp 容器ID:/var/www/html/test.txt 物理机路径

# 查看容器 COMMAND
 docker ps -a --no-trunc

# 停止所有容器 以此类推
docker stop $(dokcer ps -aq)


# 将镜像修改成规范的镜像
docker tag <existing-image> <hub-user>/<repo-name>[:<tag>]

docker commit -m "test" -a "leon" ac12c8e1f24f harborinner.517la.com:1111/dev/cluserappweb:2020-10-09-18-15-17-new


# 脚本运行
 docker run -itd -p 5001:5000 xidaner/web-pyyaml:v0.2 /start.sh


# 登录 Docker Hub
docker login

# 上传推送镜像到公共仓库
docker push <hub-user>/<repo-name>:<tag>

# 当前目录的 Dockerfile 创建镜像
docker build -t <image-name>:<tag> .

# 指定文件构建镜像
docker build -f /path/to/a/Dockerfile -t <image-name>:<tag> .

# 将镜像保存 tar 包
docker save -o image-name.tar <image-name>:<tag>

# 导入 tar 镜像
docker load --input image-name.tar


# docker-compose 命令相关
## 基本操作
docker-compose up -d


## 关闭并删除容器
docker-compose down

## 开启|关闭|重启已经存在的由docker-compose维护的容器
docker-compose start|stop|restart

## 运行当前内容，并重新构建
docker-compose up -d --build


## 将会导致退出容器。采用下面两种方式可以不退出容器而更新 Apache。

* 方法一：在容器内执行

service apache2 reload
1
* 方法二：exit 退出容器后，执行：

docker restart [container name]


## 删除所有镜像

docker rmi -f $(docker images -qa)

## 删除所有镜像运行的实例

docker rm `docker ps -a -q`
```




## 运用ubuntu镜像运行一个容器

```bash
docker run -it -d --name=python3.6demo ubuntu
```

返回一个id
```bash
65a616b14344fe6691f5198a68c35899fca02761e554787d6014e022349e9c2e
```
进入docker终端

```bash
docker exec -it 65a bash
```

更新源

```bash
apt-get update
```

安装 python2.7

```bash
apt-get install python2.7
```

建立软连接

```bash
which python2.7  --查看python2.7位置

> /usr/bin/python2.7

ln -s /usr/bin/python2.7 /usr/bin/python
```

提交新的镜像

```bash
docker commit -m="new python2.7 images" -a="simayi" 65a616b14344 simayi/python2.7:new
```

建立 Dockerfile,使用自定义的镜像运行 python 程序

```bash
# 创建一个目录和文件
mkdir ~/docker-demo
cd ~/docker-demo
touch Dockerfile   <注意: 此文件名必须为 Dockerfile>
touch requirements.txt
touch app.py
```

编写 Dockerfile 和 Python 程序

> vim app.py

```py
from flask import Flask
from redis import Redis, RedisError
import os
import socket
# Connect to Redis
redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

app = Flask(__name__)

@app.route("/")
def hello():
    try:
        visits = redis.incr("counter")
    except RedisError:
        visits = "<i>cannot connect to Redis, counter disabled</i>"

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>" \
           "<b>Visits:</b> {visits}"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
```

> vim requirements.txt

```bash
Flask
Redis
```


vim Dockerfile

```bash
# 使用一个原始的镜像
FROM python:2.7-slim

# 建立工作目录 /app
WORKDIR /app

# 将当前文件所在的目录下的所有文件 copy 到工作目录
COPY . /app

# 运行命令安装 requirement.txt 依赖环境
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# docker 暴露80端口
EXPOSE 80

# 设置环境变脸
ENV NAME World

# 运行命令, 启动 web 程序
CMD ["python", "app.py", "runserver"]

# 运行 docker 镜像命令

docker build -t friendlyhello .

# -t: 指定镜像的名称 运行应用

docker run -p 4000:80 friendlyhello

# 镜像出现 Configuring tzdata - Please select the geographic area in which you live. Subsequent configuration
# dockerfile文件RUN之间加

ARG DEBIAN_FRONTEND=noninteractive
```


## Dockerfile指令

我们需要了解一些基本的Dockerfile 指令，Dockerfile 指令为 Docker 引擎提供了创建容器映像所需的步骤。这些指令按顺序逐一执行。以下是有关一些基本 Dockerfile 指令的详细信息。


1. FROM

FROM 指令用于设置在新映像创建过程期间将使用的容器映像。

格式：FROM 

示例：
```
FROM nginx

FROM microsoft/dotnet:2.1-aspnetcore-runtime
```

2. RUN

RUN 指令指定将要运行并捕获到新容器映像中的命令。 这些命令包括安装软件、创建文件和目录，以及创建环境配置等。

格式：

```
RUN ["", "", ""]
```

示例：
```
RUN apt-get update
RUN mkdir -p /usr/src/redis

RUN apt-get update && apt-get install -y libgdiplus

RUN ["apt-get","install","-y","nginx"]
```

注意：每一个指令都会创建一层，并构成新的镜像。当运行多个指令时，会产生一些非常臃肿、非常多层的镜像，不仅仅增加了构建部署的时间，也很容易出错。因此，在很多情况下，我们可以合并指令并运行，例如：RUN apt-get update && apt-get install -y libgdiplus。在命令过多时，一定要注意格式，比如换行、缩进、注释等，会让维护、排障更为容易，这是一个比较好的习惯。使用换行符时，可能会遇到一些问题，具体可以参阅下节的转义字符。

3. COPY

COPY 指令将文件和目录复制到容器的文件系统。文件和目录需位于相对于 Dockerfile 的路径中。

格式：

```bash
# 如果源或目标包含空格，请将路径括在方括号和双引号中。
COPY
COPY ["", ""]
```

示例：

```bash
COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

COPY . /usr/share/nginx/html

COPY hom* /mydir/
```

4. ADD

ADD 指令与 COPY 指令非常类似，但它包含更多功能。除了将文件从主机复制到容器映像，ADD 指令还可以使用 URL 规范从远程位置复制文件。

格式：

```bash
ADD<source> <destination>
```

示例：

```
ADD https://www.python.org/ftp/python/3.5.1/python-3.5.1.exe /temp/python-3.5.1.exe
```
此示例会将 Python for Windows下载到容器映像的 c:\temp 目录。


5. WORKDIR

WORKDIR 指令用于为其他 Dockerfile 指令（如 RUN、CMD）设置一个工作目录，并且还设置用于运行容器映像实例的工作目录。

格式：

```
WORKDIR
```
示例：

WORKDIR /app


6. CMD

CMD指令用于设置部署容器映像的实例时要运行的默认命令。例如，如果该容器将承载 NGINX Web 服务器，则 CMD 可能包括用于启动Web服务器的指令，如 nginx.exe。 如果 Dockerfile 中指定了多个CMD 指令，只会计算最后一个指令。

格式：

```bash
CMD ["<executable", "

CMD

示例：

CMD ["c:\\Apache24\\bin\\httpd.exe", "-w"]

CMD c:\\Apache24\\bin\\httpd.exe -w

```

7. ENTRYPOINT

配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖。每个 Dockerfile 中只能有一个ENTRYPOINT，当指定多个时，只有最后一个起效。

格式：

```
ENTRYPOINT ["", ""]
```
示例：

```
ENTRYPOINT ["dotnet", "Magicodes.Admin.Web.Host.dll"]
```


8.ENV

ENV命令用于设置环境变量。这些变量以”key=value”的形式存在，并可以在容器内被脚本或者程序调用。这个机制给在容器中运行应用带来了极大的便利。

格式：

```
ENV==...
```

示例：

```
ENV VERSION=1.0 DEBUG=on \

NAME="Magicodes"
```


9.EXPOSE

EXPOSE用来指定端口，使容器内的应用可以通过端口和外界交互。

格式：

EXPOSE

示例：

EXPOSE 80


### DOCKER查询获取镜像报错ERROR RESPONSE FROM DAEMON：LOOKUP INDEX.DOCKER.IO ON 127.0.1.1:53: SERVER MISBEHAVING

输入docker search tomcat 之后遇到

```bash
Error response from daemon: Get https://index.docker.io/v1/search?q=tomcat&n=25: dial tcp: lookup index.docker.io on 127.0.1.1:53: server misbehaving
```

1. 通过dig @114.114.114.114 registry-1.docker.io找到可用IP:如图所示：


```bash
root@ubuntu:~/docker/0ctf_2016_unserialize# dig @114.114.114.114 registry-1.docker.io

; <<>> DiG 9.16.1-Ubuntu <<>> @114.114.114.114 registry-1.docker.io
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 4414
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;registry-1.docker.io.		IN	A

;; ANSWER SECTION:
registry-1.docker.io.	64	IN	A	3.229.227.53
registry-1.docker.io.	64	IN	A	34.197.211.151
registry-1.docker.io.	64	IN	A	34.198.213.42

;; Query time: 24 msec
;; SERVER: 114.114.114.114#53(114.114.114.114)
;; WHEN: Wed Oct 20 18:19:57 CST 2021
;; MSG SIZE  rcvd: 97

root@ubuntu:~/docker/0ctf_2016_unserialize#

```

在/etc/hosts文件中添加如下语句。以上所有IP随机选择都可用。

```
3.229.227.53 registry-1.docker.io
```

输入以下代码进行重启

```
/etc/init.d/networking restart
```
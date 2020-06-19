# apache、php、mysql 服务安装

**安装apache**
```
yum -y install httpd
```
2.开启apache服务
```
systemctl start httpd.service
```
3.设置apache服务开机启动
```
systemctl enable httpd.service
```
4.验证apache服务是否安装成功
在本机浏览器中输入虚拟机的ip地址，CentOS7查看ip地址的方式为：
ip addr
（阿里云不需要用这种方式查看，外网ip已经在你主机列表那里给你写出来了的；）
这里是访问不成功的
（阿里云用外网访问，能成功，不需要做以下步骤）
查了资料，说法是，CentOS7用的是Firewall-cmd，CentOS7之前用的是iptables防火墙；要想让外网能访问到apache主目录，就需要做以下的操作：
```
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --reload
```

**linux 安装php7.2**

1、安装源

安装php72w，是需要配置额外的yum源地址的，否则会报错不能找到相关软件包。

php高版本的yum源地址，有两部分，其中一部分是epel-release，另外一部分来自webtatic。如果跳过epel-release的话，安装webtatic的时候，会有错误爆出。

所以，这里需要的命令是：
```
rpm -Uvh https://dl.Fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm

rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

当然，您也可以选择下面的这个命令，也是一样的效果。
```
yum install epel-release -y

rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

2、清除历史版本

为了防止CentOS上面发生php冲突，所以，这个命令还是先执行一下更好些。
```
yum -y remove php*
```


3、安装扩展包

事实上，这里面的对应扩展库很多，这里大家一定要注意cli和fpm这两个包，而其它的相关包就看您需要了。
```
yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel
```

还有比较豪华的版本：
```
yum -y install php72w php72w-cli php72w-fpm php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-opcache php72w-pdo php72w-xml
```

4、安装完成以后，启动服务
```
systemctl enable php-fpm.service

systemctl start php-fpm.service
```

**安装MYSQL**

一、安装YUM Repo
1、由于CentOS 的yum源中没有mysql，需要到mysql的官网下载yum repo配置文件。
下载命令：

`wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm`

2、然后进行repo的安装：
`rpm -ivh mysql57-community-release-el7-9.noarch.rpm`
1. 检查是否已经安装过mysql，执行命令

```
[root@localhost /]# rpm -qa | grep mysql
```

如果需要安装最新版、记得备份！

2. yum安装：

```
yum install mysql-server
```

启动MYSQl：
```
systemctl start mysqld   #启动MySQL
```

3. 获取安装时的临时密码（在第一次登录时就是用这个密码）：
```
grep 'temporary password' /var/log/mysqld.log
```


grep 'temporary password' /var/log/mysqld.log



数据库账号/密码
root
@p8Jr*O5Y


```
window下

1.导出整个数据库

mysqldump -u 用户名 -p 数据库名 > 导出的文件名

mysqldump -u dbuser -p dbname > dbname.sql

   

2.导出一个表

mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名

mysqldump -u dbuser -p dbname users> dbname_users.sql

   

3.导出一个数据库结构

mysqldump -u dbuser -p -d --add-drop-table dbname >d:/dbname_db.sql

-d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table

   

4.导入数据库

常用source 命令

进入mysql数据库控制台，如

mysql -u root -p

mysql>use 数据库

然后使用source命令，后面参数为脚本文件(如这里用到的.sql)

mysql>source d:/dbname.sql

   

   

1. 导入数据到数据库

mysql -uroot -D数据库名 

1. 导入数据到数据库中得某个表

mysql -uroot -D数据库名  表名

   

D:\APMServ5.2.6\MySQL5.1\bin>mysqldump -u root -p  erp lightinthebox_tags > ligh

tinthebox.sql

   

linux下

一、导出数据库用mysqldump命令（注意mysql的安装路径，即此命令的路径）：

1、导出数据和表结构：

mysqldump -u用户名 -p密码 数据库名 > 数据库名.sql

#/usr/local/mysql/bin/   mysqldump -uroot -p abc > abc.sql

敲回车后会提示输入密码

2、只导出表结构

mysqldump -u用户名 -p密码 -d 数据库名 > 数据库名.sql

#/usr/local/mysql/bin/   mysqldump -uroot -p -d abc > abc.sql

注：/usr/local/mysql/bin/  --->  mysql的data目录

   

二、导入数据库

1、首先建空数据库

mysql>create database abc;

2、导入数据库

方法一：

（1）选择数据库

mysql>use abc;

（2）设置数据库编码

mysql>set names utf8;

（3）导入数据（注意sql文件的路径）

mysql>source /home/abc/abc.sql;

方法二：

mysql -u用户名 -p密码 数据库名 < 数据库名.sql

#mysql -uabc_f -p abc < abc.sql
```

















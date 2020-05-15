# oracle

## 数据库下载和帮助

Oracle数据库下载地址

- https://www.oracle.com/technetwork/cn/database/enterprise-edition/downloads/index.html

Oracle数据库技术文章

- https://www.oracle.com/technetwork/cn/index.html


## Oracle安装

这里以 Oracle19c 为例

```
yum localinstall -y oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm

yum localinstall -y oracle-database-ee-19c-1.0-1.x86_64.rpm
```

## 修改字符集以及其他的配置:

```bash
yum localinstall -y oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm

yum localinstall -y oracle-database-ee-19c-1.0-1.x86_64.rpm
```

注意安装完成之后的配置 需要使用 root 用户.

修改字符集以及其他的配置:
```
vim /etc/init.d/oracledb_ORCLCDB-19c

export ORACLE_VERSION=19c
export ORACLE_SID=ORA19C
export TEMPLATE_NAME=General_Purpose.dbc
export CHARSET=ZHS16GBK
export PDB_NAME=ORA19CPDB
export CREATE_AS_CDB=true
```

复制参数文件
```bash
cd /etc/sysconfig/
cp oracledb_ORCLCDB-19c.conf  oracledb_ORA19C-19c.conf

/etc/init.d/oracledb_ORCLCDB-19c configure
# 等待Oracle数据库执行初始化操作即可
```

增加环境变量处理
```vim
vim /etc/profile.d/oracle19c.sh

export  ORACLE_HOME=/opt/oracle/product/19c/dbhome_1
export  PATH=$PATH:/opt/oracle/product/19c/dbhome_1/bin
export  ORACLE_SID=ORA19C
```
```
source /etc/profile.d/oracle19c.sh
```

```bash
# 修改Oracle用户的密码:
passwd oracle

# 使用Oracle登录进行相关的处理
su - oracle
sqlplus / as sysdba

# 查看pdb信息
show pdbs

# 修改密码
alter user system identified by Test1234;

# 启动
startup
exit

# 启动监听器
cd $ORACLE_HOME/bin
lsnrctl start
```
```
systemctl stop firewalld
systemctl disable firewalld
setenforce 0
```

# 默认

Oracle数据库中的两个具有 DBA权限的用户 Sys和 System的缺省密码是 manager。






**报错注意**

**关于ORA-28040的错误原因**

sqlnet值没设定的情况下ORACLE 12C的服务端只运行12C的客户端进行连接，所以通过11版本的客户端连接的时候就会报ORA-28040的错误。通过增加以上参数就可以让ORACLE12C的服务端运行较低的客户端进行连接。


[https://blog.csdn.net/Poison_1212/article/details/101544355](Oracle12c连接问题ORA-28040：没有匹配的验证协议的解决方案 Oracle数据库高版本服务兼容低版本客户端问题)


```
windows:
oracle\product\12.1.0\dbhome_1\NETWORK\ADMIN\sqlnet.ora

linux:
vi $ORACLE_HOME/network/admin/sqlnet.ora

```
> 其实根本原因还是：版本不兼容 两个版本的jdk 版本不不一致

1. 修改Oracle的配置文件： 文件位于Oracle 服务端安装的根目录；
D:\app\oracle\product\12.1.0\dbhome_1\NETWORK\ADMIN
的 sqlnet.ora文件里面，盘符看具体的安装情况。


2. 在配置文件中添加如下语句：
```
SQLNET.ALLOWED_LOGON_VERSION_SERVER=8

SQLNET.ALLOWED_LOGON_VERSION_CLIENT=8
```





**创建用户**

oracle内部有两个建好的用户：system和sys。用户可直接登录到system用户以创建其他用户，因为system具有创建别 的用户的 权限。 在安装oracle时，用户或系统管理员首先可以为自己建立一个用户。

```
语法[创建用户]： create user 用户名 identified by 口令[即密码]；

例子： create user test identified by test;

语法[更改用户]: alter user 用户名 identified by 口令[改变的口令];

例子： alter user test identified by 123456;

```


**创建用户的时候用户名以c##或者C##开头即可。**

错误写法： `create user zhaojiedi identified by oracle;`
正确写法：` create user c##test identified by oracle;`





创建表空间的语法是：
```oracle
CREATE TABLESPACE test1
DATAFILE /home/oracle/app/oradata/orcl/TSPLN.dbf size 600M 
AUTOEXTEND off;

```


---


# 使用oracleShell 

对oracle 数据库进行命令执行

-[oracleShell oracle 数据库命令执行](https://github.com/jas502n/oracleShell)

在测试  Oracle数据库 进行提权操作的时候，发现了一个不错的工具 oracleShell 。

若当我们经过其他手段获取到 Oracle 数据库的账号，密码，SID后尝试登录后发现可以连接，就可以尝试使用该工具进行提权操作

使用起来很简单，只要在响应的输入框中填写数据即可。
(A君：那么请问能不能详细一点呢？)

在尝试连接的时候，Oracle数据库忽然报错：

![](img/2.png)


```
ORA-28040:No matching authentication protocol
```

搜索后发现，原来是 oracleShell 这个软件的服务器连接工具版本和响应数据库不兼容。



在sqlnet值没设定的情况下 ，ORACLE 12C的服务端只能运行 ORACLE 12C的客户端进行连接，

所以当通过11c 版本的客户端进行连接的时候就会报ORA-28040的错误。

通过修改参数就可以让ORACLE12C的服务端运行较低的客户端进行连接。

简单的来说解决兼容性问题就是让高版本的额数据库服务也能让低版本的额数据库来连接。


windows用户：

1. 修改Oracle的配置文件：
 
文件位于Oracle 服务端安装的根目录；
```
D:\app\oracle\product\12.1.0\dbhome_1\NETWORK\ADMIN
```
的 sqlnet.ora文件里面。

![](img/4.png)


2. 在这个文件夹中添加两句话：

```
SQLNET.ALLOWED_LOGON_VERSION_SERVER=8

SQLNET.ALLOWED_LOGON_VERSION_CLIENT=8
```
由于装数据库的方式或者初始设置不同，这个文件`不一定存在`，但是可以自己手动创建。

SQLNET.ALLOWED_LOGON_VERSION_SERVER：控制可以连接到12c数据库的客户端版本（client —>orace 12c db ）


SQLNET.ALLOWED_LOGON_VERSION_CLIENT：控制12c数据库可以连到哪些版本的数据库（orace 12c db —>其它版本的oracle db）例如：控制通过DB LINK可连接到哪些版本的oracle库。

该参数用来限制可以连接到数据库服务器上的`最小客户端版本`，比如设置值为10，即10g，11g等以上客户端版本可以连接到数据库服务器上。在不是指的时候是用默认值的，导致低版本连接不上高版本的数据库。

3. 启需要连接这个数据库的客户端的LISTENER：

不用重启数据库或者监听，也不用重启应用。

linxu:

```
vim $ORACLE_HOME/network/admin/sqlnet.ora
```
在文件中添加两句话:

![](img/5.png)

```
SQLNET.ALLOWED_LOGON_VERSION_SERVER=8

SQLNET.ALLOWED_LOGON_VERSION_CLIENT=8
```
并且把原来的 `SQLNET.ALLOWED_LOGON_VERSION=8` 注释掉.

然后重启服务和监听器。

然后重启监听即可
```
lsnrctl stop
lsnrctl start
```

![](img/1.png)

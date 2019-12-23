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

```
vim /etc/init.d/oracledb_ORCLCDB-19c

export ORACLE_VERSION=19c
export ORACLE_SID=ORA19C
export TEMPLATE_NAME=General_Purpose.dbc
export CHARSET=ZHS16GBK
export PDB_NAME=ORA19CPDB
export CREATE_AS_CDB=true
复制参数文件
```



```
cd /etc/sysconfig/
cp oracledb_ORCLCDB-19c.conf  oracledb_ORA19C-19c.conf

/etc/init.d/oracledb_ORCLCDB-19c configure
```

# 默认

Oracle数据库中的两个具有 DBA权限的用户 Sys和 System的缺省密码是 manager。

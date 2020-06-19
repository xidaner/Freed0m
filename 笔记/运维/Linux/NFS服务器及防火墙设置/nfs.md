# NFS网络文件系统详解

## 第1章 NFS基本概述

### 1.1 什么是nfs

NFS是Network File System的缩写及网络文件系统。

主要功能是通过局域网络让不同的主机系统之间可以共享文件或目录。
```
NFS系统和Windows网络共享、网络驱动器类似, 只不过windows用于局域网, NFS用于企业集群架构中, 如果是大型网站, 会用到更复杂的分布式文件系统FastDFS,glusterfs,HDFS
```

## 1、什么是NFS服务器

　　NFS就是Network File System的缩写，它最大的功能就是可以通过网络，让不同的机器、不同的操作系统可以共享彼此的文件。

>　NFS服务器可以让PC将网络中的NFS服务器共享的目录挂载到本地端的文件系统中，而在本地端的系统中来看，那个远程主机的目录就好像是自己的一个磁盘分区一样，在使用上相当便利；

> NFS客户端就可以将这个目录挂载到自己文件系统的某个挂载点，这个挂载点可以自己定义，如上图客户端A与客户端B挂载的目录就不相同。并且挂载好后我们在本地能够看到服务

## 2、NFS软件安装

要部署NFS服务，必须安装下面两个软件包：`nfs-utils`：NFS主程序，rpcbind:`PRC主程序`； 

`NFS服务器端和Client端都需要这安装这两个软件。`

注意：NFS的`RPC服务器`，Centos5下名字为portmap,CentOS6和CentOS7下名称为`rcpbind`

NFS软件包

nfs-utils:NFS主程序，包含rpc.nfsd  rpc.mount两个deamons

rpcbind:RPC主程序

## 2.2、安装NFS和RPC服务

       [root@server7 ~]# yum install nfs-utils  rpcbind

       [root@server7 ~]# rpm -qa  | egrep "nfs|rpcbind"
```
　　rpcbind-0.2.0-38.el7_3.1.i686

　　nfs-utils-1.3.0-0.33.el7_3.i686

　　libnfsidmap-0.25-15.el7.i686
```

## 3、启动NFS服务

### 3.1、启动NFS服务之前先启动rpcbind服务并

查看rcpbind状态
```
systemctl status rpcbind
```
### 3.2、RPC服务启动后再启动NFS服务

```
systemctl status  nfs
systemctl enable nfs --开机自启动
```

> 在确认启动没用问题后我们看一看NFS到底开了哪些端口

```
 netstat -tulnp |grep -E '(rpc|nfs)'
```
### 4、NFS常见进程详解

```
ps -ef |egrep "rpc|nfs“
```



























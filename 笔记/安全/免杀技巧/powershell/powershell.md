# POWSERSHELL

<p align="center">
    <img src="http://p2.music.126.net/z_JBzmgPbPUc3WwAsYOlhg==/109951165796436734.jpg?param=130y130" width="25%">
</p>

<p align="center">Cutthroat</p>
<p align="center"><a href="http://music.163.com/song?id=1826961929"><font>《Centerfold》</font></a> </p>
<p align="center">专辑：Follow You / Cutthroat</p>
<p align="center">歌手：Imagine Dragons</p>


- https://www.freebuf.com/articles/system/227467.html
- https://mp.weixin.qq.com/s/lhg71lVHfp9PY1m8sYXA_A
- https://cn-sec.com/archives/64079.html
- https://mp.weixin.qq.com/s?__biz=MzIwOTMzMzY0Ng==&mid=2247485018&idx=1&sn=a015c28ed2881d87e7a90f43986be6b5&chksm=97743abba003b3ad36368e7da925d44722e16eaeb8feb1687d64e83730a54046496d8138c6b2&scene=21#wechat_redirect
- https://mp.weixin.qq.com/s/EC0t_UrFDRjZZCfmzPTXtA

## powershell的几个基础知识

> powershell版本问题

powershell只能针对win7之后的系统，之前的win操作系统默认没有安装powershell。不同架构的payload（x86或x64）需要不同版本的powershell来加载，否则会出错。

```
64位所在目录：C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe

32位所在目录：C:\Windows\SysWOW64\WindowsPowerShell\v1.0\powershell.exe
```

**绕过策略限制**

PS `默认策略`通常会报禁用脚本运行

![](img/1.png)

此时需要使用**管理员权限**

**1. 更改脚本权限**

```
powershell -command  Get-ExecutionPolicy
```

- restricted:只能运行系统的ps命令
- ALLSigned:带有可信发布者签名的脚步都可以运行
- RemoteSigned:带有可发布者签名的一已下载脚本可运行
- Unrestricted:不受限制

```
powershell -com Set-ExecutionPolicy Unrestricted
```

**2. 本地权限绕过**

```
PowerShell -ExecutionPolicy Bypass -File xxx.ps1
```

**3. 本地隐藏权限绕过**

```
PowerShell -ExecutionPolicy Bypass -NoP -W Hidden -File 123.ps1
```
- noprofile简写 -nop， 为不加载 windows poweshell 配置文件
- WindowStyle hidden简写 -w 1，窗口为隐藏模式（powershell执行该命令后直接隐藏命令行窗口）
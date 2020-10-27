# 常用PowerShell命令总结

## 初步认识，什么是PowerShell

> Windows PowerShell 是一种命令行外壳程序和脚本环境，使命令行用户和脚本编写者可以利用 .NET Framework的强大功能。

>Windows PowerShell 需要用于管理.NET 对象的语言。该语言需要为使用cmdlet 提供一致的环境。该语言需要支持复杂的任务，而不会使简单的任务变得更复杂。 该语言需要与在.NET编程中使用的高级语言（如C#）一致。


## 更好的远程处理

`PowerShell`远程已经逐渐成为在网络上进行管理通信的主要渠道。越来越多的GUI管理控制台将依赖远程，因此加强PowerShell远程对微软很重要。现在能够断开远程会话，稍后能从同个或不同的计算机重新连接到相同的会话。客户端计算机崩溃的话，v3的社区技术预览版不能断开会话。`相反，会话会永久关闭。所以这与远程桌面完全不同，远程桌面会话能在客户端崩溃时配置并打开会话。`
所以PSv3版本使用需谨慎，建议使用PSv5版本。

## PS常用代码：

### 基础入门：

　1. 像文件系统那样操作Windows Registry——
```
cd hkcu:
```
　　2. 在文件里递回地搜索某个字符串——
```
dir –r | select string "searchforthis"
``` 
　　
　　3. 使用内存找到X个进程——
```
ps | sort –p ws | select –last x
```
　　4. 循环（停止，然后重启）一个服务，`如DHCP`——
```
Restart-Service DHCP
```
　　5. 在文件夹里列出所有条目——
```
Get-ChildItem – Force
```
　　6. `递归一系列的目录`或文件夹——
```
Get-ChildItem –Force c:\directory –Recurse
```
　　7. 在目录里移除所有文件而不需要单个移除——
```
Remove-Item C:\tobedeleted –Recurse
```
　　8. 重启当前计算机——
```
(Get-WmiObject -Class Win32_OperatingSystem -ComputerName .).Win32Shutdown(2)
```

## 收集信息

9. 获取计算机组成或模型信息——
```
Get-WmiObject -Class Win32_ComputerSystem
```
　　10. 获取当前计算机的BIOS信息——
```
Get-WmiObject -Class Win32_BIOS -ComputerName .
```
　　11. 列出所安装的修复程序（如QFE或Windows Update文件）——
```
Get-WmiObject -Class Win32_QuickFixEngineering -ComputerName .
```
　　12. 获取当前登录计算机的用户的用户名——
```
Get-WmiObject -Class Win32_ComputerSystem -Property UserName -ComputerName .
```
　　13. 获取当前计算机所安装的应用的名字——
```
Get-WmiObject -Class Win32_Product -ComputerName . | Format-Wide -Column 1
```
　　14. 获取分配给当前计算机的IP地址——
```
Get-WmiObject -Class Win32_NetworkAdapterConfiguration -Filter IPEnabled=TRUE -ComputerName . | Format-Table -Property IPAddress
```
　　15. 获取当前机器详细的IP配置报道——
```Get-WmiObject -Class Win32_NetworkAdapterConfiguration -Filter IPEnabled=TRUE -ComputerName . | Select-Object -Property [a-z]* -ExcludeProperty IPX*,WINS*
```
　　16. 找到当前计算机上使用DHCP启用的网络卡——
```
Get-WmiObject -Class Win32_NetworkAdapterConfiguration -Filter "DHCPEnabled=true" -ComputerName .
```
　　17. 在当前计算机上的所有网络适配器上启用DHCP——
```
Get-WmiObject -Class Win32_NetworkAdapterConfiguration -Filter IPEnabled=true -ComputerName . | ForEach-Object -Process {$_.EnableDHCP()}
```

## 软件管理

　　18. 在远程计算机上安装MSI包——
```
(Get-WMIObject -ComputerName TARGETMACHINE -List | Where-Object -FilterScript {$_.Name -eq "Win32_Product"}).Install(\\MACHINEWHEREMSIRESIDES\path\package.msi)
```
　　19. 使用基于MSI的应用升级包升级所安装的应用——
```
(Get-WmiObject -Class Win32_Product -ComputerName . -Filter "Name='name_of_app_to_be_upgraded'").Upgrade(\\MACHINEWHEREMSIRESIDES\path\upgrade_package.msi)
```
　　20. 从当前计算机移除MSI包——
```
(Get-WmiObject -Class Win32_Product -Filter "Name='product_to_remove'" -ComputerName . ).Uninstall()
```
## 机器管理
　　21. 一分钟后远程关闭另一台机器——
```
Start-Sleep 60; Restart-Computer –Force –ComputerName TARGETMACHINE
```
　　22. 添加打印机——
```
(New-Object -ComObject WScript.Network).AddWindowsPrinterConnection(\\printerserver\hplaser3)
```
　　23. 移除打印机——
```
(New-Object -ComObject WScript.Network).RemovePrinterConnection("\\printerserver\hplaser3 ")
```
　　24. 进入PowerShell会话——
```
invoke-command -computername machine1, machine2 -filepath c:\Script\script.ps1
```

## 远程桌面

### 以下操作，PS命令窗口，必须都以管理员省份执行。

## Step 1: 机器A和B,分别开启PowerShell远程管理服务
A = 192.168.3.32
```
PS >> Enable-PSRemoting
```
然后按照提示，选项选Y，执行开启远程管理。

B = 192.168.3.37
```
PS >> Enable-PSRemoting
```
然后按照提示，选项选Y，执行开启远程管理。
 

## Step 2: 机器A和B，分别信任需要远程管理的机器IP或名称
 A=192.168.3.32
 ```
PS >> Set-Item WSMan:\localhost\Client\TrustedHosts -Value IP 地址
```
然后按照提示，选项选Y，表示允许远程发送命令

B = 192.168.3.37
PS >> 
```
Set-Item WSMan:\localhost\Client\TrustedHosts -Value IP地址
```
然后按照提示，选项选Y，表示允许远程发送命令


## Step 3: 在机器A上面，远程登录和执行命令到机器B
A = 192.168.3.32
```
PS >> Enter-PSSession -ComputerName IP地址
```










# 口令获取及破解

在 Windows 系统中本机用户的密码 Hash 是放在本地的 SAM 文件里面，域内用户的密码 Hash 是存在域控的 NTDS.DIT 文件里面。

Windows 系统使用两种方法对用户的密码进行哈希处理,它们分别是 LAN Manager（LM）哈希和 NT LAN Manager（NTLM）哈希。所谓哈希（hash），就是使用一种加密函数进行计算后的结果。这个加密函数对一个任意长度的字符串数据进行一次数学加密函数运算，然后返回一个固定长度的字符串。现在已经有了更新的 NTLMv2 以及 Kerberos 验证体系。Windows 加密过的密码口令，我们称之为 hash，Windows 的系统密码 hash 默认情况下一般由两部分组成：第一部分是 LM-hash，第二部分是 NTLM-hash。

- LM Hash : LAN Manager（LM）哈希是 Windows 系统所用的第一种密码哈希算法，是一种较古老的 Hash，在 LAN Manager 协议中使用，非常容易通过暴力破解获取明文凭据。它只有唯一一个版本且一直用到了 NT LAN Manager（NTLM）哈希的出现，在 Windows Vista/Windows 7/Windows Server 2008 以及后面的系统中，LM 哈希算法是默认关闭的，LM 算法是在 DES 基础上实现的，不区分字母大小写。
    - 生成原理
        1. 用户的密码转换为大写，密码转换为16进制字符串，不足14字节将会用0来再后面补全。
        2. 密码的16进制字符串被分成两个 7byte 部分。每部分转换成比特流，并且长度位 56bit，长度不足使用0在左边补齐长度
        3. 再分 7bit 为一组,每组末尾加 0，再组成一组
        4. 上步骤得到的二组，分别作为 key 为 `KGS!@#$%` 进行 DES 加密。
        4. 将加密后的两组拼接在一起，得到最终 LM HASH 值。

- NTLM Hash : NT LAN Manager（NTLM）哈希是 Windows 系统认可的另一种算法，用于替代古老的LM-Hash，一般指 Windows 系统下 Security Account Manager（SAM）中保存的用户密码 hash，在 Windows Vista/Windows 7/Windows Server 2008 以及后面的系统中，NTLM 哈希算法是默认启用的。
    - 生成原理
        1. 先将用户密码转换为十六进制格式。
        2. 将十六进制格式的密码进行Unicode 编码。
        3. 使用 MD4 摘要算法对 Unicode 编码数据进行 Hash 计算
    - 快速生成 `python2 -c 'import hashlib,binascii; print binascii.hexlify(hashlib.new("md4", "P@ssw0rd".encode("utf-16le")).digest())'`

**工具**
- [mimikatz](https://github.com/gentilkiwi/mimikatz)
    - [mimikatz笔记](../../工具/mimikatz笔记.md)
- [skelsec/pypykatz](https://github.com/skelsec/pypykatz) - 用纯 Python 实现的 Mimikatz
- [AlessandroZ/LaZagne](https://github.com/AlessandroZ/LaZagne) - 抓密码神器
- [Arvanaghi/SessionGopher](https://github.com/Arvanaghi/SessionGopher) - 使用 WMI 提取 WinSCP、PuTTY、SuperPuTTY、FileZilla 和 Microsoft remote Desktop 等远程访问工具保存的会话信息的 ps 脚本
- [Invoke-WCMDump](https://github.com/peewpw/Invoke-WCMDump) - 从 Credential Manager 中转储 Windows 凭证的 PowerShell 脚本
    ```
    set-executionpolicy remotesigned
    import-module .\Invoke-WCMDump.ps1
    invoke-wcmdump
    ```
- [SterJo Key Finder](https://www.sterjosoft.com/key-finder.html) - 找出系统中软件的序列号

**文章**
- [几种windows本地hash值获取和破解详解](https://www.secpulse.com/archives/65256.html)
- [Windows密码抓取总结](https://times0ng.github.io/2018/04/20/Windows%E5%AF%86%E7%A0%81%E6%8A%93%E5%8F%96%E6%80%BB%E7%BB%93/)
- [深刻理解windows安全认证机制](https://klionsec.github.io/2016/08/10/ntlm-kerberos/)
- [Windows用户密码的加密方法与破解](https://www.sqlsec.com/2019/11/winhash.html#toc-heading-2)
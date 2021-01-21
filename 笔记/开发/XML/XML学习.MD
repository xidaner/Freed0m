# XML 文件

## 什么是 XML 文件

1. xml 是可扩展的标识语言，是开发者在符合 XML 命名规则的基础上，可以根据自己的需求定义自己的标签:
2. xml 文件的作用：主要是用于存储数据
3. xml 文件的方法： DOM、DOM4J、SAX

### Dom4j(~~动物世界~~)

使用 `Dom4j jar` 包来解析 XML 文件

1. 导入 Dom4j.jar 包
2. jar 包的常用对象：

- SAXReader: 读取 xml 文件到 Document 树结构文件对象
- Document: 是一个 xml 文件对象树，类比 Html 文档对象
- Element：元素节点。通过 Document 对象可以查找单个元素


在 XML 语法中，存在根标签，可以类比于 html 的`<html></html>`

xml语法实例如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<students>
    <student>
        <name>吉良吉影</name>
        <college>XML test</college>
        <telephone>13811111111</telephone>
        <notes>我的名字叫吉良吉影，33岁。住在杜王町东北部的别墅区一带，未婚。我在龟友连锁店服务。每天都要加班到晚上8点才能回家。我不抽烟，酒仅止于浅尝。晚上11点睡，每天要睡足8个小时。睡前，我一定喝一杯温牛奶，然后做20分钟的柔软操，上了床，马上熟睡。一觉到天亮，决不把疲劳和压力，留到第二天。医生都说我很正常。！</notes>
    </student>
</students>
```

使用 DOM4j 对XML 文件进行处理。

```java
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.util.Iterator;

public class XMLreader {

    public static void main(String[] args) throws DocumentException {
        //创建解析器
        SAXReader reader = new SAXReader();
        // 通过解析器的read方法将配置文件读取到内存中，生成一个Document[org.dom4j] 对象数
        Document document = reader.read("src/main/java/lession1.xml");
        // 获取根节点
        Element root = document.getRootElement();
        // 开始遍历根节点
        for (Iterator<Element> rootIter = root.elementIterator();rootIter.hasNext();){
            // 获取 student 节点对象
            Element studentElt =  rootIter.next();
            // 遍历 stuElement 节点下的所有子节点: name、college、telephone、notes
            for(Iterator<Element> innerIter = studentElt.elementIterator();innerIter.hasNext();){
                // 获取 student 节点下的子节点对象
                Element innerElt = innerIter.next();
                // 输出xml的内容
                System.out.println(innerElt.getStringValue());
            }
        }
    }
}

```

### Sax 解析 XML 文件

SAX 方式：事件驱动，边读边写。

执行过程如下：
- 当解析到开始标签的时候，执行 startElement 方法，参数 qName：返回标签名称
- 当解析到文本标签的时候，执行 characters 方法，通过 String 的构造方法返回文本内容
- 当解析到结束标签的时候，执行 endElement 方法，参数 qName：返回标签名称

SAX 解析四步：

1. 创建解析工厂：通过 newInstance() 方法获取

```java
// 创建解析工厂
SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
```

2. 创建解析器

```java
SAXParser saxParser = saxParserFactory.newSAXParser();
```

使用 `SAXParser` 解析器中的 `parse` 方法：
参数：
```bash
-f - 包含需要解析的 XML 文件
dh - 要使用的 SAX DefaultHandler.
```

SAX 解析的过程

```xml
<!--xml文件-->
<?xml version="1.0" encoding="UTF-8"?>
<person><!--开始标签-->

</person><!--结束标签-->
```

执行事件的处理器的三个方法：

```java
startElement(String uri,String localName,String qName,Attributes attrubutes)
qName: 把标签名称返回
attributes：返回标签中的属性对象


characters(char[]ch,int start,int length)
使用 String 的构造方法，将文本内容返回

endElement(String uri,String localName,String qName)
qName: 返回标签名称

```

**XPath 语法**

XPath 使用路径表达式来选取 XML 文档中的节点或节点集。节点是通过沿着路径(PATH) 或者步(steps) 来选取的。


```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<bookstore>
<book>
  <title lang="en">《呐 喊》</title>
  <author>鲁迅</author>
  <year>1923</year>
  <price>29.99</price>
</book>
</bookstore>
```

**选取节点**

XPath 使用路径表达式在 XML 文档中选取节点。节点是通过沿着路径或者 step 来选取的。


|表达式	|描述
|-|-|
|nodename |选取此节点的所有子节点。
|/	|从根节点选取。
|//	|从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置。
|.	|选取当前节点。
|..	|选取当前节点的父节点。
|@	|选取属性。

**在下面的表格中，我们已列出了一些路径表达式以及表达式的结果：**

|路径表达式	|结果
|-|-|
|bookstore	|选取 bookstore 元素的所有子节点。
|/bookstore	|选取根元素 bookstore。注释：假如路径起始于正斜杠( / )，则此路径始终代表到某元素的绝对路径！|
|bookstore/book	|选取属于 bookstore 的子元素的所有 book 元素。
|//book	|选取所有 book 子元素，而不管它们在文档中的位置。
|bookstore//book	|选择属于 bookstore 元素的后代的所有 book 元素，而不管它们位于 bookstore 之下的什么位置。
|//@lang	|选取名为 lang 的所有属性。


解析

```java
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class SQLlink {
    public static void main(String[] args) {
        try {
            SAXReader saxReader = new SAXReader();
            Document document = saxReader.read("src/main/java/Server.xml");
            Element connectorElt = (Element) document.selectSingleNode("//connector");
            Attribute portAttr = connectorElt.attribute("port");
            String port = portAttr.getStringValue();
            System.out.println(port);
            String portValue = connectorElt.attributeValue("port");
            System.out.println(portValue);
        } catch (DocumentException e) {
            e.printStackTrace();
        }


    }
}
```






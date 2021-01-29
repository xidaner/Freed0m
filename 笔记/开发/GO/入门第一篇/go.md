# go入门

重学 go 语言。 面向接口的语言。

## Hello World

```go
package main

import "fmt"    \\系统自带的主包可以运行简单的程序
func main() {
	jojo.println("俺は人間俺をやめるぞ！JOJO!")

}
```
![](img/2.png)


Go语言提供的工具都通过一个单独的命令go调用.go命令有一系列子命令。最简单的一个子命令就是run。

>main包比较特殊。它定义了一个独立可执行的程序，而不是一个库。在main里的main 函数 也很特殊，它是整个程序执行时的入口


>进入cmd中 把需要go的文件路径给复制一下<br>

在cmd中输入:

![](img/1.png)

![](img/3.png)


**编译**

语法

```
go build helloworld.go
```

默认编译的可执行文件都是当前操作系统的可执行文件，如果想要在window中编译一个linux下的可执行文件，需要怎么做呢？

只需要指定目标操作系统的平台和处理器即可：

```
SET CGO_ENABLED=0 //禁用CGO
SET GOOS=linux //目标平台是linux
SET GOARCH=amd64   // 目标处理器是 amd64
```

然后再执行 `go build` 命令即可，这样就能得到在 linux的平台运行的可执行文件。

MAC 下编译 linux

```
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build

CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build
```

Linux 下编译 MAC和windows平台64位可执行文件

```
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build

CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build
```

windows下编译编译 MAC平台64位可执行文件

```
SET CGO_ENABLED=0
SET GOOS=darwin
SET GOARCH=amd64
go build
```

## 变量声明

go 语言中的变量需要声明后才能使用，同一作用域内不支持重复声明。并且`Go语言的变量声明后必须使用`。

go 语言的变量声明格式位：

`var 变量名 变量类型` 当赋值的数值类型是 sting时 需要使用 双引号。

例如：

```go
var name string
var age int
var isOk bool
```

区别于动态语言 python 这种。go语言中的变量必须先声明再使用。而且变量声明后必须使用。

**批量声明**

```go
var (
	name string
	age int
	sex bool
)
```

**声明时同时赋值**

```go
	var s1 string = "aaa"
	fmt.Println(s1)
```

**类型推导**

更具值判断该变量是什么类型

```go
	var s2 = "20"
	fmt.Println(s2)
```

**简短变量声明**

此时变量赋值只能在函数中使用

```go
	s3 := "嘤嘤嘤"
	fmt.Println(s3)
```

**其他声明**

```go
var x int32 = 10
fmt.Println(x)
```

```go
var x = int32(10)
fmt.Println(x)
```



### 输出

### 控制流程

控制流程是每种语言的控制逻辑走向和执行次序的重要部分。

最主要的有 `if` 和 `for` ,而  `goto` 和 `switch` 是为了简化代码、降低重复代码而生的结构。属于拓展类的控制流程。


#### fmt占位符

**普通占位符**

|占位符|	说明|	举例	输出|
|-|-|-|-
|%v	|相应值的默认格式。	|Printf(“%v”, people)	|{sujing}，
|%+v|	打印结构体时，会添加字段名	|Printf(“%+v”, people)	|{Name:sujing}
|%#v|	相应值的Go语法表示	|Printf(“#v”, people)	|main.Human{Name:”sujing”}
|%T	|相应值的类型的Go语法表示	|Printf(“%T”, people)	|main.Human
|%%	|字面上的百分号，并非值的占位符	|Printf(“%%”)	|%

**布尔占位符**

|占位符	|说明	|举例	|输出
|-|-|-|-
|%t	|true 或 false。	|Printf(“%t”, true)	|true


**整数占位符**

|占位符|	说明	|举例|	输出|
|-|-|-|-
|%b	|二进制表示	|Printf(“%b”, 5)|	101|
|%c	|相应Unicode码点所表示的字符|	Printf(“%c”, 0x4E2D)|	中
|%d	|十进制表示	|Printf(“%d”, 0x12)	|18
|%o	|八进制表示	|Printf(“%d”, 10)	|12
|%q	|单引号围绕的字符字面值，由Go语法安全地转义|	Printf(“%q”, 0x4E2D)	|‘中’
|%x	|十六进制表示，字母形式为小写 a-f	|Printf(“%x”, 13)	|d
|%X	|十六进制表示，字母形式为大写 A-F	|Printf(“%x”, 13)	|D
|%U	|Unicode格式：U+1234，等同于 “U+%04X”|	Printf(“%U”, 0x4E2D)	|U+4E2D


**浮点数和复数的组成部分（实部和虚部）**

|占位符			|说明|			举例|			输出|
|-|-|-|-
|%b	|无小数部分的，指数为二的幂的科学计数法，与 strconv.FormatFloat 的 ‘b’ 转换格式一致。例如 -123456p-78|
|%e	|科学计数法，例如 -1234.456e+78|			Printf(“%e”, 10.2)	1.020000e+01|
|%E	|科学计数法，例如 -1234.456E+78				|Printf(“%e”, 10.2)	1.020000E+01|
|%f	|有小数点而无指数，例如 123.456				|Printf(“%f”, 10.2)	10.200000|
|%g	|根据情况选择 %e 或 %f 以产生更紧凑的（无末尾的0）	输出| Printf(“%g”, 10.20)	10.2|
|%G	|根据情况选择 %E 或 %f 以产生更紧凑的（无末尾的0）	输出 |Printf(“%G”, 10.20+2i)	(10.2+2i)|


**字符串与字节切片**

|占位符	|说明	|举例|	输出
|-|-|-|-
|%s	|输出字符串表示（string类型或[]byte)	|Printf(“%s”, []byte(“Go语言”))	|Go语言
|%q	|双引号围绕的字符串，由Go语法安全地转义	|Printf(“%q”, “Go语言”)	|“Go语言”
|%x	|十六进制，小写字母，每字节两个字符	|Printf(“%x”, “golang”)	|676f6c616e67
|%X	|十六进制，大写字母，每字节两个字符	|Printf(“%X”, “golang”)	|676F6C616E67


```go
func main() {
	var n = 100
	fmt.Printf("%T\n",n) // int
	fmt.Printf("%v\n",n) // 100
	fmt.Printf("%b\n",n) // 1100100
	fmt.Printf("%d\n",n) // 100
	fmt.Printf("%o\n",n) // 144
	fmt.Printf("%x\n",n) // 64
	fmt.Printf("%s\n",n) // %!s(int=100)
	var s = "芜湖"
	fmt.Printf("%s\n",s) // 芜湖
	fmt.Printf("%v\n",s) // 芜湖
	fmt.Printf("%#v\n",s) // "芜湖"
}
```

```go
fmt.Printf("name:%s\n",name)
```

**匿名变量**

使用多重赋值时，如果想要忽略某个值时，可以使用 `匿名变量` 匿名变量使用一个下划线


**字符串**

Go语言中字符串是用`双引号`包裹的

```go
s := "Hello world"
```

Go语言中字符串是用`单引号`包裹的

```go
s1 := '1'
s2 := 'h'
```

还有种方法可以用于包裹字符串，例如：

```go
func main() {
	s2 :=`
	云想衣裳花想容， 春风拂槛露华浓。
	若非群玉山头见， 会向瑶台月下逢。
`
	fmt.Println(s2)
}
```

此时，单引号中无论如何输入都会按照原样输出


**字符串拼接**

```go
	name := "芜湖！"
	world := "起飞！"

	ss := name + world
	fmt.Println(ss)
	ss1 := fmt.Sprintf("%s%s",name,world)
	fmt.Println(ss1)

	// 芜湖！起飞！
	// 芜湖！起飞！
```

**字符串的常用操作**

|方法|介绍
|-|-|
|len(str)|求长度
|+或fmt.Sprintf|拼接字符串|
|strings.Split  |分割
|strings.contains |判断是否包含
|strings.HasPrefix,strings.HasSuffx |前缀/后缀判断
|string.Index(),strings.LastIndex() |子串出现的位置
|strings.Join(a[]string,sep string) |join操作


## 循环
### IF...ELES

```go
package main

import "fmt"

func main() {
	age := 19

	if age > 18{
		fmt.Println("大于18")
	}else {
		fmt.Println("不满18")
	}
}
```

### for 循环

**基本格式**

```go
package main

import "fmt"

func main() {
	for i:=0 ; i<10;i++{
		fmt.Println(i)
	}
}
```

**变形1**

```go
package main

import "fmt"

func main() {
	var i =0;
	for ;i<10;i++{
		fmt.Println(i)
	}
}
```


**变形2**

```go
package main
import "fmt"
func main() {
	var i =0;
	for i<10{
		fmt.Println(i)
		i++
	}
}
```

**无限循环**

```go
for{
	循环体语句
}
```

> for 循环可以通过 break、goto、return、panic 语句强制退出循环。

**for range(键值循环)**

键值循环

```go
package main
import "fmt"
func main() {
	// for range 循环
	s1 := "芜湖！请求起飞！"
	for i,v := range  s1{
		fmt.Printf("%d %c\n",i,v)
	}
}
```

**for循环之跳出循环**

break : 跳出所有循环
continue ：跳出当前循环继续执行后续循环

```go
package main

import "fmt"

func main() {
	for i := 0;i <10; i++{
		if i == 5{
			break // 跳出所有循环
		}
		fmt.Println(i)
	}
	fmt.Println("stop")

	for i := 0;i < 10 ; i++ {
		if i == 5 {
			continue // 跳出当前循环
		}
		fmt.Println(i)
	}
	fmt.Println("stop")
}
```

**大量判断语句**

1. `if else if`

语法实例：

```go
package main

import "fmt"

func main() {
	n := 3
	if n == 0{
		fmt.Println(0)
	} else if n == 1{
		fmt.Println("1")
	} else if n == 2{
		fmt.Println("2")
	} else {
		fmt.Println("over")
	}
}
```

1. `switch`

语法实例：

```go
package main

import "fmt"

func main() {
	n := 0

	switch n{
	case 0:
		fmt.Println(0)
	case 1:
		fmt.Println(1)
	case 2:
		fmt.Println(2)
	case 3:
		fmt.Println(3)
	default:
		fmt.Println("over")
	}
}
```

循环判断并执行命令。

### fallthrough

该语法可以执行满足条件的 case 的下一个 case,是为了兼容 C 语言中的 case 设计的。


```go
package main

import "fmt"

func main() {
	s := "a"
	switch  {
	case s == "a":
		fmt.Println("a")
		fallthrough
	case s == "b":
		fmt.Println("b")
	case s == "nasa":
		fmt.Println("nasa")
		default:
		fmt.Println("略")
	}
}
```

```
输出
a
b
```

此时case 同时判断成功。

### goto

`goto` 语句是通过标签进行代码间的无条件跳转。 `goto` 语句可以在快速跳出循环、避免重复退出上有一定的帮助。GO语言中使用 `goto` 可以简化一些代码的实现过程。例如：双层嵌套的 for 循环要退出时：

```go
package main

import "fmt"

func main() {
	for i := 0;i < 10 ; i++{
		for j :=0 ;j < 10 ;j++{
			if j == 2{
				goto breakTag
			}
			fmt.Printf("%v-%v\n",i,j)
		}
	}
	return

	breakTag:
		fmt.Println("结束for循环")
}
```

```
运行结果：
0-0
0-1
结束for循环
```

`break` 语句还可以在后门添加标签，表示退出某个对应的代码块，标签要求必须定义在对应的 `for`、`switch`和`select` 的代码块上，举个例子：

```go
package main

import "fmt"

func main() {

		BREAKEDMO1:
			for i:= 0;i<10;i++{
				for j:=0;j<10;j++{
					if j == 2{
						break BREAKEDMO1
					}
					fmt.Printf("%v-%v\n",i,j)
				}
			}
			fmt.Println("...")
		}
```



#### 运算符

**关系运算符**

|运算符|描述|
|-|-|
|`==`|检查两个值是否相等,如果相等返回True否则返回False。|
|`!=`|检查两个值是否不相等,如果不相等返回True否则返回False。|
|`>`|检查左边值是否大于右边值,如果是返回True否则返回False。|
|`>=`|检查左边值是否大于等于右边值,如果是返回True否则返回False。|
|`<`|检查左边值是否小于右边值,如果是返回True否则返回False。|
|`<=`|检查左边值是否小于等于右边值,如果是返回True否则返回False。|


**算数运算符**

|运算符	|描述	|实例
|-|-|-
|+	|相加	|A + B |输出结果| 30
|-	|相减	|A - B |输出结果| -10
|*	|相乘	|A * B |输出结果| 200
|/	|相除	|B / A |输出结果| 2
|%	|求余	|B % A |输出结果| 0
|++|	自增|	A++ |输出结果 |11
|--|	自减|	A-- |输出结果 |9


**逻辑运算符**

|运算符	|描述|	实例|
|-|-|-
|&&|	逻辑 AND 运算符。 如果两边的操作数都是 True，则条件 True，否则为 False。	|`(A && B) 为 False`
|`||`|	逻辑 OR 运算符。 如果两边的操作数有一个 True，则条件 True，否则为 False。	|`(A || B) 为 True`
|!|	 	逻辑 NOT 运算符。 如果条件为 True，则逻辑 NOT 条件 False，否则为 True。		|`!(A && B) 为 True`


**位运算符**

|运算符	|描述	|实例
|-|-|-
|`&`	|按位与运算符"&"是双目运算符。 其功能是参与运算的两数各对应的二进位相与。	|`(A & B)` 结果为 12, 二进制为 0000 1100
|`|`	|按位或运算符"|"是双目运算符。 其功能是参与运算的两数各对应的二进位相或	|`(A | B)` 结果为 61, 二进制为 0011 1101
|`^`	|按位异或运算符"^"是双目运算符。 其功能是参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为1。	|(A ^ B) 结果为 49, 二进制为 0011 0001
|`<<`	|左移运算符"<<"是双目运算符。左移n位就是乘以2的n次方。 其功能把"<<"左边的运算数的各二进位全部左移若干位，由"<<"右边的数指定移动的位数，高位丢弃，低位补0。	|`A << 2` 结果为 240 ，二进制为 1111 0000
|`>>`	|右移运算符">>"是双目运算符。右移n位就是除以2的n次方。 其功能是把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数。|`A >> 2` 结果为 15 ，二进

**赋值运算符**

|运算符|	描述|	实例
|-|-|-
|`=	`|简单的赋值运算符，将一个表达式的值赋给一个左值	|`C = A + B 将 A + B 表达式结果赋值给 C`
|`+=`|	相加后再赋值|`		C += A 等于 C = C + A`
|`-=`|	相减后再赋值|`		C -= A 等于 C = C - A`
|`*=`|	相乘后再赋值|`		C *= A 等于 C = C * A`
|`/=`|	相除后再赋值|`		C /= A 等于 C = C / A`
|`%=`|	求余后再赋值|`		C %= A 等于 C = C % A`
|`<<`|=	左移后赋值	|		`C <<= 2 等于 C = C << 2`
|`>>`|=	右移后赋值	|		`C >>= 2 等于 C = C >> 2`
|`&=`|	按位与后赋值|`		C &= 2 等于 C = C & 2`
|`^=`|	按位异或后赋值|`		C ^= 2 等于 C = C ^ 2`
|`|=`|	按位或后赋值	|`	C |= 2 等于 C = C | 2`

**其他运算符**

|运算符|	描述|	实例|
|-|-|-
|&	|返回变量存储地址	|`&a;` 将给出变量的实际地址。
|*	|指针变量。	|`*a;` 是一个指针变量



## 数组

数组即：存放元素的数组容器。必须指定存放的元素的类型和容量(长度)


1. 数组定义

```
var 数组变量名 [元素数量]T
```

比如：`var a [5]int` ,数组的长度必须是常量，并且长度是数组类型的一部分。一旦定义，长度都不能改变。`[5]int` 和 `[10]int` 是不同的数据类型。

```go
var a [3]int
var b [4]int
a = b //不可以这样做，此时a 和 b是不同的数据类型
```

**初始化**

```go
func main() {
	a1 = [3]bool{true,true,true}
	fmt.Println(a1)
	a10 := [...] int{0,2,1,3,45,5,6,7,8,7,6,5,54,1}
}

```

**二位数组的定义**

```go
package main

import (
	"fmt"
)

func main(){
	a := [3][2]string{
		{"北京","上海"},
		{"广州","深圳"},
		{"成都","重庆"},
	}
	fmt.Println(a)
	fmt.Println(a[2][1])
}
```

**实例**

- 尝试找出和为9的两个元素的下标分别为(0,3)和(1,2)
- 定义两个 for 循环，外层的从第一个开始遍历
- 内存的for循环从外层后面的那个开始找
- 它们两个数的和为8



```go
package main

import (
	"fmt"
)

func main(){
a1 := [...]int{1,3,5,7,9}
sum :=0
	for _, v:= range a1{
		sum = sum +v
	}
	fmt.Println(sum)

	for i:=0;i<len(a1);i++ {
		for j := i+1;j<len(a1);j++{
		if 	a1[i] +a1[j] == 8{
			fmt.Printf("(%d,%d)\n",i,j)
			}
		}
	}
}
```

#### 切片的定义

切片的介绍
1. 切片的英文 slice
2. 切片是数组的一个引用，因此切片是引用类型，在进行传递时，遵守引用类型的传递机制。
3. 切片的使用和数组类似，遍历切片，访问切片的元素和求切片的长度len(slice)都是一样。
4. 切片的长度是可以变化的。因此是一个动态变化的数组。
5. 切片定义的基本语法


语法的格式

```go
var name []T
var 切片名 []类型
比如：var a []int
```

其中
- name：表示变量名
- T：表示切片中的元素类型


例如

```go
package main

import "fmt"

func main(){
	// 2. 通过数组得到切片
	a1 := [...]int{1,3,5,7,9,11,13}
	s3 := a1[0:4]
	fmt.Println(s3)
	s4 := a1[1:6]
	fmt.Println(s4)
	s5 := a1[:4] // => [0:4] [1,3,5,7]
	s6 := a1[3:] // => [3:len(a1)]
	s7 := a1[:] // => [0:len(a1)]
	fmt.Println(s5,s6,s7)
	//切片的容量是指底层数组的
	fmt.Printf("len(s5):%d cap(s5):%d\n",len(s5),cap(s5))
	// 底层数组从切片的第一个元素到最后的一个元素的数量
	fmt.Printf("len(s6):%d cap(s6):%d\n",len(s6),cap(s6))
	// 切片再切割
	s8 := s6[3:]
	fmt.Printf("len(s8):%d cap(s8):%d\n",len(s8),cap(s8))
	// 切片是引用类型，都指向了底层的一个数组
	a1[6] = 1300
	fmt.Println("s6",s6)
	fmt.Println("s8",s8)
}
```

**为切片追加内容**

语法;

```go
s1 := []string{"北","上","广","深"}
s1 = append(s1,"苏州")
append(数组,"内容")
```

实例：

```go
package main

import "fmt"

func main(){
	s1 := []string{"北","上","广","深"}
	//s1[3]="苏" // 错误的写法会导致编译错误：索引越界
	////此时输出的指就不是完整的值了
	//fmt.Println(s1)// [北 上 广 苏]

	// 调用append 函数必须用原来的切片变量接收返回值
	s1 = append(s1,"苏州")
	fmt.Println(s1) // [北 上 广 深 苏州]

}
```


调用 `append` 函数必须用原来的切片变量接收返回值

```go
package main

import "fmt"

func main(){
	s1 := []string{"北","上","广","深"}
	//s1[3]="苏" // 错误的写法会导致编译错误：索引越界
	////此时输出的指就不是完整的值了
	//fmt.Println(s1)// [北 上 广 苏]

	// 调用append 函数必须用原来的切片变量接收返回值
	s1 = append(s1,"苏州")
	fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n",s1,len(s1),cap(s1))
	s1 = append(s1,"杭","成都")
	fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n",s1,len(s1),cap(s1))
	ss := []string{"江苏","淮安","芜湖"}
	s1 = append(s1,ss...) // ...表示拆开
	fmt.Printf("s1=%v len(s1)=%d cap(s1)=%d\n",s1,len(s1),cap(s1))
}
```

- 首先判断,如果新申请容量(cap)大于2倍的旧容量(old.cap),最终容量(newcap)就是新申请的容量(cap)
- 否则判断,如果旧切片的长度小于 `1024` ,则最终容量(newcap) 就是旧容量(old.cap)的两倍，即(newcao=doublecap)
- 否则判断,如果旧切片长度大于等于 1024 ，则最终容量(newcap) 从旧容量(old.cap)开始循环加原来的 1/4
,即(`newcap=old.cap,for{newcap+=newcap/4}`) 直到最终容量 (newcap) 大于等于新申请的容量(cap),即(newcap>=cap)
- 如果最终容量(cap)计算值溢出，则最终容量(cap)就是新申请容量(cap).

需要注意的是，切片扩容还会根据切片中元素的类型不同而做不同的处理，比如`int`和`string`类型的处理方法不一样。


**使用 copy() 函数复制切片**

Go 语言内建的`copy()` 函数可以迅速地将一个切片的数据复制到另外一个切片空间中，`copy()` 函数的使用格式如下:

```go
copy(destSlice,srcSlice []T)
```

```go
package main

import "fmt"

func main() {
	a1 := []int{1,3,5}
	a2 := a1
	var a3 = make([]int,3,3)
	copy(a3,a1)
	fmt.Println(a1,a2,a3)
	a1[0]=100
	fmt.Println(a1,a2,a3)
}
```

**切片的特性**

1. 切片不保存具体的值
2. 切片对应的一个底层数组
3. 底层数组都是占用一块连续的内存

```go
package main

import "fmt"

func main() {
x1 := [...]int{1,3,5}
s1 := x1[:]
fmt.Println(s1,len(s1),cap(s1)) // 切片不保存具体的值,切片对应的一个底层数组

fmt.Printf("%p\n",&s1[0]) // 底层数组都是占用一块连续的内存
s1 = append(s1[:1],s1[2:]...)
fmt.Printf("%p\n",&s1[0]) // 底层数组都是占用一块连续的内存
fmt.Println(s1,len(s1),cap(s1))

fmt.Println(x1)
}
```

输出结果：

```
[1 3 5] 3 3
0xc0000a0160
0xc0000a0160
[1 5] 2 3
[1 5 5]
```


**append同时添加多个数据**

```go
package main

import "fmt"

func main() {
	a1 := [...]int{1,3,5,7,9,11,13,15,17}
	s1 := a1[:]

	// 删除索引为1的那个3
	s1 = append(s1[0:1],s1[2:]...) // 相当于在数组5后面继续追加数 一次修改多个数据
	fmt.Println(s1)
	fmt.Println(a1) // ?[1 5 7 9 11 13 15 17 17]
}
```

### 总结

- 切片指向了一个底层的数组
- 切片的长度就是它元素的个数
- 切片的容量就是底层数组从切片的第一个元素到最后一个元素的数量



## 指针

指针 我指！@

在go语言中不存在指针操作，只需要记住两个符号

- `&`：取地址
- `*`：更具地址取值


实例如下：

```go
package main

import (
	"fmt"
)

func main() {
	// 1. &:取地址
	n := 18
	p := &n
	fmt.Println(p)
	fmt.Printf("%T\n",p) // *int：int类型的指针

	// 2. *：根据地址取值
	m := *p
	fmt.Println(m)
	fmt.Printf("%T\n",m) // int

	var a1 *int
	fmt.Println(a1)
	var a2 = new(int)
	fmt.Println(a2)
	fmt.Println(*a2)
	*a2 = 100
	fmt.Println(*a2)
}
```

### make 和 new 的区别

1. `make` 和 `new` 都是用于申请内存的
2. `new` 很少用，一般用于给基本数据类型申请内存地址，`string\int` 返回的是对应类型的指针。
3. `make` 是用于给 `slice`、 `map`、 `chan` 申请内存的，make的函数返回值的是对应的三个数据类型本身

**make**

`make` 是用于分配内存的，区别于 `new`他只用于 `slice` 和 `map` 以及 `chan` 的内存创建，而且它返回的类型就是这三个类型本身，而不是他们的指针类型，因为这三种类型就是引用类型，所以就没有必要返回他们的指针了。 `make` 函数的函数签名如下:

```go
func make(t Type.size ... IntegerType)Type
```


### map

map 是一种无序的基于 `key-value` 的数据结构，go语言中的`map`是引用类型,必须初始化才能使用。

**语法**

go语言中 `map` 定义语法如下：

```
map [keyType] valuetype
```



```go
package main

import "fmt"

func main() {
	var m1 map[string]int
	fmt.Println(m1 == nil) 	 		// 还没初始化(没有在内存中开辟内存空间)
	m1 = make(map[string]int,10)	// 要估算好该 map 容量,避免在程序运行期间再动态扩容
	m1["年龄"] = 18
	m1["大司马"] = 40
	fmt.Println(m1)
}
```

```
输出结果：
true
map[大司马:40 年龄:18]
```

**判断键值是否存在**

使用map 遍历，判断键值是否存在。

```go
package main

import "fmt"

func main() {
	var m1 map[string]int
	fmt.Println(m1 == nil) 	 		// 还没初始化(没有在内存中开辟内存空间)
	m1 = make(map[string]int,10)	// 要估算好该 map 容量,避免在程序运行期间再动态扩容
	m1["年龄"] = 18
	m1["大司马"] = 40
	fmt.Println(m1)
	v, ok := m1["大司马"]	// 约定俗成使用 OK 接收返回的布尔值
	if ok {
		fmt.Println(v)
	}else {
		fmt.Println("不存在此人")
	}
}

/*
true
map[大司马:40 年龄:18]
40
*/
```

如果此时你指向遍历其中的`部分数据`，如 `key` 、`value`

此时只需遍历到目标部分即可

```go
	// 只遍历 value
	for _,k := range m1{
		fmt.Printf("key:%v",k)
	}
/*
key:18key:40
*/
```

**删除数组**

按照key 删除键值

语法：
```go
delete(数组,"key")
```

```go
package main

import (
	"fmt"
)

func main() {
	var m1 map[string]int
	fmt.Println(m1 == nil) 	 		// 还没初始化(没有在内存中开辟内存空间)
	m1 = make(map[string]int,10)	// 要估算好该 map 容量,避免在程序运行期间再动态扩容
	m1["年龄"] = 18
	m1["大司马"] = 40
	fmt.Println(m1)

	// 删除键值
	delete(m1,"大司马")
	fmt.Println(m1)
	delete(m1,"年龄") //删除不存在的key
	fmt.Println(m1)
}
```

## 函数

函数的意义：
- 函数是代码的封装
- 简介的函数可以讲一段逻辑抽象出来封装到一个函数中，起个名字后需要的时候调用就行了
- 使用函数可以让代码结构更清晰更简洁。


语法:

```go
package main

import "fmt"

func sum(x,y int)(ret int)  {
	return x + y
}

func main() {
	 a := sum(1, 2)
	fmt.Println(a)
}
```


```go
package main

import "fmt"

// 定义swap函数
func swap(x, y string) (string, string) {
   return y, x
}

func main() {
   a, b := swap("1", "2") //调用函数并传值
   fmt.Println(a, b)
}
/*
输出结果：
起飞
[1 2 3 4 5 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0]
[1 2 3 4 5 6 6 7 78 8 89 9 91]
[0 100 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 200]
[[0 0] [0 0] [0 0]]

*/
```

## 函数进阶

**defer**

`defer` 把它后面的语句延迟倒函数即将返回时再执行

```go
package main

import "fmt"

// 函数进阶

func main() {
	deferDemo()
}

func deferDemo()  {
	fmt.Println("start")
	defer fmt.Println("芜湖！起飞！") // defer 把它后面的语句延迟倒函数即将返回时再执行
	fmt.Println("end")
}
/*
输出内容:
start
end
芜湖！起飞！
*/
```

> 用处: 比如当一个文件关闭，封装的方法。在前面先写好，后面就算忘了也不影响。

**多个defer**


对于多个 `defer` 可以发现，此时的执行顺序是按照 `先进后出` 的顺序进行

```go
package main

import "fmt"

// 函数进阶

func main() {
	deferDemo()
}

func deferDemo()  {
	fmt.Println("start")
	defer fmt.Println("芜湖！塔台1！") // defer 把它后面的语句延迟倒函数即将返回时再执行
	defer fmt.Println("芜湖！塔台2！") // defer 把它后面的语句延迟倒函数即将返回时再执行
	defer fmt.Println("请求起飞！") // defer 把它后面的语句延迟倒函数即将返回时再执行
	fmt.Println("end")
}
```



### 函数类型作为参数和返回值

- 当函数作为参数类型

```go
package main

import (
	"fmt"
)

// 函数进阶

func f1()  {
	fmt.Println("芜湖~")
}

func f2() int {
	return 10 ;
}

// 函数也可以作为参数的类型
func f3(x func() int)  {
	ret := x()
	fmt.Println(ret)
}

func  f4(x,y int) int {
	ret := x + y
	fmt.Println(ret)
	return ret
}

func main() {
	a := f1
	fmt.Printf("%T\n",a)
	b := f2
	fmt.Printf("%T\n",b)

	f3(f2)
	f3(b)
	fmt.Printf("%T\n",f4(1,2))
	//f3(f4)
}

/*
输出结果
func()
func() int
10
10
3
int
*/
```


- 函数可以作为返回值

```go
// 函数还可以作为返回值
func f5(x func() int) func(int,int) int {
	return ff

}
```

**匿名函数**

匿名函数即是，使用赋值，var f1 = func 这种定义函数。
此时如果需要调用函数，则直接调用变量名 `f1(10,20)`

```go
package main

import "fmt"

// 匿名函数

func main() {
	f1(10,20)
}

var f1 = func(x,y int) {
	fmt.Println(x + y)
}
```

> 但是在函数中是无法声明带名字的函数d

### 闭包

**闭包 = 函数 + 外部变量的引用**

实例

```go
package main

import "fmt"

// 闭包是什么？
// 闭包是一个函数，这个函数包含了他外部作用域的一个变量

// 底层的原理
// 1. 函数可以作为返回值
// 2. 函数内部查找变量的顺序，先在自己内部找，找不到往外层找

func f1(f func()){
	fmt.Println("芜湖")
	f()
}

func f2(x,y int)  {
	fmt.Println("起飞")
	fmt.Println(x + y)
}

// 需求
// f1(f2)

func f3(f func(int,int),x,y int)func(){
	tmp := func() {
		fmt.Println(x + y)
	}
	return tmp
}

func main() {
	ret := f3(f2,100,200) // 吧原来需要传递两个 INT类型的参数包装成一个不需要传参的函数
	fmt.Printf("%T\n",ret)
	f1(ret)
	ret()
}
```


**闭包进阶**

```go
package main

import (
	"fmt"
	"strings"
)

// 底层的原理
// 1. 函数可以作为返回值
// 2. 函数内部查找变量的顺序，先在自己内部找，找不到往外层找

func makefunc(suffix string) func(string) string {
	return func(name string) string {
		if !strings.HasSuffix(name,suffix){
			return name + suffix
		}
		return name
	}
}

func main(){
	jpgFunc := makefunc(".jpg")
	txtFunc := makefunc(".txt")

	fmt.Println(jpgFunc("芜湖"))
	fmt.Println(txtFunc("起飞"))
}
```



### 总结

**函数的定义**

- **基本格式**
- **参数的格式**
  - 有参数的函数
  - 参数类型简写
  - 可变参数
- **返回值的格式**
  - 有返回值
  - 多返回值
  - 命名返回值
- **变量作用域**
  - 全局作用域
  - 函数作用域
    - 1.现在函数内部找变量，找不到往外层找
    - 2.函数内部的变量，外部是访问不到的
  - 代码块作用域
- **高阶函数**
  - 函数也是一种类型，它可以作为参数，也可以作为返回值。


**defer**

```go
package main

import (
	"fmt"
)

// 底层的原理
// 1. 函数可以作为返回值
// 2. 函数内部查找变量的顺序，先在自己内部找，找不到往外层找

func main() {
	a := 1
	b := 2
	defer calc("1",a,calc("10",a,b)) // 在调用函数时，还有函数调用另一个函数此时将两个函数同时调用
	a = 0
	defer calc("2",a,calc("20",a,b))
	b = 1
}

func calc(index string,a,b int) int {
	ret := a + b
	fmt.Println(index,a,b,ret)
	return ret
}
```

### 内置函数

|内置函数 	|介绍
|-|-|
|close		|用于关闭channel
|len		|求长度，比如 string、array、slice、map
|new		|用于分配内存，主要用于分配值类型，比如：int、struct
|make		|用于分配内存，主要用于分配引用内心，比如：chan、map、slice
|append		|用于追加元素到数组、slice中
|panic和recover		|用来做错误处理


函数崩溃时退出

```go
package main

import "fmt"

// 底层的原理
// 1. 函数可以作为返回值
// 2. 函数内部查找变量的顺序，先在自己内部找，找不到往外层找

func funca(){
	fmt.Println("a")
}

func funcb()  {
	panic("出现了严重的错误") // 程序崩溃时退出
	fmt.Println("b")
}

func funcC()  {
	fmt.Println("c")
}

func main() {
	funca()
	funcb()
	funcC()
}
/*
a
panic: 出现了严重的错误
*/
```

panic 会在程序崩溃时退出，此时后面的代码都不会执行。

```go
package main

import "fmt"

// 底层的原理
// 1. 函数可以作为返回值
// 2. 函数内部查找变量的顺序，先在自己内部找，找不到往外层找

func funca(){
	fmt.Println("a")
}

func funcb()  {
	defer func() {
		err := recover()
		fmt.Println(err)
		fmt.Println("释放数据库连接中")
	}()
	panic("出现了严重的错误") // 程序崩溃时退出
	fmt.Println("b")
	}

func funcC()  {
	fmt.Println("c")
}

func main() {
	funca()
	funcb()
	funcC()
}
```

### 递归

- 递归
  - 函数自己调用自己
  - 适合处理那种问题相同、问题的规模越来越小的场景
  - 递归要有一个明确的退出条件

**阶乘**

```go
package main

// 底层的原理
// 1. 函数可以作为返回值
// 2. 函数内部查找变量的顺序，先在自己内部找，找不到往外层找

func f(n uint64)  uint64{
	if n <=1{
		return 1
	}
	return n * f(n-1)

}

func main() {
	ret := f(5)
	println(ret)
}
```

理解递归为函数自己调用自己，此时必须有一个出口。否则就变成一个死循环了。

### 类型别名

将 `int` 等类型重命名为 `myint`等其他名称


```go
type xxxint  int 	// 自定义类型
type xxxrun = int32	// 类型别名

package main

import "fmt"

// 类型编码

type xxxint = int

func main() {
	var c xxxint
	c = 100
	fmt.Println(c)
	fmt.Printf("%T\n",c)
}
/*
输出结果：
100
int
*/
```

### 结构体

结果体的定义

在go语言中提供了一种自定义数据类型，可以封装多个基本数据类型，这种数据类型叫结构体，英文名称 `strust` 也就是我们可以通过 `strust` 来定义自己的类型。

**结构体定义**

使用 `type` 和 `struct` 关键字来定义结构体，具体代码如下：

结构体的语法：
```go
type 类型名 struct{
	字段名 字段类型
	字段名 字段类型
}

// 构造体
type person struct {
	name string
	age int
	gender string
	hobby []string
}
```

- 类型名：标识自定义结构体的名称，在同一个包中不能重复
- 字段名：表示结构体字段名。结构中的字段名必须唯一
- 字段类型：表示结构体字段的具体类型

演示实例：

```go
package main

import (
	"fmt"
)

// 构造体
type person struct {
	name string
	age int
	gender string
	hobby []string
}

func main(){
	var wuhu person // 变量名(wuhu) 类型名(person)
	wuhu.name = "大司马"
	wuhu.age = 40
	wuhu.gender = "男童"
	wuhu.hobby = []string{"起飞","送豆童子","吃大鸟"}

	// 访问变量wuhu
	fmt.Println(wuhu)
	// 访问变量wuhu 字段
	fmt.Println(wuhu.name)
}
```

**函数的参数**

go语言中函数的特性：

> go语言中的函数参数永远是拷贝，进行修改后不会对原参数修改

```go
package main

import "fmt"

// 构造体
type person struct {
	name,gender string
}

// 此时通过函数去修改参数
func f(x person)  {
	x.gender = "冲冲冲" //修改的是副本的 gender
}

func main()  {
	var wuhu person
	wuhu.name = "余小c"
	wuhu.gender = "声微`饭否"
	f(wuhu)
	fmt.Println(wuhu.gender)
}

/*
输出结果：
声微`饭否
*/
```

那么是不是函数就不可以修改函数值了呢？实则不然 有一种方法可以修改：

**通过内存寻址修改变量**

如何修改内存地址中的值：
```go
func f1(x *person)  {
	(*x).gender = "这无可匹敌的饭量"
}

func main()  {
	f1(&wuhu) // 在调用时前面加上 &符号表示内存地址。
	fmt.Println(wuhu.gender) // 输出修改后的结构体
}
```

对比实例：

```go
package main

import "fmt"

// 构造体
type person struct {
	name,gender string
}

func f(x person)  {
	x.gender = "这无可匹敌的饭量"
}

func f1(x *person)  {
	(*x).gender = "这无可匹敌的饭量"
}

func main()  {
	var wuhu person
	wuhu.name = "余小c"
	wuhu.gender = "声微`饭否"
	f(wuhu)
	fmt.Println(wuhu.gender)
	f1(&wuhu)
	fmt.Println(wuhu.gender)

}
/*
输出结果:
声微`饭否
这无可匹敌的饭量
*/
```

**创建结构体的指针**

使用 `new` 关键字对结构体进行实体化，得到的是结构体的地址.格式如下：

```go
var p2 = new(person)
fmt.printf("%T\n",p2)
fmt.Printf("p2=%#v\n",p2)
```

从输出结果中发现：`p2`是一个结构体指针。

需要注意的是在GO语言中支持对结构体指针中直接使用`.`来访问结构体的成员。

```go
package main

import "fmt"

// 构造体
type person struct {
	name,city strings
	age int
}
func main()  {
	var p2 = new(person)
	p2.name = "霸哥"
	p2.age = 38
	p2.city = "强啊霸哥"
	fmt.Printf("p2=%#v\n",p2)
}

/*
输出内容：
p2=&main.person{name:"霸哥", city:"强啊霸哥", age:38}
*/
```

将a的16进制内存地址打印出来

```go
package main

import "fmt"

// 构造体
func main() {
	var a int
	a = 100
	b := &a
	fmt.Printf("type a:%T type b:%T\n",a,b)
}
```

**结构体的初始化**

初始化的两种方法
- 第一种：使用 key value的形式
- 第二种：使用 列表的形式

> 结构体中占用一块连续的内存空间

```go
package main

import "fmt"

// 构造体

type x struct {
	a int8
	b int8
	c int8
}

func main(){
	m := x{
		a: int8(10),
		b: int8(20),
		c: int8(30),
	}
	fmt.Printf("%p\n",&(m.a))
	fmt.Printf("%p\n",&(m.b))
	fmt.Printf("%p\n",&(m.c))
}
/*
输出结果：
0xc00000a0b0
0xc00000a0b1
0xc00000a0b2
*/
```

- 结构体是值类型，赋值的时候都是拷贝
- 构造函数：返回一个结构体变量的函数

## 方法和接受者

go 语言中的 `方法` 是一种作用于特定类型变量的函数。这种特点类型变量叫做 `接收者(receiver)`。接收者的概念就类似于其他语言中的 `this` 和 `self`.

方法的定义如下：
```go
func (接收者变量 接收者类型) 方法名(参数列表) (返回参数){
	函数体
}
```


```go
// 方法的定义
// 接收者表示的是调用该方法的具体类型变量,多用类型名首字母小写表示
func (d dog) f() {
	fmt.Printf("%s:狗叫？",d.name)
}
```

使用方法的定义

```go
package main

import "fmt"

// 构造体

type dog struct {
	name string
}


// 构造函数
func newDog(name string) dog {
	return dog{
		name : name,
	}
}

func f(){
	fmt.Println("狗叫？")
}

// 方法的定义
// 接收者表示的是调用该方法的具体类型变量,多用类型名首字母小写表示
func (d dog) f() {
	fmt.Printf("%s:狗叫？",d.name)
}

func main() {
 d1 := newDog("芜湖")
 d1.f()
}
```

**方法的定义**

- 标识符：变量名 函数名 类型名 方法名
- Go 语言中如果标识符首字母是大写的，就表示对外部包可见(暴露的，公有的)


## 实例 信息管理系统

获取用户输入

```go
var choice int
fmt.Scanln(&choice)
```


**os 库获取命令行参数**

实例：
```go
package main

import (
    "fmt"
    "os"
)

func main()  {

    // 获取命令行参数
    fmt.Println("命令行参数数量:",len(os.Args))
    for k,v:= range os.Args{
        fmt.Printf("args[%v]=[%v]\n",k,v)
    }
}
```

```GO
/*
    定义变量接收控制台参数
     */

    // 用户
    var username string
    // 密码
    var password string
    // 主机名
    var host string
    // 端口号
    var port int

    // StringVar用指定的名称、控制台参数项目、默认值、使用信息注册一个string类型flag，并将flag的值保存到p指向的变量
    flag.StringVar(&username, "u", "", "用户名,默认为空")
    flag.StringVar(&password, "p", "", "密码,默认为空")
    flag.StringVar(&host, "h", "127.0.0.1", "主机名,默认 127.0.0.1")
    flag.IntVar(&port, "P", 3306, "端口号,默认为空")

    // 从arguments中解析注册的flag。必须在所有flag都注册好而未访问其值时执行。未注册却使用flag -help时，会返回ErrHelp。
    flag.Parse()

    // 打印
    fmt.Printf("username=%v password=%v host=%v port=%v", username, password, host, port)
```






















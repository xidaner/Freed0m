[Markdown高级用法(嵌套音视频)]http://blog.fandong.me/2017/08/25/Markdown-Advance/

Markdown嵌套视频(厉害了)
```md
<video id="video" controls="" preload="none" poster="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.jpg">
<source id="mp4" src="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.mp4" type="video/mp4">
</video>
```
简书不支持此标签效果无法查看,请移步http://blog.fandong.me/2017/08/25/Markdown-Advance/
```md
<video id="video" controls="" preload="none" poster="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.jpg">
      <source id="mp4" src="http://om2bks7xs.bkt.clouddn.com/2017-08-26-Markdown-Advance-Video.mp4" type="video/mp4">
```

Markdown嵌套音频(厉害了)
```md
<audio id="audio" controls="" preload="none">
<source id="mp3" src="http://oht4nlntk.bkt.clouddn.com/Music_iP%E8%B5%B5%E9%9C%B2%20-%20%E7%A6%BB%E6%AD%8C%20%28Live%29.mp3">
</audio>
```

简书不支持此标签效果无法查看,请移步http://blog.fandong.me/2017/08/25/Markdown-Advance/

```md
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="http://oht4nlntk.bkt.clouddn.com/Music_iP%E8%B5%B5%E9%9C%B2%20-%20%E7%A6%BB%E6%AD%8C%20%28Live%29.mp3">
      </audio>
```

**自动去重**

notepad++

1. 让文本进行排列，让重复行排在一起
> 编辑-行操作-升序排列文本行

2. 使用正则表达式替换（注意）
>  ctrl+f 替换 `^(.*?)$\s+?^(?=.*^\1$)`
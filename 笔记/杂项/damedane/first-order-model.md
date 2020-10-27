# first-order-model

~🕺🕺damedane dameyo dame nanoyo🕺🕺~

- [first-order-model项目地址](https://github.com/AliaksandrSiarohin/first-order-model)


- [Unravel视频母体](https://www.bilibili.com/video/BV1wE411P7yj/?spm_id_from=333.788.videocard.19)

> 使用 python3 安装依赖
```
pip install -r requirements.txt
```


## 配置 face-alignment

`face-alignment` 是一个人脸识别的库。

这个人脸识别主要是对下面的模型和参数起作用。

 - config 里面的
    - vox-* 系列
 - chekcpoint 里面的
    - vox-* 系列

如果，要进行人脸替换或者说人脸追踪，就需要这个库进行视频预处理。

并且，裁剪出来的视频大小是

    256 * 256

> 说明命令行的使用。

```bash
cd first-order-model
git clone https://github.com/1adrianb/face-alignment
cd face-alignment
pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
python3 setup.py install
```

## 运行

截止到现在一共有 8 个训练模型，分别对应不同的配置。

链接: https://pan.baidu.com/s/1bhwqXIhRalOvOa5SMkhiUw 提取码: ifmj 


> 结果将存储在中result.mp4。

|训练模型|配置名|
|-|-|
|bair-256.yaml	|bair-cpk.pth.tar
|fashion-256.yaml|	fashion.pth.tar
|mgif-256.yaml	|mgif-cpk.pth.tar
|nemo-256.yaml	|nemo-cpk.pth.tar
|taichi-256.yaml	|taichi-cpk.pth.tar
|taichi-adv-256.yaml	|taichi-adv-cpk.pth.tar
|vox-256.yaml	|vox-cpk.pth.tar
|vox-adv-256.yaml	|vox-adv-cpk.pth.tar|


不同的训练模型，不同的配置对应于不同的场景。

first-order-model 主要分为几个场景:

- 人脸追踪
- 行为追踪
- 物品追踪
- 动画生成
- 当场替换

## 人脸追踪

只是想要体验一下 damedane的快乐，所以选择人脸方向

相应的配置如下：
```
vox-256.yaml	vox-cpk.pth.tar
vox-adv-256.yaml	vox-adv-cpk.pth.tar
```

在安装之后呢，先对视频进行处理，让他能变个人样：
```
python3 crop-video.py --inp source.mp4
```


它会生成一个命令，我们运行那个命令完成裁剪。比如说生成出

```
ffmpeg -i source.mp4 -ss 15.89655172413793 -t 79.62068965517241 -filter:v "crop=137:137:1045:355, scale=256:256" crop.mp4
ffmpeg -i source.mp4 -ss 96.10344827586206 -t 13.896551724137936 -filter:v "crop=129:129:1046:356, scale=256:256" crop.mp4
ffmpeg -i source.mp4 -ss 15.275862068965518 -t 95.17241379310344 -filter:v "crop=413:413:392:25, scale=256:256" crop.mp4
```
选择其一即可，然后会生成出一个 crop.mp4。我们用的就是这个 mp4 

BUT，有的时候执行命令后没有生成视频(好几次都没成功，给爷整吐了)gooogle之后发现，这个有可能和帧率有关。默认的最小帧率是 150。，所以代码如下：
```
python3 crop-video.py --inp source.mp4 --min_frames 30
```

要注意的是，虽然官方说可以处理图片或者 `gif` ，但是，经过验证`确实不行`，只能处理 `mp4`。建议用 pr 把gif导入再处理成视频。

附赠大佬写的识别人像并自动处理的脚本
```py
import cv2

root = './source.png'
crop_size = (256, 256)
img = cv2.imread(root)
img_new = cv2.resize(img, crop_size, interpolation=cv2.INTER_CUBIC)
cv2.imwrite('s.png',img_new)
```

> 希望你自己截图的时候，要把人脸放在中间，最好，截图的长宽近似相等，否则会造成失真。

运行py，处理即可：

```bash
python3 demo.py --config config/vox-256.yaml --driving_video crop.mp4 --source_image s.png --checkpoint vox-cpk.pth.tar --result_video result.mp4 --relative --adapt_scale
```
```
python demo.py  --config config/dataset_name.yaml --driving_video path/to/driving<视频的路径> --source_image path/to/source<图片的路径> --checkpoint path/to/checkpoint --relative --adapt_scale
```

出现 生成的mp4文件。打开

~🕺🕺damedane dameyo dame nanoyo🕺🕺~

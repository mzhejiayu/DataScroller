#DataScroller
帮助你创建一个横向滚动数据输入器，用户只需要左右滑动就可以输入一个数字
> 作者：mazhejiayu
> 时间：2015.8.14

## 依赖性
目前依赖jquery提供`选择器`和`scroll事件监听`
## 开始使用
1. 将DataScroller.js导入你的项目文件
        <script src="..DataScroller.js"></script>
2. 激活功能
        DataScroller({
            //options（在下面章节详细介绍）
        },canvas_ele)

## 选项（Options）
键名（key）| 功能
---|---|---
`short_line`| 短线的长度（px）
`long_line` | 长线的长度（px）
`canvas_height`|设置画布的长度（px)
`canvas_width`|设置画布的宽度（px）
`window_width`|设置滚动窗口的宽度，如果为屏幕宽度，请设置为`document.documentElement.scrollWidth`
`gap-x`|两根线之间的间距(px)
`strokeclr`|画线的颜色
`min`|数据最小值
`max`|数据最大值

##示例

            var canvas_dom = document.getElementById("my_canvas")
            datascroller({
                "short_line":15,
                "long_line":30,
                "canvas_height":80,
                "canvas_width":4450,
                "window_width":document.documentElement.scrollWidth,
                "gap-x":10,
                "strokeclr":"#aaaaaa",
                "min":1000,
                "max":100000
            },canvas_dom);

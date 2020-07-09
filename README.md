# wechat_consumer


## 如何导入此项目

### 1. 下载项目

打开终端，执行如下命令以下载项目。

```cmd
cd 你的下载路径
git clone https://github.com/rainboat2/wechat_consumer
```

注意**不要不要不要**通过github的下载代码功能来获取代码文件，因为这种方式下载的项目文件只能下载当前分支，而且不带有.git配置文件夹。如果在小程序开发工具中导入这种项目，在使用版本管理时开发工具会新建一个git仓库，这个仓库与github上的是独立的，从而会出现一系列令人窒息的问题。


### 2. 导入项目

如下图，导入项目共两步：
1. 选择项目所在目录
2. 点击使用测试号

![导入项目](https://s1.ax1x.com/2020/07/09/UnrIKK.md.png)

### 3. 配置项目管理

进如项目界面后，在右上角找到“版本管理”按钮，点击后就可以进入如下的页面，按照如下图的步骤配置github的用户名和密码即可。

![配置版本管理](https://s1.ax1x.com/2020/07/09/Un60gI.png)

## 如何使用版本管理

### 1. 提交代码

如下图所示，在工作区选中需要提交的代码文件，填写提交信息，点击提交即可。
![提交代码](https://s1.ax1x.com/2020/07/09/UnW74S.png)

提交代码后，在左上角找到推送按钮，然后按下图即可将代码推送到github。在多次的尝试中，发现这个推送代码有可能会无限转圈圈，但是实际上代码已经上传到github。
![推送代码](https://s1.ax1x.com/2020/07/09/Un225D.md.png)

### 2. 拉取代码

在版本管理页面的左上角可以找到**拉取**代码的按钮（注意不是抓取！！！），点击后就会弹出如下图所示的窗口，然后就可以执行抓取操作。
![拉取代码](https://s1.ax1x.com/2020/07/09/Unh7lQ.png)

## 如何使用vant

引入模块，然后正常使用即可，如何导入模块可以参考[官方文档](https://youzan.github.io/vant-weapp/#/button)，每个组件的文档开头，都有导入的教程。

## 如何使用axios

### 1. 关闭域名校验
微信小程序默认不允许访问localhost，因此需要修改如下图红圈所示的配置。该配置位于右上角"详情-本地设置-不校验合法域名..."中。

![关闭http的校验](https://s1.ax1x.com/2020/07/09/UnX1FH.png)

### 2. 官方文档的方法
如果一个页面想要使用axios，需要在该页面的js代码最前面导入axios，导入代码代码如下所示：

```javascript
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
axios.defaults.withCredentials = true;
```

[这里](https://github.com/bigmeow/axios-miniprogram-adapter/blob/master/demo/miniprograme-native/index/index.js)有官方文档给出的一个详细使用axios的demo

### 3. 仿照vue的方法

在app.js下导入后，将axios存储在了app的全局变量下，因此axios的使用方式可以简化为如下步骤。

首先在js文件头部导入app对象，代码如下
```javascript
const app = getApp();
```

随后就可以正常使用axios，调用的一个例子如下
```javascript
app.globalData.axios.get("http://localhost:8080/test").then(r=>{
      console.log(r);
    })
```

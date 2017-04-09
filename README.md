# coodev
前端写作开发流程的脚手架

## 如何安装
全局安装 
windows环境： `npm install -g coodev`
mac环境 ：`sudo npm install -g coodev`

##第一步：初始化
进入你的工程目录 ：`cd yourProjectDir`
检查安装成功 ：`coodev --version`
检查命令 ：`coodev --help`
初始化项目 ：`coodev init`
这时候你会看到几个问题选项，选择normal模板  、velocity渲染方式，回车完成初始化。
稍等片刻，你会发现目录下回多了几个文件和文件夹，这是我们已经完成了基本的配置。并已经安装好所需的npm依赖。

##第二步：开发
注意根目录下的coodev.config.json
``` javascript
{
	"pages": ["index", "list"],
	"common-js": [
	],
	"common-css": [
	],
	"publish-dir": "",
	"server-render-language": "velocity",
	"style-precompiled": "less",
	"server-port": "8080"
}
```

进入你的工程目录 ：`coodev dev`, 这时会自动编译页面，并监听文件修改。
进入你的工程目录 ：`coodev server`， 这时会根据`server-port` 字段监听对应的端口。
打开浏览器，输入<a target="_blank" href="http://127.0.0.1:8080/page/index.html">127.0.0.1:8080/page/index.html </a>就可以看到第一个页面。

这里仅描述coodev的使用方法，具体的模板配置用法可见 `coodev-temp-normal`的文档<aa target="_blank" href="https://github.com/grARM/coodev-temp-normal">https://github.com/grARM/coodev-temp-normal</a>
后期会整合到一起



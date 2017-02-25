# coodev-temp-normal
基于coodev的normal工程模板

[TOC]

### 命令
可通过在控制台输入`$ coodev -help` 查看coodev的命令

### 工程基本目录
工程的根目录下主要是以下几个文件夹：`src` 、`dist` 、`page-config`
*src* :工程源码，开发用的文件夹。其中有3个文件夹：`common` （共用部分）、`modules`（页面模块） 、`pages`（入口文件）。
*dist* : 编译后的输出文件夹。包括页面文件和静态文件
*page-config* : 每个页面的配置文件，文件夹里面每个页面有一个json。用来描述页面的的基本信息和各个模块的布局关系，以及静态文件的引用。

### 配置文件 
本工程基于webpack，但是根目录下河webpack相关的配置文件时不用动的。我们需要用到的就是`coodev.config.json` 这个文件中是整个项目的配置文件，有哪些页面发布仓库的地址，服务端渲染的方式等。

再有就是`page-config/[page-name].json` 描述的是每个页面的配置文件

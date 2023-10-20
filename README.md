<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 介绍

一个 nest mpa 模仿官网 项目



spa项目写多了 都感觉要忘了传统不分离项目怎么写？

那么读到这里，你算是来对了



一般网站需要被搜索引擎收录，最好就是渲染静态页面

那么在项目技术方案来讲，有以下几种方案  



第一、要么是 传统后端 `PHP` `Java` 等不分离项目 前端或则后端套模板

第二、采用 SSR 渲染方式 纯前端渲染，例如 `next` `nuxt`

第三、express 或则 koa 或则 egg nest Midway 这类 nodejs 框架



**传统后端套模板形式**

前端毫无工程化可言 很蹩手蹩脚



**SSR 形式** 

前端高度工程化，一切很丝滑



**nodeJS 框架**

前端工程化完备，丝滑

> 目前来讲 nest egg midway 这类企业级nodejs框架才能正式投入业务生产，express koa 这种 太过于简陋，企业级需要 完备的封装和架构，所以本项目采用 nestjs 作为后端框架

## 技术栈

项目采用 pnpm-workspace monorepo 管理前后端项目

后端：nest + ts

前端：webpack + jQuery + ts + stylus + tailwind.css + postcss + pug 

## 安装

```bash
$ pnpm i
```

## 启动

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

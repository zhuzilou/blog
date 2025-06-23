# 代码说明
1. 原代码搬运自djdg626, git hub: https://github.com/zhangwh754/djdg626.com
2. 暂时只用于记录博客，尝试部分小修改。


## FAQ
### Dockerfile在云服务2c2g环境打包时间过长
20250603
当前Dockerfile在RUN pnpm run build耗时过长，且占用服务器大量资源导致其他服务未响应，暂时未找到解决方案。
计划采用在dev环境打包镜像，上传到服务器生成容器。
1. dev环境执行
```shell
docker build -t blog:v20250623001 .
docker save blog:v20250623003 -o blog-prod-v20250623003.tar
```
2. prod环境执行
```shell
./blog_docker.sh v20250604002
```
-----------------End deploy-----------------
[root@hcss-ecs-1080 shell]# ll
total 4
-rwxr-xr-x 1 root root 536 May 20 15:28 blog_docker.sh
[root@hcss-ecs-1080 shell]# vim blog_docker.sh 
[root@hcss-ecs-1080 shell]# cat blog_docker.sh 
echo '-----------------Begin deploy-----------------'
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>Receive request from' $1 
cd ~/git
#rm -rf blog
#git clone https://github.com/zhuzilou/blog.git -b br_webhook
cd blog
#touch .env
git pull
TAG='v'`date +%Y%m%d_%H%M%S`
docker build -t blog:$TAG .
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'Finish Docker build
docker stop blog
docker rm blog
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'Remove old container
docker run -d --restart=always -p 3000:3002 --name blog blog:$TAG
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'Docker deploy container blog:$TAG finish
echo '-----------------End deploy-----------------'
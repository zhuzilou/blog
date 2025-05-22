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
# 用于同步时区 -v /etc/localtime:/etc/localtime:ro，ro表示只读
docker run -d --restart=always -p 3000:3002 -v /etc/localtime:/etc/localtime:ro --name blog blog:$TAG
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'Docker deploy container blog:$TAG finish
echo '-----------------End deploy-----------------'
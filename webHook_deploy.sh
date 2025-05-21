echo '-----------------Begin deploy-----------------'
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>Receive request from' $1 
cd ~/git
rm -rf blog
git clone https://github.com/zhuzilou/blog.git -b br_webhook
cd blog
touch .env
docker stop blog
docker rm blog
#docker rmi blog:latest
TAG='v'`date +%Y%m%d_%H%M%S`
docker build -t blog:$TAG .
docker run -d --restart=always -p 3000:3002 --name blog blog:$TAG
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'Docker deploy container blog:$TAG finish
echo '-----------------End deploy-----------------'
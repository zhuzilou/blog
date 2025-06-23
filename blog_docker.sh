echo '-----------------Begin deploy-----------------'
TAG=$1
IMAGE_PATH=docker_image/blog-prod-$TAG.tar
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>load tar: '$IMAGE_PATH
docker load < $IMAGE_PATH
if [ $? == 0 ]
then 
	echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'load success 
	docker stop blog 
    docker rm blog 
    echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'remove old container 
    docker run -d --restart=always -p 3000:3002  --name blog blog:$TAG \
        	|| echo '====>Some error in docker process'
else 
	echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'load tar failed
fi
echo '<'`date +%Y-%m-%d_%H:%M:%S`'>'Docker deploy container blog:$TAG finish
echo '-----------------End deploy-----------------'
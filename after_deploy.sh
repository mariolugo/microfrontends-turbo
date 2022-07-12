# echo "Downloading import map from S3"
# aws s3 cp s3://single-spa-demo/@thawkin3/importmap.json importmap.json
# echo "Updating import map to point to new version of @thawkin3/root-config"
# node update-importmap.mjs
# echo "Uploading new import map to S3"
# aws s3 cp importmap.json s3://single-spa-demo/@thawkin3/importmap.json --cache-control 'public, must-revalidate, max-age=0' --acl 'public-read'
# echo "Deployment successful"

echo "Create new import map"
node ./create-importmap.js $1 $2 

echo "Upload to S3"
aws s3 cp ./importmap.json s3://mftest-mario.s3.amazonaws.com/microfrontend/1/importmap.json --profile malt --cache-control 'public, must-revalidate, max-age=0' --acl 'public-read' --region us-east-1
# compile with babel
./node_modules/.bin/babel src -d lib
# create deploy folder
rm -rf deploy
mkdir deploy
mkdir deploy/node_modules
# copy code and node_modules that we need to deploy
cp ./lib/10-aws-lambda.js ./deploy/index.js
cp settings.json ./deploy/settings.json
cp pwr.js ./deploy/pwr.js
cp -r ./node_modules/bluebird ./deploy/node_modules/bluebird
cp -r ./node_modules/aws-sdk ./deploy/node_modules/aws-sdk
# zip everything
cd deploy
zip -r ../lib/function.zip *
# NOTE -- function must already be created!
aws lambda update-function-code \
  --function-name "async-await-demo" \
  --zip-file fileb://../lib/function.zip
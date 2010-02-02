export DOWNLOAD="target/download"
mkdir -p $DOWNLOAD
cd $DOWNLOAD
wget -nc http://facebook-java-api.googlecode.com/files/facebook-java-api-3.0.2-bin.zip
unzip -u facebook-java-api-3.0.2-bin.zip
mv facebook-java-api-3.0.2/lib/*.jar ../../lib




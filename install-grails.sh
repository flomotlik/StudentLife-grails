export DOWNLOAD="target/download"
mkdir -p $DOWNLOAD
cd $DOWNLOAD
wget -nc http://dist.codehaus.org/grails/grails-1.2.1.zip
unzip -u grails-1.2.1.zip
mv grails-1.2.1 /opt
rm -i /opt/grails
ln -s /opt/grails-1.2.1 /opt/grails



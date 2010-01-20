export SOURCE=${HOME}/.grails/1.2.0/projects/StudentLife/stage/source
rm -R ${SOURCE}
ln -s `pwd`/web-app/source $SOURCE

#!/bin/bash -ue
# Script deploys django app on Apache Server
#

current_directory=`dirname $0`
ip_address=$1; shift
port=$1; shift

python manage.py collectstatic

find -name "*~" -exec rm -vf {} \;
find -name "*pyc" -exec rm -vf {} \;

# Rest
ssh -p $port pi@$ip_address 'sudo rm -Rf /var/www/cworking'
ssh -p $port pi@$ip_address 'sudo mkdir -p /var/www/cworking'

ssh -p $port pi@$ip_address 'mkdir -p /home/pi/cworking'
scp -P $port -r $current_directory/cworking $current_directory/config $current_directory/main $current_directory/locale $current_directory/static $current_directory/manage.py pi@$ip_address:/home/pi/cworking/
ssh -p $port pi@$ip_address 'sudo mv /home/pi/cworking /var/www/'
ssh -p $port pi@$ip_address 'sudo mv /var/www/cworking/cworking/settings.deploy.py /var/www/cworking/cworking/settings.py'
ssh -p $port pi@$ip_address "sudo cp /var/www/cworking/config/apache.conf /etc/apache2/sites-enabled/000-default"
ssh -p $port pi@$ip_address "sudo cp -R /var/www/cworking/static/main /var/www/cworking/static/font-awesome-4.7.0 /var/www/static/"
ssh -p $port pi@$ip_address 'sudo service apache2 reload'
ssh -p $port pi@$ip_address 'sudo service apache2 restart'


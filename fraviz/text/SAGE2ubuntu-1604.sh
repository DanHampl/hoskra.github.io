#!/bin/sh

#
# wget https://bitbucket.org/sage2/sage2/downloads/SAGE2ubuntu.sh
# sh SAGE2ubuntu.sh
#


# update the current installation
sudo apt-get -y update
sudo apt-get -y upgrade

# Basic dev
sudo apt-get install -y build-essential
sudo apt-get install -y openssh-server
sudo apt-get install -y git curl libcap2-bin

# Chrome
sudo mkdir -p /etc/apt/sources.list.d
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update
sudo apt-get install -y google-chrome-stable

# Note the new setup script name for Node.js v8.x
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -

# Then install with:
sudo apt-get install -y nodejs

sudo setcap 'cap_net_bind_service=+ep' /usr/bin/nodejs

# ffmpeg and dev
sudo add-apt-repository ppa:jonathonf/ffmpeg-3
sudo apt-get update
sudo apt-get install -y ffmpeg
# exiftool
sudo apt-get install -y libimage-exiftool-perl
# GS
sudo apt-get install -y ghostscript
# Security tool
sudo apt-get install -y libnss3-tools

# imagemagick
sudo apt-get install -y imagemagick

# firewall
sudo ufw allow http
sudo ufw allow https

# SAGE2
cd $HOME
git clone --depth 1 https://bitbucket.org/sage2/sage2.git
cd sage2
cd keys && ./GO-linux && cd ..

# this seems to help speedup on VM
npm config set jobs 1 
npm config set registry http://registry.npmjs.org/
# install SAGE2 deps
npm install

# test
npm test


#!/bin/sh
SCRIPT_DIR=$(cd $(dirname $0); pwd)
echo $SCRIPT_DIR
SCRIPT_CIR=$(cd $(dirname $0); cd react-app; ncu -u;ncu -g;npm install;npm start)
echo $SCRIPT_CIR

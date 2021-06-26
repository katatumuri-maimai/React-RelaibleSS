#!/bin/sh
SCRIPT_DIR=$(cd $(dirname $0); pwd)
echo $SCRIPT_DIR
S_F=$(sh react-run.sh & sh flask-run.sh)

echo $S_F

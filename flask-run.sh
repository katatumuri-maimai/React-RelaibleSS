#!/bin/sh
SCRIPT_DIR=$(cd $(dirname $0); pwd)
echo $SCRIPT_DIR
SCRIPT_CIR=$(cd $(dirname $0); cd react-app/src/py; python3 trimming.py)
echo $SCRIPT_CIR

#!/bin/bash

mc alias set myminio http://localhost:9000 root password;
mc mb myminio/images --region=ap-northeast-2;
mc anonymous set public myminio/images;
exit 0;

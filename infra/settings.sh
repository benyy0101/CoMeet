#!/bin/bash

echo "initiating default git strategies" 
cp -f ./infra/prepare-commit-msg ./.git/hooks
if [ $? -ne 0 ]; then
    echo "에러가 발생했습니다! 깃 저장소의 최상단 디렉에서 명령을 실행해주세요!
    문제가 해결되지 않으면 인프라 담당자에게 문의 바랍니다!
    "
fi

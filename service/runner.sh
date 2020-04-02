#/bin/bash

nohup geth \
  --nousb \
  --identity="NODE" \
  --networkid="789234" \
  --etherbase "0x9f3f11520c1f2e66baeee0d7449a240260b8e7b9" \
  --verbosity=3 \
  --mine \
  --minerthreads=1 \
  --rpc \
  --rpcaddr 0.0.0.0 \
  --rpcvhosts=* \
  --maxpeers=0 \
  --nodiscover \
  &

node fee_pusher/index.js $1 $2

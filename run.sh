#/bin/bash

# GROWTH_RATE='-c' GROWTH_COEF=x - constant by x
# GROWTH_RATE='-l' GROWTH_COEF=x - linear by x
# GROWTH_RATE='-p' GROWTH_COEF=x - polynomial by X
# GROWTH_RATE='-e' GROWTH_COEF=x - exponential with x

docker build -t ethereum_fee . --build-arg ARG_RATE=$1 --build-arg ARG_COEF=$2
docker run --rm -it -p 8545:8545 --name ethereum ethereum_fee

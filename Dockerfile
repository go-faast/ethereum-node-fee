FROM ethereum/client-go:stable
ARG ARG_COEF
ARG ARG_RATE

# https://github.com/moby/moby/issues/18492
ENV ENV_COEF=$ARG_COEF
ENV ENV_RATE=$ARG_RATE
# NOTE: node is a dependency of npm
RUN apk add --update npm

COPY service /service

WORKDIR /service

RUN geth --nousb init /service/genesis.json
RUN geth makedag 0 ~/.ethash
RUN cd fee_pusher/ && npm install

ENTRYPOINT "./runner.sh" "${ENV_RATE}" "${ENV_COEF}"

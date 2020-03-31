# Minimal ethereum private network for Gas Price testing

This is container which creates a single node ethereum network with DAGs created during build stage.

For testing purposes there are two pre funded accounts:
```
{
  address: '0xeb4d82a523d3966500b61bdf10513db4cd6653a3',
  keys: {
    prv: '0xc75275fa441af1865d250f0b7f02115c1ae1b2bba566fb55d2ff37794fba7714',
    pub: '0303ec57c051b64f9e7705c4d875607f1208577b79603af8fb686a5d67263b9c20'
  },
  xkeys: {
    xprv: 'xprv9s21ZrQH143K3PdHvZGPf763FzMMQpJh3TK2J89tva2BnzPAzBNAZZL26karYR8LEPnqSMNCDJQEXcgE1vt3dhc6pQxeQs7U5yuv2XYvpFd',
    xpub: 'xpub661MyMwAqRbcFshm2aoQ2F2mp2BqpH2YQgEd6WZWUuZAfniKXigR7MeVx25JxY2Ty1Hxpi7wXAyVXRUDMBZqSQCCsw5pAaPAELthc4AHaKn'
  }
}
{
  address: '0x26f57103704a96f936fbad426907b2a7943f7b8a',
  keys: {
    prv: '0x421e65fc31b02403bb379d853e3ecb06591b128b38ebe137e2ca9bddc4896d65',
    pub: '030d9dac144e8398df40abfccf3c85acbeb82ddde4935f63b65c33c164a33c2957'
  },
  xkeys: {
    xprv: 'xprv9s21ZrQH143K4V211VYcGkaEFUBpBbxusn6rPhA3zHT6PYJvJDwAcmg3u1nLzL11ChVKFfyVziykkfyQ4cNrhswjoqvH41tTw8nMXsNcbFK',
    xpub: 'xpub661MyMwAqRbcGy6U7X5cdtWxoW2Jb4gmF12TC5ZfYcz5GLe4qmFRAZzXkJMjVZKvJJonrWUYsMaE3tRanjBKthsbLKTXDbGpMNDUSXevqfp'
  }
}
```

For more details regarding network characteristics please refer to `/service/genesis.json`

## Main command

`./run.sh` - builds and runs container with name `ethereum`, it accepts to arguments used for defining a temp of fee growth:

```
./run.sh -c X # constant by X
./run.sh -l X # linear by X
./run.sh -p X # polynomial by X
./run.sh -e X # exponential with X

```

## Debuging

In case if you need an access to ethereum's node logs:
`./tail.sh` - opens read stream to geth console inside of the container


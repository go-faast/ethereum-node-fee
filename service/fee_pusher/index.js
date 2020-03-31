const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const BN = require('bignumber.js');

const web3 = new Web3('http://localhost:8545');

const MINING_REWARD_RETURN_FREQUENCY_BLOCKS = 10;
const miner = {
  address: '0x9f3f11520c1f2e66baeee0d7449a240260b8e7b9', // miner
  key: '0xec293727064b47eb42141d85dcd0888d212826f30ca85a95820e485e8ca81f32',
};
const source = {
  address: '0x5e5d3a31c37fc68d2e1fd44b99ee524c97383c0e',
  key: '0x48790fe53a80ef36458ccd7909f3a095a48475d10f0c2cecbce49083d0e7806b',
};
const destination = '0x4098b1bb6ba2ab63f7c1f6ab59d76bdcb8c6dcad';

(async () => {
  const CL_ARGS = process.argv.slice(2);
  await waitForNode()
  let counter = new BN(1);
  let sentRewards = new BN(0)

  while (true) {
    const networkGasPrice = await web3.eth.getGasPrice();
    const blockNumber = await web3.eth.getBlockNumber();
    const gasPrice = increaseGasPrice(networkGasPrice, CL_ARGS[0], CL_ARGS[1]);

    await sendTransaction(source, gasPrice.toString(16), destination, 1)
    sentRewards = sentRewards.plus((new BN(gasPrice)).multipliedBy(21000))

    console.log(`Block:${blockNumber} NetworkFee:${networkGasPrice} Tx:${counter.toString()} TxFee: ${gasPrice.toString()}`)

    await asleep(500);
    counter = counter.plus(1)

    const bBN = new BN(blockNumber)
    if (bBN.modulo(MINING_REWARD_RETURN_FREQUENCY_BLOCKS).toString() != '0') {
      continue
    }

    const fee = (new BN(networkGasPrice)).multipliedBy(21000).toString();
    const value = sentRewards.minus(fee)
    await sendTransaction(miner, gasPrice.toString(16), destination, value.toString(16))
  }
})()

async function waitForNode() {
  let firstBlock
  while (!firstBlock) {
    firstBlock = await web3.eth.getBlockNumber()
    await asleep(1000)
  }
}

function asleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function increaseGasPrice(networkGasPrice, growth, coeficient) {
  switch(growth) {
    case '--constant':
    case '-c':
      return (new BN(networkGasPrice)).plus(coeficient);
    case '--linear':
    case '-l':
      return (new BN(networkGasPrice)).multipliedBy(coeficient);
    case '--polynomial':
    case '-p':
      return (new BN(networkGasPrice)).pow(coeficient);
    case '--exponential':
    case '-e':
      return (new BN(coeficient)).pow(networkGasPrice);
  }
}

async function sendTransaction(account, gasPrice, destination, value) {
    const nonce = await web3.eth.getTransactionCount(account.address, 'pending');
    const tx = new Tx({
      from: account.address,
      to: destination,
      value: `0x${value}`,
      gas:   '0x5208',
      gasPrice: `0x${gasPrice}`,
      nonce: `0x${nonce.toString(16)}`,
    });
    tx.sign(Buffer.from(account.key.slice(2), 'hex'));
    return new Promise((resolve, reject) => web3.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
        .on('transactionHash', resolve)
        .on('error', reject))
}


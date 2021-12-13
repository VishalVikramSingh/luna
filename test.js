const luna = require('@terra-money/terra.js');

// create a key out of a mnemonic
const mk = new luna.MnemonicKey({
  mnemonic:
    '' // my mnemonic
  });

// connect to soju testnet
const terra = new luna.LCDClient({
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-4',
  gasPrices: '0.15uluna'
});

const wallet = terra.wallet(mk);

const send = new luna.MsgSend(
  'terra18sxn99tj3dtla7kqgexmawc4n258chk9sc4s2c',
  'terra1ghxyl6fy4cerfcuh9hgcxjn7c7zkl08d9sn085',
  { uluna: 100 }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'hello',
  })
  .then(tx => terra.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  }).catch(console.error);

const luna = require('@terra-money/terra.js');

// create a key out of a mnemonic
const mk = new luna.MnemonicKey({
  mnemonic:
    '' // my mnemonic
  });

// connect to mainnet
const terra = new luna.LCDClient({
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-4',
});

const wallet = terra.wallet(mk);

const send = new luna.MsgSend(
  'terra18sxn99tj3dtla7kqgexmawc4n258chk9sc4s2c',
  'terra1ncjg4a59x2pgvqy9qjyqprlj8lrwshm0wleht5',
  { uluna: 100, ukrw: 1230201, uusd: 1312029 }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: '100659208',
  })
  .then(tx => terra.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  });

import { oneRay, ZERO_ADDRESS } from '../../helpers/constants';
import { IAaveConfiguration, eEthereumNetwork, eAvalancheNetwork, IAvalancheConfiguration } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyWETH,
  strategyDAI,
  strategyUSDC,
  strategyUSDT,
  strategyAAVE,
  strategyWBTC,
  strategyAVAX,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const AvalancheConfig: IAvalancheConfiguration = {
  ...CommonsConfig,
  MarketId: 'Avalanche market',
  ProviderId: 4,
  ReservesConfig: {
    WETH: strategyWETH,
    DAI: strategyDAI,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    AAVE: strategyAAVE,
    WBTC: strategyWBTC,
    AVAX: strategyAVAX,
  },
  ReserveAssets: {
    [eAvalancheNetwork.avalanche]: { // TODO: Check this
      WETH: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      // DAI: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
      // USDC: '', // TODO: Not yet deployed by Circle
      USDT: '0xde3A24028580884448a5397872046a019649b084',
      // AAVE: '0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9', // TODO: What we are going to do?
      WBTC: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
      // AVAX: '' // TODO: Use WAVAX?
    },
    [eAvalancheNetwork.fuji]: {
      WETH: '0x9668f5f55f2712Dd2dfa316256609b516292D554', // MintableERC20 token
      // DAI: '0x51BC2DfB9D12d9dB50C855A5330fBA0faF761D15',
      // USDC: '0x7804D7f48f6E5749AF5c8Fa87b20702C34a7f5c2',
      USDT: '0x02823f9B469960Bb3b1de0B3746D4b95B7E35543', // MintableERC20 token
      // AAVE: '0x47183584aCbc1C45608d7B61cce1C562Ee180E7e',
      WBTC: '0x9C1DCacB57ADa1E9e2D3a8280B7cfC7EB936186F', // MintableERC20 token
      AVAX: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'  // Official WAVAX
    },
  },
};

export default AvalancheConfig;
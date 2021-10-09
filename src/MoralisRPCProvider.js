/* global window */
import Web3 from 'web3';

const ERROR_RPCURL_MISSING =
  'Missing RPC URL. Check available speedy-nodes: https://admin.moralis.io/speedyNodes';

class MoralisRPCProvider {
  get type() {
    return 'RPCProvider';
  }

  async activate(params) {
    const { rpcUrl, options } = params;
    if (!rpcUrl) throw new Error(ERROR_RPCURL_MISSING);
    let web3Provider;

    const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;
    if (rpcUrl.includes('https://')) {
      web3Provider = new MWeb3.providers.HttpProvider(rpcUrl, options);
    } else if (rpcUrl.includes('wss://')) {
      web3Provider = new MWeb3.providers.WebsocketProvider(rpcUrl, options);
    } else {
      throw new Error(ERROR_RPCURL_MISSING);
    }
    this.web3 = new MWeb3(web3Provider);
    this.isActivated = true;

    return this.web3;
  }

  async deactivate() {
    this.isActivated = false;
    this.web3 = null;
  }
}

export default MoralisRPCProvider;

import Web3 from 'web3';
import Web3HttpProvider from 'web3-providers-http';
import Web3WsProvider from 'web3-providers-ws';

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

    if (rpcUrl.includes('https://')) {
      web3Provider = new Web3HttpProvider(rpcUrl, options);
    } else if (rpcUrl.includes('wss://')) {
      web3Provider = new Web3WsProvider(rpcUrl, options);
    } else {
      throw new Error(ERROR_RPCURL_MISSING);
    }
    this.web3 = new Web3(web3Provider);
    this.isActivated = true;

    return this.web3;
  }

  async deactivate() {
    this.isActivated = false;
    this.web3 = null;
  }
}

export default MoralisRPCProvider;

import { getEnvFromNodeEnv } from '../environments';

const env = getEnvFromNodeEnv();
const getChainlinkNodeUrl = () => (env.productionChainlinkNode && env.productionChainlinkNode.url)
    || process.env.LOCAL_CHAINLINK_URL
    || 'http://localhost:6688';
export default getChainlinkNodeUrl;

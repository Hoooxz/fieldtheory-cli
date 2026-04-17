/**
 * Proxy support for all fetch() calls.
 *
 * Uses undici's EnvHttpProxyAgent to automatically respect standard
 * proxy environment variables (HTTP_PROXY, HTTPS_PROXY, ALL_PROXY,
 * NO_PROXY, etc.) without manual parsing.
 */

import { EnvHttpProxyAgent, setGlobalDispatcher } from 'undici';

const proxyAgent = new EnvHttpProxyAgent();
setGlobalDispatcher(proxyAgent);

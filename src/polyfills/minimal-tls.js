// Minimal TLS polyfill that just exports empty functions
export const connect = () => ({});
export const TLSSocket = function() {};
export default { connect, TLSSocket }; 
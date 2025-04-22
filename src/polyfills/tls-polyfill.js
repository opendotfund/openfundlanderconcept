// Custom polyfill for tls-browserify module to handle strict mode issues
// This is a simplified version that provides the minimum functionality needed

// Create a TLSSocket class that mimics the Node.js TLS socket
class TLSSocket {
  constructor(options = {}) {
    this.options = options;
    this.connected = false;
    this.destroyed = false;
  }

  // Add a log method that doesn't use 'arguments' as a parameter name
  log(...args) {
    console.log('[TLSSocket]', ...args);
  }

  connect(port, host, callback) {
    if (typeof port === 'function') {
      callback = port;
      port = 443;
      host = 'localhost';
    } else if (typeof host === 'function') {
      callback = host;
      host = 'localhost';
    }

    // Simulate connection
    setTimeout(() => {
      this.connected = true;
      if (callback) callback();
    }, 0);

    return this;
  }

  end(data, encoding, callback) {
    if (typeof data === 'function') {
      callback = data;
      data = null;
      encoding = null;
    } else if (typeof encoding === 'function') {
      callback = encoding;
      encoding = null;
    }

    // Simulate ending the connection
    setTimeout(() => {
      this.connected = false;
      if (callback) callback();
    }, 0);

    return this;
  }

  destroy(err) {
    this.destroyed = true;
    this.connected = false;
    return this;
  }

  write(data, encoding, callback) {
    if (typeof encoding === 'function') {
      callback = encoding;
      encoding = null;
    }

    // Simulate writing data
    setTimeout(() => {
      if (callback) callback();
    }, 0);

    return true;
  }
}

// Create a connect function that returns a new TLSSocket
function connect(options, callback) {
  const socket = new TLSSocket(options);
  
  if (callback) {
    socket.connect(options.port || 443, options.host || 'localhost', callback);
  }
  
  return socket;
}

// Export the connect function and TLSSocket class
export { connect, TLSSocket };

// Export a default object that mimics the Node.js tls module
export default {
  connect,
  TLSSocket,
  createServer: () => {
    console.warn('tls.createServer is not implemented in the browser');
    return {};
  }
}; 
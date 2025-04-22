// Custom polyfill for vm module to handle strict mode issues
// This is a simplified version that provides the minimum functionality needed

export function runInThisContext(code) {
  // Create a function from the code string
  const fn = new Function(code);
  
  // Execute the function in the current context
  return fn();
}

export function createContext(initialContext = {}) {
  return {
    ...initialContext,
    // Add any additional context properties needed
  };
}

export function createScript(code) {
  return {
    runInThisContext: () => runInThisContext(code)
  };
}

// Export a default object that mimics the Node.js vm module
export default {
  runInThisContext,
  createContext,
  createScript
}; 
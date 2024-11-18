module.exports = {
    swSrc: './src/service-worker.js', 
    swDest: 'service-worker.js', 
    globDirectory: 'build', 
    globPatterns: ['**/*.{html,js,css,png,jpg,svg}'], 
    injectionPoint: 'self.__WB_MANIFEST', 
  };
  
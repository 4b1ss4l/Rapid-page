// Acelerador de tempo (50x)
(function() {
  const speed = 50;

  // Sobrescreve Date.now
  const originalNow = Date.now;
  const start = originalNow();
  Date.now = () => start + (originalNow() - start) * speed;

  // Sobrescreve performance.now
  const originalPerfNow = performance.now.bind(performance);
  const perfStart = originalPerfNow();
  performance.now = () => (originalPerfNow() - perfStart) * speed;

  // Sobrescreve setTimeout
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(fn, delay, ...args) {
    return originalSetTimeout(fn, delay / speed, ...args);
  };

  // Sobrescreve setInterval
  const originalSetInterval = window.setInterval;
  window.setInterval = function(fn, delay, ...args) {
    return originalSetInterval(fn, delay / speed, ...args);
  };

  console.log(`⏩ Velocidade do tempo simulada em ${speed}x`);
})();

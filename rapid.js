// Acelerador de tempo universal (simulado)
(function() {
  const speed = 50; // Multiplicador de velocidade

  // --------- Date ----------
  const OriginalDate = Date;
  const start = OriginalDate.now();
  Date = class extends OriginalDate {
    constructor(...args) {
      if (args.length === 0) {
        super(start + (OriginalDate.now() - start) * speed);
      } else {
        super(...args);
      }
    }
    static now() {
      return start + (OriginalDate.now() - start) * speed;
    }
    static UTC(...args) {
      return OriginalDate.UTC(...args);
    }
    static parse(str) {
      return OriginalDate.parse(str);
    }
  };

  // --------- performance.now ----------
  const originalPerfNow = performance.now.bind(performance);
  const perfStart = originalPerfNow();
  performance.now = () => (originalPerfNow() - perfStart) * speed;

  // --------- setTimeout / setInterval ----------
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = (fn, delay, ...args) => {
    return originalSetTimeout(fn, delay / speed, ...args);
  };

  const originalSetInterval = window.setInterval;
  window.setInterval = (fn, delay, ...args) => {
    return originalSetInterval(fn, delay / speed, ...args);
  };

  // --------- requestAnimationFrame ----------
  const originalRAF = window.requestAnimationFrame;
  window.requestAnimationFrame = function(callback) {
    return originalRAF(function(timestamp) {
      callback(timestamp * speed);
    });
  };

  console.log(`⏩ Tempo acelerado em ${speed}x (sandbox de tempo ativada)`);
})();

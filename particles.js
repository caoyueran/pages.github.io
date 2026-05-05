/* ═══ Particle Network Background ═══ */
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  canvas.style.cssText = "position:fixed;inset:0;z-index:0;pointer-events:none;";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  let mouse = { x: -9999, y: -9999 };
  let particles = [];
  const PARTICLE_COUNT = 90;
  const CONNECT_DIST = 140;
  const MOUSE_RADIUS = 200;

  const colors = [
    "rgba(99,245,207,{a})",
    "rgba(79,183,255,{a})",
    "rgba(135,214,255,{a})",
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  /* ── Particle class ── */
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // spread initially
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.5 + 0.15;
      this.colorIdx = Math.floor(Math.random() * colors.length);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }
    draw(ctx) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let alpha = this.baseAlpha;
      let radius = this.radius;

      if (dist < MOUSE_RADIUS) {
        const factor = 1 - dist / MOUSE_RADIUS;
        alpha = Math.min(1, this.baseAlpha + factor * 0.6);
        radius = this.radius + factor * 2.5;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors[this.colorIdx].replace("{a}", String(alpha));
      ctx.fill();
    }
  }

  /* ── Init particles ── */
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  /* ── Mouse tracking ── */
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* ── Click burst ── */
  document.addEventListener("click", (e) => {
    const cx = e.clientX;
    const cy = e.clientY;
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.3;
      const speed = Math.random() * 2.5 + 1.2;
      const p = new Particle();
      p.x = cx;
      p.y = cy;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.radius = Math.random() * 3 + 1.5;
      p.baseAlpha = 0.7;
      p.burst = true;
      p.life = 1;
      particles.push(p);
    }
  });

  /* ── Render loop ── */
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();

      if (p.burst) {
        p.life -= 0.012;
        p.baseAlpha = p.life * 0.7;
        p.radius *= 0.985;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
      }

      p.draw(ctx);
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        if (a.burst || b.burst) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.14;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(99,245,207,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Mouse glow connections
    if (mouse.x > 0 && mouse.y > 0) {
      for (const p of particles) {
        if (p.burst) continue;
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const alpha = (1 - dist / MOUSE_RADIUS) * 0.25;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(79,183,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══ Click Ripple Effect ═══ */
(function () {
  document.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.className = "click-ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
})();

/* ═══ Interactive Card Color Shift ═══ */
(function () {
  const accentPalette = [
    [99, 245, 207],   // teal
    [79, 183, 255],   // blue
    [255, 201, 109],  // gold
    [198, 120, 255],  // purple
    [255, 120, 160],  // pink
  ];

  document.addEventListener("click", function (e) {
    const card = e.target.closest(".glass, .panel, .chart-panel, .info-card, .arch-card, .capability-card");
    if (!card) return;

    // Pick random accent
    const [r, g, b] = accentPalette[Math.floor(Math.random() * accentPalette.length)];

    // Flash the card border
    card.style.transition = "border-color 0.4s ease, box-shadow 0.4s ease";
    card.style.borderColor = `rgba(${r},${g},${b},0.7)`;
    card.style.boxShadow = `0 0 36px rgba(${r},${g},${b},0.18), 0 18px 60px rgba(0,0,0,0.35)`;

    setTimeout(() => {
      card.style.borderColor = "";
      card.style.boxShadow = "";
    }, 800);
  });
})();

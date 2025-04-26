const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");
const sparkleCards = document.querySelectorAll('.sparkle-card');


form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = new FormData(form);
  const action = form.action;

  try {
    const response = await fetch(action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      status.textContent = "Thanks for your message! I'll get back to you soon.";
    } else {
      status.textContent = "Oops! Something went wrong. Please try again.";
    }
  } catch (error) {
    status.textContent = "Oops! Something went wrong. Please try again.";
  }
});

sparkleCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = (e.offsetX - 3) + 'px';
      sparkle.style.top = (e.offsetY - 3) + 'px';
      card.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    });
  });
  
  // Confetti on scroll to projects
  let confettiDone = false;
  window.addEventListener('scroll', () => {
    const projects = document.getElementById('projects');
    const rect = projects.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !confettiDone) {
      startConfetti();
      confettiDone = true;
      setTimeout(() => stopConfetti(), 3000); // Confetti for 3 seconds
    }
  });
  
  // Simple Confetti Generator
  let confettiInterval;
  function startConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
  
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * 6 - 3,
        dy: Math.random() * 6 - 3,
        radius: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      });
    }
  
    confettiInterval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x > canvas.width || p.x < 0 || p.y > canvas.height || p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
      }
    }, 30);
  }
  
  function stopConfetti() {
    clearInterval(confettiInterval);
    document.getElementById('confetti-canvas').remove();
  }
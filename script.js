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

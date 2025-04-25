const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");
const skillsContainer = document.getElementById('skillsContainer');

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

skillsContainer.addEventListener('scroll', () => {
    // If scroll reaches near end, clone the items
    if (skillsContainer.scrollLeft + skillsContainer.clientWidth >= skillsContainer.scrollWidth - 1) {
      // Duplicate all skills
      const skillItems = skillsContainer.querySelectorAll('.skill-item');
      skillItems.forEach(item => {
        const clone = item.cloneNode(true);
        skillsContainer.appendChild(clone);
      });
    }
  });
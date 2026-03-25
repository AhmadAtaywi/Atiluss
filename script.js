const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

const SCRIPT_URL = "YOUR_SCRIPT_URL_HERE";

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    statusText.textContent = "Sending...";

    const formData = new FormData(form);

    const payload = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      payload.append(key, value);
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: payload
      });

      const result = await response.json();

      if (result.success) {
        statusText.textContent = "Your message has been sent successfully.";
        form.reset();
      } else {
        statusText.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      statusText.textContent = "Error sending form. Please try again.";
      console.error(error);
    }
  });
}

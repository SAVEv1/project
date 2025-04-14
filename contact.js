document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); 
  

    const response = document.getElementById("form-response");
    response.textContent = "✅ Thank you! We’ll get back to you soon.";
    response.classList.remove("hidden");
  

    e.target.reset();
  });
  
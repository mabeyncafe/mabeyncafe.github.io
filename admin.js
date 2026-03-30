document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "mabeyn" && password === "145358") {
    // Giriş başarılı → panel sayfasına yönlendir
    window.location.href = "panel.html";
  } else {
    document.getElementById("error-message").textContent = "Hatalı kullanıcı adı veya şifre!";
  }
});

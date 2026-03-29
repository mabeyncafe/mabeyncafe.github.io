function checkAuth() {
  const ok = sessionStorage.getItem('mabeynLoggedIn') === '1';
  if (!ok) {
    window.location.href = 'login.html';
  }
}

async function loadMenuForEdit() {
  try {
    const res = await fetch('menu.json');
    const data = await res.text();
    document.getElementById('menuEditor').value = data;
  } catch (err) {
    document.getElementById('menuEditor').value = "Menü yüklenemedi: " + err;
  }
}

async function saveMenu() {
  const status = document.getElementById('saveStatus');
  status.style.color = "#d4af37";
  status.textContent = "GitHub Pages üzerinde dosyalar doğrudan değiştirilemez.";

  setTimeout(() => {
    status.textContent =
      "Yaptığınız değişiklikleri kopyalayıp GitHub'da menu.json dosyasına yapıştırarak kaydedebilirsiniz.";
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadMenuForEdit();

  document.getElementById('saveMenuBtn').onclick = saveMenu;

  document.getElementById('logoutBtn').onclick = () => {
    sessionStorage.removeItem('mabeynLoggedIn');
    window.location.href = 'index.html';
  };
});

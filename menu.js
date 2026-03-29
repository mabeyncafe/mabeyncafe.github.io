async function loadMenu() {
  try {
    const res = await fetch('menu.json');
    const data = await res.json();

    const categoryBar = document.getElementById('categoryBar');
    const productList = document.getElementById('productList');

    categoryBar.innerHTML = '';
    productList.innerHTML = '';

    // Kategorileri oluştur
    data.categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.textContent = cat.name;
      btn.className = 'category-btn';
      if (index === 0) btn.classList.add('active');
      btn.onclick = () => renderCategory(cat.id, data);
      categoryBar.appendChild(btn);
    });

    // İlk kategoriyi göster
    if (data.categories[0]) {
      renderCategory(data.categories[0].id, data);
    }

  } catch (err) {
    console.error("Menü yüklenirken hata oluştu:", err);
  }
}

function renderCategory(catId, data) {
  const productList = document.getElementById('productList');

  // Aktif kategori butonunu güncelle
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(b => b.classList.remove('active'));

  const activeCategory = data.categories.find(c => c.id === catId);
  const activeBtn = Array.from(buttons).find(b => b.textContent === activeCategory.name);
  if (activeBtn) activeBtn.classList.add('active');

  // Ürünleri listele
  productList.innerHTML = '';

  activeCategory.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = item.name;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = item.price;

    const desc = document.createElement('div');
    desc.className = 'product-desc';
    desc.textContent = item.desc || '';

    card.appendChild(name);
    card.appendChild(price);
    if (item.desc) card.appendChild(desc);

    productList.appendChild(card);
  });
}

loadMenu();

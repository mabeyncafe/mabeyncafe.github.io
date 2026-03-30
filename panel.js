// Bölüm gösterme
function showSection(sectionId) {
    document.querySelectorAll('.panel-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Menü başlıklarını ekleme (localStorage destekli)
function addMenu() {
    const newMenu = document.getElementById('newMenu').value;
    if (newMenu.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = newMenu;
        document.getElementById('menu-list').appendChild(li);

        // Menü seçme alanına da ekle
        const option = document.createElement('option');
        option.value = newMenu;
        option.textContent = newMenu;
        document.getElementById('itemMenu').appendChild(option);

        // LocalStorage'a kaydet
        let menus = JSON.parse(localStorage.getItem('menus')) || [];
        menus.push(newMenu);
        localStorage.setItem('menus', JSON.stringify(menus));

        document.getElementById('newMenu').value = "";
    }
}

// Tema değiştirme
function changeTheme(theme) {
    if (theme === 'dark') {
        document.body.style.background = "#1c1c1c";
        document.body.style.color = "gold";
    } else {
        document.body.style.background = "#f5f5f5";
        document.body.style.color = "#333";
    }
}

// Ürün ekleme fonksiyonu (fotoğraf + menü + localStorage destekli)
function addItem() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const desc = document.getElementById('itemDesc').value;
    const menu = document.getElementById('itemMenu').value;
    const imageInput = document.getElementById('itemImage');
    const imageFile = imageInput.files[0];

    if (name.trim() !== "" && price.trim() !== "" && menu.trim() !== "") {
        const li = document.createElement('li');
        let content = `<strong>${name}</strong> - ${price}<br><small>${desc}</small><br><em>Menü: ${menu}</em>`;
        li.innerHTML = content;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = "100px";
                img.style.display = "block";
                li.appendChild(img);
                addItemControls(li, name, price, desc, menu, e.target.result);
                document.getElementById('item-list').appendChild(li);

                // LocalStorage'a kaydet
                saveItem({name, price, desc, menu, image: e.target.result});
            };
            reader.readAsDataURL(imageFile);
        } else {
            addItemControls(li, name, price, desc, menu, null);
            document.getElementById('item-list').appendChild(li);

            // LocalStorage'a kaydet
            saveItem({name, price, desc, menu, image: null});
        }

        // Formu temizle
        document.getElementById('itemName').value = "";
        document.getElementById('itemPrice').value = "";
        document.getElementById('itemDesc').value = "";
        document.getElementById('itemImage').value = "";
        document.getElementById('itemMenu').value = "";
    } else {
        alert("Ürün adı, fiyat ve menü seçimi boş olamaz!");
    }
}

// Ürün kontrol butonlarını ekleme
function addItemControls(li, name, price, desc, menu, image) {
    const editBtn = document.createElement('button');
    editBtn.textContent = "Düzenle";
    editBtn.onclick = function() {
        document.getElementById('itemName').value = name;
        document.getElementById('itemPrice').value = price;
        document.getElementById('itemDesc').value = desc;
        document.getElementById('itemMenu').value = menu;
        li.remove(); // düzenleme için ürünü listeden kaldırıyoruz

        // LocalStorage'dan da sil
        removeItem(name, price, desc, menu, image);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Sil";
    deleteBtn.onclick = function() {
        li.remove();

        // LocalStorage'dan da sil
        removeItem(name, price, desc, menu, image);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
}

// Ürünleri kaydetme fonksiyonu
function saveItem(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Ürünleri silme fonksiyonu
function removeItem(name, price, desc, menu, image) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => !(i.name === name && i.price === price && i.desc === desc && i.menu === menu && i.image === image));
    localStorage.setItem('items', JSON.stringify(items));
}

// Sayfa açıldığında menü ve ürünleri yükle
window.onload = function() {
    // Menüler
    let menus = JSON.parse(localStorage.getItem('menus')) || [];
    menus.forEach(menu => {
        const li = document.createElement('li');
        li.textContent = menu;
        document.getElementById('menu-list').appendChild(li);

        const option = document.createElement('option');
        option.value = menu;
        option.textContent = menu;
        document.getElementById('itemMenu').appendChild(option);
    });

    // Ürünler
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => {
        const li = document.createElement('li');
        let content = `<strong>${item.name}</strong> - ${item.price}<br><small>${item.desc}</small><br><em>Menü: ${item.menu}</em>`;
        li.innerHTML = content;

        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.style.maxWidth = "100px";
            img.style.display = "block";
            li.appendChild(img);
        }

        addItemControls(li, item.name, item.price, item.desc, item.menu, item.image);
        document.getElementById('item-list').appendChild(li);
    });
};

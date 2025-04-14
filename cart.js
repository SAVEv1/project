document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  const usePointsCheckbox = document.getElementById('use-points');
  const discountInfo = document.getElementById('discount-info');
  const pointRate = 0.020; // كل نقطة = 0.020 BHD خصم

  const userPoints = parseInt(localStorage.getItem('points')) || 0;
  document.getElementById('user-points').textContent = userPoints;

  function calculateTotal(applyPoints = false) {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });

    let discount = 0;
    if (applyPoints && userPoints > 0) {
      discount = Math.min(userPoints * pointRate, total);
    }

    const finalTotal = total - discount;
    return { total, discount, finalTotal };
  }

  function renderCart() {
    list.innerHTML = '';
    cart.forEach((item, i) => {
      const itemTotal = item.price * item.quantity;

      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${item.img || 'assets/placeholder.png'}" alt="${item.title}">
        <div class="cart-item-details">
          <span>${item.title}</span>
          <div>
            <button class="btn-qty" data-i="${i}" data-change="-1">–</button>
            <span style="margin: 0 8px;">${item.quantity}</span>
            <button class="btn-qty" data-i="${i}" data-change="1">+</button>
            <span style="margin-left: 1rem;"><strong>${itemTotal.toFixed(3)} BHD</strong></span>
            <button data-i="${i}" class="btn-remove" style="margin-left: 1rem;">Remove</button>
          </div>
        </div>
      `;
      list.appendChild(li);
    });

    const { total, discount, finalTotal } = calculateTotal(usePointsCheckbox.checked);
    totalEl.textContent = `${finalTotal.toFixed(3)} BHD`;

    if (discount > 0) {
      discountInfo.style.display = 'block';
      discountInfo.textContent = `Discount applied: ${discount.toFixed(3)} BHD using ${Math.floor(discount / pointRate)} points`;
    } else {
      discountInfo.style.display = 'none';
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  list.addEventListener('click', (e) => {
    const i = +e.target.dataset.i;

    if (e.target.classList.contains('btn-remove')) {
      cart.splice(i, 1);
      renderCart();
    }

    if (e.target.classList.contains('btn-qty')) {
      const change = parseInt(e.target.dataset.change);
      cart[i].quantity += change;

      if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
      }

      renderCart();
    }
  });

  usePointsCheckbox.addEventListener('change', renderCart);

  document.getElementById('checkout-form').addEventListener('submit', e => {
    e.preventDefault();

    const { discount } = calculateTotal(usePointsCheckbox.checked);

    if (discount > 0 && userPoints > 0 && usePointsCheckbox.checked) {
      const pointsUsed = Math.floor(discount / pointRate);
      const confirmUse = confirm(`Are you sure you want to use ${pointsUsed} points for a discount of ${discount.toFixed(3)} BHD?`);
      if (!confirmUse) return;

      const remainingPoints = Math.max(0, userPoints - pointsUsed);
      localStorage.setItem('points', remainingPoints);
    }

    alert('Payment processed! Thank you.');
    localStorage.removeItem('cart');
    location.href = 'index.html';
  });

  renderCart();
});
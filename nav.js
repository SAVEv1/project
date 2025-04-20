document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.navbar nav a').forEach(a => {
    if (a.href === location.href) a.classList.add('active');
  });


  const user       = JSON.parse(localStorage.getItem('user'));
  const loginLink  = document.querySelector('.nav-login');
  const signupLink = document.querySelector('.nav-signup');
  const logoutLink = document.querySelector('.nav-logout');
  const heroBtns   = document.querySelectorAll('.hero-btn');
  const cartCount  = document.getElementById('cart-count');
  const pointsEl   = document.getElementById('user-points');


  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartCount) {
    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCount.textContent = totalQty;
  }


  let pts = parseInt(localStorage.getItem('points')) || 0;
  localStorage.setItem('points', pts);
  if (pointsEl) pointsEl.textContent = pts;


  if (user) {
    loginLink.style.display  = 'none';
    signupLink.style.display = 'none';
    logoutLink.style.display = 'inline-block';
    heroBtns.forEach(b => b.style.display = 'none');
  } else {
    loginLink.style.display  = 'inline-block';
    signupLink.style.display = 'inline-block';
    logoutLink.style.display = 'none';
  }

  logoutLink?.addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('points');
    location.href = 'index.html';
  });
});
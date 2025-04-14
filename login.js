document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;
      const users    = JSON.parse(localStorage.getItem('users')) || [];
      const user     = users.find(u => u.username===username && u.password===password);
      if (user) {
        localStorage.setItem('user', JSON.stringify({ username }));
        if (!localStorage.getItem('points')) localStorage.setItem('points','0');
        location.href = 'index.html';
      } else {
        alert('Invalid credentials');
      }
    });
  });  
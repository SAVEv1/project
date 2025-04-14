document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;
      const confirm  = form.confirm.value;
      if (!username || !password) return alert('Enter both fields');
      if (password !== confirm)  return alert('Passwords do not match');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.username === username)) return alert('Username taken');
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify({ username }));
      localStorage.setItem('points', '0');
      location.href = 'index.html';
    });
  });  
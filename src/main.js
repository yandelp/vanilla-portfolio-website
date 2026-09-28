document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = id === '#' ? document.body : document.querySelector(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});
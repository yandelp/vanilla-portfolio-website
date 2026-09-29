import { expData, projData } from './data.js';
document.getElementById('year').textContent = new Date().getFullYear();

const exp = document.getElementById('experiences-list')
const proj = document.getElementById('projects-list')


document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = id === '#' ? document.body : document.querySelector(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

function render() {
  let expContent = `
  <div class="list-header">
    <h3 id="experience-title">experience</h3>
    <p>my professional journey so far</p>
  </div>
  `

  let projContent = `
  <div class="list-header">
    <h3 id="projects-title">projects</h3>
    <p>some stuff i've worked on</p>
  </div>
  `

  for(const experience of expData){
    expContent += 
    `
    <article class="experiences-list list-items">
      ${experience.img ? `
      <figure>
        <img src="${experience.img}" alt="">
      </figure>
      ` : ''
      }
      <div class="list-item">
        <div class="logo-img-ctn">
          <img class="logo-img" src="${experience.logo}" alt="">
        </div>
        <div class="list-txt">
          <div class="separated-title">
            <h4>${experience.company}</h4>
            <p class="xs-txt">${experience.date}</p>
          </div>
          <div class="separated-title">
            <p class="s-txt">${experience.title}</p>
            <p class="xs-txt">${experience.location}</p>
          </div>
        </div>
      </div>
    </article>
    `
  }

  for(const project of projData) {
    projContent += 
    `
    <article class="experiences-list list-items">
      ${project.img ? `
      <figure>
        <img src="${project.img}" alt="">
      </figure>
      ` : ''
      }
      <div class="list-item">
        <div class="logo-img-ctn">
          <img class="logo-img" src="${project.logo}" alt="">
        </div>
        <div class="list-txt">
          <div class="separated-title">
          <a href="${project.link}" target="_blank">
            <h4>${project.title}</h4>
          </a>
          </div>
          <div class="separated-title">
            <p>${project.desc}</p>
          </div>
        </div>
      </div>
    </article>
    `
  }

  exp.innerHTML = expContent;
  proj.innerHTML = projContent
}

render();
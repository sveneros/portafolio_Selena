const SITE_AUTOR = 'Selena Veneros';
const API_BASE = 'https://jsonplaceholder.typicode.com';
const POKE_API = 'https://pokeapi.co/api/v2';
const WATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

let currentFilter = 'all'; 
let pokemonPage = 1;
let projectsData = [];       

const greet = (name) => `Hola desde el portafolio de ${name}`;  
console.log(greet(SITE_AUTOR));

const formatPrice = (amount) => `$${Number(amount).toLocaleString('en-BO')}`;

const devProfile = {
  name: 'Selena Veneros',
  role: 'Desarrolladora de Software',
  skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
  location: 'La Paz, Bolivia',
};

const { name, role, skills } = devProfile;
const [mainSkill, ...otherSkills] = skills;

console.log(`${name} - ${role}`);
console.log(`Habilidades principales: ${mainSkill}`);
console.log(`Otras habilidades: ${otherSkills.join(', ')}`);

const frontEnd = ['React', 'Vue', 'Angular'];
const backEnd = ['Node.js', 'Django', 'Ruby on Rails'];
const allTechnologies = [...frontEnd, ...backEnd];

console.log('Tecnologías Full Stack:', allTechnologies);

const updateProfile = {...devProfile, available: true};
console.log('Perfil actualizado', updateProfile);

class Project {
    #id;
    constructor(id, title, description, techs, emoji, category) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.techs = techs;
        this.emoji = emoji;
        this.category = category;
    }
    
    get id() {
        return this.#id;
    }
    
    toHtml() {
        const badges = this.techs
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join('');
        
        return `
<div class="proyecto-card" data-category="${this.category}">
    <div class="proyecto-emoji">${this.emoji}</div>
    <div class="proyecto-titulo">${this.title}</div>
    <div class="proyecto-descripcion">${this.description}</div>
    <div class="tech-stack">${badges}</div>
</div>`;
    }
}

const localProjects = [
    new Project(1, 'App de Tareas', 'Aplicación web con drag & drop, almacenamiento local y modo oscuro.', ['React', 'CSS Modules', 'Flexbox'], '📱', 'frontend'),
    new Project(2, 'EcoShop', 'E-commerce sostenible con sistema de filtros y carrito de compras.', ['HTML5', 'CSS Grid', 'JavaScript'], '🌿', 'frontend'),
    new Project(3, 'Dashboard Analytics', 'Panel con gráficas en tiempo real, filtros dinámicos y exportación.', ['Node.js', 'PostgreSQL', 'Chart.js'], '📊', 'fullstack'),
    new Project(4, 'REST API – Inventario', 'API REST completa con autenticación JWT y documentación Swagger.', ['Express', 'MySQL', 'JWT'], '🔧', 'backend'),
    new Project(5, 'GeoWeather App', 'Consulta clima en tiempo real usando la API de OpenWeather y países.', ['React', 'Fetch API', 'OpenWeather'], '🌍', 'fullstack'),
];

const filterProjects = (category) =>
    category === 'all'
        ? localProjects
        : localProjects.filter(p => p.category === category);

const getTitles = () => localProjects.map(p => p.title);
const countByProjects = () => localProjects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});
const findProjects = (id) => localProjects.find(p => p.id === id);

console.log('Títulos:', getTitles());
console.log('Por Categoría:', countByProjects());

function renderProjects(category = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        console.error('No se encontró el elemento #projects-grid');
        return;
    }
    
    const filtered = filterProjects(category);
    projectsGrid.innerHTML = filtered.map(p => p.toHtml()).join('');
    
    const counter = document.getElementById('project-count');
    if (counter) counter.textContent = `${filtered.length} proyectos`;
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    console.log(`Mostrando ${filtered.length} proyectos de categoría: ${category}`);
}

function saveFormDraft(data){
    localStorage.setItem('saveFormDraft', JSON.stringify(data));
}

function validateEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (valid) resolve({ ok: true, email });
              else reject(new Error(`Email inválido: ${email}`));
        }, 500);
    });
}

validateEmail('selena.veneros@ejemplo.com')
  .then(({ email }) => console.log(`Email valido: ${email}`))
  .catch(err => console.error('X', err.message));

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
}

async function loadProjects() {
    const loader = document.getElementById('project-loader');
    if(loader) loader.classList.remove('hidden');
    try {
        const posts = await fetchJSON(`${API_BASE}/posts?_limit=5`);
        console.log(posts);
        
        const extra = posts.map((post, index) => new Project(
            post.id + 100,
            post.title.slice(0, 40) + '...',
            post.body.slice(0, 80) + '...',
            ['API', 'Fetch', 'Async/Await'],
            '🔗',
            'api'
        ));
        
        projectsData = [...localProjects, ...extra];
        showToast('Proyectos cargados desde API');
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        showToast('Error al cargar proyectos', 'error');
    } finally {
        if(loader) loader.classList.add('hidden');
    }
}

function showToast(message, type = 'success') {
    console.log(`[${type}] ${message}`);
}

// ============================================================
// POKEMON API
// ============================================================
async function fetchPokemons(offset = 0) {
    console.log('🔄 fetchPokemons llamado con offset:', offset);
    const pokeGrid = document.getElementById('poke-grid');
    
    if (!pokeGrid) {
        console.error('❌ No se encontró el elemento #poke-grid');
        return;
    }
    
    pokeGrid.innerHTML = '<p class="loading-text">⚡ Cargando Pokémon...</p>';
    
    try {
        const data = await fetchJSON(`${POKE_API}/pokemon?limit=6&offset=${offset}`);
        console.log('📦 Datos recibidos:', data);
        
        const details = await Promise.all(
            data.results.map(p => fetchJSON(p.url))
        );
        
        pokeGrid.innerHTML = details.map(({ name, sprites, types }) => {
            const type = types[0].type.name;
            const img = sprites.other?.['official-artwork']?.front_default || sprites.front_default;
            return `
                <div class="poke-card poke--${type}">
                    <img src="${img}" alt="${name}" loading="lazy" />
                    <p class="poke-name">${name}</p>
                    <span class="poke-type">${type}</span>
                </div>`;
        }).join('');
        
        console.log('✅ Pokémon cargados correctamente');
        
    } catch (err) {
        console.error('❌ Error fetching Pokémon:', err);
        pokeGrid.innerHTML = `<p class="error-text">❌ Error: ${err.message}</p>`;
    }
}

// ============================================================
// PAÍSES API
// ============================================================
async function fetchCountry(query) {
    const countryResult = document.getElementById('country-result');
    if (!countryResult || !query.trim()) return;
    
    countryResult.innerHTML = '<p class="loading-text">🌍 Buscando país...</p>';
    
    try {
        const [country] = await fetchJSON(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,region`
        );
        
        const {
            name: { common },
            capital = ['N/A'],
            population,
            flags: { svg: flag },
            region,
        } = country;
        
        countryResult.innerHTML = `
            <div class="country-card">
                <img src="${flag}" alt="Bandera de ${common}" class="country-flag" />
                <div class="country-info">
                    <h4>${common}</h4>
                    <p>🏛 Capital: <strong>${capital[0]}</strong></p>
                    <p>🌍 Región: <strong>${region}</strong></p>
                    <p>👥 Población: <strong>${population.toLocaleString()}</strong></p>
                </div>
            </div>`;
            
    } catch (error) {
        countryResult.innerHTML = `<p class="error-text">❌ País no encontrado: "${query}"</p>`;
        console.error('Error al buscar país:', error);
    }
}

async function loadDashboardData() {
    try {
        const [posts, users, todos] = await Promise.all([
            fetchJSON(`${API_BASE}/posts?_limit=5`),
            fetchJSON(`${API_BASE}/users?_limit=5`),
            fetchJSON(`${API_BASE}/todos?_limit=5`),
        ]);
        console.log('Posts:', posts);
        console.log('Users:', users);
        console.log('Todos:', todos);
        
        showToast('Datos del dashboard cargados');
    } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        showToast('Error al cargar datos del dashboard', 'error');
    }
}

// ============================================================
// EVENTOS PRINCIPALES
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM completamente cargado');
    
    // 1. Proyectos
    renderProjects('all');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.currentTarget.dataset.filter;
            currentFilter = filter;
            renderProjects(currentFilter);
        });
    });
    
    // 2. Pokémon
    const pokeSection = document.getElementById('poke-section');
    console.log('poke-section encontrado:', !!pokeSection);
    
    if (pokeSection) {
        console.log('🔄 Inicializando Pokémon...');
        fetchPokemons(0);
        
        const pokeNext = document.getElementById('poke-next');
        if (pokeNext) {
            let currentOffset = 0;
            pokeNext.addEventListener('click', () => {
                currentOffset += 6;
                console.log('🔄 Cargando siguientes Pokémon, offset:', currentOffset);
                fetchPokemons(currentOffset);
            });
            console.log('✅ Botón "Cargar siguientes" configurado');
        } else {
            console.warn('⚠️ No se encontró el botón #poke-next');
        }
    } else {
        console.warn('⚠️ No se encontró la sección #poke-section');
    }
    
    // 3. Búsqueda de países
    const countryInput = document.getElementById('country-search');
    if (countryInput) {
        let searchTimer;
        countryInput.addEventListener('input', (e) => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => fetchCountry(e.target.value), 500);
        });
        console.log('✅ Búsqueda de países configurada');
    }
    
    // 4. Scroll suave
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    console.log('🎉 Inicialización completa');
});
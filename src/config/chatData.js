export const chatData = {
  es: {
    quickQuestions: [
      { id: 'servicios', label: '¿Qué servicios ofrecen?' },
      { id: 'proyectos', label: '¿Qué proyectos realizaron?' },
      { id: 'tecnologias', label: '¿Qué tecnologías manejan?' },
      { id: 'proyectoComplejo', label: '¿Cuál fue el proyecto más complejo?' },
      { id: 'equipo', label: '¿Quiénes son?' },
      { id: 'contacto', label: '¿Cómo los contacto?' },
    ],
    categories: {
      proyectoComplejo: {
        keywords: ['complejo', 'dificil', 'difícil', 'grande', 'desafio', 'desafío', 'challenge', 'hardest'],
        response: `<strong><a href="/project/miarbol">Mi Árbol en el Mundo</a></strong> fue nuestro proyecto más complejo.<br/><br/>
<strong>Duración:</strong> +1 año de desarrollo<br/>
<strong>Apps:</strong> 4 aplicaciones (web, mobile, landing y API)<br/>
<strong>Base de datos:</strong> 25 tablas, 270+ endpoints<br/>
<strong>Pagos:</strong> MercadoPago integrado<br/>
<strong>Features:</strong> Chat en tiempo real, mapas interactivos, moderación con IA<br/><br/>
Es una plataforma completa de plantación de árboles con marketplace y red social.`,
      },
      equipo: {
        keywords: ['equipo', 'quienes', 'quiénes', 'son', 'team', 'about', 'nosotros'],
        response: `<strong>Somos CU Digital</strong><br/><br/>
<strong>Joaquín Urtasun</strong> y <strong>Martín Contrera</strong>, desarrolladores de Argentina y Japón.<br/><br/>
Nos especializamos en crear landing pages, aplicaciones web y apps móviles a medida para negocios y emprendedores.<br/><br/>
Trabajamos con clientes en Australia, Perú, Japón y Argentina. Nos encargamos de todo: diseño, desarrollo, publicación y soporte.`,
      },
      tecnologias: {
        keywords: ['tecnologia', 'tecnologías', 'tecnologias', 'stack', 'tech', 'herramientas', 'tools', 'lenguaje', 'framework'],
        response: `Manejamos varias áreas tecnológicas. ¿Cuál te interesa?`,
        subOptions: [
          { id: 'techFrontend', label: 'Frontend' },
          { id: 'techBackend', label: 'Backend' },
          { id: 'techDevops', label: 'DevOps / Cloud' },
        ],
      },
      techFrontend: {
        keywords: ['frontend', 'front', 'react', 'next', 'nextjs', 'typescript', 'css', 'html', 'ui', 'interfaz'],
        response: `<strong>Frontend</strong><br/><br/>
• <strong>React</strong> — framework principal<br/>
• <strong>Next.js</strong> — sitios rápidos y optimizados para Google<br/>
• <strong>TypeScript</strong> — código más seguro y mantenible<br/>
• <strong>React Native + Expo</strong> — apps para Android e iOS<br/>
• <strong>Tailwind CSS</strong> — diseños modernos y responsive`,
      },
      techBackend: {
        keywords: ['backend', 'back', 'node', 'nodejs', 'api', 'servidor', 'server', 'base de datos', 'database', 'mysql', 'express'],
        response: `<strong>Backend</strong><br/><br/>
• <strong>Node.js + Express</strong> — servidores y APIs<br/>
• <strong>MySQL / PostgreSQL</strong> — bases de datos<br/>
• <strong>Socket.io</strong> — chat y datos en tiempo real<br/>
• <strong>JWT</strong> — login seguro<br/>
• <strong>Nodemailer</strong> — emails automáticos`,
      },
      techDevops: {
        keywords: ['devops', 'cloud', 'docker', 'aws', 'deploy', 'hosting', 'vercel'],
        response: `<strong>DevOps / Hosting</strong><br/><br/>
• <strong>Vercel</strong> — hosting rápido para landings y apps web<br/>
• <strong>AWS</strong> — para proyectos más grandes<br/>
• <strong>Docker</strong> — ambientes consistentes<br/>
• <strong>GitHub Actions</strong> — publicación automática`,
      },
      proyectos: {
        keywords: ['proyecto', 'proyectos', 'portfolio', 'hicieron', 'projects', 'apps', 'aplicaciones'],
        response: `<strong>Nuestros proyectos:</strong><br/><br/>
<strong><a href="/project/miarbol">Mi Árbol en el Mundo</a></strong> — Plataforma web + mobile de plantación de árboles con marketplace y red social<br/><br/>
<strong><a href="/project/triso">Triso</a></strong> — Landing corporativa para empresa de ingeniería (11 versiones con el cliente)<br/><br/>
<strong><a href="/project/djdivito">DJ DiVito</a></strong> — Landing profesional para DJ en Australia con sistema de booking<br/><br/>
<strong><a href="/project/lolinails">Loli Nails</a></strong> — Catálogo digital para estudio de nail art<br/><br/>
<strong><a href="/project/quicknotes">Quick Notes</a></strong> — App de escritorio para notas rápidas con diseño Windows 11 y macOS`,
      },
      servicios: {
        keywords: ['servicio', 'servicios', 'landing', 'app', 'mobile', 'precio', 'presupuesto', 'contratar', 'freelance', 'web', 'desktop', 'escritorio'],
        response: `<strong>Nuestros servicios:</strong><br/><br/>
<strong>Landing Page</strong> — <span style="color:var(--primary)">Desde $150 USD</span><br/>
Tu página web profesional, lista para recibir clientes. Diseño a medida, se ve bien en celular y PC, aparecés en Google, formulario de contacto, hosting incluido y soporte continuo.<br/><br/>
<strong>App Web</strong> — <span style="color:var(--muted)">A definir en reunión</span><br/>
Sistema online completo para gestionar tu negocio: panel admin, base de datos, login y soporte.<br/><br/>
<strong>App Mobile</strong> — <span style="color:var(--muted)">A definir en reunión</span><br/>
Tu app en el celular de tus clientes, para Android e iOS.<br/><br/>
<a href="https://wa.me/5492804195492?text=Hola!%20Vi%20su%20página%20y%20me%20interesan%20sus%20servicios" target="_blank" rel="noopener noreferrer">Escribinos por WhatsApp →</a>`,
      },
      contacto: {
        keywords: ['contacto', 'contactar', 'email', 'mail', 'hablar', 'contact', 'reach', 'hire'],
        response: `<strong>¡Contactanos!</strong><br/><br/>
• <a href="https://wa.me/5492804195492?text=Hola!%20Me%20interesa%20consultar%20por%20sus%20servicios" target="_blank" rel="noopener noreferrer">Escribinos por WhatsApp</a>`,
      },
    },
    noMatch: 'No tenemos información sobre eso.',
  },
  en: {
    quickQuestions: [
      { id: 'servicios', label: 'What services do you offer?' },
      { id: 'proyectos', label: 'What projects have you built?' },
      { id: 'tecnologias', label: 'What technologies do you use?' },
      { id: 'proyectoComplejo', label: 'What was the most complex project?' },
      { id: 'equipo', label: 'Who are you?' },
      { id: 'contacto', label: 'How do I contact you?' },
    ],
    categories: {
      proyectoComplejo: {
        keywords: ['complex', 'difficult', 'hard', 'biggest', 'challenge', 'hardest', 'complejo'],
        response: `<strong><a href="/project/miarbol">Mi Árbol en el Mundo</a></strong> was our most complex project.<br/><br/>
<strong>Duration:</strong> 1+ year of development<br/>
<strong>Apps:</strong> 4 applications (web, mobile, landing & API)<br/>
<strong>Database:</strong> 25 tables, 270+ endpoints<br/>
<strong>Payments:</strong> MercadoPago integrated<br/>
<strong>Features:</strong> Real-time chat, interactive maps, AI moderation<br/><br/>
A complete tree planting platform with marketplace and social network.`,
      },
      equipo: {
        keywords: ['team', 'who', 'about', 'you', 'equipo'],
        response: `<strong>We are CU Digital</strong><br/><br/>
<strong>Joaquín Urtasun</strong> and <strong>Martín Contrera</strong>, developers from Argentina and Japan.<br/><br/>
We specialize in building landing pages, web apps and mobile apps for businesses and entrepreneurs.<br/><br/>
We work with clients in Australia, Peru, Japan and Argentina. We handle everything: design, development, deployment and support.`,
      },
      tecnologias: {
        keywords: ['technology', 'technologies', 'stack', 'tech', 'tools', 'language', 'framework', 'tecnologia'],
        response: `We work across several technology areas. Which one interests you?`,
        subOptions: [
          { id: 'techFrontend', label: 'Frontend' },
          { id: 'techBackend', label: 'Backend' },
          { id: 'techDevops', label: 'DevOps / Cloud' },
        ],
      },
      techFrontend: {
        keywords: ['frontend', 'front', 'react', 'next', 'nextjs', 'typescript', 'css', 'html', 'ui', 'interface'],
        response: `<strong>Frontend</strong><br/><br/>
• <strong>React</strong> — main framework<br/>
• <strong>Next.js</strong> — fast sites optimized for Google<br/>
• <strong>TypeScript</strong> — safer, more maintainable code<br/>
• <strong>React Native + Expo</strong> — Android & iOS apps<br/>
• <strong>Tailwind CSS</strong> — modern responsive designs`,
      },
      techBackend: {
        keywords: ['backend', 'back', 'node', 'nodejs', 'api', 'server', 'database', 'mysql', 'express'],
        response: `<strong>Backend</strong><br/><br/>
• <strong>Node.js + Express</strong> — servers & APIs<br/>
• <strong>MySQL / PostgreSQL</strong> — databases<br/>
• <strong>Socket.io</strong> — real-time chat & data<br/>
• <strong>JWT</strong> — secure login<br/>
• <strong>Nodemailer</strong> — automated emails`,
      },
      techDevops: {
        keywords: ['devops', 'cloud', 'docker', 'aws', 'deploy', 'hosting', 'vercel'],
        response: `<strong>DevOps / Hosting</strong><br/><br/>
• <strong>Vercel</strong> — fast hosting for landings & web apps<br/>
• <strong>AWS</strong> — for larger projects<br/>
• <strong>Docker</strong> — consistent environments<br/>
• <strong>GitHub Actions</strong> — automated deployment`,
      },
      proyectos: {
        keywords: ['project', 'projects', 'portfolio', 'built', 'apps', 'applications', 'proyecto'],
        response: `<strong>Our projects:</strong><br/><br/>
<strong><a href="/project/miarbol">Mi Árbol en el Mundo</a></strong> — Web + mobile tree planting platform with marketplace and social network<br/><br/>
<strong><a href="/project/triso">Triso</a></strong> — Corporate landing for engineering company (11 versions with the client)<br/><br/>
<strong><a href="/project/djdivito">DJ DiVito</a></strong> — Professional landing for DJ in Australia with booking system<br/><br/>
<strong><a href="/project/lolinails">Loli Nails</a></strong> — Digital catalog for nail art studio<br/><br/>
<strong><a href="/project/quicknotes">Quick Notes</a></strong> — Desktop sticky notes app with Windows 11 and macOS design`,
      },
      servicios: {
        keywords: ['service', 'services', 'landing', 'app', 'mobile', 'price', 'budget', 'hire', 'freelance', 'web', 'desktop'],
        response: `<strong>Our services:</strong><br/><br/>
<strong>Landing Page</strong> — <span style="color:var(--primary)">From $150 USD</span><br/>
Your professional website, ready to receive clients. Custom design, mobile & desktop responsive, Google-optimized, contact form, hosting included and ongoing support.<br/><br/>
<strong>Web App</strong> — <span style="color:var(--muted)">To be defined in meeting</span><br/>
Complete online system for your business: admin panel, database, login & support.<br/><br/>
<strong>Mobile App</strong> — <span style="color:var(--muted)">To be defined in meeting</span><br/>
Your app on your clients' phones, for Android & iOS.<br/><br/>
<a href="https://wa.me/5492804195492?text=Hi!%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer">Message us on WhatsApp →</a>`,
      },
      contacto: {
        keywords: ['contact', 'email', 'mail', 'talk', 'hire', 'reach', 'contacto'],
        response: `<strong>Get in touch!</strong><br/><br/>
• <a href="https://wa.me/5492804195492?text=Hi!%20I'd%20like%20to%20ask%20about%20your%20services" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>`,
      },
    },
    noMatch: "We don't have information about that.",
  },
};

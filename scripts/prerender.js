import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define metadata for each route
const routes = [
  {
    path: '/',
    title: 'Julia Agüero - Complete Mobile App Solutions',
    description: 'Premium mobile apps tailored to your vision. Full-stack development, UX design, and project management—all in one. Fast, personal, top quality.',
    url: 'https://juliaaguero.com'
  },
  {
    path: '/about',
    title: 'About Julia Agüero - Mobile App Developer & Designer',
    description: 'Learn about my journey in mobile app development, my approach to creating exceptional user experiences, and how I bring your app ideas to life with passion and expertise.',
    url: 'https://juliaaguero.com/about'
  },
  {
    path: '/build-your-app',
    title: 'Build your app - Julia Agüero Mobile App Development',
    description: 'Get a personalized quote for your mobile app project. Share your requirements and I\'ll provide you with a detailed estimate and project plan. Free consultation, no obligations.',
    url: 'https://juliaaguero.com/build-your-app'
  },
  {
    path: '/blog',
    title: 'Blog - Julia Agüero Mobile App Development Insights',
    description: 'Read insights about mobile app development, UX design, and the latest trends in the industry. Tips, tutorials, and thoughts from a mobile app developer.',
    url: 'https://juliaaguero.com/blog'
  }
];

// Read the base index.html
const baseHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

// Generate HTML for each route
routes.forEach(route => {
  let html = baseHtml;
  
  // Replace metadata
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );
  
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  );
  
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${route.url}" />`
  );
  
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  
  // Create directory if it doesn't exist
  const routePath = route.path === '/' ? '' : route.path;
  const dirPath = path.join(__dirname, '../dist', routePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write the HTML file
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, html);
  
  console.log(`Generated: ${filePath}`);
});

console.log('Prerendering complete!'); 
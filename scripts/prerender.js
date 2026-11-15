import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyRoute, blogPostRoute, absoluteUrl, imageSize } from './shareTags.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The Flatto pages carry the app's brand, not the website's.
const flattoPage = {
  lang: 'en',
  siteName: 'Flatto',
  image: 'https://juliaaguero.com/flatto/icon.png',
  icon: '/flatto/icon.png',
  iconType: 'image/png',
  // These pages serve their own fonts, so that opening them doesn't reach Google.
  localFonts: true
};

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
  },
  {
    path: '/chotos/privacidad',
    title: 'Política de privacidad de Chotos',
    description: 'Qué datos guarda la app Chotos, para qué, dónde, durante cuánto tiempo y cómo verlos o eliminarlos.',
    url: 'https://juliaaguero.com/chotos/privacidad',
    // The Chotos pages carry the app's brand, not the website's.
    lang: 'es',
    siteName: 'Chotos',
    image: 'https://juliaaguero.com/chotos/icono.png',
    icon: '/chotos/icono.svg'
  },
  {
    path: '/flatto/privacy-policy',
    title: 'Flatto Privacy Policy',
    description: 'What personal data the Flatto app processes, why, where, for how long, who can see it, and how to delete your account.',
    url: 'https://juliaaguero.com/flatto/privacy-policy',
    ...flattoPage
  },
  {
    path: '/flatto/terms',
    title: 'Flatto Terms of Use',
    description: 'The terms for using the Flatto app: your account, your content, acceptable use and how to leave.',
    url: 'https://juliaaguero.com/flatto/terms',
    ...flattoPage
  },
  {
    path: '/flatto/support',
    title: 'Flatto Support',
    description: 'How to get help with the Flatto app, report a user or inappropriate content, or delete your account.',
    url: 'https://juliaaguero.com/flatto/support',
    ...flattoPage
  }
];

// Each blog post gets its own page, so a shared link shows the post's title, description and cover.
// The posts' index is written by `npm run fetch-blog` before the build.
const postsIndexPath = path.join(__dirname, '../src/blog/content/index.json');
const posts = fs.existsSync(postsIndexPath) ? JSON.parse(fs.readFileSync(postsIndexPath, 'utf8')) : [];
posts.forEach(post => {
  const cover = post.coverImage;
  const localCover = cover && cover.startsWith('/') ? path.join(__dirname, '../dist', cover) : null;
  const size = localCover ? imageSize(localCover) : null;
  const image = cover ? { url: absoluteUrl(cover), width: size?.width, height: size?.height } : null;
  routes.push(blogPostRoute(post, image));
});

// Read the base index.html
const baseHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

// Generate HTML for each route
routes.forEach(route => {
  const html = applyRoute(baseHtml, route);

  // A route without its own file name is written as <path>/index.html.
  const relativeFile = route.file ?? path.join(route.path === '/' ? '' : route.path, 'index.html');
  const filePath = path.join(__dirname, '../dist', relativeFile);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);

  console.log(`Generated: ${filePath}`);
});

console.log('Prerendering complete!');

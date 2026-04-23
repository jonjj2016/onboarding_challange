import { pool } from './db';
import { ContentStatus } from './types';

// Fixed UUIDs so vader-mock can reference content IDs in the junction table
// without calling rover-mock at boot time
export const AUTHOR_IDS = [
  'a0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000003',
  'a0000000-0000-0000-0000-000000000004',
  'a0000000-0000-0000-0000-000000000005',
  'a0000000-0000-0000-0000-000000000006',
  'a0000000-0000-0000-0000-000000000007',
  'a0000000-0000-0000-0000-000000000008',
  'a0000000-0000-0000-0000-000000000009',
  'a0000000-0000-0000-0000-000000000010',
];

export const CONTENT_IDS = [
  // site-us-cooking (01–10)
  'c0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000002',
  'c0000000-0000-0000-0000-000000000003',
  'c0000000-0000-0000-0000-000000000004',
  'c0000000-0000-0000-0000-000000000005',
  'c0000000-0000-0000-0000-000000000006',
  'c0000000-0000-0000-0000-000000000007',
  'c0000000-0000-0000-0000-000000000008',
  'c0000000-0000-0000-0000-000000000009',
  'c0000000-0000-0000-0000-000000000010',
  // site-us-fashion (11–20)
  'c0000000-0000-0000-0000-000000000011',
  'c0000000-0000-0000-0000-000000000012',
  'c0000000-0000-0000-0000-000000000013',
  'c0000000-0000-0000-0000-000000000014',
  'c0000000-0000-0000-0000-000000000015',
  'c0000000-0000-0000-0000-000000000016',
  'c0000000-0000-0000-0000-000000000017',
  'c0000000-0000-0000-0000-000000000018',
  'c0000000-0000-0000-0000-000000000019',
  'c0000000-0000-0000-0000-000000000020',
  // site-us-travel (21–30)
  'c0000000-0000-0000-0000-000000000021',
  'c0000000-0000-0000-0000-000000000022',
  'c0000000-0000-0000-0000-000000000023',
  'c0000000-0000-0000-0000-000000000024',
  'c0000000-0000-0000-0000-000000000025',
  'c0000000-0000-0000-0000-000000000026',
  'c0000000-0000-0000-0000-000000000027',
  'c0000000-0000-0000-0000-000000000028',
  'c0000000-0000-0000-0000-000000000029',
  'c0000000-0000-0000-0000-000000000030',
];

const AUTHORS = [
  { name: 'Alice Chen', email: 'alice.chen@contently.com' },
  { name: 'Bob Martinez', email: 'bob.martinez@contently.com' },
  { name: 'Carol Johnson', email: 'carol.johnson@contently.com' },
  { name: 'David Kim', email: 'david.kim@contently.com' },
  { name: 'Emma Wilson', email: 'emma.wilson@contently.com' },
  { name: 'Frank Brown', email: 'frank.brown@contently.com' },
  { name: 'Grace Lee', email: 'grace.lee@contently.com' },
  { name: 'Henry Davis', email: 'henry.davis@contently.com' },
  { name: 'Iris Taylor', email: 'iris.taylor@contently.com' },
  { name: 'Jack Anderson', email: 'jack.anderson@contently.com' },
];

type ContentSeed = {
  title: string;
  slug: string;
  body: string;
  status: ContentStatus;
  site: string;
  author_index: number;
};

const CONTENTS: ContentSeed[] = [
  // site-us-cooking
  {
    title: 'The Ultimate Guide to Sourdough Bread',
    slug: 'ultimate-guide-sourdough-bread',
    body: '<p>Sourdough baking is both an art and a science. In this comprehensive guide, we cover everything from cultivating your starter to achieving the perfect crust. The key is patience — a good sourdough loaf takes at least 24 hours from start to finish. <strong>Hydration</strong> is your most important variable: aim for 75% for beginners, and work up to 80–85% as you gain confidence.</p><p>Temperature matters enormously. A warmer kitchen (24–26°C) speeds fermentation; a cooler one (18–20°C) slows it and develops more complex flavors.</p>',
    status: ContentStatus.Published,
    site: 'site-us-cooking',
    author_index: 0,
  },
  {
    title: '5 Quick Weeknight Pasta Recipes',
    slug: '5-quick-weeknight-pasta-recipes',
    body: '<p>When time is short, pasta is your best friend. These five recipes come together in under 30 minutes and use pantry staples you likely already have.</p><ul><li><strong>Cacio e Pepe</strong> — just pasta water, pecorino, and black pepper</li><li><strong>Aglio e Olio</strong> — garlic, olive oil, parsley, and a pinch of chili</li><li><strong>Carbonara</strong> — eggs, guanciale, pecorino (no cream!)</li></ul>',
    status: ContentStatus.Published,
    site: 'site-us-cooking',
    author_index: 1,
  },
  {
    title: 'Mastering French Sauces',
    slug: 'mastering-french-sauces',
    body: '<p>French cuisine is built on five mother sauces — Béchamel, Velouté, Espagnole, Sauce Tomat, and Hollandaise. Understanding these unlocks hundreds of derivative sauces. <em>Béchamel</em> is the simplest: butter, flour, and milk cooked into a silky white sauce.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-cooking',
    author_index: 2,
  },
  {
    title: 'Fermentation Fundamentals',
    slug: 'fermentation-fundamentals',
    body: '<p>Fermentation is one of humanity\'s oldest food preservation techniques. <strong>Lacto-fermentation</strong> requires only salt, water, and time. A 2% salt brine by weight creates an inhospitable environment for harmful bacteria while allowing Lactobacillus to thrive.</p>',
    status: ContentStatus.Published,
    site: 'site-us-cooking',
    author_index: 3,
  },
  {
    title: 'Knife Skills for Home Cooks',
    slug: 'knife-skills-home-cooks',
    body: '<p>A sharp knife is the single most important tool in your kitchen. Learn the <strong>pinch grip</strong>: pinch the blade between your thumb and forefinger just above the handle. This gives you control and reduces fatigue over long prep sessions.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-cooking',
    author_index: 4,
  },
  {
    title: 'The Science of Baking',
    slug: 'science-of-baking',
    body: '<p>Baking is chemistry. <strong>Gluten</strong> forms when water activates proteins in flour; more gluten means chewier bread, less means tender cake. Understanding the Maillard reaction explains why crusts brown and develop flavor.</p>',
    status: ContentStatus.Published,
    site: 'site-us-cooking',
    author_index: 5,
  },
  {
    title: 'Farm to Table: A Seasonal Guide',
    slug: 'farm-to-table-seasonal-guide',
    body: '<p>Eating seasonally is how humans ate for most of history. Produce picked at peak ripeness and sold locally tastes dramatically better than commodity fruit shipped halfway around the world. In spring, look for asparagus, peas, and ramps.</p>',
    status: ContentStatus.Unpublished,
    site: 'site-us-cooking',
    author_index: 6,
  },
  {
    title: 'Perfect Steak Every Time',
    slug: 'perfect-steak-every-time',
    body: '<p>Great steak starts at the butcher, not the pan. Season generously with kosher salt 45 minutes before cooking. For the best sear, <strong>dry the surface thoroughly</strong> with paper towels. A dry surface browns; a wet surface steams.</p>',
    status: ContentStatus.Published,
    site: 'site-us-cooking',
    author_index: 7,
  },
  {
    title: 'Vegan Comfort Food',
    slug: 'vegan-comfort-food',
    body: '<p>Plant-based cooking has come a long way. <strong>Jackfruit</strong> pulled "pork" tacos, creamy cashew mac and cheese, and hearty lentil shepherd\'s pie are dishes that will satisfy even dedicated meat eaters. Build umami through mushrooms, miso, and nutritional yeast.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-cooking',
    author_index: 8,
  },
  {
    title: 'Traditional Japanese Ramen',
    slug: 'traditional-japanese-ramen',
    body: '<p>Authentic ramen is a multi-day project. The broth is the soul: <strong>tonkotsu</strong> simmers for 12–18 hours until milky and rich. The tare — a concentrated seasoning sauce — is stirred in per bowl, allowing the same broth to become different ramen for different people.</p>',
    status: ContentStatus.Published,
    site: 'site-us-cooking',
    author_index: 9,
  },
  // site-us-fashion
  {
    title: 'Spring 2024 Trend Report',
    slug: 'spring-2024-trend-report',
    body: '<p>Spring 2024 runways were dominated by three macro trends: <strong>quiet luxury</strong> doubles down on understated elegance; <strong>maximalist florals</strong> go big with oversized prints; and <strong>utility chic</strong> brings cargo pockets into elevated contexts.</p>',
    status: ContentStatus.Published,
    site: 'site-us-fashion',
    author_index: 0,
  },
  {
    title: 'Sustainable Fashion Guide',
    slug: 'sustainable-fashion-guide',
    body: '<p>Fashion is the second-largest polluter in the world. Start with the <strong>cost-per-wear</strong> formula: divide the price of a garment by the number of times you\'ll realistically wear it. Look for certifications like <em>GOTS</em> and <em>Fair Trade</em>.</p>',
    status: ContentStatus.Published,
    site: 'site-us-fashion',
    author_index: 1,
  },
  {
    title: 'Building a Capsule Wardrobe',
    slug: 'building-a-capsule-wardrobe',
    body: '<p>A capsule wardrobe is a curated collection of versatile pieces that work together seamlessly. The classic formula is 33 items worn in a 3-month season. Start by auditing what you own: pull everything out, try it on, and ask whether it fits, flatters, and makes you feel good.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-fashion',
    author_index: 2,
  },
  {
    title: 'The Return of Y2K',
    slug: 'the-return-of-y2k',
    body: '<p>Early-2000s fashion is officially back. Low-rise jeans, butterfly clips, and velour tracksuits are filling Instagram feeds. <strong>Why now?</strong> Nostalgia cycles roughly every 20–25 years, meaning today\'s twenty-somethings are rediscovering the aesthetics of their early childhood.</p>',
    status: ContentStatus.Published,
    site: 'site-us-fashion',
    author_index: 3,
  },
  {
    title: 'Luxury Resale Market',
    slug: 'luxury-resale-market',
    body: '<p>The secondhand luxury market is projected to reach $70 billion by 2025. Platforms like The RealReal and Vestiaire Collective have legitimized resale. A pre-owned Chanel bag can hold or increase in value over time.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-fashion',
    author_index: 4,
  },
  {
    title: 'Street Style from Paris Fashion Week',
    slug: 'street-style-paris-fashion-week',
    body: '<p>Outside the shows is where the real fashion happens. The dominant look: <strong>tailored coats</strong> over unexpected textures, chunky loafers, and the kind of tote bag that looks expensive without a logo in sight.</p>',
    status: ContentStatus.Published,
    site: 'site-us-fashion',
    author_index: 5,
  },
  {
    title: 'Accessories to Elevate Any Outfit',
    slug: 'accessories-to-elevate-any-outfit',
    body: '<p>The right accessory transforms a basic outfit into a complete look. <strong>Belts</strong> add structure and define the waist. <strong>Scarves</strong> add color and texture without committing to a printed garment. A quality leather bag signals intentionality more than any logo.</p>',
    status: ContentStatus.Published,
    site: 'site-us-fashion',
    author_index: 6,
  },
  {
    title: 'Denim Through the Decades',
    slug: 'denim-through-the-decades',
    body: '<p>From workwear to counterculture symbol, denim\'s journey tracks broader social history. James Dean\'s Levi\'s in <em>Rebel Without a Cause</em> made blue jeans synonymous with youth rebellion. The 1970s brought bell-bottoms; the 1990s went back to basics with straight-leg fits.</p>',
    status: ContentStatus.Unpublished,
    site: 'site-us-fashion',
    author_index: 7,
  },
  {
    title: 'Color Blocking for Beginners',
    slug: 'color-blocking-for-beginners',
    body: '<p>Color blocking — wearing two or more bold, contrasting solid colors — is one of fashion\'s most striking techniques. The key is <strong>color theory</strong>: complementary colors create drama; analogous colors create harmonious looks. Start simple: cobalt blue trousers with a burnt orange top.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-fashion',
    author_index: 8,
  },
  {
    title: 'The Minimalist Wardrobe',
    slug: 'the-minimalist-wardrobe',
    body: '<p>Minimalism in fashion isn\'t about owning fewer things at the expense of style. A truly minimalist wardrobe functions like a good equation: every variable matters, nothing is redundant. The palette is tight, the silhouettes are classic, the quality is the highest you can sustainably afford.</p>',
    status: ContentStatus.Published,
    site: 'site-us-fashion',
    author_index: 9,
  },
  // site-us-travel
  {
    title: 'Hidden Gems of Southeast Asia',
    slug: 'hidden-gems-southeast-asia',
    body: '<p>Southeast Asia\'s most memorable experiences are often found off the tourist trail. <strong>Kampot, Cambodia</strong> — a sleepy riverside town famous for its pepper plantations — offers colonial-era architecture and a pace of life untouched by mass tourism.</p>',
    status: ContentStatus.Published,
    site: 'site-us-travel',
    author_index: 0,
  },
  {
    title: 'A Weekend in New York City',
    slug: 'a-weekend-in-new-york-city',
    body: '<p>48 hours in New York is enough to understand why people call it the greatest city in the world. Skip Times Square; go to the High Line instead. Eat a bagel at Ess-a-Bagel. Walk across the Brooklyn Bridge early morning before the crowds arrive.</p>',
    status: ContentStatus.Published,
    site: 'site-us-travel',
    author_index: 1,
  },
  {
    title: 'Solo Travel Safety Tips',
    slug: 'solo-travel-safety-tips',
    body: '<p>Solo travel is one of the most transformative experiences a person can have. <strong>Research specific neighborhoods</strong> rather than whole countries; danger is almost always localized. Share your itinerary with someone at home. Trust your instincts: if a situation feels wrong, leave.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-travel',
    author_index: 2,
  },
  {
    title: 'The Best Mountain Hiking Trails',
    slug: 'best-mountain-hiking-trails',
    body: '<p>The <strong>Tour du Mont Blanc</strong> (11 days, 3 countries) is the classic introduction to alpine trekking. For the more adventurous, Peru\'s <strong>Huayhuash Circuit</strong> is technically demanding but rewards with views of some of the Andes\' sharpest peaks.</p>',
    status: ContentStatus.Published,
    site: 'site-us-travel',
    author_index: 3,
  },
  {
    title: 'Budget Travel in Europe',
    slug: 'budget-travel-in-europe',
    body: '<p><strong>Accommodation</strong>: skip central hotels for hostels with private rooms. <strong>Transport</strong>: book trains early. <strong>Food</strong>: lunch menus (menu del día in Spain, plat du jour in France) give you restaurant-quality food at a fraction of dinner prices.</p>',
    status: ContentStatus.Published,
    site: 'site-us-travel',
    author_index: 4,
  },
  {
    title: 'Luxury Safari in Africa',
    slug: 'luxury-safari-in-africa',
    body: '<p>The Serengeti\'s <strong>Great Migration</strong> — 1.5 million wildebeest moving between Tanzania and Kenya — is the largest animal migration on earth. Stay in a tented camp for authenticity; the canvas walls connect you to the sounds of the bush in a way permanent structures cannot.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-travel',
    author_index: 5,
  },
  {
    title: 'Road Trip Route 66',
    slug: 'road-trip-route-66',
    body: '<p>Route 66 — from Chicago to Santa Monica, 2,400 miles of American history — is best driven over two to three weeks. The highlights are well-known: the <strong>Cadillac Ranch</strong>, the <strong>Wigwam Motel</strong>, the <strong>Painted Desert</strong>. But the real Route 66 is the diners and roadside oddities between the landmarks.</p>',
    status: ContentStatus.Published,
    site: 'site-us-travel',
    author_index: 6,
  },
  {
    title: 'Island Hopping in Greece',
    slug: 'island-hopping-in-greece',
    body: '<p>A well-planned two-week island hop can cover four or five meaningfully different destinations. <strong>Santorini</strong> for the iconic caldera views. <strong>Naxos</strong> for beaches and local life. <strong>Folegandros</strong> for whitewashed simplicity and almost no package tourists.</p>',
    status: ContentStatus.Unpublished,
    site: 'site-us-travel',
    author_index: 7,
  },
  {
    title: 'Digital Nomad Guide to Bali',
    slug: 'digital-nomad-guide-to-bali',
    body: '<p>Bali has become the world\'s most recognizable digital nomad destination: fast internet, abundant coworking spaces, a low cost of living. <strong>Canggu</strong> is the epicenter — dense with cafés that double as offices. <strong>Ubud</strong> offers a quieter creative atmosphere in the rice terraces.</p>',
    status: ContentStatus.Published,
    site: 'site-us-travel',
    author_index: 8,
  },
  {
    title: 'Winter Destinations Worth the Cold',
    slug: 'winter-destinations-worth-the-cold',
    body: '<p><strong>Tromsø, Norway</strong> gives you the Northern Lights. <strong>Quebec City</strong> during Carnaval is a masterclass in winter celebration. <strong>Hokkaido, Japan</strong> offers powder skiing and the Sapporo Snow Festival simultaneously.</p>',
    status: ContentStatus.Draft,
    site: 'site-us-travel',
    author_index: 9,
  },
];

export async function seed(): Promise<void> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM authors');
  if (Number(rows[0].count) > 0) {
    console.log('Seed data already present, skipping');
    return;
  }

  for (let i = 0; i < AUTHORS.length; i++) {
    await pool.query(
      'INSERT INTO authors (id, name, email) VALUES ($1, $2, $3)',
      [AUTHOR_IDS[i], AUTHORS[i].name, AUTHORS[i].email],
    );
  }

  for (let i = 0; i < CONTENTS.length; i++) {
    const c = CONTENTS[i];
    await pool.query(
      `INSERT INTO contents (id, title, slug, body, status, author_id, site)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        CONTENT_IDS[i],
        c.title,
        c.slug,
        c.body,
        c.status,
        AUTHOR_IDS[c.author_index],
        c.site,
      ],
    );
  }

  console.log(`Seeded ${AUTHORS.length} authors and ${CONTENTS.length} content records`);
}

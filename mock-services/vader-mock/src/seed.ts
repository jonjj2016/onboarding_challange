import { pool } from './db';

// These must match CONTENT_IDS in rover-mock/src/seed.ts
const CONTENT_IDS = {
  // cooking
  sourdough: 'c0000000-0000-0000-0000-000000000001',
  pasta: 'c0000000-0000-0000-0000-000000000002',
  frenchSauce: 'c0000000-0000-0000-0000-000000000003',
  ferment: 'c0000000-0000-0000-0000-000000000004',
  knife: 'c0000000-0000-0000-0000-000000000005',
  baking: 'c0000000-0000-0000-0000-000000000006',
  farmTable: 'c0000000-0000-0000-0000-000000000007',
  steak: 'c0000000-0000-0000-0000-000000000008',
  vegan: 'c0000000-0000-0000-0000-000000000009',
  ramen: 'c0000000-0000-0000-0000-000000000010',
  // fashion
  spring: 'c0000000-0000-0000-0000-000000000011',
  sustainable: 'c0000000-0000-0000-0000-000000000012',
  capsule: 'c0000000-0000-0000-0000-000000000013',
  y2k: 'c0000000-0000-0000-0000-000000000014',
  resale: 'c0000000-0000-0000-0000-000000000015',
  paris: 'c0000000-0000-0000-0000-000000000016',
  accessories: 'c0000000-0000-0000-0000-000000000017',
  denim: 'c0000000-0000-0000-0000-000000000018',
  colorBlock: 'c0000000-0000-0000-0000-000000000019',
  minimalist: 'c0000000-0000-0000-0000-000000000020',
  // travel
  seAsia: 'c0000000-0000-0000-0000-000000000021',
  nyc: 'c0000000-0000-0000-0000-000000000022',
  solo: 'c0000000-0000-0000-0000-000000000023',
  hiking: 'c0000000-0000-0000-0000-000000000024',
  budget: 'c0000000-0000-0000-0000-000000000025',
  safari: 'c0000000-0000-0000-0000-000000000026',
  route66: 'c0000000-0000-0000-0000-000000000027',
  greece: 'c0000000-0000-0000-0000-000000000028',
  bali: 'c0000000-0000-0000-0000-000000000029',
  winter: 'c0000000-0000-0000-0000-000000000030',
};

type ProductSeed = { id: string; name: string; price: number; image_url: string };

const PRODUCTS: ProductSeed[] = [
  // cooking (p01–p08)
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    name: 'Zwilling Pro Chef\'s Knife 8"',
    price: 149.95,
    image_url: 'https://placehold.co/400x400?text=Knife',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    name: 'KitchenAid Artisan Stand Mixer',
    price: 449.99,
    image_url: 'https://placehold.co/400x400?text=Mixer',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    name: 'Lodge 12" Cast Iron Skillet',
    price: 49.9,
    image_url: 'https://placehold.co/400x400?text=Skillet',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    name: 'Vitamix E310 Explorian Blender',
    price: 349.95,
    image_url: 'https://placehold.co/400x400?text=Blender',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    name: 'Instant Pot Duo 7-in-1',
    price: 99.95,
    image_url: 'https://placehold.co/400x400?text=InstantPot',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    name: 'Le Creuset 5.5qt Dutch Oven',
    price: 399.95,
    image_url: 'https://placehold.co/400x400?text=DutchOven',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    name: 'Microplane Premium Classic Grater',
    price: 14.95,
    image_url: 'https://placehold.co/400x400?text=Grater',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    name: 'OXO Good Grips Cutting Board',
    price: 34.99,
    image_url: 'https://placehold.co/400x400?text=CuttingBoard',
  },
  // fashion (p09–p17)
  {
    id: 'b0000000-0000-0000-0000-000000000009',
    name: "Levi's 501 Original Jeans",
    price: 69.5,
    image_url: 'https://placehold.co/400x400?text=Jeans',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000010',
    name: 'Allbirds Tree Runners',
    price: 125.0,
    image_url: 'https://placehold.co/400x400?text=Shoes',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000011',
    name: 'Patagonia Nano Puff Jacket',
    price: 249.0,
    image_url: 'https://placehold.co/400x400?text=Jacket',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000012',
    name: 'Everlane Day Glove Flat',
    price: 165.0,
    image_url: 'https://placehold.co/400x400?text=Flats',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000013',
    name: 'Uniqlo HEATTECH Turtleneck',
    price: 29.9,
    image_url: 'https://placehold.co/400x400?text=Turtleneck',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000014',
    name: 'Ray-Ban Wayfarer Sunglasses',
    price: 183.0,
    image_url: 'https://placehold.co/400x400?text=Sunglasses',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000015',
    name: 'Madewell Transport Tote',
    price: 168.0,
    image_url: 'https://placehold.co/400x400?text=Tote',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000016',
    name: 'Cuyana Classic Leather Belt',
    price: 125.0,
    image_url: 'https://placehold.co/400x400?text=Belt',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000017',
    name: 'APC New Standard Jeans',
    price: 210.0,
    image_url: 'https://placehold.co/400x400?text=APCJeans',
  },
  // travel (p18–p25)
  {
    id: 'b0000000-0000-0000-0000-000000000018',
    name: 'Osprey Farpoint 40 Backpack',
    price: 200.0,
    image_url: 'https://placehold.co/400x400?text=Backpack',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000019',
    name: 'Away The Carry-On',
    price: 295.0,
    image_url: 'https://placehold.co/400x400?text=Luggage',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000020',
    name: 'Bose QuietComfort 45 Headphones',
    price: 329.0,
    image_url: 'https://placehold.co/400x400?text=Headphones',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000021',
    name: 'Anker PowerCore 26800 Battery',
    price: 65.99,
    image_url: 'https://placehold.co/400x400?text=Battery',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000022',
    name: 'Sea to Summit Nano Mosquito Net',
    price: 49.95,
    image_url: 'https://placehold.co/400x400?text=MosquitoNet',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000023',
    name: 'Grayl GeoPress Water Purifier',
    price: 89.95,
    image_url: 'https://placehold.co/400x400?text=WaterFilter',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000024',
    name: 'Zpacks Arc Haul Ultra 60L',
    price: 399.0,
    image_url: 'https://placehold.co/400x400?text=UltralightPack',
  },
  {
    id: 'b0000000-0000-0000-0000-000000000025',
    name: 'Garmin inReach Mini 2',
    price: 349.99,
    image_url: 'https://placehold.co/400x400?text=GPS',
  },
];

// Each tuple: [content_key, product_id, position]
type JunctionRow = [string, string, number];

const p = (n: number) => `b0000000-0000-0000-0000-${String(n).padStart(12, '0')}`;

const JUNCTION: JunctionRow[] = [
  // cooking content
  [CONTENT_IDS.sourdough, p(1), 1],
  [CONTENT_IDS.sourdough, p(3), 2],
  [CONTENT_IDS.sourdough, p(7), 3],
  [CONTENT_IDS.pasta, p(1), 1],
  [CONTENT_IDS.pasta, p(6), 2],
  [CONTENT_IDS.pasta, p(8), 3],
  [CONTENT_IDS.frenchSauce, p(1), 1],
  [CONTENT_IDS.frenchSauce, p(6), 2],
  [CONTENT_IDS.frenchSauce, p(7), 3],
  [CONTENT_IDS.ferment, p(8), 1],
  [CONTENT_IDS.ferment, p(5), 2],
  [CONTENT_IDS.ferment, p(4), 3],
  [CONTENT_IDS.knife, p(1), 1],
  [CONTENT_IDS.knife, p(7), 2],
  [CONTENT_IDS.knife, p(8), 3],
  [CONTENT_IDS.baking, p(2), 1],
  [CONTENT_IDS.baking, p(4), 2],
  [CONTENT_IDS.baking, p(7), 3],
  [CONTENT_IDS.farmTable, p(3), 1],
  [CONTENT_IDS.farmTable, p(6), 2],
  [CONTENT_IDS.farmTable, p(8), 3],
  [CONTENT_IDS.steak, p(1), 1],
  [CONTENT_IDS.steak, p(3), 2],
  [CONTENT_IDS.steak, p(7), 3],
  [CONTENT_IDS.vegan, p(4), 1],
  [CONTENT_IDS.vegan, p(5), 2],
  [CONTENT_IDS.vegan, p(6), 3],
  [CONTENT_IDS.ramen, p(1), 1],
  [CONTENT_IDS.ramen, p(5), 2],
  [CONTENT_IDS.ramen, p(6), 3],
  // fashion content
  [CONTENT_IDS.spring, p(9), 1],
  [CONTENT_IDS.spring, p(11), 2],
  [CONTENT_IDS.spring, p(14), 3],
  [CONTENT_IDS.sustainable, p(9), 1],
  [CONTENT_IDS.sustainable, p(13), 2],
  [CONTENT_IDS.sustainable, p(15), 3],
  [CONTENT_IDS.capsule, p(10), 1],
  [CONTENT_IDS.capsule, p(12), 2],
  [CONTENT_IDS.capsule, p(16), 3],
  [CONTENT_IDS.y2k, p(9), 1],
  [CONTENT_IDS.y2k, p(14), 2],
  [CONTENT_IDS.y2k, p(17), 3],
  [CONTENT_IDS.resale, p(14), 1],
  [CONTENT_IDS.resale, p(15), 2],
  [CONTENT_IDS.resale, p(16), 3],
  [CONTENT_IDS.paris, p(10), 1],
  [CONTENT_IDS.paris, p(12), 2],
  [CONTENT_IDS.paris, p(15), 3],
  [CONTENT_IDS.accessories, p(14), 1],
  [CONTENT_IDS.accessories, p(15), 2],
  [CONTENT_IDS.accessories, p(16), 3],
  [CONTENT_IDS.denim, p(9), 1],
  [CONTENT_IDS.denim, p(17), 2],
  [CONTENT_IDS.denim, p(16), 3],
  [CONTENT_IDS.colorBlock, p(11), 1],
  [CONTENT_IDS.colorBlock, p(13), 2],
  [CONTENT_IDS.colorBlock, p(14), 3],
  [CONTENT_IDS.minimalist, p(10), 1],
  [CONTENT_IDS.minimalist, p(13), 2],
  [CONTENT_IDS.minimalist, p(16), 3],
  // travel content
  [CONTENT_IDS.seAsia, p(18), 1],
  [CONTENT_IDS.seAsia, p(20), 2],
  [CONTENT_IDS.seAsia, p(22), 3],
  [CONTENT_IDS.nyc, p(19), 1],
  [CONTENT_IDS.nyc, p(20), 2],
  [CONTENT_IDS.nyc, p(21), 3],
  [CONTENT_IDS.solo, p(18), 1],
  [CONTENT_IDS.solo, p(22), 2],
  [CONTENT_IDS.solo, p(23), 3],
  [CONTENT_IDS.hiking, p(18), 1],
  [CONTENT_IDS.hiking, p(24), 2],
  [CONTENT_IDS.hiking, p(22), 3],
  [CONTENT_IDS.budget, p(18), 1],
  [CONTENT_IDS.budget, p(19), 2],
  [CONTENT_IDS.budget, p(21), 3],
  [CONTENT_IDS.safari, p(18), 1],
  [CONTENT_IDS.safari, p(20), 2],
  [CONTENT_IDS.safari, p(23), 3],
  [CONTENT_IDS.route66, p(19), 1],
  [CONTENT_IDS.route66, p(21), 2],
  [CONTENT_IDS.route66, p(25), 3],
  [CONTENT_IDS.greece, p(19), 1],
  [CONTENT_IDS.greece, p(20), 2],
  [CONTENT_IDS.greece, p(22), 3],
  [CONTENT_IDS.bali, p(20), 1],
  [CONTENT_IDS.bali, p(21), 2],
  [CONTENT_IDS.bali, p(24), 3],
  [CONTENT_IDS.winter, p(18), 1],
  [CONTENT_IDS.winter, p(20), 2],
  [CONTENT_IDS.winter, p(25), 3],
];

export async function seed(): Promise<void> {
  const { rows } = await pool.query('SELECT COUNT(*) FROM products');
  if (Number(rows[0].count) > 0) {
    console.log('Seed data already present, skipping');
    return;
  }

  for (const product of PRODUCTS) {
    await pool.query('INSERT INTO products (id, name, price, image_url) VALUES ($1, $2, $3, $4)', [
      product.id,
      product.name,
      product.price,
      product.image_url,
    ]);
  }

  for (const [contentId, productId, position] of JUNCTION) {
    await pool.query(
      'INSERT INTO contents_products (content_id, product_id, position) VALUES ($1, $2, $3)',
      [contentId, productId, position],
    );
  }

  console.log(`Seeded ${PRODUCTS.length} products and ${JUNCTION.length} content-product links`);
}

export interface Memory {
  id: string
  src: string
  alt: string
  caption?: string
  date?: string
  story?: string // The story behind this memory
  type: 'image' | 'video'
  videoUrl?: string // For YouTube/external video embeds
}

export interface Category {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  date: string
  memories: Memory[]
  color: string // Accent color for the category
}

export interface MiniCategory {
  id: string
  title: string
  description: string
  memories: Memory[]
}

// Main trip categories
export const categories: Category[] = [
  {
    id: 'whistler',
    slug: 'whistler',
    title: 'Whistler Trip',
    subtitle: 'Mountain Adventures',
    description: 'Hitting the slopes and enjoying the breathtaking mountain views together.',
    coverImage: '/images/whistler/cover.jpg',
    date: '2023',
    color: '#B8D4E3',
    memories: [],
  },
  {
    id: 'whidbey',
    slug: 'whidbey-island',
    title: 'Whidbey Island',
    subtitle: 'Island Getaway',
    description: 'A peaceful escape to the beautiful Whidbey Island.',
    coverImage: '/images/whidbey/cover.jpg',
    date: '2023',
    color: '#C4D4C4',
    memories: [],
  },
  {
    id: 'alaska',
    slug: 'alaska',
    title: 'Alaska',
    subtitle: 'The Last Frontier',
    description: 'Exploring the wild beauty of Alaska together.',
    coverImage: '/images/alaska/cover.jpg',
    date: '2024',
    color: '#D4E8E8',
    memories: [],
  },
  {
    id: 'roadtrip',
    slug: 'roadtrip',
    title: 'Road Trip',
    subtitle: 'Open Road Adventures',
    description: 'Miles of memories, endless conversations, and spontaneous stops along the way.',
    coverImage: '/images/roadtrip/cover.jpg',
    date: '2024',
    color: '#E8D4C4',
    memories: [],
  },
  {
    id: 'europe',
    slug: 'europe',
    title: 'Europe',
    subtitle: 'European Dreams',
    description: 'From Swedish charm to Swiss Alps - our European adventure.',
    coverImage: '/images/europe/cover.jpg',
    date: '2024',
    color: '#D4C4E8',
    memories: [],
  },
]

// Side Adventures - mini categories
export const sideAdventures: MiniCategory[] = [
  {
    id: 'detailing',
    title: 'Detailing',
    description: 'Transforming cars together - our shared love for detailing.',
    memories: [],
  },
  {
    id: 'date-nights',
    title: 'Date Nights',
    description: 'Our favorite restaurants and special evenings out.',
    memories: [],
  },
  {
    id: 'hiking',
    title: 'Hiking Adventures',
    description: 'Trails we have conquered together.',
    memories: [],
  },
  {
    id: 'cooking',
    title: 'Cooking Together',
    description: 'Kitchen experiments and delicious disasters.',
    memories: [],
  },
  {
    id: 'holidays',
    title: 'Holidays',
    description: 'Celebrating special days together.',
    memories: [],
  },
  {
    id: 'pets',
    title: 'Pet Moments',
    description: 'Furry friends and adorable memories.',
    memories: [],
  },
  {
    id: 'random',
    title: 'Random Adventures',
    description: 'The spontaneous moments that make life fun.',
    memories: [],
  },
]

// Hero rotating content for main page
export const heroSlides = [
  {
    id: 1,
    title: 'Whistler',
    subtitle: 'Adventures on the mountain',
    image: '/images/whistler/hero.jpg',
    link: '/trips/whistler',
  },
  {
    id: 2,
    title: 'Whidbey Island',
    subtitle: 'Peaceful island escape',
    image: '/images/whidbey/hero.jpg',
    link: '/trips/whidbey-island',
  },
  {
    id: 3,
    title: 'Alaska',
    subtitle: 'Wild beauty, wilder memories',
    image: '/images/alaska/hero.jpg',
    link: '/trips/alaska',
  },
  {
    id: 4,
    title: 'Road Trip',
    subtitle: 'Open road adventures',
    image: '/images/roadtrip/hero.jpg',
    link: '/trips/roadtrip',
  },
  {
    id: 5,
    title: 'Europe',
    subtitle: 'European Dreams',
    image: '/images/europe/hero.jpg',
    link: '/trips/europe',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug)
}

// Get all memories from all categories with their category info
export function getAllMemoriesWithCategory(): Array<{ memory: Memory; category: Category }> {
  const allMemories: Array<{ memory: Memory; category: Category }> = []

  categories.forEach(category => {
    category.memories.forEach(memory => {
      allMemories.push({ memory, category })
    })
  })

  return allMemories
}

// Get a random memory with its category
export function getRandomMemory(): { memory: Memory; category: Category } | null {
  const allMemories = getAllMemoriesWithCategory()
  if (allMemories.length === 0) return null
  return allMemories[Math.floor(Math.random() * allMemories.length)]
}

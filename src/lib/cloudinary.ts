// Cloudinary configuration
const CLOUD_NAME = 'dlp80acqf'

/**
 * Generate a Cloudinary URL for an image
 * @param publicId - The public ID of the image (folder path + filename without extension)
 * @param options - Optional transformation options
 */
export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: 'auto' | number
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'crop'
    gravity?: 'auto' | 'face' | 'center'
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options

  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (width || height) {
    transformations.push(`c_${crop}`)
    transformations.push(`g_${gravity}`)
  }
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  const transformString = transformations.join(',')

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`
}

/**
 * Generate a Cloudinary video URL
 * @param publicId - The public ID of the video
 */
export function cloudinaryVideoUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: 'auto' | number
    format?: 'auto' | 'mp4' | 'webm'
  } = {}
): string {
  const { width, height, quality = 'auto', format = 'auto' } = options

  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  const transformString = transformations.join(',')

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformString}/${publicId}`
}

/**
 * Get the video thumbnail URL
 */
export function cloudinaryVideoThumbnail(
  publicId: string,
  options: {
    width?: number
    height?: number
  } = {}
): string {
  const { width, height } = options

  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push('c_fill')
  transformations.push('g_auto')
  transformations.push('q_auto')
  transformations.push('f_auto')

  const transformString = transformations.join(',')

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformString}/${publicId}.jpg`
}

// Folder paths matching your Cloudinary structure
export const CLOUDINARY_FOLDERS = {
  alaska: 'Alaska',
  europe: 'Europe',
  roadtrip: 'Roadtrip',
  sideAdventures: {
    atv: 'SIDE ADVENTURES/ATV',
    colorado: 'SIDE ADVENTURES/Colorado',
    enchantments: 'SIDE ADVENTURES/Enchantments',
    formalEvents: 'SIDE ADVENTURES/Formal Events',
    fredAgain: 'SIDE ADVENTURES/Fred Again',
    graduation: 'SIDE ADVENTURES/Graduation',
    homeSeattle: 'SIDE ADVENTURES/Home (Seattle)',
    mexico: 'SIDE ADVENTURES/Mexico',
    odesza: 'SIDE ADVENTURES/Odesza',
    riseFestival: 'SIDE ADVENTURES/Rise Festival',
  },
} as const

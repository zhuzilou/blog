export const calculateReadingTimeWithImages = (markdownContent: string) => {
  // Count the number of words in the markdown content
  const wordCount = markdownContent.split(/\s+/).length

  // Count the number of images in the markdown content
  const imageCount = (markdownContent.match(/!\[(.*?)\]\((.*?)\)/g) || []).length

  // Assume an average reading speed (words per minute)
  const wordsPerMinute = 200

  // Assume additional reading time for each image (seconds per image)
  const secondsPerImage = 8

  // Calculate the reading time in minutes, considering images
  const readingTimeMinutes = wordCount / wordsPerMinute + (imageCount * secondsPerImage) / 60

  // Round up to the nearest integer to represent minutes
  const readingTime = Math.ceil(readingTimeMinutes)

  return readingTime
}

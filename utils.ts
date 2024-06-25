export const buildImgPath = (
  filePath: string,
  fileSize: string = 'original'
) => {
  const baseUrl = 'https://image.tmdb.org/t/p/'
  return `${baseUrl}${fileSize}${filePath}`
}

export const formatFileNameTooltipText = (fileName: string) => {
  const firstPart = fileName.slice(0, 10);
  const extensionIndex = fileName.lastIndexOf('.');
  const secondPart = fileName.slice(extensionIndex - 5, extensionIndex)
  const extension = fileName.slice(extensionIndex, fileName.length)
  return `${firstPart}...${secondPart}${extension}`;
}
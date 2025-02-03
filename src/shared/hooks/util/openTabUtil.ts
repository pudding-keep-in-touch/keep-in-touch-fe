export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener, popup')
  if (newWindow) newWindow.opener = null
}

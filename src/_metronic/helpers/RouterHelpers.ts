export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }


  // Check if the current URL matches the provided URL or its subpaths
  const regex = new RegExp(`^${url}(\/(add|edit\/\\d+))?$`);
  return regex.test(current);


}

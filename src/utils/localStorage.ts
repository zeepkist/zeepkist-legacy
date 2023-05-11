export const getStorage = <T>(key: string) => {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(atob(value)) as T
  }
  return
}

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, btoa(JSON.stringify(value)))
}

export const removeStorage = (key: string) => {
  localStorage.removeItem(key)
}

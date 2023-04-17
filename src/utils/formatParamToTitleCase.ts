const toTitleCase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

// eslint-disable-next-line unicorn/prevent-abbreviations
export const formatParamToTitleCase = (string: string) =>
  toTitleCase(string.replace('-', ' '))

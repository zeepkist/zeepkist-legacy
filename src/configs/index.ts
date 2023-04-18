export const IS_PROD = import.meta.env.PROD
export const IS_DEV = import.meta.env.DEV

export const ZEEPKIST_APP_ID = '1440670'

// https://steamwebapi.azurewebsites.net/
export const STEAM_API_URL = 'https://api.steampowered.com/'

// https://developer.valvesoftware.com/wiki/Steam_browser_protocol
// https://steamcommunity.com/workshop/filedetails/?id=
export const STEAM_OPEN_WORKSHOP_URL =
  'steam://openurl/https://steamcommunity.com/workshop/filedetails/?id='
export const STEAM_OPEN_NEWS_URL = `steam://appnews/${ZEEPKIST_APP_ID}`
export const STEAM_OPEN_ADD_FRIEND_URL = `steam://friends/add/` // + steamId
export const STEAM_OPEN_INSTALL_URL = `steam://install/${ZEEPKIST_APP_ID}`
export const STEAM_OPEN_PLAY_URL = `steam://run/${ZEEPKIST_APP_ID}`
export const STEAM_OPEN_STORE_URL = `steam://store/${ZEEPKIST_APP_ID}`
export const STEAM_OPEN_HUB_URL = `steam://url/GameHub/${ZEEPKIST_APP_ID}`

export const STEAM_WORKSHOP_URL =
  'https://steamcommunity.com/sharedfiles/filedetails/?id='

export const META_TITLE = '・Zeepkist Records'

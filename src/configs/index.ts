export const IS_PROD = import.meta.env.PROD
export const IS_DEV = import.meta.env.DEV

export const ZEEPKIST_APP_ID = '1440670'

// https://steamwebapi.azurewebsites.net/
export const STEAM_API_URL = 'https://api.steampowered.com/'

// https://developer.valvesoftware.com/wiki/Steam_browser_protocol
// https://steamcommunity.com/workshop/filedetails/?id=
export const WORKSHOP_URL =
  'steam://openurl/https://steamcommunity.com/workshop/filedetails/?id='
export const NEWS_URL = `steam://appnews/${ZEEPKIST_APP_ID}`
export const ADD_FRIEND_URL = `steam://friends/add/` // + steamId
export const INSTALL_URL = `steam://install/${ZEEPKIST_APP_ID}`
export const PLAY_URL = `steam://run/${ZEEPKIST_APP_ID}`
export const STORE_URL = `steam://store/${ZEEPKIST_APP_ID}`
export const HUB_URL = `steam://url/GameHub/${ZEEPKIST_APP_ID}`

export const META_TITLE = '・Zeepkist Records'

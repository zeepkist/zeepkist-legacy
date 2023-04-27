import { writeFile } from 'node:fs/promises'

import { getLevels, getUsers } from '@zeepkist/gtr-api'

const userList = []
const levelList = []
const workshopList = new Set()

let userPage = 0
let levelPage = 0

let hasMoreUsers = true
let hasMoreLevels = true

const fetchUsers = async () => {
  const data = await getUsers({
    Limit: 100,
    Offset: userPage * 100
  })

  if (data.users.length < 100) {
    hasMoreUsers = false
  } else {
    userPage++
  }

  console.log(
    `Fetched ${data.users.length} users (page ${userPage}/${Math.ceil(
      data.totalAmount / 100
    )})`
  )

  return data.users.map(user => `/user/${user.steamId}`)
}

const fetchLevels = async () => {
  const data = await getLevels({
    Limit: 100,
    Offset: levelPage * 100
  })

  if (data.levels.length < 100) {
    hasMoreLevels = false
  } else {
    levelPage++
  }

  console.log(
    `Fetched ${data.levels.length} levels (page ${levelPage}/${Math.ceil(
      data.totalAmount / 100
    )})`
  )

  return {
    levels: data.levels.map(level => `/level/${level.id}`),
    workshopItems: data.levels.map(item => `/workshop/${item.workshopId}`)
  }
}

do {
  userList.push(...(await fetchUsers()))
} while (hasMoreUsers)

do {
  const { levels, workshopItems } = await fetchLevels()

  levelList.push(...levels)
  for (const item of workshopItems) workshopList.add(item)
} while (hasMoreLevels)

await writeFile(
  'scripts/urls.txt',
  [...userList, ...levelList, ...workshopList].join('\n')
)

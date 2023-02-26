const removeBadTasteTeams = (input: string) =>
  ['CTR SUCKS'].includes(input) ? undefined : input

export const formatUser = (input: string, team?: string) => {
  if (team) return { username: input, team }
  if (!input.startsWith('[')) return { username: input }

  const [rawTeam, ...rawUsername] = input.split(']')
  const formattedUsername = rawUsername.join(']').trim()
  const formattedTeam = removeBadTasteTeams(rawTeam.slice(1))

  if (!formattedUsername) return { username: input }
  if (!formattedTeam) return { username: formattedUsername }

  return { team: formattedTeam, username: formattedUsername }
}

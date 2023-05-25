export const formatOrdinal = (number: number) => {
  const ordinals = ['th', 'st', 'nd', 'rd']
  const modulo = number % 100
  return (
    number + (ordinals[(modulo - 20) % 10] || ordinals[modulo] || ordinals[0])
  )
}

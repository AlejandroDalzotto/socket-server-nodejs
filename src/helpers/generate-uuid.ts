export const generateUuid = (): `${string}-${string}-${string}-${string}-${string}` => {
  const newUuid = crypto.randomUUID()

  return newUuid
}

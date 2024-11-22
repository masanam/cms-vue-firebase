// export type UserRole = 'ADMIN' | 'USER' | 'OWNER'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type Frontpage = {
  id: number,
  image: string,
  title: string,
  subTitle: string,
  content: string,
  placeholder: string,
  button: string
}

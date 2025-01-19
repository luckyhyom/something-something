export type User = {
  id: number,
  name: string,
  age: number,
}

export type UserData = {
  Variables: User
}

export type UsersData = {
  Variables: {
    users: User[]
  }
}

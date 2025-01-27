import { z } from "zod";
import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { User, UserData, UsersData  } from './users.d'

type Bindings = {
  MY_PASSWORD: string
}

const db: User[] = [
  {
    id: 1,
    name: 'Hono',
    age: 3,
  },
  {
    id: 2,
    name: 'Bun',
    age: 5,
  },
]

// 정의한 데이터와 동일한 포맷인지 검사한다.
const schema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
})

type A = UsersData & Bindings;


export const findUsers = createFactory<UsersData & { Bindings: Bindings }>().createMiddleware(async (c, next) => {
  const users = await db.map(user => schema.parse(user))
  users.push({
    id: users.length + 1,
    name: c.env.MY_PASSWORD,
    age: users.length + 1,
  })

  c.set('users', users)
  await next()
})

export const findById = createFactory<UserData>().createMiddleware(async (c, next) => {
  const id = c.req.param('id')
  const user = db.find(user => schema.parse(user).id == parseInt(id))
  if(!user) throw new HTTPException(404, { message: 'User Not Found' })
  c.set('id', user.id)
  c.set('name', user.name)
  c.set('age', user.age)
  await next()
})
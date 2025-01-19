import { Hono } from 'hono'
import { z } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import * as userRepo from '../db/users'

const schema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
})

const userValidator = zValidator('json', schema, (result, c) => {
  if(!result.success) throw new HTTPException(400, { message: 'invalid json' })
})

const users = new Hono()

users.get('/', userRepo.findUsers, (c) => {
  return c.json({
    users: c.var.users,
  })
})

// TODO: findById에서 id를 타입추론할 수 있도록
users.get('/:id', userRepo.findById, (c) => {
  return c.json({
    id: c.var.id,
    name: c.var.name,
    age: c.var.age
  })
})

// TODO: userRepo.insertUser
users.post('/', userValidator, (c) => {
  const data = c.req.valid('json')
  return c.json({
    name: data.name,
    age: data.age,
  }, 201)
})

export default users

import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

const app = new Hono()

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret2',
  })
)


app.get('/', (c) => {
  //return c.text('Hello Hono!')
  return new Response('Good morning!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

// :id가 타입으로 되는게 좋다. 어떻게 가능한거지?
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)

export default app

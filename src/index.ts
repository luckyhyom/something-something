import { Hono } from 'hono'
import users from './controllers/users'
import books from './controllers/books'

const app = new Hono()

app.route('/users', users)
app.route('/books', books)

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text(err.message, 500)
})

export default app

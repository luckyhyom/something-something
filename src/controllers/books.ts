import { Hono } from "hono";

const books = new Hono()
books.get('/', (c) => c.text('books'))
books.get('/:id', (c) => c.text(`book ${c.req.param('id')}`))

export default books

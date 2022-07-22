/** @jsx jsx */
import { serve } from 'https://deno.land/std/http/server.ts'
import { Hono } from 'https://deno.land/x/hono/mod.ts'
import { jsx, memo } from 'https://deno.land/x/hono/middleware.ts'

const app = new Hono()
app.get('/hello', (c) => c.text('Hello! Hono!'))

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)

const Layout = (props: { children?: string }) => {
  return (
    <html>
      <body>
        <Header />
        <div>
          {props.children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

const Top = (props: { messages: string[] }) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

// app.get('/foo', (c) => {
//   const inner = { __html: 'JSX &middot; SSR' }
//   const Div = <div dangerouslySetInnerHTML={inner} />
// })

serve(app.fetch)

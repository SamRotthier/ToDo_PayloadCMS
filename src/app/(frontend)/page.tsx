import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <h1>Payload To Do List {user?.email}</h1>
      <div className='todos'>
        <h2>Todos</h2>
        <Link href="/todo-create">
          <button
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 10,
              marginBottom: 16,
            }}
          >
            Create Todo
          </button>
        </Link>
        {todos.docs.map((todo) =>(
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{textDecoration: 'none'}}>
              <div style={{ border: '1px solid #ccc', padding: '10px', margin:'10px'}}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
                <p>{todo.createdAt}</p>
                <p>{todo.updatedAt}</p>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

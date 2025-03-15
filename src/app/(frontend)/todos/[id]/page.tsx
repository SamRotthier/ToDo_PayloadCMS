import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'

export default async function TodoPage({ params }: { params: {id : string } }){
    //return <div>Todo {params.id}</div>

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const todoId = params.id
    const todo_ = await payload.findByID({
        collection: 'todos',
        id: todoId,
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/todos/${todoId}`)
      const todo = await response.json()
      console.log(todo)
    //return <div>Todo {todo.title}</div>    
    return(
        <div>
        <h1>Todo {todo.title}</h1>
        <p>{todo.description}</p>
        <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
        <p>{todo.createdAt}</p>
        <p>{todo.updatedAt}</p>
        <Image
        src={(todo.media as Media).url!}
        alt={(todo.media as Media).alt?? ''}
        width={(todo.media as Media).width??0}
        height={(todo.media as Media).height??0}
        />
      </div>
    )
}
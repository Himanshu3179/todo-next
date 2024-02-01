import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
  return (
    // <main className='h-screen flex justify-center items-center'>
    //   <Link href={'/todos'}>
    //     <Button size={"3"}>Todos</Button>
    //   </Link>
    // </main>
    redirect('/todos')
  )
}

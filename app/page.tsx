import { Button } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className=''>
      <Link href={'/todos'}>
        <Button>Todos</Button>
      </Link>
    </main>
  )
}

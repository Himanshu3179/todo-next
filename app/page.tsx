import { Button } from '@radix-ui/themes'
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

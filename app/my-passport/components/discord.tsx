'use client'
import { Button } from '@/components/ui/button'
import { FaDiscord } from 'react-icons/fa6'

export default function Discord() {
  return (
    <>
      <div className='flex items-center gap-4'>
        <Button disabled size='lg' className='w-full bg-[#7289da] hover:bg-[#4e5d94] text-white'>
          <FaDiscord /> Discord is coming soon
        </Button>
      </div>
    </>
  )
}

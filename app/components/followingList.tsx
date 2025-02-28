'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CopyIcon, ShieldAlert, Verified, Wallet } from 'lucide-react'
import Link from 'next/link'
import { BsGithub, BsTwitterX } from 'react-icons/bs'
export default function FollowingList() {
  const data = [
    {
      name: 'John Doe',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      github: 'imhson',
      id: 1,
    },
    {
      name: 'Jame Bone',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      id: 2,
      github: 'imhson',
    },
    {
      name: 'John Doe',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      github: 'imhson',
      id: 1,
    },
    {
      name: 'Jame Bone',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      id: 2,
      github: 'imhson',
    },
    {
      name: 'John Doe',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      github: 'imhson',
      id: 1,
    },
    {
      name: 'Jame Bone',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      id: 2,
      github: 'imhson',
    },
    {
      name: 'John Doe',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      github: 'imhson',
      id: 1,
    },
    {
      name: 'Jame Bone',
      image: 'https://github.com/shadcn.png',
      wallet: '0x1234...5678',
      verified: true,
      x: '@Hoang_son_pham',
      id: 2,
      github: 'imhson',
    },
  ]
  return (
    <div className='divide-y mt-10 w-full'>
      <div className='grid grid-cols-3 gap-5'>
        {data.map((item, index) => (
          <Link
            href={`/passport/${item.id}`}
            key={index}
            className='flex items-start p-5 gap-5 w-full min-w-0 bg-white/5 rounded-2xl'>
            <Avatar className='w-32 h-32'>
              <AvatarImage src={item.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='w-full justify-between items-start flex'>
              <div className='flex w-full min-w-0 divide-x'>
                <div className=' space-y-2 text-muted-foreground'>
                  <p className='font-semibold text-white text-xl flex items-center gap-3'>
                    {item.name} <Verified className='text-blue-400 w-5 h-5' />
                  </p>
                  <div className='text-sm flex items-center gap-2'>
                    <ShieldAlert className='text-orange-400 h-4 w-4' />
                    Last update: 10 minutes ago
                  </div>
                  <p className='text-sm flex items-center gap-2'>
                    <Wallet className='h-4 w-4' />
                    {item.wallet}{' '}
                    <span>
                      <CopyIcon
                        className='w-4 h-4 cursor-copy'
                        onClick={(event) => {
                          navigator.clipboard.writeText(item.wallet)
                          event.preventDefault()
                        }}
                      />
                    </span>
                  </p>
                  <p className='text-sm flex items-center gap-2'>
                    <BsTwitterX />
                    {item.x}
                  </p>
                  <p className='text-sm text-muted-foreground flex items-center gap-2'>
                    <BsGithub />
                    {item.github}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

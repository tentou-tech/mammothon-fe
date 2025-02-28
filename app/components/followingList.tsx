'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageCircle, SendIcon, ShieldAlertIcon, ShieldCheckIcon, User2, Verified } from 'lucide-react'
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
    <div className='divide-y w-full'>
      <div className='divide-y'>
        {data.map((item, index) => (
          <Link href={`/passport/${item.id}`} key={index} className='flex items-start py-5 gap-5'>
            <Avatar className='w-14 h-14'>
              <AvatarImage src={item.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex items-center justify-between w-full'>
              <div className='flex w-full min-w-0 divide-x'>
                <div className=' space-y-1 text-muted-foreground pr-10'>
                  <p className='font-semibold text-white text-xl flex items-center gap-3'>
                    {item.name} <Verified className='text-blue-400 w-5 h-5' />
                  </p>
                  <div className='text-sm flex items-center gap-1'>
                    <ShieldCheckIcon className='text-green-400 h-4 w-4' />
                    Account created: 10 months ago
                  </div>
                </div>
                <div className=' space-y-1 text-muted-foreground px-10'>
                  <p className='font-semibold text-white flex items-center gap-1'>
                    <BsTwitterX /> {item.x}
                  </p>
                  <div className='text-sm flex items-center gap-1'>
                    <ShieldCheckIcon className='text-green-400 h-4 w-4' />
                    Last updated: 9 months ago
                  </div>
                </div>
                <div className=' space-y-1 text-muted-foreground px-10'>
                  <p className='font-semibold text-white flex items-center gap-1'>
                    <BsGithub /> {item.github}
                  </p>
                  <div className='text-sm flex items-center gap-1'>
                    <ShieldAlertIcon className='text-orange-400 h-4 w-4' />
                    Last updated: 12 minutes ago
                  </div>
                </div>
                <div className='px-10 text-xs'>
                  <div>View: 182,355</div>
                  <div>Follower: 28,755</div>
                  <div>Following: 2,354</div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='secondary' className='w-24'>
                  <User2 />
                  Follow
                </Button>
                <Button variant='secondary' className='w-24'>
                  <SendIcon /> Transfer
                </Button>
                <Button className='w-24'>
                  <MessageCircle /> Chat
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

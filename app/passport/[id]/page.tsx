'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageCircle, SendIcon, VerifiedIcon, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Script from 'next/script'
import GitHubCalendar from 'react-github-calendar'
import { BsGithub, BsTwitterX } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { useIsClient } from 'usehooks-ts'
import { LuUserRoundCheck } from 'react-icons/lu'
export default function Passport() {
  const params = useParams()
  const isClient = useIsClient()
  const id = params.id
  return (
    <>
      <Link href='/' className='absolute top-10 left-10'>
        <h1 className='text-3xl font-bold flex items-center gap-1.5'>
          <IoIosArrowBack /> Back
        </h1>
      </Link>
      <div className='flex items-center flex-col w-full gap-10 max-w-screen-lg mx-auto relative'>
        <div className='flex flex-col gap-4 items-center'>
          <Avatar className='w-40 h-40'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='text-4xl font-semibold flex items-center gap-3'>
            Sunday <VerifiedIcon className='text-blue-400 w-7 h-7' />
          </div>
          <div className='flex items-center gap-3'>
            <Wallet />
            0x1234...5678
          </div>
          <div className='flex items-center gap-3'>
            <BsTwitterX />
            @Hoang_son_pham
          </div>
          <div className='flex items-center gap-3'>
            <BsGithub />
            imhson
          </div>
          <div className='flex items-center gap-3'>
            <Button size='lg' variant='secondary'>
              <LuUserRoundCheck /> Following
            </Button>
            <Button size='lg' variant='outline'>
              <SendIcon /> Transfer
            </Button>
            <Button size='lg'>
              <MessageCircle /> Chat
            </Button>
          </div>
        </div>
        <div className='text-muted-foreground self-start'>
          <div className='font-medium text-white'>Last Activity</div>
          <div className='max-h-[300px] overflow-auto text-sm mt-1'>
            <ul className='list-disc list-inside'>
              <li>04:33 19/02/2025 - Update Github Account (imhson)</li>
              <li>15:12 17/02/2025 - Link Github Account (imhson)</li>
              <li>14:12 17/02/2025 - Link X Account (Hoang_son_pham)</li>
              <li>10:12 16/02/2025 - Create Account (Sunday)</li>
            </ul>
          </div>
        </div>
        <div className='self-start'>
          <div className='font-medium text-white'>Sunday&rsquo;s contribution</div>
          <div className='mt-5 [&>*]:!w-full'>
            <GitHubCalendar username={'imhson'} />
          </div>
        </div>
        <div className='w-full mt-10'>
          <div className='font-medium text-white'>{`Sunday's twitter`}</div>
          {isClient && (
            <div className='w-full mt-5'>
              <a
                className='twitter-timeline !bg-black'
                data-theme='dark'
                data-tweet-limit='1'
                href={`https://twitter.com/${'Hoang_son_pham'}?ref_src=twsrc%5Etfw`}>
                Tweets by @Hoang_son_pham
              </a>{' '}
              <Script async src='https://platform.twitter.com/widgets.js'></Script>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

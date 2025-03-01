'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getAccountByWalletAddress } from '@/services'
import { MessageCircle, SendIcon, VerifiedIcon, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Script from 'next/script'
import { AvatarGenerator } from 'random-avatar-generator'
import { useEffect, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { BsGithub, BsTwitterX } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { LuUserRoundCheck } from 'react-icons/lu'
import { useIsClient } from 'usehooks-ts'
const generator = new AvatarGenerator()

export default function Passport() {
  const params = useParams()
  const isClient = useIsClient()
  const [account, setAccount] = useState<any>(null)
  const id = params.id
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const data = await getAccountByWalletAddress(id as string)
    setAccount(data)
  }
  if (!account) return null
  let datas = []
  let xUsername = null
  let githubUsername = null
  let info = null
  if (account) {
    datas = account.data.map((d: string) => JSON.parse(d))
    const xData = datas.findLast((d: any) => d.provider == 'x')
    const githubData = datas.findLast((d: any) => d.provider == 'github')
    info = datas.findLast((d: any) => d.provider == 'main-info')
    xUsername = xData ? JSON.parse(xData.proofs.claimData.context).extractedParameters.screen_name : null
    githubUsername = githubData ? JSON.parse(githubData.proofs.claimData.context).extractedParameters.username : null
  }
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
            <AvatarImage src={generator.generateRandomAvatar(account.id)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='text-4xl font-semibold flex items-center gap-3'>
            {info.name} <VerifiedIcon className='text-blue-400 w-7 h-7' />
          </div>
          <div className='flex items-center gap-3'>
            <Wallet />
            {account.id}
          </div>
          <div className='flex items-center gap-3'>
            <BsTwitterX />@{xUsername}
          </div>
          <div className='flex items-center gap-3'>
            <BsGithub />
            {githubUsername}
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
              <li>04:33 19/02/2025 - Update Github Account ({githubUsername})</li>
              <li>15:12 17/02/2025 - Link Github Account ({githubUsername})</li>
              <li>14:12 17/02/2025 - Link X Account ({xUsername})</li>
              <li>10:12 16/02/2025 - Create Account ({account.id})</li>
            </ul>
          </div>
        </div>
        {githubUsername && (
          <div className='self-start'>
            <div className='font-medium text-white'>{info.name}&rsquo;s contribution</div>
            <div className='mt-5 [&>*]:!w-full'>
              <GitHubCalendar username={githubUsername} />
            </div>
          </div>
        )}
        {xUsername && (
          <div className='w-full mt-10'>
            <div className='font-medium text-white'>{`${info.name}'s twitter`}</div>
            {isClient && (
              <div className='w-full mt-5'>
                <a
                  className='twitter-timeline !bg-black'
                  data-theme='dark'
                  data-tweet-limit='1'
                  href={`https://twitter.com/${xUsername}?ref_src=twsrc%5Etfw`}>
                  Tweets by @{xUsername}
                </a>{' '}
                <Script async src='https://platform.twitter.com/widgets.js'></Script>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

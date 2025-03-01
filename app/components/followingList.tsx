'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageCircle, SendIcon, ShieldAlertIcon, ShieldCheckIcon, User2, Verified } from 'lucide-react'
import Link from 'next/link'
import { BsGithub, BsTwitterX } from 'react-icons/bs'
import { AvatarGenerator } from 'random-avatar-generator'
import { useEffect, useState } from 'react'
import { getAccounts } from '@/services'
import { shorten } from '@/lib/utils'
import moment from 'moment'
const generator = new AvatarGenerator()
export default function FollowingList() {
  const [accounts, setAccounts] = useState<any[]>([])
  const getList = async () => {
    const data = await getAccounts()
    setAccounts(data.accounts)
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <div className='divide-y w-full'>
      <div className='divide-y'>
        {accounts.map((account, index) => {
          if (!(account.id as string).startsWith('celestia')) return null
          const datas = account.data.map((d: string) => JSON.parse(d))
          const info = datas.findLast((d: any) => d.provider == 'main-info')
          const xData = datas.findLast((d: any) => d.provider == 'x')
          const xUsername = xData ? JSON.parse(xData.proofs.claimData.context).extractedParameters.screen_name : null
          const githubData = datas.findLast((d: any) => d.provider == 'github')
          const githubUsername = githubData
            ? JSON.parse(githubData.proofs.claimData.context).extractedParameters.username
            : null
          return (
            <div key={index} className='flex accounts-start py-5 gap-5'>
              <Avatar className='w-14 h-14'>
                <AvatarImage src={generator.generateRandomAvatar(account.id)} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex items-center justify-between w-full'>
                <div className='flex w-full min-w-0 divide-x'>
                  <Link href={`/passport/${account.id}`} className=' space-y-1 text-muted-foreground pr-10'>
                    <p className='font-semibold text-white text-xl flex items-center gap-3'>
                      {info.name || shorten(account.id)} <Verified className='text-blue-400 w-5 h-5' />
                    </p>
                    <div className='text-sm flex items-center gap-1'>
                      <ShieldCheckIcon className='text-green-400 h-4 w-4 shrink-0' />
                      {`Account created: ${Math.floor(Math.random() * (12 - 4 + 1)) + 4} months ago`}
                    </div>
                  </Link>
                  {xUsername && (
                    <div className=' space-y-1 text-muted-foreground px-10'>
                      <Link
                        href={`https://twitter.com/${xUsername}`}
                        target='_blank'
                        className='font-semibold text-white flex items-center gap-1'>
                        <BsTwitterX /> @{xUsername}
                      </Link>
                      <div className='text-sm flex items-center gap-1'>
                        {moment(xData.updatedAt).isAfter(moment().subtract(7, 'days')) ? (
                          <ShieldAlertIcon className='text-orange-400 h-4 w-4 shrink-0' />
                        ) : (
                          <ShieldCheckIcon className='text-green-400 h-4 w-4 shrink-0' />
                        )}
                        {`Last updated: ${moment(xData.updatedAt).fromNow()}`}
                      </div>
                    </div>
                  )}
                  {githubUsername && (
                    <div className=' space-y-1 text-muted-foreground px-10'>
                      <p className='font-semibold text-white flex items-center gap-1'>
                        <BsGithub /> {githubUsername}
                      </p>
                      <div className='text-sm flex items-center gap-1'>
                        {moment(xData.updatedAt).isAfter(moment().subtract(7, 'days')) ? (
                          <ShieldAlertIcon className='text-orange-400 h-4 w-4 shrink-0' />
                        ) : (
                          <ShieldCheckIcon className='text-green-400 h-4 w-4 shrink-0' />
                        )}
                        {`Last updated: ${moment(githubData.updatedAt).fromNow()}`}
                      </div>
                    </div>
                  )}
                  <div className='px-10 text-xs'>
                    <div>{`View: ${(
                      Math.floor(Math.random() * (500000 - 100000 + 1)) + 100000
                    ).toLocaleString()}`}</div>
                    <div>{`Follower: ${(
                      Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000
                    ).toLocaleString()}`}</div>
                    <div>{`Following: ${(Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000).toLocaleString()}`}</div>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

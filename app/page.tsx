'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Context } from '@/context'
import { Edit, Plus, Verified, Wallet } from 'lucide-react'
import Link from 'next/link'
import { AvatarGenerator } from 'random-avatar-generator'
import { useContext } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import FollowingList from './components/followingList'
import { shorten } from '@/lib/utils'

const generator = new AvatarGenerator()
export default function Home() {
  const { key, account, connectKeplr } = useContext(Context)
  const datas = account.data.map((d: string) => JSON.parse(d))
  const info = datas.findLast((d: any) => d.provider == 'main-info')
  return (
    <div>
      {account ? (
        <div className='flex gap-5'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src={generator.generateRandomAvatar('imhson')} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <div className='font-semibold text-xl flex items-center gap-2'>
              {info.name || shorten(account.id)}
              <div className='flex text-xs text-blue-400 rounded-full border border-dashed px-2 border-blue-400 w-fit py-1 items-center gap-1'>
                <Verified className='w-4 h-4' /> Verified
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Button size='sm' variant='secondary'>
                <BsThreeDots /> Detail
              </Button>
              <Link href='/my-passport'>
                <Button size='sm'>
                  <Edit /> Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : key?.bech32Address ? (
        <div className=''>
          <div className='flex gap-2 items-center mb-2'>
            <Wallet className='w-5 h-5' />
            {key?.bech32Address}
          </div>
          <Link href='/my-passport'>
            <Button>
              <Plus /> Create new account
            </Button>
          </Link>
        </div>
      ) : (
        <Button onClick={connectKeplr}>Connect wallet</Button>
      )}
      <div className='h-full w-full mt-10'>
        <Tabs defaultValue='following'>
          <TabsList className=''>
            <TabsTrigger value='following' className=''>
              Following
            </TabsTrigger>
            <TabsTrigger value='for-you' className=''>
              For You
            </TabsTrigger>
          </TabsList>
          <TabsContent value='following'>
            <FollowingList />
          </TabsContent>
          <TabsContent value='for-you'>Coming soon</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

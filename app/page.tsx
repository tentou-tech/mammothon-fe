import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import FollowingList from './components/followingList'

export default function Home() {
  return (
    <div>
      <Link href='my-passport' className='absolute top-10 right-14'>
        <Avatar className='w-20 h-20'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className='h-full w-full'>
        <Tabs defaultValue='following'>
          <TabsList className='h-auto p-2'>
            <TabsTrigger value='following' className='text-xl !px-10'>
              Following
            </TabsTrigger>
            <TabsTrigger value='for-you' className='text-xl !px-10'>
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

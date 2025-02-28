import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit, Verified } from 'lucide-react'
import { BsThreeDots } from 'react-icons/bs'
import FollowingList from './components/followingList'

export default function Home() {
  return (
    <div>
      <div className='flex gap-5'>
        <Avatar className='w-20 h-20'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='space-y-2'>
          <div className='font-semibold text-xl'>
            Sunday<span className='ml-2 text-sm text-muted-foreground'>@Hoang_son_pham</span>
          </div>
          <div className='flex text-xs text-blue-400 rounded-full border border-dashed px-2 border-blue-400 w-fit py-1 items-center gap-1'>
            <Verified className='w-4 h-4' /> Verified
          </div>
          <div className='flex items-center gap-2'>
            <Button size='sm' variant='secondary'>
              <BsThreeDots /> Detail
            </Button>
            <Button size='sm'>
              <Edit /> Edit Profile
            </Button>
          </div>
        </div>
      </div>
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

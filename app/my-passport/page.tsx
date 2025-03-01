'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Context } from '@/context'
import { delay, shorten } from '@/lib/utils'
import { addData, requestAccountCreation, sendAccountCreation } from '@/services'
import { Loader2, SaveIcon, Unlink, VerifiedIcon, Wallet } from 'lucide-react'
import Link from 'next/link'
import { AvatarGenerator } from 'random-avatar-generator'
import { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import Discord from './components/discord'
import Github from './components/github'
import X from './components/x'
import { BsGithub, BsTwitterX } from 'react-icons/bs'

const generator = new AvatarGenerator()
export default function MyPassport() {
  const { key, keplr, setKeplr, setKey, connectKeplr, getAccount, account } = useContext(Context)
  const address = key?.bech32Address
  const [name, setName] = useState('')
  const [nameChanged, setNameChanged] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState([])
  const [loading, setLoading] = useState(false)
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
  const saveHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      if (!keplr || !key) return
      if (!account) {
        const verifying_key = Buffer.from(key.pubKey).toString('base64')
        const bytes = await requestAccountCreation(address, verifying_key)
        const cosmosKey = await keplr.getKey('cosmoshub-4')
        const signature = await keplr.signArbitrary('cosmoshub-4', cosmosKey.bech32Address, bytes.payload)
        await sendAccountCreation(address, verifying_key, signature.signature)
        await delay(5000)
      }
      if (nameChanged) {
        await addData(
          address,
          JSON.stringify({
            provider: 'main-info',
            name,
            updatedAt: new Date().toISOString(),
          }),
          ''
        )
        setNameChanged(false)
      }
      await Promise.all(
        unsavedChanges.map(async (change: any) => {
          await addData(address, JSON.stringify(change), '')
        })
      )
      await getAccount()
      setLoading(false)
      setUnsavedChanges([])
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  useEffect(() => {
    if (info) {
      setName(info.name)
    } else {
      if (address) {
        setName(shorten(address))
      }
    }
  }, [address, info])
  if (!address) {
    return (
      <div className='space-y-5'>
        <Link href='/'>
          <h1 className='text-3xl font-bold flex items-center gap-1.5'>
            <IoIosArrowBack /> My Passport
          </h1>
        </Link>
        <div className='flex items-center justify-center'>
          <Button onClick={connectKeplr}>Connect wallet</Button>
        </div>
      </div>
    )
  }
  return (
    <div className='space-y-5'>
      <Link href='/'>
        <h1 className='text-3xl font-bold flex items-center gap-1.5'>
          <IoIosArrowBack /> My Passport
        </h1>
      </Link>
      <div className='flex flex-col-reverse 2xl:flex-row justify-between gap-10'>
        <div className='space-y-10 text-xl 2xl:w-1/2 2xl:max-w-xl'>
          <div className='grid grid-cols-[200px_1fr] gap-x-5 gap-y-10 items-center'>
            <div className='text-zinc-400'>Display Name</div>
            <div>
              <Input
                className='!text-xl !h-14'
                value={name}
                onChange={(e) => {
                  setNameChanged(true)
                  setName(e.target.value)
                }}
              />
            </div>
            <div className='text-zinc-400'>Wallet Address</div>
            {key?.bech32Address ? (
              <div className='flex items-center gap-3'>
                <span>{key?.bech32Address}</span>
                <Button
                  size='lg'
                  variant='destructive'
                  onClick={() => {
                    setKey(null)
                    setKeplr(null)
                    setUnsavedChanges([])
                    setNameChanged(false)
                  }}>
                  <Unlink /> Disconnect
                </Button>
              </div>
            ) : (
              <Button size='lg' onClick={connectKeplr}>
                <Wallet /> Connect Wallet
              </Button>
            )}
            <div className='text-zinc-400'>X (Formaly Twitter)</div>
            <X unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
            <div className='text-zinc-400'>Github</div>
            <Github unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
            <div className='text-zinc-400'>Discord</div>
            <Discord />
          </div>
          <div className='flex items-center gap-4'>
            <Button
              disabled={loading || !keplr}
              size='lg'
              className='bg-green-500 hover:bg-green-400'
              onClick={saveHandler}>
              {loading ? <Loader2 className='animate-spin' /> : <SaveIcon />} Save
            </Button>
            {unsavedChanges.length > 0 && (
              <div className='text-red-600 text-sm'>Careful - you have unsaved changes!</div>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center justify-start 2xl:w-1/2 gap-5'>
          <Avatar className='w-48 h-48'>
            <AvatarImage src={generator.generateRandomAvatar(address)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {info?.name && (
            <div className='flex items-center gap-3'>
              <div className='text-2xl font-semibold'>{info.name}</div>
              <VerifiedIcon className='text-blue-400' />
            </div>
          )}
          <div className='text-lg font-semibold flex gap-4 items-center'>
            <Wallet />
            {address}
          </div>
          {xUsername && (
            <div className='text-lg font-semibold flex gap-4 items-center'>
              <BsTwitterX />@{xUsername}
            </div>
          )}
          {githubUsername && (
            <div className='text-lg font-semibold flex gap-4 items-center'>
              <BsGithub />
              {githubUsername}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

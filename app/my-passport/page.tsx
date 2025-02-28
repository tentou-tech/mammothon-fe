'use client'

import { Button } from '@/components/ui/button'
import { Keplr } from '@keplr-wallet/provider-extension'
import { Loader2, SaveIcon, Unlink, VerifiedIcon, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import Discord from './components/discord'
import Github from './components/github'
import X from './components/x'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const CHAIN_ID = 'mocha-4'
export default function MyPassport() {
  const [account, setAccount] = useState<any>()
  const [unsavedChanges, setUnsavedChanges] = useState([])
  const address = account?.bech32Address
  const [loading, setLoading] = useState(false)
  const [keplr, setKeplr] = useState<Keplr | undefined>()
  const getKeplrFromProvider = async () => {
    try {
      const keplrProvider = await Keplr.getKeplr()
      if (!keplrProvider) return
      setKeplr(keplrProvider)
      await keplrProvider.experimentalSuggestChain({
        chainId: CHAIN_ID,
        chainName: 'Celestia Mocha Testnet',
        rpc: 'https://rpc-mocha.pops.one',
        rest: 'https://api-mocha.pops.one',
        bip44: {
          coinType: 118,
        },
        bech32Config: {
          bech32PrefixAccAddr: 'celestia',
          bech32PrefixAccPub: 'celestia' + 'pub',
          bech32PrefixValAddr: 'celestia' + 'valoper',
          bech32PrefixValPub: 'celestia' + 'valoperpub',
          bech32PrefixConsAddr: 'celestia' + 'valcons',
          bech32PrefixConsPub: 'celestia' + 'valconspub',
        },
        currencies: [
          {
            coinDenom: 'TIA',
            coinMinimalDenom: 'utia',
            coinDecimals: 6,
            coinGeckoId: 'celestia',
          },
        ],
        feeCurrencies: [
          {
            coinDenom: 'TIA',
            coinMinimalDenom: 'utia',
            coinDecimals: 6,
            coinGeckoId: 'celestia',
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.04,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: 'TIA',
          coinMinimalDenom: 'utia',
          coinDecimals: 6,
          coinGeckoId: 'celestia',
        },
        features: ['stargate', 'ibc-transfer'],
      })
      await keplrProvider.enable(['mocha-4'])
      const account = await keplrProvider.getKey('mocha-4')
      setAccount(account)
    } catch (error: any) {
      alert(error.message)
    }
  }
  useEffect(() => {
    getKeplrFromProvider()
  }, [])
  const saveHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      if (!keplr || !account) return
      const message = account.address.toString() + account.pubKey.toString()
      const signature = await keplr.signArbitrary('mocha-4', address, Buffer.from(message).toString('base64'))
      console.log(signature)

      //call create account api

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  console.log(unsavedChanges)
  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='space-y-10 text-xl w-full'>
        <Link href='/'>
          <h1 className='text-3xl font-bold flex items-center gap-1.5'>
            <IoIosArrowBack /> My Passport
          </h1>
        </Link>
        <div className='grid grid-cols-[200px_1fr] gap-x-5 gap-y-10 items-center'>
          <div className='text-zinc-400'>Display Name</div>
          <div>Sunday</div>
          <div className='text-zinc-400'>Wallet Address</div>
          {account?.bech32Address ? (
            <div className='flex items-center gap-3'>
              <span>{account?.bech32Address}</span>
              <Button
                size='lg'
                variant='destructive'
                onClick={() => {
                  setAccount(undefined)
                  setKeplr(undefined)
                }}>
                <Unlink /> Disconnect
              </Button>
            </div>
          ) : (
            <Button size='lg' onClick={getKeplrFromProvider}>
              <Wallet /> Connect Wallet
            </Button>
          )}
          <div className='text-zinc-400'>X (Formaly Twitter)</div>
          <X unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
          <div className='text-zinc-400'>Github</div>
          <Github unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
          <div className='text-zinc-400'>Discord</div>
          <Discord unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
        </div>
        <div className='flex items-center gap-4'>
          <Button
            disabled={loading || !keplr}
            size='lg'
            className='bg-green-500 hover:bg-green-400'
            onClick={saveHandler}>
            {loading ? <Loader2 className='animate-spin' /> : <SaveIcon />} Save
          </Button>
          {unsavedChanges.length > 0 && <div className='text-red-600 text-sm'>Careful - you have unsaved changes!</div>}
        </div>
      </div>
      <div className='flex flex-col items-center justify-start gap-5'>
        <Avatar className='w-48 h-48'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='font-medium flex gap-2 text-blue-400 border border-dashed rounded-full px-3 py-1.5 border-blue-400 items-center text-sm'>
          <VerifiedIcon />
          Verified
        </div>
        <div className='text-lg font-semibold flex gap-4 items-center'>
          <Wallet />
          {address}
        </div>
      </div>
    </div>
  )
}

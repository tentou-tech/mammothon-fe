'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import { SaveOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { FaDiscord } from 'react-icons/fa6'
import QRCode from 'react-qr-code'

export default function Discord({
  setUnsavedChanges,
  unsavedChanges,
}: {
  setUnsavedChanges: (unsavedChanges: any) => void
  unsavedChanges: any[]
}) {
  const [requestUrl, setRequestUrl] = useState('')
  const [open, setOpen] = useState(false)
  const unsavedDiscord = unsavedChanges.find((change) => change.provider === 'discord')
  const getVerificationRequest = async () => {
    try {
      const APP_ID = '0xA98aa0ad8961536d3C017085949c98A1bbc264eE'
      const APP_SECRET = '0x2334cd5e9c34e474b46a932c1940d2e2ba9fa39fd7eaed333125494710bedcc8'
      const PROVIDER_ID = 'b0f1d9b8-29b2-4a86-9ddc-7c6048db7c25'
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID)
      const requestUrl = await reclaimProofRequest.getRequestUrl()
      setRequestUrl(requestUrl)
      setOpen(true)
      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          if (proofs) {
            if (typeof proofs === 'string') {
              setUnsavedChanges([
                {
                  provider: 'discord',
                  proofs: [proofs],
                },
              ])
            } else if (typeof proofs !== 'string') {
              if (Array.isArray(proofs)) {
                setUnsavedChanges([
                  {
                    provider: 'discord',
                    proofs,
                  },
                ])
              } else {
                setUnsavedChanges([
                  {
                    provider: 'discord',
                    proofs,
                  },
                ])
              }
            }
            setOpen(false)
          }
        },
        onError: (error) => {
          setOpen(false)
          console.error('Verification failed', error)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <Button disabled size='lg' className='w-full bg-[#7289da] hover:bg-[#4e5d94] text-white'>
          <FaDiscord /> Discord is coming soon
        </Button>
        {unsavedDiscord && <SaveOff size={16} color='#dc2626' />}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan this QR to proof your identity?</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4 items-center'>
            <QRCode value={requestUrl} className='w-full' />
            <Link href={'/'} className='text-blue-500 text-sm'>
              Need help?
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

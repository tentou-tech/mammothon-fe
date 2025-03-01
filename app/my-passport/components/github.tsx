'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Context } from '@/context'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import { SaveOff } from 'lucide-react'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import QRCode from 'react-qr-code'

export default function Github({
  setUnsavedChanges,
  unsavedChanges,
}: {
  setUnsavedChanges: (unsavedChanges: any) => void
  unsavedChanges: any[]
}) {
  const { account } = useContext(Context)
  const [requestUrl, setRequestUrl] = useState('')
  const [open, setOpen] = useState(false)
  const unsavedGithub = unsavedChanges.find((change) => change.provider === 'github')
  let datas = []
  let githubUsername = null
  if (account) {
    datas = account.data.map((d: string) => JSON.parse(d))
    const githubData = datas.findLast((d: any) => d.provider == 'github')
    githubUsername = githubData ? JSON.parse(githubData.proofs.claimData.context).extractedParameters.username : null
  }
  const getVerificationRequest = async () => {
    try {
      const APP_ID = '0xA98aa0ad8961536d3C017085949c98A1bbc264eE'
      const APP_SECRET = '0x2334cd5e9c34e474b46a932c1940d2e2ba9fa39fd7eaed333125494710bedcc8'
      const PROVIDER_ID = '6d3f6753-7ee6-49ee-a545-62f1b1822ae5'
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID)
      const requestUrl = await reclaimProofRequest.getRequestUrl()
      setRequestUrl(requestUrl)
      setOpen(true)
      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          if (proofs) {
            if (typeof proofs === 'string') {
              setUnsavedChanges((prev: any[]) => [
                ...prev,
                {
                  provider: 'github',
                  updatedAt: new Date().toISOString(),
                  proofs,
                },
              ])
            } else if (typeof proofs !== 'string') {
              if (Array.isArray(proofs)) {
                setUnsavedChanges((prev: any[]) => [
                  ...prev,
                  {
                    provider: 'github',
                    updatedAt: new Date().toISOString(),
                    proofs,
                  },
                ])
              } else {
                setUnsavedChanges((prev: any[]) => [
                  ...prev,
                  {
                    provider: 'github',
                    updatedAt: new Date().toISOString(),
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
        {unsavedGithub ? (
          <div>{JSON.parse(unsavedGithub.proofs.claimData.context).extractedParameters.username}</div>
        ) : githubUsername ? (
          <div className='flex items-center gap-3'>
            <div>{githubUsername}</div>
            <Button size='lg' className=' bg-[#2dba4e] hover:bg-[#24292e] text-white' onClick={getVerificationRequest}>
              <FaGithub /> Re-link Github
            </Button>
          </div>
        ) : (
          <Button
            size='lg'
            className='w-full bg-[#2dba4e] hover:bg-[#24292e] text-white'
            onClick={getVerificationRequest}>
            <FaGithub /> Link Github
          </Button>
        )}
        {unsavedGithub && <SaveOff size={16} color='#dc2626' />}
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

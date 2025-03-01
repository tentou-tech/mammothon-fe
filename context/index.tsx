/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { getAccountByWalletAddress } from '@/services'
import { Keplr } from '@keplr-wallet/provider-extension'
import { createContext, useEffect, useState } from 'react'

export const CHAIN_ID = 'mocha-4'

export const Context = createContext<{
  keplr: Keplr | null
  setKeplr: (keplr: Keplr | null) => void
  key: any
  setKey: (key: any) => void
  connectKeplr: () => void
  account: any
  setAccount: (account: any) => void
  getAccount: () => void
}>({
  keplr: null,
  setKeplr: (_keplr: any) => {},
  key: null,
  setKey: (_key: any) => {},
  connectKeplr: () => {},
  account: null,
  setAccount: (_account: any) => {},
  getAccount: () => {},
})

export default function ContextProvider({ children }: any) {
  const [keplr, setKeplr] = useState<Keplr | null>(null)
  const [key, setKey] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)
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
      const myKey = await keplrProvider.getKey('mocha-4')
      setKey(myKey)
    } catch (error: any) {
      alert(error.message)
    }
  }
  useEffect(() => {
    getKeplrFromProvider()
  }, [])
  useEffect(() => {
    getAccount()
  }, [key])
  const getAccount = async () => {
    try {
      if (!key?.bech32Address) return
      const myAccount = await getAccountByWalletAddress(key.bech32Address)
      setAccount(myAccount.id ? myAccount : null)
    } catch (error: any) {
      console.error(error)
    }
  }
  return (
    <Context.Provider
      value={{ keplr, setKeplr, key, setKey, connectKeplr: getKeplrFromProvider, account, setAccount, getAccount }}>
      {children}
    </Context.Provider>
  )
}

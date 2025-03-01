import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function toHex(buffer: Uint8Array) {
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}
export const shorten = (string: string, preCh?: number, sufCh?: number) => {
  if (!string) return ''
  const pre = string.slice(0, preCh || 5)
  const suf = string.slice(-(sufCh || 5))
  return `${pre}...${suf}`
}

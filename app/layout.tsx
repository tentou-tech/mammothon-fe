import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body className=''>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <div className='p-14'>
              <div className='relative bg-white/5 backdrop-blur-md rounded-2xl p-14'>{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

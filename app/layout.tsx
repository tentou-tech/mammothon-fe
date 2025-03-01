import { ThemeProvider } from '@/components/theme-provider'
import ContextProvider from '@/context'
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body className=''>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <ContextProvider>
              <div className='p-14'>
                <div className='relative bg-white/5 backdrop-blur-md rounded-2xl p-14'>{children}</div>
              </div>
            </ContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

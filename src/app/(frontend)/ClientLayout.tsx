'use client'

import AOS from 'aos'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { CommandPaletteProvider } from '@/core/common/context/CommandPaletteContext'
import { firaCode, jakartaSans, soraSans } from '@/core/common/styles/fonts'
import CommandPalette from '@/core/common/components/elements/CommandPalette'
import { LivePreviewListener } from '@/core/common/components/LivePreviewListener'

const ProgressBar = dynamic(
  () => import('@/core/common/components/elements/ProgressBar'),
  { ssr: false },
)

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 50,
    })
  }, [])

  return (
    <>
      <style jsx global>
        {`
          html {
            --jakartaSans-font: ${jakartaSans.style.fontFamily};
            --soraSans-font: ${soraSans.style.fontFamily};
            --firaCode-font: ${firaCode.style.fontFamily};
          }
        `}
      </style>
      {/*// todo: add defaultseo*/}
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <CommandPaletteProvider>
          <LivePreviewListener />
          <CommandPalette />
          {children}
        </CommandPaletteProvider>
      </ThemeProvider>
    </>
  )
}

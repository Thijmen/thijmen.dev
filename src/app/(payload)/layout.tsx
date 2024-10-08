/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type React from 'react'

import './custom.scss'
import { importMap } from './admin/importMap.js'

type Args = {
	children: React.ReactNode
}

const Layout = ({ children }: Args) => (
	<RootLayout config={configPromise} importMap={importMap}>
		{children}
	</RootLayout>
)

export default Layout

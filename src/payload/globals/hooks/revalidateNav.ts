import { revalidatePath } from 'next/cache'
import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateNav: GlobalAfterChangeHook = ({
	doc,
	req: { payload },
}) => {
	payload.logger.info('Revalidating navigation')

	 revalidateTag('nav')

	 revalidatePath('/')

	return doc
}

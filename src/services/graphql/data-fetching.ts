import { getPageDetailDocument } from '@/services/graphql/documents.pages'
import {
  BlogEntryFragmentFragment,
  PagesDocumentEntryFragment,
} from '@/__generated__/graphql'
import { getBlogDetailDocument } from '@/services/graphql/documents.blogs'
import { getClient } from '@/services/graphql/graphql'
import { REVALIDATE } from '@/common/constants'

export const fetchPageInfo = async (
  slug: string,
): Promise<PagesDocumentEntryFragment | null> => {
  const data = await getClient().query({
    query: getPageDetailDocument,
    fetchPolicy: 'network-only',
    variables: { slug: [slug] },
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE },
      },
    },
  })

  return data.data.pagesEntries.length > 0 ? data.data.pagesEntries[0] : null
}

export const fetchBlogInfo = async (
  slug: string,
): Promise<BlogEntryFragmentFragment | null> => {
  const data = await getClient().query({
    query: getBlogDetailDocument,
    fetchPolicy: 'network-only',
    variables: { slug: [slug] },
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE },
      },
    },
  })

  return data.data.blogsEntries.length > 0 ? data.data.blogsEntries[0] : null
}

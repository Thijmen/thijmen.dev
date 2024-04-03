import { getClient } from '@/services/graphql/graphql'
import {
  getProjectDetailDocument,
  getProjectsDocument,
} from '@/services/graphql/documents.projects'
import { REVALIDATE } from '@/common/constants'
import {
  getBlogDetailDocument,
  getBlogOverviewDocument,
} from '@/services/graphql/documents.blogs'
import {
  BlogEntryFragmentFragment,
  PagesDocumentEntryFragment,
} from '@/__generated__/graphql'
import { getPageDetailDocument } from '@/services/graphql/documents.pages'

export const getProjects = async () => {
  const projectsResponse = await getClient().query({
    query: getProjectsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE },
      },
    },
  })

  return projectsResponse.data.projectsEntries
}

export const getProject = async (slug: string) => {
  return await getClient().query({
    query: getProjectDetailDocument,
    variables: {
      slug,
    },
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE },
      },
    },
  })
}

export const getPage = async (
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
export const getBlogPosts = async () => {
  const blogEntriesResponse = await getClient().query({
    query: getBlogOverviewDocument,
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE },
      },
    },
  })

  return blogEntriesResponse.data.blogsEntries
}

export const getBlogItem = async (
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

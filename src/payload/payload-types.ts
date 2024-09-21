/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    projects: Project;
    stacks: Stack;
    posts: Post;
    pages: Page;
    'r2-media': R2Media;
    redirects: Redirect;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    nav: Nav;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: number;
  title: string;
  slug?: string | null;
  slugLock?: boolean | null;
  isFeatured?: boolean | null;
  stacks?: (number | Stack)[] | null;
  introduction?: string | null;
  headerImage?: (number | null) | R2Media;
  githubLink?: string | null;
  liveLink?: string | null;
  description: string;
  meta?: {
    title?: string | null;
    image?: (number | null) | R2Media;
    description?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "stacks".
 */
export interface Stack {
  id: number;
  title: string;
  stackHandle: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "r2-media".
 */
export interface R2Media {
  id: number;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    projectCardHomepage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    projectCardProjectsPage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  slug?: string | null;
  slugLock?: boolean | null;
  isFeatured?: boolean | null;
  description: string;
  image?: (number | null) | R2Media;
  layout: {
    header?: string | null;
    content?: string | null;
    id?: string | null;
    blockName?: string | null;
    blockType: 'markdown';
  }[];
  meta?: {
    title?: string | null;
    image?: (number | null) | R2Media;
    description?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  slug?: string | null;
  slugLock?: boolean | null;
  dynamiccontent?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  containerClassName?: string | null;
  showPageHeading?: boolean | null;
  showBackButton?: boolean | null;
  meta?: {
    title?: string | null;
    image?: (number | null) | R2Media;
    description?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: number;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'posts';
          value: number | Post;
        } | null);
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nav".
 */
export interface Nav {
  id: number;
  links?:
    | {
        label?: string | null;
        icon?: string | null;
        page?:
          | ({
              relationTo: 'pages';
              value: number | Page;
            } | null)
          | ({
              relationTo: 'projects';
              value: number | Project;
            } | null);
        url?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MyCodeBlock".
 */
export interface MyCodeBlock {
  code: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'code';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MyProjectsBlock".
 */
export interface MyProjectsBlock {
  filterFeatured: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'projectsBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MyHorizontalLineBlock".
 */
export interface MyHorizontalLineBlock {
  id?: string | null;
  blockName?: string | null;
  blockType: 'horizontalLineBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MyGithubContributionsBlock".
 */
export interface MyGithubContributionsBlock {
  id?: string | null;
  blockName?: string | null;
  blockType: 'githubContributionsBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MyWakaContributionsBlock".
 */
export interface MyWakaContributionsBlock {
  id?: string | null;
  blockName?: string | null;
  blockType: 'wakaContributionsBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
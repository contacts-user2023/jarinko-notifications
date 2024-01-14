import {createClient} from 'microcms-js-sdk'
import type {CustomRequestInit, MicroCMSImage, MicroCMSQueries, MicroCMSContentId, MicroCMSDate} from 'microcms-js-sdk'
import {getMicroCMSConfig, getNextRuntime, getNodeEnv} from "@/config/config";

const config = getMicroCMSConfig();

if (!config.serviceDomain) {
  throw new Error('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is required')
}

if (!config.apiKey) {
  throw new Error('NEXT_PUBLIC_MICROCMS_API_KEY is required')
}
export const client = createClient(config);

const customRequestInit: CustomRequestInit | undefined = (() => {
  if (getNodeEnv() === 'development') {
    return {
      cache: 'no-cache',
    }
  }
  // if (getNextRuntime() === 'edge') return undefined;
  return {
    cache: 'no-cache',
  }
})();

export type Contact = {
  id: string
  publishedAt: string
  title: string
  content: string
}
export type ContentsContact = {
  contents: Contact[]
}
export const listContacts = async () => {
  const now = (new Date()).toISOString();
  const result = await client.getAllContents({
    customRequestInit,
    endpoint: 'contacts',
    queries: {
      filters: `publishedAt[less_than]${now}`,
      orders: '-publishedAt'
    }
  });

  return {contents: result || []};
};

export const getContactById = async (id: string, queries: MicroCMSQueries = {}) => {
  return client.get<Contact>({
    customRequestInit,
    endpoint: 'contacts',
    contentId: id,
    queries,
  })
};

export const createContact = async (body: { [key: string]: string }) => {
  return client.create({
    endpoint: 'contacts',
    content: body,
  });
};

export type AlreadyRead = {
  contactId: string,
  memberId: string
  name: string,
  createdAt: string
};
export type ContentsAlreadyRead = {
  contents: AlreadyRead[]
};

export const listAlreadyReadByMemberId = async (id: string) => {
  const result = await client.getAllContents({
    customRequestInit,
    endpoint: 'already_read',
    queries: {
      filters: `memberId[equals]${id}`
    },
  });

  return {contents: result || []};
};

export const listAlreadyReadByContentId = async (id: string) => {
  return await client.getAllContents<AlreadyRead>({
    customRequestInit,
    endpoint: 'already_read',
    queries: {
      filters: `contactId[equals]${id}`
    },
  });
};

export const getAlreadyReadById = async (id: string, queries: MicroCMSQueries = {}) => {
  return client.get<ContentsContact>({
    customRequestInit,
    endpoint: 'already_read',
    queries: {filters: `contactMember[equals]${id}`,},
  })
};

export const createAlreadyRead = async (body: { [key: string]: string }) => {
  return client.create({
    endpoint: 'already_read',
    content: body,
  });
};

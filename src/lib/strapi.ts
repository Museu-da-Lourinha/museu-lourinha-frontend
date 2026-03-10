import { GraphQLClient } from 'graphql-request';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const strapiClient = new GraphQLClient(`${STRAPI_URL}/graphql`);

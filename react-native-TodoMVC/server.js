import koa from 'koa';
import graphQLHTTP from 'koa-graphql';
import mount from 'koa-mount';
import { schema } from './data/schema';

const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const graphQLServer = koa();

graphQLServer.use(mount('/', graphQLHTTP({ schema, pretty: true })));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

import fauna from 'faunadb';

export const faunadb = new fauna.Client({
  secret: process.env.FAUNADB_SECRET,
})
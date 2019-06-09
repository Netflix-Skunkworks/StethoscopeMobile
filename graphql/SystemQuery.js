import { makeExecutableSchema } from 'graphql-tools';
import {graphql} from 'graphql';
import {typeDefs} from './schema';
import {resolvers} from './resolvers';

export default class SystemQuery { 
  constructor(){
    this.schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
  }

  execute (query, variables){
    return new Promise ((resolve) => {
      graphql(this.schema, query, null, null, variables).then(result => {
        resolve(result);
      });
    });
  }
}
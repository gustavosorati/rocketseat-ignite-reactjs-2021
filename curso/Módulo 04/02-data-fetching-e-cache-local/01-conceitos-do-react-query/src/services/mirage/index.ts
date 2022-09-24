import {createServer, Factory, Model } from 'miragejs';
import faker from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`
        },
        email(i) {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 10);
    },

    routes(){
      this.namespace = 'api';
      this.timing = 750;

      this.get("/users"),
      this.post("/users"),
      this.delete("/users")

      this.namespace = '';
      this.passthrough(); // se as chamadas a api não forem detectadas pelo mirage, ele passa adianta para a api do projeto
    }
  });

  return server;
}
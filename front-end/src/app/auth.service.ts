import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: {email: string, token: string};

  constructor(private apollo: Apollo) {}

  public login(email: string, password: string): Observable<object> {
    return this.apollo.mutate({
      mutation: gql`
        mutation signinUser($email: String!, $password: String!) {
          signinUser(
            email: {
              email: $email,
              password: $password
            }
          ) {
            token
          }
        }
      `,
      variables: { email, password }
    });
  }

  public register(email: string, password: string): Observable<object> {
    return this.apollo.mutate({
      // name doesn't need to be unique
      // don't care about it in a demo
      mutation: gql`
        mutation createUser($email: String!, $password: String!) {
          createUser(
            name: "sampleName"
            authProvider: {
              email: {
                email: $email,
                password: $password
              }
            }
          ) {
            id
            email
            name
          }
        }
      `,
      variables: { email, password }
    });
  }

  public storeUser(email: string, token: string): void {
    this.user = {email, token};
  }
}

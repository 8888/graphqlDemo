import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  public login(email: string, password: string): void {
    this.apollo.mutate({
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
    })
    .subscribe(console.log);
  }
}

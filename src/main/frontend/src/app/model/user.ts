export class User {
  constructor(public id: number,
              public name: string,
              public mail: string,
              public password?: string,
              public avatar?: string,
              public token?: string) {
  }

}

export class AccountDto {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public pictureProfileUrl: string,
    public password: string
  ) { }
}
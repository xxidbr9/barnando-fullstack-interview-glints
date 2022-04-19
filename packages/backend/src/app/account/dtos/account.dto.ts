export class AccountDto {
  constructor(
    public id: string,
    public full_name: string,
    public email: string,
    public picture_profile_url: string,
    public password?: string
  ) {

  }
}
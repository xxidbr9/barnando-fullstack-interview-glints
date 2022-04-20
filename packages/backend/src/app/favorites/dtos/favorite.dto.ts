export class FavoriteBaseDto {
  constructor(
    public id: string,
    public name: string,
    public user_id: string,
    public parent_id: string | null,
  ) { }
}

export class FavoriteInfoDto extends FavoriteBaseDto {
  created_at: number
  updated_at?: number

  constructor(
    public id: string,
    public name: string,
    public user_id: string,
    public parent_id: string | null,
    createdAt: number | Date,
    updatedAt: number | Date | undefined,
  ) {
    super(id, name, user_id, parent_id)
    this.created_at = +createdAt
    if (!!updatedAt) {
      this.updated_at = +updatedAt
    }
  }
}
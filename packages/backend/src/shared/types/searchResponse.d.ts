
export type ISearchResponse<Keys extends string, T> = {
  [K in Keys]: T
} & {
  total?: number
  is_have_next?: boolean
}
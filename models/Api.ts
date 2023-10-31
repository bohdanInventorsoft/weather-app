export interface ApiRequestI<Actions> {
  route: string
  action: Actions
  payload?: any
}
export class ApiRequest implements ApiRequestI<string> {
  public _id: string // users ID to identify the user throughout the DB
  public route: string
  public action: string
  public payload?: any

  constructor(data: any) {
    this._id = data._id
    this.route = data.route
    this.action = data.action

    if (data.payload) {
      this.payload = data.payload
    }
  }
}

export type ApiResponse = { status: number; body?: any; message?: string }

export class ApiReducer<Actions> {
  protected isValid(post: ApiRequestI<Actions>) {
    const { payload, action } = post
    if (!action) {
      return false
    }
    return true
  }
}

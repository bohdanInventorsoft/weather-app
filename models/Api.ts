export interface ApiRequestI<Actions> {
  route: string
  action: Actions
  payload?: any
}
export class ApiRequest implements ApiRequestI<string> {
  public route: string
  public action: string
  public payload?: any

  constructor(data: any) {
    this.route = data.route
    this.action = data.action

    if (data.payload) {
      this.payload = data.payload
    }
  }
}

export type ApiResponse = { status: number; body?: any; statusText?: string }

export class ApiReducer<Actions> {
  protected isValid(post: ApiRequestI<Actions>) {
    const { action } = post
    return action;
  }
}

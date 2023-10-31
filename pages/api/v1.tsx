import { WeatherReducer } from '@/pages/api/weather/weather.reducer'
import { ApiRequest, ApiResponse } from '@/models/Api'
export enum ROUTES {
  WEATHER = 'WEATHER',
}

const weatherReducer = new WeatherReducer()
export default async function handler(req: any, res: any) {
  try {
    const { method, body } = req
    if (method === 'POST') {
      const post = new ApiRequest(body)
      if (!post.route || !post.action) {
        res.status(400).send({ error: 'Invalid route or action' })
      }
      const response = await _apiReducer(post)
      res
        .status(response.status && response?.body ? 200 : response.status)
        .send(response.status && typeof response?.body !== undefined ? response?.body : response?.message)
    } else {
      res.status(404).send('Not found')
    }
  } catch (err: any) {
    res.status(500).send(err)
  }
}

const _apiReducer = async (post: any): Promise<ApiResponse> => {
  switch (post.route) {
    case ROUTES.WEATHER:
      return await weatherReducer.pass(post)
  }

  return { status: 400, message: 'Wrong route' }
}

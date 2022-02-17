import { json, LoaderFunction } from 'remix'

export const loader: LoaderFunction = async () => {
  const data = (await CONTENT.get('$$content-sha', 'json')) || {
    commit: { sha: '' },
  }
  return json(data)
}

export const revalidate = 60

export async function GET() {
  const data = await fetch('http://34.28.25.142:8080/v1/account/list-accounts')
  const posts = await data.json()

  return Response.json(posts)
}

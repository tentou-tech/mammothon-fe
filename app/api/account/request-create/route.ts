export const revalidate = 60

export async function POST(request: Request) {
  try {
    const body = await request.json() // Read the request body properly

    const data = await fetch('http://34.28.25.142:8080/v1/account/request-create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!data.ok) {
      throw new Error(`API request failed with status ${data.status}`)
    }

    const response = await data.json()
    return Response.json(response)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

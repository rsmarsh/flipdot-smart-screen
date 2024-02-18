export async function GET() {
  const res = {
    someData: 'yes',
    isWorking: true
  };

  return Response.json(res);
}

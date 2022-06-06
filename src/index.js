
function chooseTown(towns) {
  const chosenTown = towns[Math.floor(Math.random() * towns.length)];
  return chosenTown;
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = request.url;
  const route = url.substring(url.lastIndexOf('/'));

  const TOWNS = await TOWNS_KV.get("towns");

  switch (route) {
    case '/':
      const chosenTown = chooseTown(JSON.parse(TOWNS));
      return new Response(chosenTown, {
        status: 200, headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' }
      });
      break;
    case '/towns':
      return new Response(TOWNS, {
        status: 200, headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' }
      });
      break;
  
    default:
      return new Response("Wrong route");
      break;
  }
  
}

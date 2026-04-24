export class ChatRoom {
  sockets: Set<any>;

  constructor(state:any, env:any) {
    this.sockets = new Set()
  }

  fetch(request:any) {
    const pair = new WebSocketPair()
    const client = pair[0]
    const server = pair[1]

    server.accept()
    this.sockets.add(server)

    server.addEventListener('message', (e) => {
      for (const ws of this.sockets) {
        ws.send(e.data)
      }
    })

    return new Response(null, { status: 101, webSocket: client })
  }
}
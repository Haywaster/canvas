import express from 'express';
import expressWS from 'express-ws';

const app = express();
const wsServer = expressWS(app);
const aWss = wsServer.getWss();

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
	ws.on('message', (message) => {
		message = JSON.parse(message);

		switch (message.method) {
			case 'connection':
				connectionHandler(ws, message);
				break;
		}
	})
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})

const connectionHandler = (ws, msg) => {
	ws.id = msg.id;
	broadcastConnection(ws, msg);
}
console.log(aWss.clients.length);
const broadcastConnection = (ws, msg) => {
	aWss.clients.forEach(client => {
		if (client.id === msg.id) {
			client.send(`Пользователь ${msg.username} подключился! ${client.id}`);
		}
	})
}
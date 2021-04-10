import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import getDevices from './scan.js'
import { writeJson, readJson, configDefault } from './cadastro.js'
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
})

const readCadastro = (socket) => {
	console.log('readCadastro')
	const ip = readJson().subnetIp
	socket.emit('cadastro:value', ip)
}

const updateCadastro = (payload, socket) => {
	console.log('updateCadastro')
	if (payload) {
		writeJson({ subnetIp: payload })
	} else {
		writeJson()
	}

	const ip = readJson().subnetIp
	socket.emit('cadastro:value', ip)
}

const deleteCadastro = (socket) => {
	console.log('deleteCadastro')
	writeJson()
	const ip = readJson().subnetIp
	socket.emit('cadastro:value', ip)
}

const onConnection = (socket) => {
	socket.on('cadastro:read', () => readCadastro(socket))
	socket.on('cadastro:update', (data) => updateCadastro(data, socket))
	socket.on('cadastro:delete', () => deleteCadastro(socket))
}

io.on('connection', (socket) => {
	setInterval(async () => {
		const devices = await getDevices()
		const devicesSemGateway = devices.filter(({ ip }) => ip !== configDefault.subnetIp)
		socket.emit('deviceList', devicesSemGateway)
		console.log(devicesSemGateway)
	}, 10000)
	onConnection(socket)
});

server.listen(3000,() => {
  console.log('listening on *:3000');
});

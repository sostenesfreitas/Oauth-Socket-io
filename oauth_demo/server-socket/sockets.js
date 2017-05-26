/**
 * @version 1.0.0
 * @description Creating a module to break our application up. This module is used to deal with Socket.io, connections and messages. Required in server.js
 * @author Aaron Welsh <contact@aaron-welsh.co.uk>
 *
 */
module.exports  = io => {
    // Handle socket.io connections
    io.on('connection', socket => {

        //log if user joined
        console.log('a user connected');
        socket.on('disconnect', () => {
            //log if user disconnected
            console.log('user disconnected');
        });

        // Handle message sent
        socket.on('listenForMessage', message => {
            console.log('Message: ' + message);
            io.emit('listenForMessage', message);
        });
        // Indicadores
        socket.on('Medicamento', medicamento => {
            console.log('Medicamento: ' + medicamento);
            io.emit('Medicamento', medicamento);
        });
        socket.on('Meta', meta => {
            console.log('Meta: ' + meta);
            io.emit('Meta', meta);
        });
        socket.on('listenForMedicine', medicamento => {
            console.log('listenForMedicine: ' + medicamento);
            io.emit('listenForMedicine', medicamento);
        });
        socket.on('listenForMetas', meta => {
            console.log('listenForMetas: ' + meta);
            io.emit('listenForMetas', meta);
        });
    });
};

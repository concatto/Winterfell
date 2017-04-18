
function WS(){
    var ws;
    
    function connect(){
        ws = new WebSocket("ws://localhost:8084/WinterPics/websocket");
    
        ws.onopen = function(message){
            console.log(message);
        };
        ws.onclose = function(message){
            console.log("Closed connection: ", message.data, "\n");
            connect();
        };
        ws.onerror = function(message) {
            console.log("Error: ", message);
        };
        ws.onmessage = function(message){
            console.log("Message received from server : ", message, "\n");
            var request = JSON.parse(message.data);
            listeners[request.methodName](JSON.parse(request.data));
        };
    };
    
    connect();

    var listeners = [];

    this.send = function(methodName, data){
        ws.send(JSON.stringify({
            methodName: methodName,
            data: JSON.stringify(data)
        }));
    };

    this.on = function(methodName, func){
        listeners[methodName] = func;
    };

};

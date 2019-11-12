var ws = require("ws"); // 加载ws模块;

const clientMap = new Map();

const port = 8888;

// 启动websocket服务器
var wsServer = new ws.Server({
  host: '127.0.0.1',
  port,
});
console.log('WebSocket sever is listening at port localhost:' + port);

// 建立连接，监听客户端请求，绑定对应事件;
function on_server_client_comming (wsObj) {
  console.log("request comming");
  websocket_add_listener(wsObj);
}
wsServer.on("connection", on_server_client_comming);

// 各事件处理逻辑
function websocket_add_listener(wsObj) {
  // console.log(wsObj)
  wsObj.send('hello')
  wsObj.on("message", function(data) {
    console.log("request data:"+data);
    try {
      const jsonData = JSON.parse(data);
      const type = typeof jsonData.type !== 'undefined' ? jsonData.type : 'null';
      if (type === 'iot') {
        clientMap.set(jsonData.data.socket_address.address+jsonData.data.socket_address.port, wsObj)
      }

    } catch (e) {
      console.error(e);
    }
  });

  wsObj.on("close", function() {
    console.log("request close");
  });

  wsObj.on("error", function(err) {
    console.log("request error", err);
  });
}

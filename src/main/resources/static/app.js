var ws = null;
var url = "ws://localhost:8080/echo-endpoint"
var btnDisabledClass = 'v-btn--disabled';

function setConnected(connected) {
    if (connected) {
        document.getElementById('connect').classList.add(btnDisabledClass);
        document.getElementById('disconnect').classList.remove(btnDisabledClass);
        document.getElementById('echo').classList.remove(btnDisabledClass);
    } else {
        document.getElementById('connect').classList.remove(btnDisabledClass);
        document.getElementById('disconnect').classList.add(btnDisabledClass);
        document.getElementById('echo').classList.add(btnDisabledClass);
    }
}

function connect() {
    var socket = new SockJS('/echo-endpoint');
    ws = Stomp.over(socket);

    ws.connect({}, function(frame) {
        setConnected(true);
        log(frame);
        ws.subscribe('/topic/echo', function(message) {
            log(message.body);
        });
    });
}

function disconnect() {
    if (ws != null) {
        ws.disconnect()
        ws = null;
    }

    setConnected(false);
}

function echo() {
    if (ws != null) {
        var message = document.getElementById('message').value;
        if (message.length === 0) {
            alert('write something before sending');
        } else {
            log('Sent: ' + message);
            ws.send("/app/echo", {}, message);
        }
    } else {
        alert('connection not established, please connect.');
    }
}

function log(message) {
    var console = document.getElementById('logging');
    var card = document.createElement('div');
    card.classList.add('mx-auto', 'v-card', 'v-sheet', 'v-sheet--outlined', 'theme--light', 'my-1');
    var cardText = document.createElement('div');
    cardText.classList.add('v-card__text');
    card.appendChild(cardText);
    cardText.appendChild(document.createTextNode(message));
    console.appendChild(card);
    while (console.childNodes.length > 12) {
        console.removeChild(console.firstChild);
    }
    console.scrollTop = console.scrollHeight;
}
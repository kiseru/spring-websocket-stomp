package com.alex.springwebsocketstomp

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class EchoHandler {

    @MessageMapping("/echo")
    @SendTo("/topic/echo")
    fun echo(msg: String) = "RECEIVED: $msg"
}
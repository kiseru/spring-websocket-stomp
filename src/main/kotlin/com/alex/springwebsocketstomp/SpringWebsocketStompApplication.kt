package com.alex.springwebsocketstomp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SpringWebsocketStompApplication

fun main(args: Array<String>) {
    runApplication<SpringWebsocketStompApplication>(*args)
}
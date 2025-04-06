package com.dron.edusynthserver.Common.Config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMQConfig {
    @Bean
    public DirectExchange sessionExchange() {
        return new DirectExchange("session.exchange");
    }

    @Bean
    public Queue sessionTimerWaitQueue() {
        return QueueBuilder.durable("session.timer.wait")
                .deadLetterExchange("session.exchange") // Куда перенаправить после TTL
                .deadLetterRoutingKey("timer.events.expired") // С каким ключом
                .build();
    }

    @Bean
    public Queue sessionTimerEventsQueue() {
        return new Queue("session.timer.events", true);
    }

    @Bean
    public Binding bindingWait(Queue sessionTimerWaitQueue, DirectExchange sessionExchange) {
        return BindingBuilder.bind(sessionTimerWaitQueue)
                .to(sessionExchange)
                .with("session.timer.wait");
    }

    @Bean
    public Binding bindingExpired(Queue sessionTimerEventsQueue, DirectExchange sessionExchange) {
        return BindingBuilder.bind(sessionTimerEventsQueue)
                .to(sessionExchange)
                .with("timer.events.expired");
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}

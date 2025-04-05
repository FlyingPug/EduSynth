package com.dron.edusynthserver.Common.Config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMQConfig {

    @Bean
    public Queue sessionStateQueue() {
        return new Queue("session.state.queue", true);
    }

    @Bean
    public Queue timerEventsQueue() {
        return new Queue("timer.events.queue", true);
    }

    @Bean
    public TopicExchange sessionExchange() {
        return new TopicExchange("session.exchange");
    }

    @Bean
    public Binding sessionStateBinding() {
        return BindingBuilder.bind(sessionStateQueue())
                .to(sessionExchange())
                .with("session.state.*");
    }

    @Bean
    public Binding timerEventsBinding() {
        return BindingBuilder.bind(timerEventsQueue())
                .to(sessionExchange())
                .with("timer.events.*");
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}

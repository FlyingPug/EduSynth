package com.dron.edusynthserver.Session.Mapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimerEvent implements Serializable {
    private String sessionId;
    private Instant expirationTime;
}
package com.a506.webrtc.stomp.entity;

import java.util.Map;

import lombok.Getter;

@Getter
public class Event {
	private EventType eventType;
	private Long roomId;
	private Map<String, Object> data;
}

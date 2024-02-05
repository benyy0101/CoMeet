package com.a506.comeet.common.enums;

public enum RoomConstraints {
    VIDEOONMICOFF("VIDEOONMICOFF"), VIDEOON("VIDEOON"), MICOFF("MICOFF"), FREE("FREE");
    private String value;

    RoomConstraints(String value) {
        this.value = value;
    }
    public String get(){
        return this.value;
    }
}

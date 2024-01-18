package com.a506.comeet.common.enums;

public enum RoomConstraints {
    VIDEOONMICOFF("videomic"), VIDEOON("video"), MICOFF("mic"), FREE("free");
    private String value;

    RoomConstraints(String value) {
        this.value = value;
    }
    public String get(){
        return this.value;
    }
}

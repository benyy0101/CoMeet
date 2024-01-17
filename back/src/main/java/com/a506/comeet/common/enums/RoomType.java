package com.a506.comeet.common.enums;

import lombok.Getter;

public enum RoomType {
    DISPOSABLE("disposable"), PERMANENT("permanent");
    private String value;

    RoomType(String value) {
        this.value = value;
    }

    public String get(){
        return this.value;
    }
}

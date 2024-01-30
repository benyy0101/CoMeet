package com.a506.comeet.app;

public class KeyUtil {
    public static String getRoomMemberKey(Long roomId, String memberId) {
        return "ROOM_MEMBER:" + roomId + ":" + memberId;
    }

    public static String getCurrentMemberKey(String memberId) {
        return "CURRENT:" + memberId;
    }

    public static String getRefreshTokenKey(String memberId) {
        return "REFRESH_TOKEN:" + memberId;
    }
}
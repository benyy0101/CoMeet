package com.a506.comeet.common.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
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
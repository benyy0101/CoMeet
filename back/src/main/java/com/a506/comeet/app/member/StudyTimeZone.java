package com.a506.comeet.app.member;

import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.Getter;

public enum StudyTimeZone {
    TIMEZONE0_2(0),
    TIMEZONE2_4(2),
    TIMEZONE4_6(4),
    TIMEZONE6_8(6),
    TIMEZONE8_10(8),
    TIMEZONE10_12(10),
    TIMEZONE12_14(12),
    TIMEZONE14_16(14),
    TIMEZONE16_18(16),
    TIMEZONE18_20(18),
    TIMEZONE20_22(20),
    TIMEZONE22_24(22);

    @Getter
    private int order;

    StudyTimeZone(int order) {
        this.order = order;
    }

    public static StudyTimeZone of(int time){
        for (StudyTimeZone value : values()) {
            if (value.getOrder() == time){
                return value;
            }
        }
        throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "스터디 시간대 계산 중 오류가 발생하였습니다.");
    }
}

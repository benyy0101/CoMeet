package com.a506.comeet.common.enums;

import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.Getter;

public enum MostStudyTime {
    FROM0TO2(0),
    FROM2TO4(2),
    FROM4TO6(4),
    FROM6TO8(6),
    FROM8TO10(8),
    FROM10TO12(10),
    FROM12TO14(12),
    FROM14TO16(14),
    FROM16TO18(16),
    FROM18TO20(18),
    FROM20TO22(20),
    FROM22TO24(22);

    @Getter
    private int order;

    MostStudyTime(int order) {
        this.order = order;
    }

    public static MostStudyTime of(int time){
        for (MostStudyTime value : values()) {
            if (value.getOrder() == time){
                return value;
            }
        }
        throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "스터디 시간대 계산 중 오류가 발생하였습니다.");
    }
}

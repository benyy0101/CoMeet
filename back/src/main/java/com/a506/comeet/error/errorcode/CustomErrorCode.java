package com.a506.comeet.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode implements ErrorCode{

    NO_AUTHORIZATION(HttpStatus.FORBIDDEN, "권한이 없습니다"),
    DUPLICATE_VALUE(HttpStatus.BAD_REQUEST, "중복 값이 허용되지 않습니다");

    private final HttpStatus httpStatus;
    private final String message;
}

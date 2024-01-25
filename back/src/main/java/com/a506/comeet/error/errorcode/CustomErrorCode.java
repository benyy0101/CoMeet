package com.a506.comeet.error.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode implements ErrorCode{

    NO_AUTHORIZATION(HttpStatus.FORBIDDEN, "해당 기능에 대한 권한이 없는 사용자입니다"),
    DUPLICATE_VALUE(HttpStatus.BAD_REQUEST, "중복 값이 허용되지 않습니다"),
    NO_MEMBER(HttpStatus.BAD_REQUEST, "해당하는 사용자가 존재하지 않습니다"),
    HEADER_REFRESH_TOKEN_NOT_EXISTS(HttpStatus.BAD_REQUEST, "header에 refresh token이 존재하지 않습니다"),
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "서버가 보유하고 있는 refresh token이 존재하지 않습니다"),
    NOT_VALID_USER(HttpStatus.UNAUTHORIZED, "사용자 권한이 유효하지 없습니다"),
    WRONG_ACCESS_WITHOUT_AUTHORIZATION(HttpStatus.FORBIDDEN, "비정상적인 접근입니다");

    private final HttpStatus httpStatus;
    private final String message;
}

package com.mtb.game.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final String code;
    private final HttpStatus status;

    public ApiException(String code, String message, HttpStatus status) {
        super(message);
        this.code   = code;
        this.status = status;
    }

    public static ApiException notFound(String msg)      { return new ApiException("NOT_FOUND",      msg, HttpStatus.NOT_FOUND); }
    public static ApiException badRequest(String msg)    { return new ApiException("BAD_REQUEST",    msg, HttpStatus.BAD_REQUEST); }
    public static ApiException unauthorized(String msg)  { return new ApiException("UNAUTHORIZED",   msg, HttpStatus.UNAUTHORIZED); }
    public static ApiException conflict(String msg)      { return new ApiException("CONFLICT",       msg, HttpStatus.CONFLICT); }
    public static ApiException unprocessable(String code, String msg) {
        return new ApiException(code, msg, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

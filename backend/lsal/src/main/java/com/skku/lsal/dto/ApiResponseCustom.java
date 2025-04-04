package com.skku.lsal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "API 공통 응답 포맷")
public class ApiResponseCustom<T> {
    @Schema(description = "HTTP 상태코드", example = "200")
    private int status;

    @Schema(description = "응답 메시지", example = "회원가입 성공")
    private String message;

    @Schema(description = "응답 데이터")
    private T data;
}

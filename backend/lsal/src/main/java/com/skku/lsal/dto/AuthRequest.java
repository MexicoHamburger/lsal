package com.skku.lsal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "로그인 및 회원가입 요청")
public class AuthRequest {

    @Schema(description = "사용자 아이디", example = "user123")
    private String userid;

    @Schema(description = "사용자 비밀번호", example = "mypassword")
    private String password;
}

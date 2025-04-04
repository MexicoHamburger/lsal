package com.skku.lsal.controller;

import com.skku.lsal.dto.ApiResponseCustom;
import com.skku.lsal.dto.AuthRequest;
import com.skku.lsal.entity.User;
import com.skku.lsal.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @Operation(summary = "아이디 중복확인 API", description = "아이디 중복 여부 확인 (중복 시 400 응답)")
    @ApiResponse(responseCode = "200", description = "사용 가능한 아이디",
        content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"status\":200,\"message\":\"사용 가능한 아이디입니다.\",\"data\":false}")))
    @ApiResponse(responseCode = "400", description = "중복된 아이디",
        content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"status\":400,\"message\":\"이미 존재하는 아이디입니다.\",\"data\":true}")))
    @GetMapping("/check-id/{userid}")
    public ResponseEntity<ApiResponseCustom<Boolean>> checkDuplicate(@PathVariable String userid) {
        boolean exists = userRepository.existsByUserid(userid);

        if (exists) {
            ApiResponseCustom<Boolean> response = ApiResponseCustom.<Boolean>builder()
                    .status(400)
                    .message("이미 존재하는 아이디입니다.")
                    .data(true)
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            ApiResponseCustom<Boolean> response = ApiResponseCustom.<Boolean>builder()
                    .status(200)
                    .message("사용 가능한 아이디입니다.")
                    .data(false)
                    .build();
            return ResponseEntity.ok(response);
        }
    }

    @Operation(summary = "회원가입 API", description = "사용자 회원가입")
    @ApiResponse(responseCode = "200", description = "회원가입 성공",
        content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"status\":200,\"message\":\"회원가입 성공\",\"data\":{\"id\":1,\"userid\":\"user123\",\"createdAt\":\"2024-04-04T09:00:00\"}}")))
    @ApiResponse(responseCode = "400", description = "이미 존재하는 아이디",
        content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"status\":400,\"message\":\"이미 존재하는 아이디입니다.\",\"data\":null}")))
    @PostMapping("/signup")
    public ResponseEntity<ApiResponseCustom<User>> signup(@RequestBody AuthRequest request) {
        if (userRepository.existsByUserid(request.getUserid())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponseCustom.<User>builder()
                            .status(400)
                            .message("이미 존재하는 아이디입니다.")
                            .data(null)
                            .build());
        }
        User user = User.builder()
                .userid(request.getUserid())
                .password(request.getPassword())  // 비밀번호는 암호화 필요!
                .build();

        User savedUser = userRepository.save(user);
        savedUser.setPassword(null);

        return ResponseEntity.ok(ApiResponseCustom.<User>builder()
                .status(200)
                .message("회원가입 성공")
                .data(savedUser)
                .build());
    }

    @Operation(summary = "로그인 API", description = "사용자 로그인")
    @ApiResponse(responseCode = "200", description = "로그인 성공",
        content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"status\":200,\"message\":\"로그인 성공\",\"data\":{\"id\":1,\"userid\":\"user123\",\"createdAt\":\"2024-04-04T09:00:00\"}}")))
    @ApiResponse(responseCode = "401", description = "로그인 실패",
        content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"status\":401,\"message\":\"로그인 실패. 아이디 또는 비밀번호 확인\",\"data\":null}")))
    @PostMapping("/login")
    public ResponseEntity<ApiResponseCustom<User>> login(@RequestBody AuthRequest request) {
        Optional<User> optionalUser = userRepository.findByUserid(request.getUserid());

        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(request.getPassword())) {
            User user = optionalUser.get();
            user.setPassword(null);
            return ResponseEntity.ok(ApiResponseCustom.<User>builder()
                    .status(200)
                    .message("로그인 성공")
                    .data(user)
                    .build());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponseCustom.<User>builder()
                            .status(401)
                            .message("로그인 실패. 아이디 또는 비밀번호 확인")
                            .data(null)
                            .build());
        }
    }
}

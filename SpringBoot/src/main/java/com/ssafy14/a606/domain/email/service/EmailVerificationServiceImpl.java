package com.ssafy14.a606.domain.email.service;

import com.ssafy14.a606.domain.email.dto.response.EmailSendCodeResponseDto;
import com.ssafy14.a606.domain.email.dto.response.EmailVerifyCodeResponseDto;
import com.ssafy14.a606.domain.email.store.EmailVerificationCodeStore;
import com.ssafy14.a606.domain.email.store.EmailVerificationStatusStore;
import com.ssafy14.a606.domain.email.util.VerificationCodeGenerator;
import com.ssafy14.a606.global.exceptions.ExpiredVerificationCodeException;
import com.ssafy14.a606.global.exceptions.InvalidValueException;
import com.ssafy14.a606.global.mail.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmailVerificationServiceImpl implements EmailVerificationService {

    private final EmailSender emailSender;
    private final EmailVerificationCodeStore codeStore;
    private final VerificationCodeGenerator codeGenerator;
    private final EmailVerificationStatusStore statusStore;

    @Value("${app.email.dev-mode:true}")
    private boolean devMode;

    private static final Duration CODE_TTL = Duration.ofMinutes(5);
    private static final Duration VERIFIED_TTL = Duration.ofMinutes(30);

    // 이메일 인증코드 발송
    @Override
    @Transactional
    public EmailSendCodeResponseDto sendSignUpCode(String email) {

        if(email == null || email.isBlank()){
            throw new InvalidValueException("요청 값이 올바르지 않습니다.");
        }

        // 1) 인증코드 생성
        String code = codeGenerator.generate6Digit();

        // 2) Redis 저장 (TTL 5분) - 재전송 시 덮어쓰기
        codeStore.saveCode(email, code, CODE_TTL);

        // 3) 이메일 발송 (dev-mode면 콘솔 출력, 운영이면 EmailSender로 위임)
        sendEmail(email, code);

        return EmailSendCodeResponseDto.builder()
                .message("EMAIL_CODE_SENT")
                .build();
    }

    // 이메일 인증코드 검증
    @Override
    @Transactional
    public EmailVerifyCodeResponseDto verifyCode(String email, String code) {

        String saved = codeStore.getCode(email);

        // 만료/없음 -> 410
        if (saved == null) {
            throw new ExpiredVerificationCodeException("인증코드가 만료되었습니다.");
        }

        // 불일치 -> 200 OK
        if (!saved.equals(code)) {
            return EmailVerifyCodeResponseDto.invalidCode();
        }

        // 일치 -> 코드 삭제 + verified 마킹(Redis에 저장)
        codeStore.deleteCode(email);
        statusStore.markVerified(email, VERIFIED_TTL);

        return EmailVerifyCodeResponseDto.success();
    }

    @Override
    public boolean isVerified(String email) {
        return statusStore.isVerified(email);
    }

    /**
     * 이메일 발송 (dev-mode면 콘솔 출력, 운영이면 EmailSender로 위임)
     */
    private void sendEmail(String to, String code) {
        String subject = "[서울집사] 회원가입 이메일 인증 코드";
        String content =
                "안녕하세요, 서울집사입니다.\n\n" +
                        "회원가입 이메일 인증 코드: " + code + "\n\n" +
                        "이 코드는 5분간 유효합니다.\n\n" +
                        "본인이 요청하지 않은 경우 이 메일을 무시해주세요.";

        if (devMode) {
            log.info("========================================");
            log.info("[DEV MODE] 회원가입 이메일 인증 코드");
            log.info("수신자: {}", to);
            log.info("인증 코드: {}", code);
            log.info("유효 시간: 5분");
            log.info("========================================");
            return;
        }

        try {
            emailSender.send(to, subject, content);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("이메일 발송에 실패했습니다. 이메일 주소를 확인해주세요.");
        }
    }

}

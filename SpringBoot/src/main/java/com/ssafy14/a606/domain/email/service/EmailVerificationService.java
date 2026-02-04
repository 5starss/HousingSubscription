package com.ssafy14.a606.domain.email.service;

import com.ssafy14.a606.domain.email.dto.response.EmailSendCodeResponseDto;

public interface EmailVerificationService {

    EmailSendCodeResponseDto sendSignUpCode(String email);

}

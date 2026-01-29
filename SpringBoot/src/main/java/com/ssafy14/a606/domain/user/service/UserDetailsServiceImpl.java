package com.ssafy14.a606.domain.user.service;

import com.ssafy14.a606.domain.user.dto.request.UserDetailsRequestDto;
import com.ssafy14.a606.domain.user.dto.response.UserDetailsResponseDto;
import com.ssafy14.a606.domain.user.entity.User;
import com.ssafy14.a606.domain.user.entity.UserDetails;
import com.ssafy14.a606.domain.user.repository.UserDetailsRepository;
import com.ssafy14.a606.domain.user.repository.UserRepository;
import com.ssafy14.a606.global.exceptions.DuplicateValueException;
import com.ssafy14.a606.global.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDetailsRepository userDetailsRepository;
    private final UserRepository userRepository;

    // 추가정보 조회
    @Override
    public UserDetailsResponseDto getMyDetails(Long userId) {
        return userDetailsRepository.findById(userId)
                .map(this::toResponseDto)
                .orElseGet(() -> UserDetailsResponseDto.builder().build());
    }

    // 추가정보 입력 (최초 1회만)
    @Override
    @Transactional
    public void createMyDetails(Long userId, UserDetailsRequestDto requestDto) {

        if (userDetailsRepository.existsById(userId)) {
            throw new DuplicateValueException("이미 추가 정보가 존재합니다.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        UserDetails details = UserDetails.create(
                user,
                requestDto.getBirthDate(),
                requestDto.getTargetType(),
                requestDto.getMarriageStatus(),
                requestDto.getChildCount(),
                requestDto.getHouseOwn(),
                requestDto.getAsset(),
                requestDto.getIncome()
        );

        userDetailsRepository.save(details);
    }


    // 추가정보 수정
    @Override
    @Transactional
    public void updateMyDetails(Long userId, UserDetailsRequestDto requestDto) {

        UserDetails details = userDetailsRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("추가 정보를 찾을 수 없습니다."));

        details.updatePatch(
                requestDto.getBirthDate(),
                requestDto.getTargetType(),
                requestDto.getMarriageStatus(),
                requestDto.getChildCount(),
                requestDto.getHouseOwn(),
                requestDto.getAsset(),
                requestDto.getIncome()
        );
    }




    private UserDetailsResponseDto toResponseDto(UserDetails details) {
        LocalDate birthDate = details.getBirthDate();
        Integer age = (birthDate == null) ? null : Period.between(birthDate, LocalDate.now()).getYears();

        return UserDetailsResponseDto.builder()
                .birthDate(birthDate)
                .age(age)
                .targetType(details.getTargetType())
                .marriageStatus(details.getMarriageStatus())
                .childCount(details.getChildCount())
                .houseOwn(details.getHouseOwn())
                .asset(details.getAsset())
                .income(details.getIncome())
                .build();
    }


}

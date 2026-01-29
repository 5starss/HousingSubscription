package com.ssafy14.a606.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="user_details")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserDetails {

    @Id
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * Users와 1:1 관계
     * PK = FK 구조이므로 @MapsId 사용
     */
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 생년월일
     */
    @Column(name = "birth_date")
    private LocalDate birthDate;

    /**
     * 대상 유형(청년/대학생/신혼/기타)
     * YOUTH / STUDENT / NEWLYWED / EITHER
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", length = 20)
    private TargetType targetType;

    /**
     * 결혼 여부
     * SINGLE / MARRIED / PLANNED
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "marriage_status", length = 20)
    private MarriageStatus marriageStatus;

    /**
     * 자녀 수
     */
    @Column(name = "child_count")
    private Integer childCount;

    /**
     * 주택 보유 여부 (YES=보유, NO=미보유)
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "house_own", length = 10)
    private HouseOwn houseOwn;

    /**
     * 자산 (원 단위)
     */
    @Column(name = "asset")
    private Long asset;

    /**
     * 소득 (원 단위)
     */
    @Column(name = "income")
    private Long income;

    public static UserDetails create(User user,
                                     LocalDate birthDate,
                                     TargetType targetType,
                                     MarriageStatus marriageStatus,
                                     Integer childCount,
                                     HouseOwn houseOwn,
                                     Long asset,
                                     Long income) {
        return new UserDetails(
                user.getId(),   // PK=FK 강제
                user,
                birthDate,
                targetType,
                marriageStatus,
                childCount,
                houseOwn,
                asset,
                income
        );
    }

    public void updatePatch(
            LocalDate birthDate,
            TargetType targetType,
            MarriageStatus marriageStatus,
            Integer childCount,
            HouseOwn houseOwn,
            Long asset,
            Long income
    ) {
        if (birthDate != null) this.birthDate = birthDate;
        if (targetType != null) this.targetType = targetType;
        if (marriageStatus != null) this.marriageStatus = marriageStatus;
        if (childCount != null) this.childCount = childCount;
        if (houseOwn != null) this.houseOwn = houseOwn;
        if (asset != null) this.asset = asset;
        if (income != null) this.income = income;
    }
}

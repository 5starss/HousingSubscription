

# 서울집사(Seoul Jibsa) 
<img src="Docs/images/MainPage.png" alt="메인 화면" width="800" />

**서울집사**(26.01.05 ~ 26.02.10)는 서울시 주거 지원 정책과 SH 공고를 한 곳에서 탐색할 수 있도록 돕는 **AI 챗봇 기반 서비스**입니다.  
사용자는 복잡한 공고 PDF를 일일이 읽지 않아도, 질문만으로 **자격 요건·신청 방법·필요 서류·일정**을 빠르게 확인할 수 있습니다.  
또한 서울시 지원 사업 정보까지 함께 제공해, 공고와 혜택을 **상황에 맞게 연결**해 줍니다.

## 🛠 Tech Stack (Program Source)

### Frontend
![React](https://img.shields.io/badge/React_19.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios_1.13.2-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS_4.1.18-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand_5.0.10-443E38?style=for-the-badge&logo=react&logoColor=white)

### Backend
![Java](https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![SpringBoot](https://img.shields.io/badge/SpringBoot_4.0.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle_7.6-02303A?style=for-the-badge&logo=gradle&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.12.10-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI_0.128.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn_0.40.0-2C3E50?style=for-the-badge&logo=gunicorn&logoColor=white)

### Database
![MySQL](https://img.shields.io/badge/MySQL_9.5.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis_8.4.0-FF4438?style=for-the-badge&logo=redis&logoColor=white)
![Chroma](https://img.shields.io/badge/Chroma_1.4.2-E13F3F?style=for-the-badge&logo=chromadb&logoColor=white)

### Server
![Ubuntu](https://img.shields.io/badge/Ubuntu_24.04LTS-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx_1.29.4-009639?style=for-the-badge&logo=nginx&logoColor=white)

---

## 📜 Git Convention

### Commit Message Tags
| 태그 (Tag) | 설명 (Description) | 사용 예시 (Example) |
|:---:|:---|:---|
| **Feat** | 새로운 기능을 추가할 때 (가장 많이 사용) | `Feat: 로그인 API 구현`, `Feat: 메인 페이지 버튼 추가` |
| **Fix** | 버그를 수정할 때 | `Fix: 로그인 NullPointerException 해결`, `Fix: 오타 수정` |
| **Docs** | 문서(README 등)만 수정했을 때 | `Docs: README에 실행 방법 추가`, `Docs: API 문서 업데이트` |
| **Chore** | 빌드 설정, 패키지 매니저 설정 등 (코드 로직 X) | `Chore: build.gradle 의존성 추가`, `Chore: .gitignore 수정` |
| **Refactor** | 기능 변경 없이 코드 구조만 개선했을 때 | `Refactor: 중복 코드 제거`, `Refactor: 변수명 변경` |
| **Style** | 코드 포맷팅, 세미콜론 누락 등 (코드 로직 X) | `Style: 코드 줄바꿈 정리`, `Style: 불필요한 공백 제거` |
| **Test** | 테스트 코드 추가/수정 (실제 코드 변경 X) | `Test: 회원가입 서비스 테스트 코드 작성` |

### 규칙 (Rules)
* **Merge Rule**: PM제외 Develop에 자체 Merge 금지 / 같은 팀 또는 PM이 Merge

### Git Strategy
* **Git Flow 방식 사용**
  * `main`
  * `hotfix`
  * `develop`
  * `feature`

## 💡 주요 기능

| 기능                      | 내용                                                                                                                                |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| **메인 챗봇**                   | 서울시 주거 지원 정책과 청약 관련 용어를 자연어로 질문하면, 핵심 개념을 쉽게 풀어 설명하고 필요한 정보를 빠르게 안내합니다. |
| **상세 조회(PDF 핵심 요약)**               | 선택한 SH/서울시 공고 PDF를 자동으로 요약해 **자격 요건·신청 일정·절차·제출 서류** 등 사용자가 꼭 봐야 할 내용을 한눈에 확인할 수 있습니다.    |
| **SH공고 전용 챗봇(공고 기반 질의응답)** | 특정 공고(PDF) 내용을 기반으로 사용자가 추가 질문을 하면, 해당 문서 맥락에 맞춰 답변해 공고 이해와 의사결정을 돕습니다.                  |
| **주거 용어 퀴즈**   | 공고에서 자주 등장하는 용어를 퀴즈 형태로 학습하여, 사용자가 공고를 스스로 읽고 이해할 수 있는 역량을 키워줍니다.            |
| **성향 테스트 기반 추천 공고 유형**            | 사용자의 상황/선호(예: 거주 형태, 우선순위, 생활 패턴 등)를 성향 테스트로 파악해, **추천 공고 유형**을 제시합니다.                                       |

<br />

<div id="5"></div>

## 📂 프로젝트 구성도

|                                   아키텍처(Architecture)                                   |
| :----------------------------------------------------------------------------------------: |
| <img src="Docs/images/SystemArchitecture.png" alt="메인 화면" width="800" /> |

|                              개체-관계 모델(ERD)                               |
| :----------------------------------------------------------------------------: |
| <img src="Docs/images/ERD.png" alt="개체-관계 모델(ERD)" width="1000px" /> |

<br />

<div id="6"></div>

## 🎥 소개 영상(클릭 후 5~10초 대기)
- [소개 영상 보기](Docs/videos/intro.mp4)


## 👪 팀원 소개

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/mingy1206" target="_blank">
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/seoyeong5864" target="_blank">
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/yundda" target="_blank">
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/Mrjeonmacho" target="_blank">
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/5starss" target="_blank">
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/qqjiwoon" target="_blank">
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/mingy1206" target="_blank">
        이민기<br />(AI, Infra & 팀장)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/seoyeong5864" target="_blank">
        박서영<br />(Back-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/yundda" target="_blank">
        윤다선<br />(Back-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Mrjeonmacho" target="_blank">
        전기정<br />(AI, Back-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/5starss" target="_blank">
        조원혁<br />(Front-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/qqjiwoon">
        홍지운<br />(Front-end)
      </a>
    </td>
  </tr>
</table>

<br />

<br />

| 이름 | 역할 | 주요 수행 내용 |
|---|---|---|
| 이민기 | 팀장, AI, Infra | - 프로젝트 리딩 및 일정/진행 관리<br />&nbsp;&nbsp;&nbsp;&nbsp;- Jira 일정 관리 및 배분<br />- 설계/산출물<br />&nbsp;&nbsp;&nbsp;&nbsp;- 서비스/시스템 아키텍처 구성 및 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- 간트 차트 페이지 생성(일정 시각화)<br />- Infra/배포 환경 구축<br />&nbsp;&nbsp;&nbsp;&nbsp;- GCP 인프라 설치(운영 서버 및 DB)<br />&nbsp;&nbsp;&nbsp;&nbsp;- SSAFY AWS EC2 Jenkins Pipeline 구축<br />- AI 개발(문서 기반 기능 준비)<br />&nbsp;&nbsp;&nbsp;&nbsp;- 공고/정책 PDF 수집 및 임베딩용 변환<br />&nbsp;&nbsp;&nbsp;&nbsp;- PDF 텍스트 변환<br />&nbsp;&nbsp;&nbsp;&nbsp;- PDF 변환 텍스트 검수<br />&nbsp;&nbsp;&nbsp;&nbsp;- 챗봇 시나리오 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- 발표 시연 |
| 박서영 | BE | - DB 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- RDB(MySQL) 스키마 설계 및 구축<br />- Spring Boot 기반 RESTful API 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 로컬 로그인 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- OAuth2 기반 구글·카카오 소셜 로그인 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원가입 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원 기본/추가 정보 조회 및 수정 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 아이디 찾기 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원 탈퇴 도메인 개발(탈퇴 시 인증 정보 및 토큰 정리)<br />- 이메일 인증 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- SMTP Server·Redis 기반 인증 코드 발송 및 검증<br />- 인증/인가 및 토큰 관리<br />&nbsp;&nbsp;&nbsp;&nbsp;- JWT 토큰 생성 및 관리 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- Spring Security + JWT 기반 인증·인가 처리<br />&nbsp;&nbsp;&nbsp;&nbsp;- Redis 기반 로그아웃 및 토큰 재발급 플로우 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- RefreshToken Rotation 적용(재사용 방지/무효화 처리) |
| 윤다선 | BE | - DB 설계 및 데이터 구성<br />&nbsp;&nbsp;&nbsp;&nbsp;- RDB(MySQL) 스키마 설계 및 구축<br />&nbsp;&nbsp;&nbsp;&nbsp;- 핵심 도메인 관계 설계 및 매핑<br />&nbsp;&nbsp;&nbsp;&nbsp;- 퀴즈 구조 기반 데이터 적재 SQL 작성 및 적용<br />- 인증/권한 관련 수정<br />&nbsp;&nbsp;&nbsp;&nbsp;- Admin 권한 API 경로 분리<br />- Spring Boot + JPA 기반 RESTful API 서버 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 찜(즐겨찾기) 기능 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 게임 도메인 기능 개발<br />- 주거 성향 테스트<br />&nbsp;&nbsp;&nbsp;&nbsp;- 응답 기반 점수 계산<br />&nbsp;&nbsp;&nbsp;&nbsp;- 결과 응답(추천 카테고리 포함) 제공<br />- 용어 퀴즈(객관식)<br />&nbsp;&nbsp;&nbsp;&nbsp;- 랜덤 문제 제공(보기 포함)<br />&nbsp;&nbsp;&nbsp;&nbsp;- 선택 기반 채점 및 해설 응답 제공 |
| 전기정 | AI, BE | - DB 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- RDB(MySQL) 스키마 설계 및 구축<br />&nbsp;&nbsp;&nbsp;&nbsp;- Vector DB(ChromaDB) 설계 및 구축(챗봇 RAG 활용)<br />- Spring Boot 기반 RESTful API 서버 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 공고(Notice) 도메인 개발(CRUD, 검색, 필터링)<br />&nbsp;&nbsp;&nbsp;&nbsp;- 사용자 맞춤형 공고 추천/조회 기능 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 관리자 기능 개발(공고 관리 등)<br />- FastAPI 기반 AI/챗봇 API 서버 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 한국어 임베딩 모델 기반 인덱싱 파이프라인 구축(벡터 변환 → ChromaDB 저장)<br />&nbsp;&nbsp;&nbsp;&nbsp;- LangChain·ChromaDB 활용 RAG 챗봇 기능 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 공고 내용 요약(Summarization) API 구현 |
| 조원혁 | FE | - 인증/회원 흐름 UI 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 로그인 / 소셜로그인 / 회원가입 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 로그인 인증 여부 확인 구현<br />- 마이페이지 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원 기본 정보 조회 / 수정<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원 추가 정보 조회 / 수정<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원 탈퇴<br />- 공고 상세 페이지 구현<br />- AI 챗봇 UI/UX 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 대화 흐름 및 Quick Action 인터페이스 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- AI 챗봇 응답·AI 요약 섹션 마크다운 렌더링 구현<br />- 스타일/테마<br />&nbsp;&nbsp;&nbsp;&nbsp;- Tailwind v4 기반 테마 제어 |
| 홍지운 | FE | - 메인 홈/랜딩/온보딩(집사의 체크인) 화면 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- Hero Search, 공고 캐러셀, 단계형 스크롤 인터랙션 구현<br />- 청약 공고 조회 UI 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 공고 목록·상세 페이지 구성, 상태별 UI 분기 처리<br />&nbsp;&nbsp;&nbsp;&nbsp;- Optimistic UI 기반 즐겨찾기(찜) 기능 구현<br />- 대화형 안내(채팅) UI 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 메시지 리스트/입력 영역/자동 스크롤 처리<br />- 청약 용어 퀴즈 및 주거 성향 테스트 개발<br />- 프론트엔드 구조 및 컴포넌트 아키텍처 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- 폴더 구조 설계, 도메인 단위 컴포넌트 분리<br />&nbsp;&nbsp;&nbsp;&nbsp;- React + TypeScript 기반 컴포넌트 개발<br />- 상태/라우팅 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- Zustand 기반 전역 UI 상태 관리(Alert·Modal) 및 라우팅 구조 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- Protected Route 적용<br />- UI 품질 개선<br />&nbsp;&nbsp;&nbsp;&nbsp;- Tailwind CSS 기반 반응형 UI 및 Skeleton UI 적용 |



// 가입 거절 사유 기본값.
// PATCH /admin/accounts/{userId}/rejection 은 rejectionReason 을 필수로 받는데, 승인대기 목록의
// '거절' 버튼에는 사유 입력 UI 가 없다(Figma 시안에도 없음). 사유 없이 보내면 요청 자체가 실패하므로
// 감사 로그에 남을 기본 문구를 둔다.
// [TODO] 사유 입력 모달이 생기면 이 상수 대신 관리자가 입력한 값을 넘긴다.
export const ACCOUNT_REJECTION_DEFAULT_REASON = '관리자 검토 결과 승인되지 않았습니다.'

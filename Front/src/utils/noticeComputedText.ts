// Front\src\utils\noticeComputedText.ts => “상태 텍스트”를 최종 결정
import { noticeStatusLabel, statusLabel } from "./noticeFormat";
import { computeNoticeStatus, type ComputedNoticeStatus } from "./noticeStatus";
import type { Notice } from "../pages/NoticesPage";

export function getNoticeComputedStatusText(n: Pick<Notice, "startDate" | "endDate" | "status">) {
  const computed: ComputedNoticeStatus | null = computeNoticeStatus(n.startDate, n.endDate);

  const fromDates = noticeStatusLabel(computed);
  if (fromDates !== "-") return String(fromDates);

  return String(statusLabel(n.status ?? undefined));
}

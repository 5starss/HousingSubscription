// Front\src\components\notices\favorites\FavoritesNoticeCard.tsx
import { noticeStatusLabel } from "../../../utils/noticeFormat";
import { computeNoticeStatus, type ComputedNoticeStatus } from "../../../utils/noticeStatus";
import type { Notice } from "../../../pages/NoticesPage";
import CategoryBadge from "../../../components/common/CategoryBadge";

type Props = {
  notice: Notice;
  isPending: boolean;
  onClick: () => void;
  onUnfavorite: () => void;
};

function fallbackComputedStatusFromBackend(
  backendStatus: string | null | undefined
): ComputedNoticeStatus {
  switch (backendStatus) {
    case "TO_BE_ANNOUNCED":
      return "UPCOMING";
    case "RECEIVING":
      return "RECRUITING";
    case "DEADLINE_APPROACHING":
      return "DEADLINE_SOON";
    case "COMPLETED":
      return "CLOSED";
    default:
      return "UPCOMING";
  }
}

function statusToneByComputed(status: ComputedNoticeStatus) {
  switch (status) {
    case "DEADLINE_SOON":
      return "text-red-500";
    case "RECRUITING":
      return "text-green-600";
    case "UPCOMING":
      return "text-gray-600";
    case "CLOSED":
      return "text-gray-500";
  }
}

export default function FavoritesNoticeCard({
  notice,
  isPending,
  onClick,
  onUnfavorite,
}: Props) {
  const computedStatus =
    computeNoticeStatus(notice.startDate, notice.endDate) ??
    fallbackComputedStatusFromBackend(notice.status);

  const statusText = noticeStatusLabel(computedStatus);
  const statusClass = statusToneByComputed(computedStatus);

  return (
    <div
      data-fav-card
      onClick={onClick}
      className="
        relative cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm
        transition hover:shadow-md
        shrink-0
        w-[calc((100%-2rem)/3)]
        min-w-[260px]
      "
    >
      <CategoryBadge category={notice.category} size="md" />

      <button
        type="button"
        className="absolute right-6 top-6 text-red-500 hover:text-red-600 disabled:opacity-60"
        aria-label="찜 해제"
        disabled={isPending}
        onClick={(e) => {
          e.stopPropagation();
          onUnfavorite();
        }}
      >
        ❤
      </button>

      <h3 className="mt-4 line-clamp-2 text-base font-semibold text-gray-900">
        {notice.title}
      </h3>

      <div className="mt-6 flex items-center justify-between">
        <span className={`text-sm font-medium ${statusClass}`}>{statusText}</span>
        <span className="text-gray-300">→</span>
      </div>
    </div>
  );
}

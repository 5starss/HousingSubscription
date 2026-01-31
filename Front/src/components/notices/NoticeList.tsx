// Front\src\components\notices\NoticeList.tsx => 리스트(로딩/빈 상태/맵)
import type { Notice } from "../../pages/NoticesPage";
import NoticeListItem from "./NoticeListItem";

type Props = {
  loading: boolean;
  items: Notice[];
  isFavorite: (id: number) => boolean;
  isPending: (id: number) => boolean;
  onOpen: (id: number) => void;
  onToggleFavorite: (id: number) => void;
};

function SkeletonRow() {
  return (
    <div className="rounded-[20px] bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-6">
        <div className="h-24 w-32 rounded-2xl bg-gray-100 animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-7 w-3/4 rounded bg-gray-100 animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
            <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-6 w-12 rounded bg-gray-100 animate-pulse" />
          <div className="h-6 w-6 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function NoticeList({
  loading,
  items,
  isFavorite,
  isPending,
  onOpen,
  onToggleFavorite,
}: Props) {
  return (
    <div className="space-y-4">
      {loading ? (
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      ) : items.length === 0 ? (
        <div className="rounded-[20px] border border-gray-100 bg-white px-6 py-12 text-center text-gray-500 shadow-sm">
          표시할 공고가 없습니다.
        </div>
      ) : (
        items.map((n) => (
          <NoticeListItem
            key={n.id}
            notice={n}
            isFavorite={isFavorite(n.id)}
            isPending={isPending(n.id)}
            onOpen={onOpen}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      )}
    </div>
  );
}

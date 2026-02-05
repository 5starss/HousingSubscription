/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type ComponentPropsWithoutRef } from "react";

type Props = {
  summary?: string;
};

// HTML 속성 + node 속성 정의
type MarkdownComponentProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  node?: object;
};

export default function NoticeAiSummary({ summary }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-blue-100 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* 토글 버튼 (헤더 역할) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 transition-colors duration-300
          ${isOpen ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
            ${isOpen ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}
          `}>
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div className="text-left">
            <h3 className={`font-bold text-base ${isOpen ? "text-blue-900" : "text-gray-900"}`}>
              AI 공고 요약
            </h3>
            {!isOpen && (
              <p className="text-xs text-gray-500">클릭하여 요약 내용을 확인하세요</p>
            )}
          </div>
        </div>

        <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`}>
          keyboard_arrow_down
        </span>
      </button>

      {/* 요약 내용 (펼쳐짐) */}
      {isOpen && (
        <div className="px-5 pb-6 pt-2 bg-blue-50/50 animate-fade-in-down">
          <div className="p-5 bg-white rounded-xl border border-blue-100 text-gray-700 leading-relaxed text-[15px] shadow-sm">
             {summary ? (
               // ReactMarkdown 적용
               <ReactMarkdown
                 remarkPlugins={[remarkGfm]}
                 components={{
                   // 링크
                   a: ({ node, ...props }: MarkdownComponentProps<"a">) => (
                     <a
                       {...props}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-500"
                     />
                   ),
                   // 리스트 (ul)
                   ul: ({ node, ...props }: MarkdownComponentProps<"ul">) => (
                     <ul {...props} className="list-disc pl-4 my-2 space-y-1" />
                   ),
                   // 리스트 (ol)
                   ol: ({ node, ...props }: MarkdownComponentProps<"ol">) => (
                     <ol {...props} className="list-decimal pl-4 my-2 space-y-1" />
                   ),
                   // 리스트 아이템
                   li: ({ node, ...props }: MarkdownComponentProps<"li">) => (
                     <li {...props} className="pl-1" />
                   ),
                   // 볼드체
                   strong: ({ node, ...props }: MarkdownComponentProps<"strong">) => (
                     <strong {...props} className="font-bold text-gray-900" />
                   ),
                   // 인용문
                   blockquote: ({ node, ...props }: MarkdownComponentProps<"blockquote">) => (
                     <blockquote
                       {...props}
                       className="border-l-4 border-gray-300 pl-3 my-2 text-gray-500 italic"
                     />
                   ),
                   // 테이블
                   table: ({ node, ...props }: MarkdownComponentProps<"table">) => (
                     <div className="overflow-x-auto my-2">
                       <table {...props} className="min-w-full border-collapse border border-gray-200 text-sm" />
                     </div>
                   ),
                   th: ({ node, ...props }: MarkdownComponentProps<"th">) => (
                     <th {...props} className="border border-gray-300 px-2 py-1 bg-gray-50 font-semibold" />
                   ),
                   td: ({ node, ...props }: MarkdownComponentProps<"td">) => (
                     <td {...props} className="border border-gray-300 px-2 py-1 font-normal" />
                   ),
                   // 문단
                   p: ({ node, ...props }: MarkdownComponentProps<"p">) => (
                     <p {...props} className="mb-2 last:mb-0" />
                   ),
                   h1: ({ node, ...props }: MarkdownComponentProps<"h1">) => (
                    <h1 {...props} className="text-xl font-bold mt-4 mb-2" />
                  ),
                  h2: ({ node, ...props }: MarkdownComponentProps<"h2">) => (
                    <h2 {...props} className="text-lg font-bold mt-3 mb-2" />
                  ),
                  h3: ({ node, ...props }: MarkdownComponentProps<"h3">) => (
                    <h3 {...props} className="text-base font-bold mt-2 mb-1" />
                  ),
                 }}
               >
                 {summary}
               </ReactMarkdown>
             ) : (
               <span className="text-gray-400 flex items-center gap-2 justify-center py-4">
                 <span className="material-symbols-outlined text-gray-300">error_outline</span>
                 제공된 요약 정보가 없습니다.
               </span>
             )}
          </div>
        </div>
      )}
    </section>
  );
}
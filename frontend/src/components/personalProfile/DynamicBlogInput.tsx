import { useState, useRef } from "react";

export default function DynamicBlogInput() {
  const [blogList, setBlogList] = useState<string[]>([""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const addBlog = () => {
    setBlogList((prev) => {
      const newList = [...prev, ""];
      setTimeout(() => {
        const lastIndex = newList.length - 1;
        inputRefs.current[lastIndex]?.focus();
      }, 0);
      return newList;
    });
  };

  const handleChange = (index: number, value: string) => {
    const newList = [...blogList];
    newList[index] = value;
    setBlogList(newList);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBlog();
    }
  };

  const removeBlog = (index: number) => {
    if (blogList.length === 1) return; // 최소 1개 보장
    setBlogList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {blogList.map((url, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="url"
            ref={(el) => { inputRefs.current[index] = el }}
            value={url}
            placeholder="블로그 링크를 입력하세요 (Enter로 추가)"
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="flex-[3] border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={() => removeBlog(index)}
            className="text-red-400 hover:text-red-600 cursor-pointer text-sm"
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
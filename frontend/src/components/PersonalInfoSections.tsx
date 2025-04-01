import { useState } from "react";
import DynamicHistoryInput from './DynamicHistoryInput';
import DynamicCertInput from './DynamicCertInput';

export default function PersonalInfoSections() {
  const [blogList, setBlogList] = useState<string[]>([]);

  const addBlog = () => {
    setBlogList((prev) => [...prev, ""]);
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

  const sections = [
    {
      left: '성명',
      right: (
        <input
          type="text"
          placeholder="이름을 입력하세요"
          className="w-full border rounded px-3 py-2"
        />
      ),
    },
    {
      left: '이력',
      right: <DynamicHistoryInput />,
    },
    {
      left: '자격증 목록',
      right: <DynamicCertInput />,
    },
    {
      left: '개인 블로그 링크',
      right: (
        <div className="space-y-2">
          {blogList.map((url, index) => (
            <input
              key={index}
              type="url"
              value={url}
              placeholder="블로그 링크를 입력하세요 (Enter로 추가)"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full border rounded px-3 py-2"
            />
          ))}
          <button
            onClick={addBlog}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            + 블로그 추가
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {sections.map((section, idx) => (
        <div key={idx} className="flex mb-4">
          <div className="w-1/3 font-semibold">{section.left}</div>
          <div className="w-2/3">{section.right}</div>
        </div>
      ))}
    </>
  );
}

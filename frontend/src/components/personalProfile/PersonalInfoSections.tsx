import { useState } from "react";
import DynamicHistoryInput from './DynamicHistoryInput';
import DynamicCertInput from './DynamicCertInput';
import DynamicBlogInput from "./DynamicBlogInput";

export default function PersonalInfoSections() {
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
      right: <DynamicBlogInput />,
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

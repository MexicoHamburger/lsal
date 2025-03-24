import { useEffect, useState } from "react";
import pwStrength1 from "@/assets/pw-strength-1.svg";
import pwStrength2 from "@/assets/pw-strength-2.svg";
import pwStrength3 from "@/assets/pw-strength-3.svg";
import {
  getPasswordStrengthMessage,
  getSafetyLevel
} from "@/utils/password";

const strengthSvgMap: { [key: number]: string } = {
  1: pwStrength1,
  2: pwStrength2,
  3: pwStrength3,
};

interface Props {
  password: string;
  onStrengthChange? : (isStrong : boolean) => void;
}

export default function PasswordStrengthIndicator({ password, onStrengthChange }: Props) {
  const [safetyLevel, setSafetyLevel] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const level = getSafetyLevel(password);
    setSafetyLevel(level);
    setMessage(getPasswordStrengthMessage(password));
    onStrengthChange?.(level > 0);
  }, [password]);

  if (!password) return null;
  const imgSrc = strengthSvgMap[safetyLevel];

  return (
    <div className="flex items-center justify-center">
      <p className="text-sm mr-2 whitespace-pre-line">{message}</p>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={`Password strength level ${safetyLevel}`}
          width={70}
          height={20}
        />
      )}
    </div>
  );
}

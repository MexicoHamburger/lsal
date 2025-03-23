import pwStrength1 from "@/assets/pw-strength-1.svg";
import pwStrength2 from "@/assets/pw-strength-2.svg";
import pwStrength3 from "@/assets/pw-strength-3.svg";

const strengthSvgMap: { [key: number]: string } = {
    1: pwStrength1,
    2: pwStrength2,
    3: pwStrength3,
};

interface Props {
    password: string;
    safetyLevel: number;
    message: string;
}

export default function PasswordStrengthIndicator({ password, safetyLevel, message }: Props) {
    if (!password) return null;
    const imgSrc = strengthSvgMap[safetyLevel];

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm mr-2">{message}</p>
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

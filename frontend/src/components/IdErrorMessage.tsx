import { useEffect, useState } from "react";
import {
    getIdErrorMessage
} from "@/utils/id";

interface Props {
    id : string;
    onValidityChange?: (isIdValid: boolean) => void;
}

export default function IdErrorMessage ({id , onValidityChange } : Props) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const msg = getIdErrorMessage(id);
        setMessage(msg);
        onValidityChange?.(msg === "" && !!id);
    }, [id]);

    if (!id || message === "") {
        return null;
    }

    return (
        <div className="flex items-center justify-center">
          <p className="text-sm mr-2 whitespace-pre-line">{message}</p>
        </div>
      );
}
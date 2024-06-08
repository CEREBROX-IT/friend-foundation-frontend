import { FC } from "react";



interface LoadingMessage {
    message: string
}

const LoadingAnimation:FC<LoadingMessage> = ({message}) => {
  return (
    <div className="relative flex gap-2">
      <div>
        <div className="h-5 w-5 rounded-full border-t-1 border-b-1 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default LoadingAnimation;
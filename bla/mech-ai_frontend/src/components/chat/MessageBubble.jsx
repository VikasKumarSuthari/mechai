import React from 'react';
import { Check, CheckCheck, Clock } from 'lucide-react';

const MessageBubble = ({ message, isOwn }) => {
  const { content, type, timestamp, status = 'sent', fileName } = message;

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[70%] ${
          isOwn
            ? 'bg-blue-500 text-white rounded-l-lg rounded-br-lg'
            : 'bg-white text-gray-800 rounded-r-lg rounded-bl-lg'
        } p-3 shadow`}
      >
        {type === 'text' && <p className="whitespace-pre-wrap">{content}</p>}

        {type === 'file' && (
          <div className="space-y-2">
            {content.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img
                src={content}
                alt={fileName}
                className="max-w-full rounded"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-100 rounded">
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{fileName}</p>
                  <p className="text-xs text-gray-500">
                    {Math.round(message.fileSize / 1024)} KB
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div
          className={`flex items-center space-x-1 mt-1 text-xs ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          <span>{formatTime(timestamp)}</span>
          {isOwn && getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
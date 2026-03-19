import { useRef, useState } from "react";
import api from "../../services/api";

export default function MediaUploadButton({ 
  onUpload, 
  folder = "reena-gore/general",
  accept = "image/png,image/jpeg,image/jpg,image/webp",
  maxSize = 5, // MB
  buttonText = "Upload Image",
  showPreview = false,
  className = ""
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const validateFile = (file) => {
    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileType = file.type;
    if (!acceptedTypes.some(type => fileType.match(type.replace('image/', '')))) {
      throw new Error(`Invalid file type. Please upload: ${accept.replace(/image\//g, '')}`);
    }

    // Check file size (in MB)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      throw new Error(`File size too large. Maximum size is ${maxSize}MB`);
    }

    return true;
  };

  const handleSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setProgress(0);

    // Show preview if enabled
    if (showPreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    try {
      // Validate file
      validateFile(file);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", folder);

      setUploading(true);

      // Simulate progress (since axios doesn't support upload progress by default)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const { data } = await api.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearInterval(progressInterval);
      setProgress(100);
      
      // Wait a moment to show 100% before closing
      setTimeout(() => {
        onUpload?.(data?.data);
        setPreview(null);
        setProgress(0);
        setUploading(false);
      }, 500);
      
    } catch (error) {
      console.error("Image upload failed:", error);
      setError(error.response?.data?.message || error.message || "Image upload failed");
      setPreview(null);
      setUploading(false);
      setProgress(0);
    } finally {
      event.target.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && inputRef.current) {
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
      
      // Trigger change event
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleSelect}
      />

      {/* Preview area (if enabled and has preview) */}
      {showPreview && preview && (
        <div className="mb-4 overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50/30 p-2">
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="h-32 w-full rounded-lg object-cover"
            />
            <button
              onClick={() => setPreview(null)}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200 ${
          uploading 
            ? "border-[#FFD700] bg-[#FFD700]/5" 
            : error
            ? "border-red-300 bg-red-50/50 hover:border-red-400"
            : "border-indigo-200 bg-white hover:border-[#FFD700] hover:bg-[#FFD700]/5"
        }`}
      >
        {/* Progress overlay */}
        {uploading && progress > 0 && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-indigo-900/20 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        )}

        <div className="relative px-6 py-4">
          <div className="flex flex-col items-center gap-3 text-center">
            {/* Upload icon */}
            <div className={`rounded-full p-3 transition-all duration-200 ${
              uploading 
                ? "bg-[#FFD700]/20" 
                : error
                ? "bg-red-100"
                : "bg-indigo-100 group-hover:bg-[#FFD700]/20"
            }`}>
              {uploading ? (
                <svg className="h-6 w-6 animate-spin text-[#FFD700]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : error ? (
                <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            {/* Upload text */}
            <div>
              <p className="text-sm font-medium text-black">
                {uploading ? (
                  <span className="flex items-center gap-2">
                    Uploading... {progress}%
                  </span>
                ) : error ? (
                  <span className="text-red-600">Upload failed</span>
                ) : (
                  buttonText
                )}
              </p>
              <p className="mt-1 text-xs text-indigo-900/50">
                {uploading ? (
                  "Please wait while we process your file"
                ) : error ? (
                  <span className="text-red-500">{error}</span>
                ) : (
                  `Click or drag & drop • Max ${maxSize}MB • ${accept.replace(/image\//g, '')}`
                )}
              </p>
            </div>

            {/* Progress bar */}
            {uploading && (
              <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-indigo-100">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-indigo-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Retry button (if error) */}
            {error && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setError(null);
                  inputRef.current?.click();
                }}
                className="mt-2 rounded-lg bg-gradient-to-r from-indigo-900 to-black px-4 py-2 text-xs font-medium text-[#FFD700] transition-all hover:shadow-lg hover:shadow-[#FFD700]/20"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* File info helper */}
      <p className="mt-2 text-xs text-indigo-900/40">
        Supported formats: {accept.replace(/image\//g, '').replace(/,/g, ', ')}
      </p>
    </div>
  );
}
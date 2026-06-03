import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import api from "../../services/api";

const imageAccept = "image/png,image/jpeg,image/jpg,image/webp";
const fileAccept = ".pdf,.doc,.docx,.zip,.mp4";

export default function UniversalUpload({
  type = "image", // image | file
  onUpload,
  folder = "reena-gore/general",
  maxSize = 5, // MB
  buttonText,
  showPreview = true,
  className = "",
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const isImage = type === "image";
  const accept = isImage ? imageAccept : fileAccept;
  const endpoint = isImage ? "/uploads/image" : "/uploads/file";
  const fieldName = isImage ? "image" : "file";

  const compressImage = async (file) => {
    if (!file.type.startsWith("image/")) return file;

    return imageCompression(file, {
      maxSizeMB: Math.min(maxSize, 1.5),
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.8,
    });
  };

  const validateFile = (file) => {
    if (isImage && !file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > maxSize) {
      throw new Error(`File too large. Maximum size is ${maxSize}MB`);
    }
  };

  const processAndUpload = async (file) => {
    setError("");
    setProgress(0);
    setUploading(true);

    try {
      const uploadFile = isImage ? await compressImage(file) : file;

      validateFile(uploadFile);

      if (showPreview && isImage) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(uploadFile);
      }

      const formData = new FormData();
      formData.append(fieldName, uploadFile, file.name);
      formData.append("folder", folder);

      const { data } = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (!event.total) return;
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });

      setProgress(100);
      onUpload?.(data?.data);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.response?.data?.message || err.message || "Upload failed");
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await processAndUpload(file);
    event.target.value = "";
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file || uploading) return;

    await processAndUpload(file);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleSelect}
      />

      {showPreview && preview && isImage ? (
        <div className="mb-4 overflow-hidden rounded-xl border p-2">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-full rounded-lg object-cover"
          />
        </div>
      ) : null}

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
          error
            ? "border-red-300 bg-red-50"
            : uploading
            ? "border-yellow-400 bg-yellow-50"
            : "border-slate-300 bg-white hover:bg-slate-50"
        }`}
      >
        <p className="text-sm font-medium text-slate-900">
          {uploading
            ? `Uploading... ${progress}%`
            : buttonText || (isImage ? "Upload Image" : "Upload File")}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {error || `Click or drag & drop • Max ${maxSize}MB`}
        </p>

        {uploading ? (
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
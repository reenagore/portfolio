import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { TableKit } from "@tiptap/extension-table";
import CharacterCount from "@tiptap/extension-character-count";
import MediaUploadButton from "./MediaUpload";

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-[#FFD700] to-[#FFD700]/90 text-black shadow-md shadow-[#FFD700]/20"
          : "border border-indigo-200 bg-white text-indigo-900/70 hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-indigo-200"></div>;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  uploadFolder = "reena-gore/general",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg shadow-lg my-4 mx-auto max-w-full",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class:
            "text-[#FFD700] underline decoration-indigo-300 hover:text-indigo-900 transition-colors",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      TableKit,
      CharacterCount,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[320px] rounded-b-2xl border-x border-b border-indigo-200 bg-white px-6 py-6 outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-200",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();
    if ((value || "") !== currentHtml) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageFromUpload = (uploaded) => {
    if (!editor || !uploaded?.url) return;
    editor.chain().focus().setImage({ src: uploaded.url }).run();
  };

  const insertTable = () => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  if (!editor) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-indigo-200 bg-white p-8">
        <p className="text-sm text-indigo-900/60">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-indigo-200 bg-gradient-to-b from-white to-indigo-50/30 shadow-lg shadow-indigo-900/5">
      <div className="flex flex-wrap items-center gap-1 rounded-t-2xl border-b border-indigo-200 bg-gradient-to-r from-indigo-50/50 to-white p-3">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          B
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          I
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          U
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          1. List
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          Left
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          Center
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          Right
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={setLink}
          active={editor.isActive("link")}
          title="Insert Link"
        >
          Link
        </ToolbarButton>

        <ToolbarButton onClick={insertTable} title="Insert Table">
          Table
        </ToolbarButton>

        <div className="ml-auto">
          <MediaUploadButton
            folder={uploadFolder}
            onUpload={addImageFromUpload}
            buttonText="Image"
          />
        </div>
      </div>

      <BubbleMenu editor={editor}>
        <div className="flex gap-1 rounded-xl border border-indigo-200 bg-white p-1 shadow-xl shadow-indigo-900/10">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            B
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            I
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            U
          </ToolbarButton>
          <Divider />
          <ToolbarButton
            onClick={setLink}
            active={editor.isActive("link")}
            title="Insert Link"
          >
            Link
          </ToolbarButton>
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />

      <div className="flex justify-end gap-4 rounded-b-2xl border-t border-indigo-100 bg-indigo-50/30 px-4 py-2 text-xs text-indigo-900/40">
        <span>{editor.storage.characterCount?.words() || 0} words</span>
        <span>{editor.storage.characterCount?.characters() || 0} characters</span>
      </div>
    </div>
  );
}
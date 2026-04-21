"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Image as ImageIcon, Link as LinkIcon, Minus
} from "lucide-react";

interface PostEditorProps {
  content: string;
  onChange: (html: string) => void;
}

/**
 * Rich text editor powered by Tiptap.
 * Toolbar covers: bold, italic, headings, lists, blockquote, image, link, hr.
 */
export default function PostEditor({ content, onChange }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose-nail min-h-[400px] outline-none px-0 py-4",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt("Link URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const toolbarButtons = [
    { title: "Bold", icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { title: "Italic", icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { title: "Heading 2", icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { title: "Heading 3", icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
    { title: "Bullet list", icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { title: "Numbered list", icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { title: "Blockquote", icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { title: "Divider", icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), active: false },
    { title: "Image", icon: ImageIcon, action: addImage, active: false },
    { title: "Link", icon: LinkIcon, action: addLink, active: editor.isActive("link") },
  ];

  return (
    <div className="border border-rule rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 p-2 bg-cream-warm border-b border-rule">
        {toolbarButtons.map(({ title, icon: Icon, action, active }) => (
          <button
            key={title}
            type="button"
            title={title}
            onClick={action}
            className={`w-8 h-8 rounded flex items-center justify-center transition-colors
              ${active ? "bg-gold text-ink" : "text-ink-soft hover:bg-cream-deep hover:text-ink"}`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div className="bg-white px-6 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

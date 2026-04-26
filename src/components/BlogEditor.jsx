"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import Underline from "@tiptap/extension-underline";

const extensions = [
  StarterKit,
  Placeholder.configure({ placeholder: "Write your blog content..." }),
  Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
  Image.configure({ inline: false }),
  Underline,
  Table.configure({ resizable: false }),
  TableRow,
  TableCell,
  TableHeader,
];

const controls = [
  {
    label: "B",
    title: "Bold",
    command: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    label: "I",
    title: "Italic",
    command: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    label: "U",
    title: "Underline",
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  { separator: true },
  {
    label: "H1",
    title: "Heading 1",
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    label: "H2",
    title: "Heading 2",
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    label: "H3",
    title: "Heading 3",
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  { separator: true },
  {
    label: "•",
    title: "Bullet List",
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    label: "1.",
    title: "Ordered List",
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  { separator: true },
  {
    label: "\"",
    title: "Blockquote",
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    label: "<>",
    title: "Code Block",
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];

// Inline link dialog component — uses <div> not <form> to avoid nesting inside BlogForm's <form>
const LinkDialog = ({ editor, savedSelection, onClose }) => {
  const [url, setUrl] = useState(() => editor.getAttributes("link").href || "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const applyLink = () => {
    const trimmed = url.trim();
    const hasSel = savedSelection && savedSelection.from !== savedSelection.to;
    if (!trimmed) {
      // Remove link — restore selection first if we have one
      const chain = hasSel
        ? editor.chain().setTextSelection(savedSelection)
        : editor.chain().focus();
      chain.unsetLink().run();
    } else {
      const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      if (hasSel) {
        // Apply link to exactly the saved selection in one chained transaction
        editor
          .chain()
          .setTextSelection(savedSelection)
          .setLink({ href, target: "_blank", rel: "noopener noreferrer" })
          .run();
      } else {
        // Cursor only — store the mark so next typed text is linked
        editor.chain().focus().setLink({ href, target: "_blank", rel: "noopener noreferrer" }).run();
      }
    }
    onClose();
  };

  const handleRemove = () => {
    const hasSel = savedSelection && savedSelection.from !== savedSelection.to;
    const chain = hasSel
      ? editor.chain().setTextSelection(savedSelection)
      : editor.chain().focus();
    chain.unsetLink().run();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); applyLink(); }
    if (e.key === "Escape") onClose();
  };

  return (
    <div className="editor__link-backdrop" onClick={onClose}>
      <div
        className="editor__link-dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="editor__link-dialog-title">Insert Link</div>
        <input
          ref={inputRef}
          className="editor__link-input"
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="editor__link-actions">
          {editor.isActive("link") && (
            <button type="button" className="editor__link-btn editor__link-btn--remove" onClick={handleRemove}>
              Remove
            </button>
          )}
          <button type="button" className="editor__link-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="editor__link-btn editor__link-btn--primary" onClick={applyLink}>
            {url.trim() ? "Apply" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogEditor = ({ value, onChange }) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const savedSelectionRef = useRef(null);

  const editor = useEditor({
    extensions,
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && typeof value === "string" && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  // Selection is now saved in the button's onMouseDown (before blur).
  // This callback is kept for any keyboard-triggered open in the future.
  const handleLinkClick = useCallback(() => {
    if (!editor) return;
    if (!savedSelectionRef.current) {
      const { from, to } = editor.state.selection;
      savedSelectionRef.current = { from, to };
    }
    setShowLinkDialog(true);
  }, [editor]);

  const actions = useMemo(
    () =>
      controls.map((control) => {
        if (control.separator) return control;
        return {
          ...control,
          run: () => editor && control.command(editor),
          isActive: () => (editor ? control.isActive(editor) : false),
        };
      }),
    [editor]
  );

  if (!editor) {
    return <div className="editor editor--loading">Loading editor...</div>;
  }

  return (
    <div className="editor">
      <div className="editor__toolbar">
        {actions.map((control, i) => {
          if (control.separator) {
            return <span key={`sep-${i}`} className="editor__toolbar-sep" />;
          }
          return (
            <button
              key={control.label}
              type="button"
              title={control.title}
              onClick={control.run}
              className={control.isActive() ? "active" : ""}
            >
              {control.label}
            </button>
          );
        })}
        <span className="editor__toolbar-sep" />
        <button
          type="button"
          title="Insert / Edit Link"
          onMouseDown={(e) => {
            // preventDefault stops the editor from losing focus so the selection stays intact
            e.preventDefault();
            if (editor) {
              const { from, to } = editor.state.selection;
              savedSelectionRef.current = { from, to };
            }
          }}
          onClick={() => setShowLinkDialog(true)}
          className={editor.isActive("link") ? "active" : ""}
        >
          🔗
        </button>
      </div>
      {showLinkDialog && (
        <LinkDialog
          editor={editor}
          savedSelection={savedSelectionRef.current}
          onClose={() => setShowLinkDialog(false)}
        />
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;

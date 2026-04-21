/**
 * New FileUploader component — uploads to Cloudinary via the backend.
 *
 * REPLACES the base64-storing FileUploader in page.jsx.
 * Returns a file object with a permanent CDN URL instead of a giant base64 string.
 *
 * Usage is IDENTICAL to before:
 *   <FileUploader onUpload={(file) => ...} accept=".pdf" maxMB={10} label="..." />
 *
 * The file object shape:
 *   {
 *     name: string,          - original filename
 *     size: number,          - bytes
 *     type: string,          - mime type
 *     url: string,           - Cloudinary CDN URL (replaces the old `data` base64 field)
 *     publicId: string,      - for deletion
 *     date: string,          - upload date
 *   }
 *
 * Backward compatibility: components reading `file.data` should now read `file.url`.
 * The FileList component below handles both.
 */

import { useRef, useState } from 'react';
import api from './api';

export function FileUploader({ onUpload, accept, maxMB = 15, label }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const process = async (file) => {
    if (!file) return;
    setError('');
    if (file.size > maxMB * 1024 * 1024) {
      setError(`File too large — max ${maxMB}MB`);
      return;
    }
    setBusy(true);
    try {
      const result = await api.uploadFile(file);
      onUpload({
        name: result.name,
        size: result.size,
        type: result.type,
        url: result.url,
        publicId: result.publicId,
        date: result.date,
      });
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = '';
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          process(e.dataTransfer.files[0]);
        }}
        onClick={() => !busy && ref.current?.click()}
        style={{
          border: `2px dashed ${drag ? '#1B4D7E' : '#ccc'}`,
          borderRadius: 10,
          padding: '18px 14px',
          textAlign: 'center',
          cursor: busy ? 'wait' : 'pointer',
          background: drag ? '#e8f0fe' : '#fafafa',
          transition: 'all .2s',
          opacity: busy ? 0.6 : 1,
        }}
      >
        <input
          ref={ref}
          type="file"
          accept={accept || '*'}
          hidden
          onChange={(e) => process(e.target.files[0])}
        />
        {busy ? (
          <div style={{ color: '#1B4D7E', fontWeight: 600 }}>
            Uploading to cloud…
          </div>
        ) : (
          <>
            <div style={{ fontSize: 24, marginBottom: 4 }}>☁️</div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#333' }}>
              {label || 'Click or drag file here'}
            </div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
              PDF, DOCX, XLSX, Images — max {maxMB}MB
            </div>
          </>
        )}
      </div>
      {error && (
        <div style={{
          background: '#fde8e8', color: '#c0392b', padding: '6px 10px',
          borderRadius: 6, fontSize: 12, marginTop: 6,
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

/**
 * Updated FileList component — handles BOTH old (base64 `data`) and new (Cloudinary `url`) files.
 * For new files, downloads open the Cloudinary URL directly (faster, no memory hit).
 */
export function FileList({ files, onDelete }) {
  if (!files?.length) {
    return (
      <div style={{
        fontSize: 12, color: '#bbb', fontStyle: 'italic', padding: '6px 0',
      }}>
        No files attached.
      </div>
    );
  }

  const ico = (t) => {
    if (t?.includes('pdf')) return '📄';
    if (t?.includes('word') || t?.includes('docx')) return '📝';
    if (t?.includes('sheet') || t?.includes('xlsx')) return '📊';
    if (t?.includes('image')) return '🖼️';
    if (t?.includes('ppt')) return '📽️';
    return '📎';
  };

  const fmtSize = (b) => {
    if (!b) return '';
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
  };

  const download = (f) => {
    // New: Cloudinary URL
    if (f.url) {
      window.open(f.url, '_blank');
      return;
    }
    // Old: base64 data (backward compat for existing data)
    if (f.data) {
      const a = document.createElement('a');
      a.href = f.data;
      a.download = f.name;
      a.click();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {files.map((f, i) => (
        <div
          key={f.publicId || f.id || i}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', background: '#f9f9fb',
            borderRadius: 8, border: '1px solid #f0f0f0',
          }}
        >
          <span style={{ fontSize: 18 }}>{ico(f.type)}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 500,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {f.name}
            </div>
            <div style={{ fontSize: 10, color: '#999' }}>
              {fmtSize(f.size)} · {f.date}{f.teacher && ` · ${f.teacher}`}
            </div>
          </div>
          {(f.url || f.data) && (
            <button
              onClick={(e) => { e.stopPropagation(); download(f); }}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 15, padding: 2,
              }}
              title="Open / Download"
            >
              ⬇️
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(i); }}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', color: '#c0392b', fontSize: 13,
              }}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

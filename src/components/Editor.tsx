import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';
import React, { useEffect, useRef } from 'react';

import '@toast-ui/editor/dist/toastui-editor.css';
import { uploadPostMedia } from '@/apis/sns';
import { usePostContent } from '@/stores/usePostContent';

import { css } from '../../styled-system/css';

const TuiEditor = () => {
  const editorRef = useRef<Editor>(null);
  const MAX_LENGTH = 1200;
  const LOADING_TEXT = (blob: File) => `<p>[${blob.name}](uploading...)</p>`;

  const { setContent } = usePostContent();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return '페이지를 벗어나시겠습니까?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const extractTextFromHTML = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    const html = editorInstance.getHTML();
    const extracted = extractTextFromHTML(html);
    if (editorInstance && extracted.length <= MAX_LENGTH) {
      setContent(html);
    }
  };

  const uploadImage = async (blob: File) => {
    const instance = editorRef.current?.getInstance();
    const currentContent = instance.getHTML();
    instance.setHTML(currentContent + LOADING_TEXT(blob));

    const formData = new FormData();
    formData.append('file', blob);

    const data = await uploadPostMedia(formData);
    const isValid = data.code === 'OK';

    const contentWithoutLoading = instance
      .getHTML()
      .replace(LOADING_TEXT(blob), isValid ? '' : '<p>이미지 로딩 실패</p>');
    instance.setHTML(contentWithoutLoading);
    return isValid ? data.data.url : '';
  };

  return (
    <div className={styles.editor_wrapper}>
      <Editor
        ref={editorRef}
        initialValue={' '}
        previewStyle="tab"
        height="743px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        placeholder="내용을 입력해주세요."
        onChange={handleChange}
        hideModeSwitch={true}
        plugin={[colorSyntax]}
        hooks={{
          addImageBlobHook: async (blob: File, callback: any) => {
            const imageUrl = await uploadImage(blob);
            callback(imageUrl, blob.name);
            return false;
          },
        }}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'codeblock'],
        ]}
      />
    </div>
  );
};

export default TuiEditor;

const styles = {
  editor_wrapper: css({
    marginTop: '20px',
    zIndex: 100,
    position: 'relative',
  }),
};

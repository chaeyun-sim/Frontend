import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';

import '@toast-ui/editor/dist/toastui-editor.css';
import { css } from '../../styled-system/css';
import { center } from '../../styled-system/patterns';

interface IProps {
  onChange: (value: string) => void;
}

const TuiEditor = ({ onChange }: IProps) => {
  const editorRef = useRef<Editor>(null);
  const MAX_LENGTH = 1200;
  const isLoading = false;

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
      onChange(html);
    }
  };

  // TODO: 이미지 저장을 위해 API 필요
  // 참고: https://teawon.github.io/next/toast-ui-editor-image-uplaod/
  const handleUploadImage = async (
    blob: File,
    callback: (imageUrl: string, fileName: string) => void
  ) => {
    // uploadImageMutation(blob, {
    //   onSuccess: (data) => {
    //     callback(data.imageUrl, blob.name);
    //   },
    // });
    return false;
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
        plugin={[colorSyntax, { onUploadImage: handleUploadImage }]}
      />
      {isLoading && (
        <div className={styles.loading_box}>
          <span className={styles.loading_text}>이미지 업로드 중...</span>
        </div>
      )}
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
  loading_box: center({
    position: 'absolute',
    top: '46px',
    left: '1px',
    right: '1px',
    bottom: '1px',
    backgroundColor: '#fcfcfc',
    zIndex: 100,
  }),
  loading_text: css({
    textStyle: 'caption2',
    color: 'gray.900',
  }),
};
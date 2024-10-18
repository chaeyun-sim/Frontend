// /types: TypeScript 타입 정의 파일을 저장하는 폴더

export interface IRes<T> {
  data: T;
  message: string;
}

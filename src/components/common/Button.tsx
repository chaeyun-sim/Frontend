// /components: 재사용 가능한 UI 컴포넌트를 저장

interface IProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
}

const Button = ({ text, size = 'medium' }: IProps) => {
  return <button>{text}</button>;
};

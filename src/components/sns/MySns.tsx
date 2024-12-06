import SnsHeader from './mysns/SnsHeader';
import SnsMain from './mysns/SnsMain';
import { snsStyles } from './Sns';

interface IProps {
  data?: ISnsDetail | null;
}

const MySns = ({ data }: IProps) => {
  return (
    <div className={snsStyles.container}>
      <SnsHeader
        profileUrl={data?.profileUrl || ''}
        nickname={data?.nickname || ''}
      />
      <SnsMain title={data?.title || ''} content={data?.content || ''} />
    </div>
  );
};

export default MySns;

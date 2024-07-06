import { type FC, memo } from 'react';
import module from './Header.module.scss';

interface IProps {

}

export const Header: FC<IProps> = memo(() => {
  return (
    <div className={ module.Header }>
    
    </div>
  );
});
import { ButtonHTMLAttributes, type FC, memo, ReactElement } from 'react';
import module from './Button.module.scss';
import classNames from 'classnames';

type BtnSize = 'lg' | 'sm' | 'xs'
type BtnMode = 'primary' | 'secondary' | 'outline' | 'ghost'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  icon?: boolean
  size?: BtnSize
  mode?: BtnMode
  children: ReactElement
}

export const Button: FC<IProps> = memo<IProps>((props) => {
  const { icon, children, isActive, size = 'lg', mode = 'primary', className, ...rest } = props;
  const clazz = classNames(module.Button, { [module.Icon]: icon, [module.Active]: isActive }, [module[size], module[mode], className])
  
  return (
    <button className={ clazz } {...rest}>
      {children}
    </button>
  );
});
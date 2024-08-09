import { Button } from 'shared/ui/Button';
import { Copy, Tick } from '../../assets';
import module from './Welcome.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { userID } from 'entities/User';

const timeout = 3000;
const link = `${location.origin}/session-${userID}`;

export const Welcome = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyHandler = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), timeout);
    return navigator.clipboard.writeText(link);
  };

  const copyIcon = isCopied ? <Tick /> : <Copy />;

  return (
    <div className={module.wrapper}>
      <h1>
        Добро пожаловать в <span>Paint online!</span>
      </h1>
      <h3>Отправь ссылку другу и наслаждайтесь рисованием вместе!</h3>
      <div className={module.link}>
        <Link to={link}>{link}</Link>
        <Button
          icon
          size='xs'
          mode='secondary'
          title='Скопировать'
          onClick={copyHandler}
        >
          {copyIcon}
        </Button>
      </div>
    </div>
  );
};

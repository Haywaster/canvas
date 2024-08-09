import type { FormEvent } from 'react';
import { type ChangeEvent, type FC, memo, useState } from 'react';
import module from './UsernameModal.module.scss';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';

interface IProps {
  isOpen: boolean;
  onComeIn: (value: string) => void;
}

export const UsernameModal: FC<IProps> = memo(props => {
  const { isOpen, onComeIn } = props;
  const [username, setUsername] = useState<string>('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (username) {
      onComeIn(username);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <form className={module.usernameModal} onSubmit={submitHandler}>
        <h2>Введите ваше имя</h2>
        <input
          placeholder='Имя'
          name='username'
          required
          maxLength={20}
          minLength={3}
          value={username}
          type='text'
          onChange={changeHandler}
        />
        <Button type='submit'>Войти</Button>
      </form>
    </Modal>
  );
});

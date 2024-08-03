import type { ChangeEvent, FC } from 'react';
import { memo, useState } from 'react';
import module from './PaintOptionPanel.module.scss';
import type { PaintingOptions } from 'entities/Tool';
import { usePainting } from 'features/Painting';
import { useShallow } from 'zustand/react/shallow';
import { useDebounce } from 'shared/lib';
import { paintingOptions } from 'widgets/Header/model';

const delay = 300;

export const PaintOptionPanel: FC = memo(() => {
  const { options, setOptions } = usePainting(
    useShallow(({ options, setOptions }) => ({ options, setOptions }))
  );
  const [visibleOptions, setVisibleOptions] =
    useState<PaintingOptions>(options);

  const debounce = useDebounce((id: keyof PaintingOptions, value: string) => {
    setOptions(id, value);
  }, delay);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setVisibleOptions(prev => ({ ...prev, [id]: value }));
    debounce(id as keyof PaintingOptions, value);
  };

  return (
    <>
      {paintingOptions.map(({ id, label, type, max, min }) => (
        <div key={id} className={module.optionWrapper}>
          <label htmlFor={id}>{label}</label>
          <input
            onChange={changeHandler}
            id={id}
            type={type}
            value={visibleOptions[id]}
            max={max}
            min={min}
          />
        </div>
      ))}
    </>
  );
});

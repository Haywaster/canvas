import type { ChangeEvent, FC } from 'react';
import { memo, useState } from 'react';
import module from './PaintOptionPanel.module.scss';
import type { InputTool, PaintingOptions } from 'entities/Tool';
import { usePainting } from 'features/Painting';
import { useShallow } from 'zustand/react/shallow';
import { useDebounce } from 'shared/lib';

const paintingOptions: InputTool[] = [
  { id: 'strokeColor', label: 'Обводка', type: 'color' },
  { id: 'fillColor', label: 'Заливка', type: 'color' },
  {
    id: 'strokeWidth',
    label: 'Толщина',
    type: 'range',
    min: '1',
    max: '10'
  }
];

export const PaintOptionPanel: FC = memo(() => {
  const { options, setOptions } = usePainting(
    useShallow(({ options, setOptions }) => ({ options, setOptions }))
  );
  const [visibleOptions, setVisibleOptions] =
    useState<PaintingOptions>(options);

  const debounce = useDebounce((id: keyof PaintingOptions, value: string) => {
    setOptions(id, value);
  }, 300);

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

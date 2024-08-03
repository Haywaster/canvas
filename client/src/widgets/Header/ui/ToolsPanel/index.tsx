import type { MouseEventHandler } from 'react';
import { type FC, memo, useCallback } from 'react';
import module from './ToolsPanel.module.scss';
import { Index } from 'shared/ui/Button';
import type { Tools } from 'entities/Tool';
import { isPaintingTool } from 'entities/Tool';
import { emptyCanvas, usePainting, useMakeAction } from 'features/Painting';
import { useShallow } from 'zustand/react/shallow';
import { tools } from 'widgets/Header/model';

export const ToolsPanel: FC = memo(() => {
  const { currentTool, setCurrentTool, imageList, canceledImageList } =
    usePainting(
      useShallow(
        ({ currentTool, setCurrentTool, imageList, canceledImageList }) => ({
          currentTool,
          setCurrentTool,
          imageList,
          canceledImageList
        })
      )
    );
  const makeAction = useMakeAction();

  const handleToolChange: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      const tool = event.currentTarget.dataset.key as Tools;

      if (isPaintingTool(tool)) {
        setCurrentTool(tool);
      } else {
        if (makeAction) {
          makeAction(tool);
        }
      }
    },
    [makeAction, setCurrentTool]
  );

  const getDisabled = (key: Tools): boolean => {
    if (key === 'clearAll' || key === 'download') {
      const saveImage = localStorage.getItem('saveImage');

      if (saveImage) {
        return imageList.length === 0 && saveImage === emptyCanvas;
      }

      return imageList.length === 0;
    }
    if (key === 'undo' || key === 'save') {
      return imageList.length === 0;
    }
    if (key === 'redo') {
      return canceledImageList.length === 0;
    }

    return false;
  };

  return (
    <>
      {tools.map(([key, Icon]) => (
        <Index
          disabled={getDisabled(key)}
          data-key={key}
          key={key}
          icon
          isActive={key === currentTool}
          className={module[key]}
          onClick={handleToolChange}
        >
          <Icon />
        </Index>
      ))}
    </>
  );
});

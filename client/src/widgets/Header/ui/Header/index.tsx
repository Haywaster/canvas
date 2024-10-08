import type { FC } from 'react';
import { memo } from 'react';

import module from './Header.module.scss';
import { ToolsPanel } from '../ToolsPanel';
import { PaintOptionPanel } from '../PaintOptionPanel';

const panels: FC[] = [ToolsPanel, PaintOptionPanel];

export const Header: FC = memo(() => (
  <header className={module.header}>
    {panels.map((Panel, index) => (
      <div key={index} className={module.panel}>
        <Panel />
      </div>
    ))}
  </header>
));

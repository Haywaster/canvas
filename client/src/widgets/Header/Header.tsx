import type { FC } from 'react';
import { memo } from 'react';

import module from './Header.module.scss';
import { ToolsPanel, PaintOptionPanel } from 'features/ToolsPanel/ui';

export const Header: FC = memo(() => (
  <header className={module.header}>
    <div className={module.panel}>
      <ToolsPanel />
    </div>
    <div className={module.panel}>
      <PaintOptionPanel />
    </div>
  </header>
));

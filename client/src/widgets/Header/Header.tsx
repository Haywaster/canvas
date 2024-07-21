import type { FC } from 'react';
import { memo } from 'react';

import module from './Header.module.scss';
import { ToolsPanel, PaintOptionPanel } from 'features/ToolsPanel/ui';

export const Header: FC = memo(() => (
  <header className={module.header}>
    <ToolsPanel />
    <PaintOptionPanel />
  </header>
));

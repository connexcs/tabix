import React, { useCallback } from 'react';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { ServerStructure } from 'services';

export enum ServerAction {
  OpenProcesses = 1,
  OpenMetrics,
  OpenDbOverview,
  OpenServerOverview,
  OpenSqlHistory,
}

export const ContextMenuProps = {};

export interface ContextMenuProps {
  server: ServerStructure.Server;
  onContextMenuAction?: (action: ServerAction, server: ServerStructure.Server) => void;
}

export default function ContextMenu({ onContextMenuAction, server }: ContextMenuProps) {
  const onClick = useCallback(({ key, domEvent }: ClickParam) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    onContextMenuAction && ServerAction[key] && onContextMenuAction(+key as ServerAction, server);
  }, []);

  return (
    <Menu selectable={false} onClick={onClick}>
      <Menu.Item key={ServerAction.OpenProcesses}>Список процессов сервера</Menu.Item>
      <Menu.Item key={ServerAction.OpenDbOverview}>Обзор базы данных</Menu.Item>
      <Menu.Item key={ServerAction.OpenServerOverview}>Обзор сервера</Menu.Item>
      <Menu.Item key={ServerAction.OpenMetrics}>Метрики сервера</Menu.Item>
      <Menu.Item key={ServerAction.OpenSqlHistory}>История sql запросов</Menu.Item>
    </Menu>
  );
}

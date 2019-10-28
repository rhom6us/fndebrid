import {app, Menu, Tray} from 'electron';
import path from 'path';
import {showAddMagnet, showMain, showPreferences} from './windows';

export let appIcon: Tray | undefined;

export function createAppIcon() {
  if (appIcon) {
    return appIcon;
  }
  appIcon = new Tray(path.resolve(__static, 'favicon-16x16.png'));
  appIcon.setToolTip('real-debrid.com in the tray.');
  appIcon.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show Main Window',
        click: showMain,
      },
      {
        label: 'Add magnet link',
        async click() {
          const result = await showAddMagnet();
        },
      },
      {
        label: 'Preferences',
        click: showPreferences,
      },
      {
        label: 'Quit',
        click: app.quit,
      },
    ]),
  );
  app.on('quit', () => {
    appIcon && appIcon.destroy();
    appIcon = undefined;
  });
  return appIcon;
}

import { PanelPlugin } from '@grafana/data';
import CustomEditor from 'components/CustomEditor';
import { ButtonsPanel, ButtonsPanelProps } from './components/SimplePanel';
import { getDefaultLinkButtonProps } from 'utils';

export const plugin = new PanelPlugin<ButtonsPanelProps>(ButtonsPanel);

plugin.setPanelOptions((builder) => {
  return builder.addCustomEditor({
    editor: CustomEditor,
    defaultValue: {
      buttons: [getDefaultLinkButtonProps()],
      stack: { direction: 'row', alignItems: 'center', justifyContent: 'center' },
    },
    name: '',
    id: 'buttons-editor',
    path: 'state',
  });
});

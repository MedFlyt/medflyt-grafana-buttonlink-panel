import { PanelPlugin, availableIconsIndex } from '@grafana/data';
import { LinkButtonProps, SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<LinkButtonProps>(SimplePanel).setPanelOptions((builder) => {
  return (
    builder
      .addTextInput({
        path: 'children',
        name: 'Text',
        defaultValue: 'Click Me!',
        settings: {
          expandTemplateVars: true,
          useTextarea: true,
          rows: 3,
        },
      })
      .addTextInput({
        path: 'href',
        name: 'Link',
        settings: {
          expandTemplateVars: true,
          useTextarea: true,
          rows: 2,
          placeholder: 'https://example.com',
        },
      })
      .addTextInput({
        path: 'tooltip',
        name: 'Tooltip',
        settings: {
          expandTemplateVars: true,
          useTextarea: true,
          rows: 2,
          placeholder: 'Tooltip',
        },
      })
      .addSelect({
        path: 'variant',
        name: 'Button variant',
        defaultValue: 'primary',
        settings: {
          options: [
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' },
            { value: 'destructive', label: 'Destructive' },
            { value: 'success', label: 'Success' },
          ],
        },
      })
      .addRadio({
        path: 'size',
        name: 'Button size',
        defaultValue: 'md',
        settings: {
          options: [
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ],
        },
      })
      .addRadio({
        path: 'fill',
        name: 'Button fill',
        defaultValue: 'solid',
        settings: {
          options: [
            { value: 'solid', label: 'Solid' },
            { value: 'outline', label: 'Outline' },
            { value: 'text', label: 'Text' },
          ],
        },
        })
      .addSelect({
        path: 'icon',
        name: 'Icon',
        settings: {
          isClearable: true,
          options: Object.keys(availableIconsIndex).map((icon) => ({
            value: icon,
            label: icon,
          })),
        },
      })
      // open external link
      .addBooleanSwitch({
        path: 'externalLink',
        name: 'Open external link',
        defaultValue: false,
      })
      .addBooleanSwitch({
        path: 'disabled',
        name: 'Disabled',
        defaultValue: false,
      })
  );
});

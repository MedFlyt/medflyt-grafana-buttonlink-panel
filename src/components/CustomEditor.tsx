import { PanelOptionsEditorProps, availableIconsIndex } from '@grafana/data';
import { Box, Button, Divider, Field, Input, RadioButtonGroup, Select, Stack, Switch, TextArea } from '@grafana/ui';
import React from 'react';
import { LinkButtonProps } from 'types';
import { getDefaultLinkButtonProps } from 'utils';
import { ButtonsPanelProps } from './SimplePanel';

export default function CustomEditor({ value, onChange }: PanelOptionsEditorProps<ButtonsPanelProps['state']>) {
  return (
    <Stack direction="column">
      <Box>
        <Field label="Buttons Direction">
          <RadioButtonGroup
            options={[
              { value: 'row' as const, label: 'Row' },
              { value: 'column' as const, label: 'Column' },
            ]}
            value={value.stack.direction}
            onChange={(direction) => onChange({ ...value, stack: { ...value.stack, direction } })}
            fullWidth={true}
          />
        </Field>
        

        <Field label="Buttons Alignment">
          <RadioButtonGroup
            options={[
              { value: 'flex-start' as const, label: 'Start' },
              { value: 'center' as const, label: 'Center' },
              { value: 'flex-end' as const, label: 'End' },
            ]}
            value={value.stack.alignItems}
            onChange={(alignItems) => onChange({ ...value, stack: { ...value.stack, alignItems } })}
            fullWidth={true}
          />
        </Field>

        <Field label="Buttons Justify Content">
          <RadioButtonGroup
            options={[
              { value: 'flex-start' as const, label: 'Start' },
              { value: 'center' as const, label: 'Center' },
              { value: 'flex-end' as const, label: 'End' },
            ]}
            value={value.stack.justifyContent}
            onChange={(justifyContent) => onChange({ ...value, stack: { ...value.stack, justifyContent } })}
            fullWidth={true}
          />
        </Field>
      </Box>

      {value.buttons.map((button, index) => (
        <>
          <Box key={index}>
            <ButtonOptions
              button={button}
              onChange={(newButton) =>
                onChange({
                  ...value,
                  buttons: newButton
                    ? value.buttons.map((b, i) => (i === index ? newButton : b))
                    : value.buttons.filter((_, i) => i !== index),
                })
              }
            />
          </Box>
          <Divider />
        </>
      ))}
      <Box>
        <Button
          size="sm"
          icon="plus"
          variant="secondary"
          fullWidth={true}
          onClick={() => onChange({ ...value, buttons: [...value.buttons, getDefaultLinkButtonProps()] })}
        >
          Add Button
        </Button>
      </Box>
    </Stack>
  );
}

function ButtonOptions({
  button,
  onChange,
}: {
  button: LinkButtonProps;
  onChange: (button: LinkButtonProps | null) => void;
}) {
  return (
    <Box>
      <Field label="Text">
        <Input
          value={button.children?.toString() ?? ''}
          onChange={(event) => onChange({ ...button, children: (event.target as HTMLInputElement).value })}
        />
      </Field>

      <Field label="Link">
        <TextArea
          rows={3}
          placeholder="https://example.com?var=${variable}"
          value={button.href?.toString() ?? ''}
          onChange={(event) => onChange({ ...button, href: (event.target as HTMLInputElement).value })}
        />
      </Field>

      <Field label="Tooltip">
        <Input
          value={button.tooltip?.toString() ?? ''}
          onChange={(event) => onChange({ ...button, tooltip: (event.target as HTMLInputElement).value })}
        />
      </Field>

      <Field label="Variant">
        <Select
          options={[
            { value: 'primary' as const, label: 'Primary' },
            { value: 'secondary' as const, label: 'Secondary' },
            { value: 'destructive' as const, label: 'Destructive' },
            { value: 'success' as const, label: 'Success' },
          ]}
          value={button.variant ?? 'primary'}
          onChange={(variant) => onChange({ ...button, variant: variant.value })}
        />
      </Field>

      <Field label="Size">
        <RadioButtonGroup
          options={[
            { value: 'sm' as const, label: 'Small' },
            { value: 'md' as const, label: 'Medium' },
            { value: 'lg' as const, label: 'Large' },
          ]}
          fullWidth={true}
          value={button.size ?? 'md'}
          onChange={(size) => onChange({ ...button, size })}
        />
      </Field>

      <Field label="Fill">
        <RadioButtonGroup
          options={[
            { value: 'solid' as const, label: 'Solid' },
            { value: 'outline' as const, label: 'Outline' },
            { value: 'text' as const, label: 'Text' },
          ]}
          fullWidth={true}
          value={button.fill ?? 'solid'}
          onChange={(event) => onChange({ ...button, fill: event })}
        />
      </Field>

      <Field label="Icon">
        <Select
          isClearable={true}
          options={Object.keys(availableIconsIndex).map((icon) => ({
            value: icon as keyof typeof availableIconsIndex,
            label: icon,
            icon: icon,
          }))}
          value={button.icon ?? null}
          onChange={(event) => onChange({ ...button, icon: event.value })}
        />
      </Field>

      <Field label="External Link">
        <Switch
          value={button.target === '_blank'}
          onChange={(event) =>
            onChange({ ...button, target: (event.target as HTMLInputElement).checked ? '_blank' : undefined })
          }
        />
      </Field>

      <Field label="Disabled">
        <Switch
          value={button.disabled}
          onChange={(event) => onChange({ ...button, disabled: (event.target as HTMLInputElement).checked })}
        />
      </Field>

      <Box>
        <Button
          size="sm"
          aria-label="remove button"
          icon="trash-alt"
          variant="destructive"
          fill="text"
          onClick={() => onChange(null)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
}

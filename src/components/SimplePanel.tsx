import { css } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { LinkButton, Stack } from '@grafana/ui';
import React from 'react';
import { LinkButtonProps, StackProps } from 'types';

export type ButtonsPanelProps = {
  state: {
    buttons: LinkButtonProps[];
    stack: StackProps;
  };
};

const centerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;

  > * {
    width: 100%;
    height: 100%;
  }
`;

export const ButtonsPanel: React.FC<PanelProps<ButtonsPanelProps>> = ({
  options: {
    state: { buttons, stack },
  },
  replaceVariables,
}) => {
  return (
    <div className={centerStyle}>
      <Stack flex={1} {...stack}>
        {buttons.map(({ children, href, tooltip, ...rest }, index) => (
          <LinkButton
            key={index}
            href={href ? replaceVariables(href) : undefined}
            tooltip={tooltip ? replaceVariables(String(tooltip)) : undefined}
            {...rest}
          >
            {children ? replaceVariables(String(children)) : undefined}
          </LinkButton>
        ))}
      </Stack>
    </div>
  );
};

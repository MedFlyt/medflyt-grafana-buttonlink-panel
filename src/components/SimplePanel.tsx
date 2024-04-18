import { css } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { LinkButton } from '@grafana/ui';
import React from 'react';

export interface LinkButtonProps extends React.ComponentPropsWithoutRef<typeof LinkButton> {
  externalLink?: boolean;
}

type Props = PanelProps<LinkButtonProps>;

const centerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const SimplePanel: React.FC<Props> = ({ options: { externalLink, ...options }, replaceVariables }) => {
  options.children = options.children ? replaceVariables(String(options.children)) : undefined;
  options.href = options.href ? replaceVariables(options.href) : undefined;
  options.tooltip = options.tooltip ? replaceVariables(String(options.tooltip)) : undefined;

  return (
    <div className={centerStyle}>
      <LinkButton {...options} target={externalLink ? '_blank' : undefined} />
    </div>
  );
};

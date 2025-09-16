import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from './Card';

const meta = {
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple card component that can display a header and body content.'
      }
    }
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    key: 'key',
    header: 'Card Header',
    body: 'Card body content goes here.'
  }
};

const CustomHeaderComponent = () => (
  <div style={{ padding: '5px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
    <h2>Custom Header</h2>
  </div>
);

const CustomBodyComponent = () => (
  <div style={{ padding: '10px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
    <p>This is a custom body component with additional styling.</p>
  </div>
);

export const WithHeaderComponent: Story = {
  args: {
    key: 'key',
    header: <CustomHeaderComponent />,
    body: 'Card body content with a custom header component.'
  }
};

export const WithBodyComponent: Story = {
  args: {
    key: 'key',
    header: 'Card Header',
    body: <CustomBodyComponent />
  }
}

export const WithoutHeader: Story = {
  args: {
    key: 'key',
    body: 'Card body content without a header.'
  }
}

export const WithoutBody: Story = {
  args: {
    key: 'key',
    header: 'Card Header without body content.'
  }
}

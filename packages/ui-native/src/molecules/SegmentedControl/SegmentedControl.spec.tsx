import { render, screen, fireEvent } from '@testing-library/react-native';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { key: 'CPF', label: 'Pessoa Física' },
  { key: 'CNPJ', label: 'Pessoa Jurídica' },
];

describe('SegmentedControl', () => {
  it('renders every option', async () => {
    await render(<SegmentedControl options={options} selectedKey="CPF" />);
    expect(screen.getByText('Pessoa Física')).toBeOnTheScreen();
    expect(screen.getByText('Pessoa Jurídica')).toBeOnTheScreen();
  });

  it('marks the selected option', async () => {
    await render(<SegmentedControl options={options} selectedKey="CNPJ" />);
    expect(screen.getByRole('tab', { name: 'Pessoa Jurídica' })).toHaveProperty(
      'props.accessibilityState.selected',
      true,
    );
  });

  it('fires onChange with the pressed option key', async () => {
    const onChange = jest.fn();
    await render(<SegmentedControl options={options} selectedKey="CPF" onChange={onChange} />);
    await fireEvent.press(screen.getByText('Pessoa Jurídica'));
    expect(onChange).toHaveBeenCalledWith('CNPJ');
  });
});

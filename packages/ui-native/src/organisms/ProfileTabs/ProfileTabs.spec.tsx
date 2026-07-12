import { render, screen, fireEvent } from '@testing-library/react-native';
import { ProfileTabs } from './ProfileTabs';

describe('ProfileTabs', () => {
  it('renders the three tabs', () => {
    render(<ProfileTabs active="fotos" />);
    ['Dicas', 'Fotos', 'Roteiros'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });

  it('fires onChange with the tab key', () => {
    const onChange = jest.fn();
    render(<ProfileTabs active="fotos" onChange={onChange} />);
    fireEvent.press(screen.getByText('Roteiros'));
    expect(onChange).toHaveBeenCalledWith('roteiros');
  });

  it('renders the "Ver tudo" tab when passed a custom tab list', () => {
    const onChange = jest.fn();
    render(
      <ProfileTabs
        active="ver-tudo"
        tabs={['ver-tudo', 'dicas', 'fotos', 'roteiros']}
        onChange={onChange}
      />,
    );
    fireEvent.press(screen.getByText('Ver tudo'));
    expect(onChange).toHaveBeenCalledWith('ver-tudo');
  });
});

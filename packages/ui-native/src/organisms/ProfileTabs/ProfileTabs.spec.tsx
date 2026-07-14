import { render, screen, fireEvent } from '@testing-library/react-native';
import { ProfileTabs } from './ProfileTabs';

describe('ProfileTabs', () => {
  it('renders the three tabs', async () => {
    await render(<ProfileTabs active="fotos" />);
    ['Dicas', 'Fotos', 'Roteiros'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });

  it('fires onChange with the tab key', async () => {
    const onChange = jest.fn();
    await render(<ProfileTabs active="fotos" onChange={onChange} />);
    await fireEvent.press(screen.getByText('Roteiros'));
    expect(onChange).toHaveBeenCalledWith('roteiros');
  });

  it('renders the "Ver tudo" tab when passed a custom tab list', async () => {
    const onChange = jest.fn();
    await render(
      <ProfileTabs
        active="ver-tudo"
        tabs={['ver-tudo', 'dicas', 'fotos', 'roteiros']}
        onChange={onChange}
      />,
    );
    await fireEvent.press(screen.getByText('Ver tudo'));
    expect(onChange).toHaveBeenCalledWith('ver-tudo');
  });
});

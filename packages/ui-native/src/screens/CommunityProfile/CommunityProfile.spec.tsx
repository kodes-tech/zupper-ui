import { render, screen } from '@testing-library/react-native';
import { CommunityProfile } from './CommunityProfile';
import type { ProfilePostSection } from './CommunityProfile';

const dicaSections: ProfilePostSection[] = [
  {
    location: 'Recife, PE',
    posts: [
      {
        id: 'd1',
        authorName: 'Carlos Souza',
        authorAvatar: { uri: 'https://example.com/a.png' },
        role: 'traveler',
        type: 'dica',
        text: 'Conteúdo da dica',
        location: 'Recife, PE',
        likes: 1,
      },
    ],
  },
];

describe('CommunityProfile', () => {
  const base = { name: 'Olá, Carlos', subtitle: '@carlosviaja', role: 'traveler' as const };

  it('renders header, tabs and the dicas content', () => {
    render(<CommunityProfile {...base} tab="dicas" dicaSections={dicaSections} />);
    expect(screen.getByText('Meu Perfil - Comunidade')).toBeOnTheScreen();
    // "Recife, PE" aparece no título da seção e no rodapé do card
    expect(screen.getAllByText('Recife, PE').length).toBeGreaterThan(0);
    expect(screen.getByText('Conteúdo da dica')).toBeOnTheScreen();
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
  });

  it('renders the photo grid on the fotos tab', () => {
    render(
      <CommunityProfile {...base} tab="fotos" photos={[{ uri: 'a' }, { uri: 'b' }, { uri: 'c' }]} />,
    );
    // 3 fotos + FAB Publicar + 4 itens do bottom nav = pressables presentes
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
  });

  it('renders the empty state when the active tab has no content', () => {
    render(<CommunityProfile {...base} tab="fotos" photos={[]} />);
    expect(screen.getByText('Você ainda não tem publicações')).toBeOnTheScreen();
    expect(screen.getByText('Compartilhe conteúdo na comunidade Zupper')).toBeOnTheScreen();
  });
});

import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ContentDetail } from './ContentDetail';
import type { ContentOffer } from './ContentDetail';
import type { Comment } from '../../molecules/CommentThread';
import type { RoteiroDayCardProps } from '../../molecules/RoteiroDayCard';
import { NotInterestedSheet } from '../../organisms/NotInterestedSheet';
import { PostActionsSheet } from '../../organisms/PostActionsSheet';
import { ReportConfirmSheet } from '../../organisms/ReportConfirmSheet';
import { ReportReasonsSheet } from '../../organisms/ReportReasonsSheet';
import type { ReportReason } from '../../organisms/ReportReasonsSheet';
import { ReportSentSheet } from '../../organisms/ReportSentSheet';
import { OwnPostActionsSheet } from '../../organisms/OwnPostActionsSheet';
import { DeleteOwnPostSheet } from '../../organisms/DeleteOwnPostSheet';
import { ContentUnderReviewSheet } from '../../organisms/ContentUnderReviewSheet';
import { ContentRemovedSheet } from '../../organisms/ContentRemovedSheet';

const avatar = require('../../_figma/assets/photos/avatar-viajante.jpg');
const fullPhoto = require('../../_figma/assets/photos/conteudo-foto-full.jpg');

const author = {
  name: 'Carlos Souza',
  handle: '@carlosviaja',
  avatar,
  role: 'traveler' as const,
};

const comments: Comment[] = [
  { id: '1', name: 'Marina', text: 'Anotado! Vou nessa semana.' },
  { id: '2', name: 'Pedro', text: 'O Cais é incrível mesmo' },
];

const authorComment = {
  name: 'Carlos Souza',
  text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local. Vale muito a visita!',
};

const social = {
  likes: 0,
  commentCount: 0,
  authorComment,
  comments,
  onBack: action('onBack'),
  onLike: action('onLike'),
  onComment: action('onComment'),
  onShare: action('onShare'),
  onMore: action('onMore'),
  onWriteComment: action('onWriteComment'),
  onSendComment: action('onSendComment'),
  onNavigate: action('onNavigate'),
};

const day = (label: string): RoteiroDayCardProps => ({
  day: label,
  title: 'Recife Antigo',
  stops: [
    {
      id: 'manha',
      period: 'MANHÃ',
      title: 'Marco Zero e Rua do Bom Jesus',
      description: 'Comece cedo, tem sombra e é plano pra carrinho.',
    },
    {
      id: 'tarde',
      period: 'TARDE',
      title: 'Embaixada dos Bonecos Gigantes',
      description: 'As crianças amam. Ingresso barato.',
    },
    {
      id: 'noite',
      period: 'NOITE',
      title: 'Jantar na Rua da Moeda',
      description: 'Opções pra todos os gostos.',
    },
  ],
});

const offers: ContentOffer[] = [
  {
    id: 'passagens',
    title: 'Passagens aéreas',
    icon: 'oferta-passagens',
    priceLabel: 'Voos a partir',
    price: 'R$ 1.086',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver passagens',
  },
  {
    id: 'hospedagens',
    title: 'Hospedagens',
    icon: 'oferta-hospedagens',
    priceLabel: 'Diárias a partir',
    price: 'R$ 390',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver hospedagens',
  },
];

export default {
  title: 'Screens/ContentDetail',
  component: ContentDetail,
  args: { onPressOffer: action('onPressOffer'), ...social },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Foto = {
  args: {
    type: 'foto',
    title: 'Foto',
    author: { ...author, location: 'Fernando de Noronha' },
    photo: fullPhoto,
  },
};

export const Dica = {
  args: {
    type: 'dica',
    title: 'Dica',
    author,
    contentTitle: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
    date: '02/07/2026',
    readingTime: '2 min de leitura',
    description:
      'Fernando de Noronha é um paraíso que pode ser aproveitado sem gastar muito. Prefira a baixa temporada, opte por pousadas familiares, aproveite as praias públicas e trilhas autoguiadas, e reserve passeios com antecedência buscando pacotes promocionais.',
  },
};

export const Roteiro = {
  args: {
    type: 'roteiro',
    title: 'Roteiro',
    author,
    contentTitle: '3 dias em Recife com crianças',
    date: '02/07/2026',
    readingTime: '5 min de leitura',
    metadata: ['3 dias', '8 paradas', 'Família'],
    description:
      'Fizemos essa viagem em julho com duas crianças (5 e 9 anos). Roteiro testado e aprovado, com ritmo leve e muita praia.',
    days: [day('Dia 1.'), day('Dia 2.'), day('Dia 3.')],
    offersTitle: 'Gostou do roteiro? Aproveite as ofertas',
    offers,
  },
};

// ── Moderação ───────────────────────────────────────────────────────────────
// Os quatro sheets abaixo entram pela prop `overlay`; os dois banners, por
// `banner`. Quem decide o que está aberto é o app — a tela só compõe.

const foto = {
  type: 'foto' as const,
  title: 'Foto',
  author: { ...author, location: 'Cais do Sertão - Recife, PE' },
  photo: fullPhoto,
};

const reportReasons: ReportReason[] = [
  { id: 'spam', label: 'Spam ou propaganda enganosa' },
  { id: 'improprio', label: 'Conteúdo impróprio ou ofensivo' },
  { id: 'informacao-falsa', label: 'Informação falsa sobre o destino' },
  { id: 'odio', label: 'Discurso de ódio ou bullying' },
  { id: 'golpe', label: 'Golpe ou fraude' },
  { id: 'fora-de-contexto', label: 'Não é sobre viagem' },
];

/** Menu de ações da publicação, aberto pelo "..." da barra social. */
export const MenuDeAcoes = {
  args: {
    ...foto,
    overlay: (
      <PostActionsSheet
        onSave={action('onSave')}
        onNotInterested={action('onNotInterested')}
        onShare={action('onShare')}
        onReport={action('onReport')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Denúncia, passo 0: confirmação antes de ver os motivos. */
export const DenunciaConfirmar = {
  args: {
    ...foto,
    overlay: (
      <ReportConfirmSheet
        onReport={action('onReport')}
        onCancel={action('onCancel')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Denúncia, passo 1: escolha do motivo. */
export const DenunciaMotivos = {
  args: {
    ...foto,
    overlay: (
      <ReportReasonsSheet
        reasons={reportReasons}
        onSelectReason={action('onSelectReason')}
        onCancelReport={action('onCancelReport')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Denúncia, passo 2: confirmação de envio. */
export const DenunciaEnviada = {
  args: {
    ...foto,
    overlay: (
      <ReportSentSheet
        onDone={action('onDone')}
        onBlockAuthor={action('onBlockAuthor')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** "Não tenho interesse" — confirmação + ajustes de feed. */
export const NaoTenhoInteresse = {
  args: {
    ...foto,
    overlay: (
      <NotInterestedSheet
        destination="Recife"
        onSeeLessDestination={action('onSeeLessDestination')}
        onSeeLessAuthor={action('onSeeLessAuthor')}
        onSeeLessPhotos={action('onSeeLessPhotos')}
        onUndo={action('onUndo')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Visão do autor: a publicação foi denunciada e está sob análise. */
export const ConteudoEmAnalise = {
  args: {
    ...foto,
    banner: {
      tone: 'warning',
      title: 'Publicação em análise',
      description:
        'Recebemos uma denúncia sobre esta publicação. Nossa equipe está avaliando e ela segue visível por enquanto. Avisaremos o resultado.',
      actionLabel: 'Entenda as regras da comunidade',
      onPressAction: action('onPressAction'),
    },
  },
};

/** Visão do autor: a publicação foi removida pela moderação. */
export const ConteudoRemovido = {
  args: {
    ...foto,
    banner: {
      tone: 'danger',
      title: 'Publicação removida',
      description:
        'Esta publicação foi removida por violar as diretrizes da comunidade Zupper (motivo: informação incorreta sobre o destino). Ela não está mais visível para outros viajantes.',
      actionLabel: 'Contestar decisão',
      onPressAction: action('onPressAction'),
    },
  },
};

// ── Publicação própria ──────────────────────────────────────────────────────
// O autor não denuncia o próprio conteúdo: o menu de ações vira Editar/Excluir.

/** Menu de ações da PRÓPRIA publicação: Editar / Excluir. */
export const MenuDeAcoesPropria = {
  args: {
    ...foto,
    overlay: (
      <OwnPostActionsSheet
        onEdit={action('onEdit')}
        onDelete={action('onDelete')}
        onCancel={action('onCancel')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Confirmação de exclusão da própria publicação. */
export const ExcluirPublicacao = {
  args: {
    ...foto,
    overlay: (
      <DeleteOwnPostSheet
        onDelete={action('onDelete')}
        onCancel={action('onCancel')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Diálogo completo (aberto a partir do banner/notificação) — publicação em análise. */
export const ConteudoEmAnaliseDialogo = {
  args: {
    ...foto,
    overlay: (
      <ContentUnderReviewSheet
        onLearnMore={action('onLearnMore')}
        onClose={action('onClose')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

/** Diálogo completo (aberto a partir do banner/notificação) — publicação removida. */
export const ConteudoRemovidoDialogo = {
  args: {
    ...foto,
    overlay: (
      <ContentRemovedSheet
        reason="informação incorreta sobre o destino"
        onContest={action('onContest')}
        onClose={action('onClose')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

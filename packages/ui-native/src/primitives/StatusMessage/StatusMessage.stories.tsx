import { StatusMessage } from './StatusMessage';

export default {
  title: 'Primitives/StatusMessage',
  // draft — primitivo novo de auth, pendente de avaliação do designer.
  tags: ['draft'],
  component: StatusMessage,
};

export const Sucesso = {
  args: {
    tone: 'success',
    title: 'Conta criada com sucesso',
    description: 'Seja bem-vindo ao Zupper, agora é só aproveitar e curtir suas próximas viagens.',
  },
};

export const Atencao = {
  args: {
    tone: 'warning',
    title: 'Não foi possível fazer o login',
    description: 'Tente novamente mais tarde ou escolha outra opção de cadastro.',
  },
};

export const SemDescricao = {
  args: {
    tone: 'success',
    title: 'Senha redefinida',
  },
};

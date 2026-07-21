import { PasswordRequirementsList } from './PasswordRequirementsList';

export default {
  title: 'Primitives/PasswordRequirementsList',
  // draft — primitivo novo de auth, pendente de avaliação do designer.
  tags: ['draft'],
  component: PasswordRequirementsList,
};

const base = [
  { label: 'Letra maiúscula', met: true },
  { label: 'Letra minúscula', met: true },
  { label: 'Um número', met: false },
  { label: '8 caracteres', met: false },
];

export const Default = { args: { requirements: base } };

export const TodasAtendidas = {
  args: { requirements: base.map((requirement) => ({ ...requirement, met: true })) },
};

export const NenhumaAtendida = {
  args: { requirements: base.map((requirement) => ({ ...requirement, met: false })) },
};

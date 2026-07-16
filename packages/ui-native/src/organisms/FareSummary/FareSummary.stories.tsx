import { FareSummary } from './FareSummary';

export default {
  title: 'Organisms/FareSummary',
  component: FareSummary,
};

/** Estado do screenshot: voo com melhor preço do grupo, selo de estrela. */
export const MelhorPreco = {
  args: {
    title: 'Melhor preço',
    showBadge: true,
    rows: [
      { label: 'Tarifa por adulto', value: 'R$ 1.963,27', bold: true, withDivider: true },
      { label: '1 adulto', value: 'R$ 1.963,27' },
      { label: 'Taxas e impostos', value: 'R$ 199,49', withDivider: true },
      { label: 'TOTAL A PAGAR', value: 'R$ 2.162,76', bold: true },
    ],
  },
};

export const SuaCompra = {
  args: {
    ...MelhorPreco.args,
    title: 'Sua compra',
    showBadge: false,
  },
};

export const SemTitulo = {
  args: {
    rows: MelhorPreco.args.rows,
  },
};

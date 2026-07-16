// Screens — telas mockadas (nível "template/page" do Atomic Design): compõem
// organisms com dados de exemplo. É o "menu" navegável do Storybook, sem app e
// sem emulador.
//
// Regras:
// - Apresentacional: SEM chamada de API, navegação ou store — dados entram por props.
// - Cada tela = <Nome>.tsx + <Nome>.stories.tsx; as stories cobrem os estados
//   (default / loading / empty / error / success).
// - NÃO confundir com `src/_figma/` (referência do Figma, não roda).
//
export * from './CheckoutContact';
export * from './CheckoutInvoice';
export * from './CheckoutPayment';
export * from './CheckoutThanks';
export * from './CheckoutTravelers';
export * from './CommunityProfile';
export * from './ContentDetail';
export * from './DestinationDetails';
export * from './Destinations';
export * from './Feed';
export * from './MyAccount';
export * from './PublishContent';

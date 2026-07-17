/**
 * Usado só pelo jest (preset react-native). O `bob build` usa o preset próprio
 * dele e ignora este arquivo. Sem nativewind: ícones não usam `className`.
 */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
};

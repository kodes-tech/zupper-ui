import React from 'react';
import { View } from 'react-native';
import { HotelStayDetails } from './HotelStayDetails';

export default {
  title: 'Molecules/HotelStayDetails',
  component: HotelStayDetails,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 320, padding: 16 }}><Story /></View>],
};

export const Padrao = {
  args: {
    checkIn: 'Ter, 10 Set - 14:00',
    checkOut: 'Sex, 20 Set - 12:00',
    guestsSummary: '1 quarto, 2 adultos',
  },
};

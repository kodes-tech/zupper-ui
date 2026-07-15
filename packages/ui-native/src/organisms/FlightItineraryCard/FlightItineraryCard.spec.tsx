import { render, screen } from '@testing-library/react-native';
import { FlightItineraryCard } from './FlightItineraryCard';
import type { FlightItinerary } from './FlightItineraryCard';

const ida: FlightItinerary = {
  direction: 'ida',
  headerDate: 'Qua, 24 de maio 2024',
  airline: 'Gol airlines',
  airlineCode: 'G3',
  operatedBy: 'Latam Airlines',
  flightNumber: 'LA522',
  travelClass: 'Econômica',
  aircraft: 'Boeing 747',
  departureTime: '11:30',
  departureCity: 'Florianópolis, SC',
  departureDate: 'Qua, 24 maio',
  arrivalTime: '12:55',
  arrivalCity: 'Congonhas, SP',
  arrivalDate: 'Qua, 24 maio',
  stopsLabel: 'Direto',
  duration: '1h50',
  originCode: 'FLN',
  originAirport: 'Aeroporto Internacional Hercílio Luz',
  destinationCode: 'CGH',
  destinationAirport: 'Aeroporto Internacional de Congonhas',
};

describe('FlightItineraryCard', () => {
  it('renders the itinerary details', () => {
    render(<FlightItineraryCard itinerary={ida} />);
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Qua, 24 de maio 2024')).toBeOnTheScreen();
    expect(screen.getByText('Gol airlines')).toBeOnTheScreen();
    expect(screen.getByText('Operado por: Latam Airlines')).toBeOnTheScreen();
    expect(screen.getByText('Voo nº: LA522')).toBeOnTheScreen();
    expect(screen.getByText('11:30')).toBeOnTheScreen();
    expect(screen.getByText('FLN')).toBeOnTheScreen();
    expect(screen.getByText('CGH')).toBeOnTheScreen();
    expect(screen.getByText('1h50')).toBeOnTheScreen();
  });

  it('shows "Voo de volta" for the return direction and an optional disclaimer', () => {
    render(<FlightItineraryCard itinerary={{ ...ida, direction: 'volta' }} disclaimer="Aviso ANAC." />);
    expect(screen.getByText('Voo de volta')).toBeOnTheScreen();
    expect(screen.getByText('Aviso ANAC.')).toBeOnTheScreen();
  });
});

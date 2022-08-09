import { render,screen, cleanup} from '@testing-library/react';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect'

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    const testCases = [
      100,
      50,
      235,
      88
    ]
    const negTestCases=[
      -100,
      -50,
      -23,
      -86
    ]
    for(const testObj of testCases){

    
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={testObj} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(testObj / 3.5, 'USD')}`);
      cleanup();
      });
    }
    for(const testObj of testCases) {
      it('should convert when PLN -> PLN', () => {
        render(<ResultBox from="PLN" to="PLN" amount={testObj} />);
        const countedCurrency = screen.getByTestId('output');
        expect(countedCurrency).toHaveTextContent(`${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(testObj, 'PLN')}`);
        cleanup();
      });
    }
    for(const testObj of negTestCases) {
      it('should return "Wrong value..." when number is negative', () => {
        render(<ResultBox from="PLN" to="PLN" amount={testObj} />);
        const countedCurrency = screen.getByTestId('output');
        expect(countedCurrency).toHaveTextContent('Wrong value...');
        cleanup();
      });
    }
});
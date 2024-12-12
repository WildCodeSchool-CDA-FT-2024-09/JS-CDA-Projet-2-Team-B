import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import AddBrand from '../components/AddBrand';

describe('AddBrand component tests', () => {
  it('renders AddBrand component', async () => {
    render(<AddBrand />);

    expect(screen.getByText('Nom')).toBeInTheDocument();
  });
});
